<template>
	<div class="layout-nav-bar flex-center-end">
		<ThemeSwitch/>
		<div class="flex-center-center pl20 pr15 pt12 pb12" v-if="mainStore.userInfo" @mouseover="state.isSelectUser = true" @mouseleave="state.isSelectUser = false">
			<img class="user-header" :src="mainStore.userInfo.userImage">
			<div class="user-name pl5">{{mainStore.userInfo.userName}}</div>
			<Icon class="ml5" name="arrow-down" />

			<div class="user-menu-box">
				<transition name="slide-top">
					<div class="user-menu-list" v-if="state.isSelectUser">
						<div class="user-info flex-center-start">
							<div class="menu-user-image">
								<img class="user-header" :src="mainStore.userInfo.userImage"/>
							</div>
							<div class="menu-user-name">{{mainStore.userInfo.userName}}</div>
						</div>
						<div class="menu-item flex-center-between" @click="toHome">首页</div>
						<div class="menu-line"/>
						<div class="menu-item flex-center-between" @click="toAdmin">后台管理</div>
						<div class="menu-line"/>
						<div class="menu-item flex-center-between" @click="outLogin">退出登录</div>
					</div>  
				</transition>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref} from 'vue';
import { appStore } from '/@/stores/appStore'
import { Icon } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { showConfirmDialog } from 'vant';

// 定义变量
const route = useRoute();
const router = useRouter();
const mainStore = appStore()
const state = reactive({
	isSelectUser: false
});
// 引入组件
const ThemeSwitch = defineAsyncComponent(() => import('/@/components/theme-switch/index.vue'));

// 首页
const toHome = ()=> router.push('/home')
// 管理后台
const toAdmin = ()=> window.open("https://admin.huiyong.online/", '_blank')
// 退出登录
const outLogin = () => {
	showConfirmDialog({
		title: '提示',
		message:'此操作将退出登录, 是否继续?'}
	).then(() => {
		// 清除缓存
		mainStore.userInfo = ''
		// 使用 reload 时，不需要调用 resetRoute() 重置路由
		window.location.reload();
	}).catch(() => {
	});
}

</script>

<style scoped lang="scss">
.layout-nav-bar {
	width: 100%;

	.user-header{
		border-radius: 50%;
		width: 25px;
		height: 25px;
	}

	.user-name{
		font-size: 14px;
	}

	.user-menu-box{
		position: absolute;
		z-index: 1;
		right: 0px;
		top: 0px;
		margin-top: 45px;
		overflow: hidden;
	}

	.user-menu-list{
		width: 160px;
		padding: 4px 0;
		box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.12), 0 0.5px 1.5px 0 rgba(0, 0, 0, 0.08);
		background: white;
		border-radius: 3px;
		overflow: hidden;
		margin: 2px 16px 16px;

		.user-info{
			padding: 0 16px;
			margin: 16px 0;

			.menu-user-image{
				width: 36px;
			}

			.menu-user-name{
				margin-left: 10px;
				color: #202d40;
				font-size: 15px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.menu-item{
			line-height: 32px;
			height: 32px;
			padding: 0 16px;
			color: #202d40;
			font-size: 14px;
			transition: all .3s ease;
			cursor: pointer;

			&:hover{
				background: #f5f7fa;
			}

			.switch-btn{
				margin-right: -10px;
				transform: scale(.6);
			}

			.menu-svg{
				color: #bdc0c6;
			}
		}

		.menu-line{
			height: 1px;
			background-color: #000;
			opacity: .04;
			margin: 4px 0;
		}
	}

	.slide-top-enter-active {
		animation: slide-top-active .25s ease;
	}
	.slide-top-leave-active {
		animation: slide-top-leave .25s ease;
	}

	@keyframes slide-top-active {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	@keyframes slide-top-leave {
		100% {
			transform: translateY(-100%);
		}
	}
}
</style>
