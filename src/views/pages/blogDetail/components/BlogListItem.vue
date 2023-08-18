<template>
	<div class="blog-list-item flex" @click="openBlogDetail(item.blogId)">
		<div class="item-top-box flex-start-between">
			<span>
				<span class="item-title" >{{item.title}}</span>
				<span v-if="isRootBlog && item.openStatus == 0" class="open-status-0 ml10">公开</span>
				<span v-if="isRootBlog && item.openStatus == 1" class="open-status-1 ml10">私密</span>
			</span>
			<div class="item-time" >{{item.createTime}}</div>
		</div>

		<div class="item-bottom flex-center-between">
			<div class="item-bottom-left flex-center-start">
				<div class="item-status-num">阅读 {{item.readNum || 0}}</div>
				
				<!-- 收藏列表不显示收藏数 -->
				<div class="item-status-dot"/>
				<div class="item-status-num">收藏 {{item.favoriteNum || 0}}</div>                  
			</div>

			<div class="item-bottom-right flex-center-start" @click.stop="shareBlog(item.blogId)">
				<div class="item-control">分享</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { appStore } from '/@/stores/appStore'

const mainStore = appStore()
const userInfo = mainStore.userInfo

const isRootBlog = computed(() => {
	return userInfo && userInfo.userId && userInfo.userId === props.blogUserId;
});

// 定义子组件向父组件传值/事件
const emit = defineEmits(['openBlogDetail']);

// 定义父组件传过来的值
const props = defineProps({
	// 博主id
	blogUserId:{
		type: String,
		default: () => "",
	},

	// 标签id
	item: {
		type: Object,
		default: () => null,
	},
});

const shareBlog = (blogId: String) => {

}
// 打开博客详情
const openBlogDetail = (blogId: any) => {
	emit('openBlogDetail', blogId);
}
</script>

<style lang="scss" scoped>
.blog-list-item{
	position: relative;
	border-bottom: 1px solid var(--app-border-color);
	padding: 16px;
	cursor: pointer;
	flex-direction: column;
	&:hover, &:active{
		background-color: rgba(var(--el-color-primary-rgb), .1);
	}

	.item-top-box{
		width: 100%;
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
			color: var(--app-item-title);
			font-size: 14px;
		}

		.item-time{
			font-size: 12px;
			color: var(--app-item-sub);
		}
	}

	.item-bottom{
		width: 100%;

		.item-bottom-left{
			.item-status-num{
				color: var(--app-item-sub);
				font-size: 12px;
			}

			.item-status-dot{
				height: 3px;
				width: 3px;
				border-radius: 50%;
				background-color: var(--app-item-sub);
				margin: 0 8px;
			}
		}

		.item-bottom-right{
			.item-control{
				color: var(--app-item-sub);
				font-size: 12px;
				padding-left: 20px;
				cursor: pointer;
				transition: color 0.1s;

				&:hover, &:active{
					color: var(--el-color-primary);
					font-weight: bold;
				}
			}
		}
	}
}
</style>
