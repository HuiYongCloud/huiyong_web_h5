<template>
	<div class="focus-list-item flex-end-between">
		<!-- 博主信息 -->
		<div class="user-info flex">
			<avatar :size="45" :src="item.userImage"/>
			<div class="user-text-info flex-start-between">
				<div class="user-name">{{item.userName}}</div>
				<div class="blog-info-box flex-center-start">
					<div class="item-status-num">文章 {{item.blogNum || 0}}</div>
					<div class="item-status-dot"/>
					<div class="item-status-num">被关注 {{item.focusNum || 0}}</div>                         
				</div>
			</div>
		</div>			
		<!-- 取消关注 -->
		<div class="item-control">取消关注</div>
	</div>
</template>

<script setup lang="ts">
// 定义父组件传过来的值
const props = defineProps({
  	// 标签id
  	item: {
		type: Object,
		default: () => null,
	},
});
</script>

<style lang="scss" scoped>
.focus-list-item{
  border-bottom: 1px solid #f0f2f5;
	padding: 16px 24px;
	cursor: pointer;
	&:hover, &:active{
		background-color:#f9fafb;
	}

	// 博主信息
	.user-info {
		line-height: 1;

		.user-text-info{
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
