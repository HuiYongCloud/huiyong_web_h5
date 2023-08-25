<template>
	<div class="login-container">
		<ThemeSwitch :sticky="true"/>
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
			<Footer/>

			<div class="login-right-warp flex-center-center">
				<span class="login-right-warp-one"></span>
				<span class="login-right-warp-two"></span>
				<div class="login-right-warp-mian">
					<div class="login-right-warp-main-title mb20">{{ themeConfig.globalTitle }} 欢迎您！</div>
					<div class="login-right-warp-register-title mb50 flex">
						<div>没有账户？</div> 
						<div class="flex-center-center register-btn" @click="toRegPage">
							<div >免费注册</div>
							<Icon style="margin-top: 2px;" size="12" name="arrow" />
						</div>
					</div>

					<div class="login-right-warp-main-form">
						<div style="height: 220px;">
							<Tabs v-model:active="state.active" animated>
								<Tab title="密码登录"><Account ref="loginByEmailPassword" @log-in-success="logInSuccess"/></Tab>
								<Tab title="邮箱登录"><Email ref="loginByEmailCode" @log-in-success="logInSuccess"/></Tab>
							</Tabs>
						</div>

						<Button type="primary" class="w100" round @click="onLogin" :loading="state.loginLoading">登录</Button>
						<div class="flex-center-center mt20">
							<span>点击「登录」表示已阅读并同意 </span>
							<span class="cursor-pointer ml10 lisenter-msg" @click="toPageTermsDetail('2023062814265601')">服务条款</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import { useRoute, useRouter } from "vue-router"
import { Button} from 'vant';
import { Tab, Tabs, Icon } from 'vant';
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
const Footer = defineAsyncComponent(() => import('/@/components/layout/footer/index.vue'));
const Account = defineAsyncComponent(() => import('./component/account.vue'));
const Email = defineAsyncComponent(() => import('./component/email.vue'));
const ThemeSwitch = defineAsyncComponent(() => import('/@/components/theme-switch/index.vue'));

const loginByEmailPassword = ref()
const loginByEmailCode = ref()

// 定义变量内容
const route = useRoute();
const router = useRouter();
const mainStore = appStore()
const themeConfig = useThemeConfig();
const state = reactive({
	active : ref(0),
	svgbg: '' as any,
	loginLoading: false
});

const logInSuccess = (res: any) => {
	// 存储用户信息
	mainStore.userInfo = res
	// 登录成功操作页面
	toMainPage()
}

const toPageTermsDetail = (id: string) => {
	router.push({name: 'termsDetail',query: {id: id}})
}

// 登录成功后的跳转
const toMainPage = () => {
	// 登录成功，跳到转首页
	// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
	if (route.query?.redirect) {
		router.push({
			path: <string>route.query?.redirect,
			query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
		});
	} else {
		router.push('/');
	}
};

const toRegPage = () => {
    router.push({name: 'register'})
}

const onLogin = () => {
	switch(state.active){
		case 0:
			state.loginLoading = true;
			loginByEmailPassword.value.onLogin();
			state.loginLoading = false;
			break
		case 1:
			state.loginLoading = true;
			loginByEmailCode.value.onLogin();
			state.loginLoading = false;
			break
	}
}

/**
 * enter监听
 * @param event 
 */
 const keydownListener = (event : any) => {
	if(event.key === 'Enter'){
		onLogin()
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
