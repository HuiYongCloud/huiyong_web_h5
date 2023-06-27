<template>
	<div class="login-container">
		<div class="login-left">
			<div class="login-left-logo">
				<img :src="logoMini" />
				<div class="login-left-logo-text">
					<span>{{ themeConfig.globalViceTitle }}</span>
					<span class="login-left-logo-text-msg">{{ themeConfig.globalViceTitleMsg }}</span>
				</div>
			</div>
			<div class="login-left-img">
				<img :src="state.svgbg" />
			</div>
			<img :src="loginBg" class="login-left-waves" />
		</div>
		<div class="login-right">
			<div class="login-right-warp flex-center-center">
				<span class="login-right-warp-one"></span>
				<span class="login-right-warp-two"></span>
				<div class="login-right-warp-mian">
					<div class="login-right-warp-main-title">{{ themeConfig.globalTitle }} 欢迎您！</div>
					<div class="login-right-warp-register-title">
						<span>没有账户？</span>
						<span>免费注册</span>
					</div>
					<div class="login-right-warp-main-form">
						<Tabs v-model:active="state.active">
							<Tab title="密码登录"><Account ref="loginByEmailPassword" @log-in-success="logInSuccess"/></Tab>
  							<Tab title="邮箱登录"><Email ref="loginByEmailCode" @log-in-success="logInSuccess"/></Tab>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="loginIndex">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import { Tab, Tabs } from 'vant';
import { useThemeConfig } from '/@/stores/themeConfig';
import { NextLoading } from '/@/components/loading/loading';
import logoMini from '/@/assets/login/logo_mini.png';
import loginBg from '/@/assets/login/login-bg.svg';
import svg1 from '/@/assets/login/1.svg';
import svg2 from '/@/assets/login/2.svg';
import svg3 from '/@/assets/login/3.svg';
import svg4 from '/@/assets/login/4.svg';
import svg5 from '/@/assets/login/5.svg';
import svg6 from '/@/assets/login/6.svg';
import svg7 from '/@/assets/login/7.svg';
import svg8 from '/@/assets/login/8.svg';
import svg9 from '/@/assets/login/9.svg';
import svg10 from '/@/assets/login/10.svg';
import svg11 from '/@/assets/login/11.svg';
import { appStore } from "/@/stores/appStore";

// 引入组件
const Account = defineAsyncComponent(() => import('/@/views/login/component/account.vue'));
const Email = defineAsyncComponent(() => import('/@/views/login/component/email.vue'));

const loginByEmailPassword = ref()
const loginByEmailCode = ref()

// 定义变量内容
const mainStore = appStore()
const themeConfig = useThemeConfig();
const state = reactive({
	active : ref(0),
	svgbg: '' as any,
});

const logInSuccess = (res: any) => {
	// 存储用户信息
	mainStore.userInfo = res
	// 登录成功操作页面
	toMainPage()
}

// 登录成功后的跳转
const toMainPage = () => {
	// 添加 loading，防止第一次进入界面时出现短暂空白
	NextLoading.start();
};

/**
 * enter监听
 * @param event 
 */
 const keydownListener = (event : any) => {
	if(event.key === 'Enter'){
		switch(state.active){
			case 0:
				loginByEmailPassword.value.onLogin()
				break
			case 1:
				loginByEmailCode.value.onLogin()
				break
		}
	}
}

// 页面加载时
onMounted(() => {
	nextTick(() => {
		var svgIndexList = [svg1, svg2, svg3, svg4, svg5, svg6, svg7, svg8, svg9, svg10, svg11];
		state.svgbg = svgIndexList[Math.floor(Math.random() * svgIndexList.length)];
		NextLoading.done();
		// 注册监听
		window.addEventListener('keydown', keydownListener);
	})
});

onUnmounted(async () => {
	// 注销监听
	window.removeEventListener('keydown', keydownListener);
});

</script>

<style scoped lang="scss">
@import './index.scss';
@import './index-mobile.scss';
</style>
