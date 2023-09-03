<template>
	<div class="w100">
		<div class="layout-nav-bar-pc">
			<div class="flex-center-end">
				<ThemeSwitch/>
				<div class="flex-center-center pl20 pr15 pt12 pb12" v-if="mainStore.userInfo" @mouseover="state.isSelectUser = true" @mouseleave="state.isSelectUser = false">
					<VanImage round class="user-header" :src="mainStore.userInfo.userImage"/>
					<div class="user-name pl5">{{mainStore.userInfo.userName}}</div>
					<Icon class="ml5" name="arrow-down" />

					<div class="user-menu-box">
						<transition name="slide-top">
							<div class="user-menu-list" v-if="state.isSelectUser">
								<div class="user-info flex-center-start">
									<div class="menu-user-image">
										<VanImage round class="user-header" :src="mainStore.userInfo.userImage"/>
									</div>
									<div class="menu-user-name">{{mainStore.userInfo.userName}}</div>
								</div>
								<div class="menu-item flex-center-between" @click="toHome">首页</div>
								<div class="menu-line"/>
								<div class="menu-item flex-center-between" @click="toBlog">我的博客</div>
								<div class="menu-item flex-center-between" @click="toResume">我的简历</div>
								<div class="menu-item flex-center-between" @click="toAdmin">后台管理</div>
								<div class="menu-line"/>
								<div class="menu-item flex-center-between" @click="outLogin">退出登录</div>
							</div>  
						</transition>
					</div>
				</div>
			</div>
		</div>

		<div class="layout-nav-bar-mobile">
			<div class="h100 w100 flex-center-center" @click="state.showDrawer = !state.showDrawer">
				<img :src="blogToc" style="width: 20px; height: 20px; filter: drop-shadow(10000px 0 0 var(--el-color-black)); transform: translate(-10000px);"/>
			</div>

			<Popup 
				v-model:show="state.showDrawer"  
				position="right"
  				:style="{ width: '30%', height: '100%', }">内容</Popup>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref} from 'vue';
import { appStore } from '/@/stores/appStore'
import { Icon, Image as VanImage, Popup } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { showConfirmDialog } from 'vant';
import blogToc from '/@/assets/svg/blog-toc.svg';

// 定义变量
const route = useRoute();
const router = useRouter();
const mainStore = appStore()
const state = reactive({
	isSelectUser: false,
	showDrawer: false
});
// 引入组件
const ThemeSwitch = defineAsyncComponent(() => import('/@/components/theme-switch/index.vue'));

// 首页
const toHome = ()=> router.push('/')
// 博客
const toBlog = ()=> location.href = `/blogDetail?userId=${mainStore.userInfo.userId}`
// 简历
const toResume = () => location.href = `/resume?userId=${mainStore.userInfo.userId}`
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
		router.push('/login')
	}).catch(() => {
	});
}

</script>

<style scoped lang="scss">
@import '/@/theme/media.scss';

.layout-nav-bar-pc {
	width: 100%;
	z-index: 100;

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
		width: 180px;
		padding: 4px 0;
		box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.12), 0 0.5px 1.5px 0 rgba(0, 0, 0, 0.08);
		border: 1px solid var(--el-border-color-light, #ebeef5);
		background: var(--app-color-bg);
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
				color: var(--app-item-title);
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
			color: var(--app-item-title);
			font-size: 14px;
			transition: all .3s ease;
			cursor: pointer;

			&:hover{
				background-color: rgba(var(--el-color-primary-rgb), .1);
			}
		}

		.menu-line{
			border-top: 1px solid var(--el-border-color-light, #ebeef5);
			margin: 6px 0px;
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

.layout-nav-bar-mobile {
	width: 65px;
	height: 65px;
	z-index: 100;
}

@media screen and (max-width: $lg) {
	.layout-nav-bar-pc{
		display: none;
	}

	.layout-nav-bar-mobile{
		display: block;
	}
}

@media screen and (min-width: $lg) {
	.layout-nav-bar-pc{
		display: block;
	}

	.layout-nav-bar-mobile{
		display: none;
	}
}
</style>

<style>
	.van-popup{
		background: var(--app-color-bg);
	}
</style>
