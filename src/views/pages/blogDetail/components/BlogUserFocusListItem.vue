<template>
	<div>
		<div class="focus-list-item" @click="toDetail(item.focusUserId)">

			<!-- 博主信息 -->
			<div class="user-info">
				<avatar :size="45" :src="item.userImage"/>
				<div class="user-text-info">
					<div class="user-name">{{item.userName}}</div>
					<div class="blog-info-box">
						<div class="item-status-num">文章 {{item.blogNum || 0}}</div>
						<div class="item-status-dot"/>
						<div class="item-status-num">被关注 {{item.focusNum || 0}}</div>                         
					</div>
				</div>
			</div>			

			<!-- 取消关注 -->
			<div class="item-control" v-if="isRoot" @click.stop="cancelFocus">取消关注</div>
		</div>
	</div>
</template>

<script>
import Api from "@/utils/api.js"
import LocalStorage from "@/utils/localStorage.js"
export default {

	// status, 5
  props: ["item", "status"],

  computed:{
    isRoot(){
			let userInfo = LocalStorage.getItem("USER_INFO")
      return userInfo && userInfo.userId && userInfo.userId === this.item.userId;
    }
  },

  methods:{
    toDetail(id){
 			window.open('/blogDetail?userId='+id, '_blank')
    },

    cancelFocus(){
			var messageTip = `确定要取消关注『${this.item.userName}』博主吗?`
			this.$confirm( messageTip, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
			}).then(() => {
				this.$emit('cancelFocus', this.item.focusUserId);
			}).catch(() => {
			});
    },
  },
}
</script>

<style lang="less" scoped>
@import '@/assets/css/index.less';



.focus-list-item{
  border-bottom: 1px solid #f0f2f5;
	padding: 16px 24px;
	cursor: pointer;
	.flex-end-between();
	&:hover, &:active{
		background-color:#f9fafb;
	}

	// 博主信息
	.user-info {
		line-height: 1;
		.flex();

		.user-text-info{
			.flex-start-between();
			flex-direction: column;
			height: 45px;
			margin-left: 12px;

			.user-name{
				color: #555666;
				margin-bottom: 5px;
				font-size: 15px;
				letter-spacing: 2px;
				font-weight: bold;
			}

			.blog-info-box{
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
		}
	}

	.item-control{
		color: #999aaa;
		font-size: 12px;
		padding: 0 10px;
		cursor: pointer;
		transition: color 0.1s;

		&:hover, &:active{
			color: #222226;
			font-weight: bold;
		}
	}
}
</style>
