<template>
	<div class="blog-list-item" :class="[draggableItem ? 'blog-list-item-edit':'']" @click="toDetail(item.blogId)">
		<div class="item-top-box">
			<span>
				<span class="item-title" >{{item.title}}</span>
				<!-- <span v-if="item.openStatus == 0" class="open-status-0">公开</span> -->
				<span v-if="item.openStatus == 1" class="open-status-1">私密</span>
			</span>
			<div class="item-time" >{{item.createTime}}</div>
		</div>

		<div class="item-bottom">
			<div class="item-bottom-left">
				<div class="item-status-num">阅读 {{item.readNum || 0}}</div>
				
				<!-- 收藏列表不显示收藏数 -->
				<div class="item-status-dot" v-if="status != 4"/>
				<div class="item-status-num" v-if="status != 4">收藏 {{item.favoriteNum || 0}}</div>                  
			</div>

			<div class="item-bottom-right">
				<!-- 公开 -->
				<div class="item-control" v-if="status == 0" @click.stop="showPriCode(item.blogId)">分享</div>

				<!-- 私密 -->
				<div class="item-control" v-if="isRoot && status == 1">设为公开</div>
				<div class="item-control" v-if="isRoot && status == 1" @click.stop="showPriCode(item.blogId)">私密分享</div>
				<div class="item-control" v-if="isRoot && status == 1" @click.stop="showAddPri">权限码</div>
				
				<div class="item-control show-in-pc" v-if="isRoot" @click.stop="deleteBlog(item.blogId)">删除</div>
				<div class="item-control" v-if="isRoot  && status == 3" @click.stop="restore(item.blogId)">还原</div>
				<div class="item-control show-in-pc" v-if="isRoot" @click.stop="toEdit(item.blogId)">编辑</div>

				<div class="draggable-box" @click.stop="">
					<svg-icon icon-class="draggable" class="draggable-icon"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Api from "@/utils/api.js"
import LocalStorage from "@/utils/localStorage.js"
import CopyUtil from "@/utils/copyUtil.js"
export default {

	// status , 0:公开, 1:私密， 2：草稿， 3：回收站
  props: ["item", "status", "draggableItem"],

  computed:{
    isRoot(){
			let userInfo = LocalStorage.getItem("USER_INFO")
      return userInfo && userInfo.userId && userInfo.userId === this.item.userId;
    }
  },

  data(){
    return {
      list:""
    }
  },

  methods:{
		showAddPri(){
			this.$emit('showAddPri', this.item);
		},

    toDetail(id){
			location.href = '/blogDetail?id='+id
    },

    toEdit(id){
      window.open('/blogEdit?id='+id, '_blank')
    },

		showPriCode(blogId){
			this.$axios.post(Api.BLOG_PRI_SHARE_INFO, {id: blogId})
			.then(res =>{
				CopyUtil.copyContent(res)
				this.$message.success("已复制到剪切板，快去分享给朋友吧!") 
			})
			.catch(res =>{ this.$message.warning(res.message); })
		},

    deleteBlog(blogId){
			var messageTip = "删除后的文章会保留在回收站, 是否继续?"
			switch(this.status){
					case '2': messageTip= '草稿删除后不可回收, 是否继续?'
					case '3': messageTip= '回收站删除后将不可找回, 是否继续?'
			}
			this.$confirm( messageTip, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
			}).then(() => {
					this.$axios.post(Api.BLOG_DELETE, { blogId: blogId})
					.then(_ =>{ 
						this.$message.success("删除成功!") 
						this.$emit('deleteItem', blogId);
					})
					.catch(res =>{ this.$message.warning(res.message); })
			}).catch(() => {
			});
    },

		restore(blogId){
			var messageTip = "确定从回收站还原吗?"
			this.$confirm(messageTip, '提示', {
					confirmButtonText: '还原',
					cancelButtonText: '取消',
					type: 'warning'
			}).then(() => {
					this.$axios.post(Api.BLOG_RESTORE, { blogId: blogId})
					.then(_ =>{ 
						this.$message.success("还原成功!") 
						this.$emit('deleteItem', blogId);
					})
					.catch(res =>{ this.$message.warning(res.message); })
			}).catch(() => {
			});
    },
  },
}
</script>

<style lang="less" scoped>
@import '@/assets/css/index.less';

.blog-list-item-edit{
	&:hover, &:active{
		.item-bottom{
			.item-bottom-right{
				.draggable-box{
					display: inline-block;
				}
			}
		}
	}
}

.blog-list-item{
	position: relative;
  border-bottom: 1px solid #f0f2f5;
	padding: 16px 24px;
	cursor: pointer;
	.flex();
	flex-direction: column;
	&:hover, &:active{
		background-color:#edf0f5;
	}

	.item-top-box{
		width: 100%;
		.flex-start-between();
		margin-bottom: 15px;

		.open-status-0{
			padding: 2px 4px;
			border-radius: 2px;
			color: #6b5;
			font-size: 12px;
			background: rgba(103,187,85,.1);
			margin-right: 10px;
		}

		.open-status-1{
			padding: 2px 4px;
			border-radius: 2px;
			color: #fc5531;
			font-size: 12px;
			background: #fff5f2;
			margin-right: 10px;
		}

		.item-title{
			font-size: 15px;
			color: #555666;
			font-weight: bold;
		}

		.item-time{
			font-size: 12px;
			color: #999999;
		}
	}

	.item-bottom{
		width: 100%;
		.flex-center-between();

		.item-bottom-left{
			.flex-center-start();

			.item-status-num{
				color: #999aaa;
				font-size: 12px;
			}

			.item-status-dot{
				height: 3px;
				width: 3px;
				border-radius: 50%;
				background-color: #555666;
				margin: 0 8px;
			}
		}

		.item-bottom-right{
			.flex-center-start();

			.item-control{
				color: #999aaa;
				font-size: 12px;
				padding-left: 20px;
				cursor: pointer;
				transition: color 0.1s;

				&:hover, &:active{
					color: #222226;
					font-weight: bold;
				}
			}

			.draggable-box{
				position: absolute;
				padding: 5px;
				right: 0px;
				bottom: 7px;
        cursor: move;
        .flex-center-center();
				display: none;

        .draggable-icon{
          font-size: 14px;
          color: #999;
        }
      }
		}
	}
}

@media screen and (max-width: 1023px) {
	.blog-list-item{
		padding: 10px;

		.item-top-box{
			.item-title{
				font-size: 14px;
			}
		}

		.item-bottom{
			.item-bottom-right{
				.item-control{
					color: #666666;
				}
			}
		}
	}
}
</style>
