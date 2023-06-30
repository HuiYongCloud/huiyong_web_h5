<template>
	<div class="login-content-form">
		<Form >
			<Field v-model="state.ruleForm.email" placeholder="请输入邮箱" required/>
			<Field v-model="state.ruleForm.code" placeholder="请输入验证码"/>
		</Form>
		<!-- <Button type="primary" class="w100 mt40" round @click="onLogin">登录</Button>
		<div class="flex-center-center mt20">
			<span>点击「登录」表示已阅读并同意 </span>
			<span class="cursor-pointer ml10 lisenter-msg">服务条款</span>
		</div> -->
	</div>
</template>

<script setup lang="ts" name="loginMobile">
import { reactive, onUnmounted } from 'vue';
import { Form, Field, showNotify, Button} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"

// 定义子组件向父组件传值/事件
const emit = defineEmits(['logInSuccess']);

// 定义变量内容
const state = reactive({
	ruleForm: {
		email: '',
		code: '',
	},

	codeBtn:{
		leftTime: 0,
		getCodeBtn: '获取',
		codeLoading: false,
		disabled: false,
	},

	loginBtn:{
		loginLoading: false,
		disabled: true,
	}
});

// 倒计时
let ticker = null as any
const startTimer = () => {
	state.loginBtn.disabled = false,
	state.codeBtn.disabled = true,
	state.codeBtn.leftTime = 60;
	state.codeBtn.getCodeBtn = `${state.codeBtn.leftTime}秒`
	ticker = setInterval(() => {
		--state.codeBtn.leftTime;
		if (state.codeBtn.leftTime <= 0) {
			state.codeBtn.leftTime = 0;
			clearTimer();
			state.codeBtn.getCodeBtn = '获取'
			state.codeBtn.disabled = false;
		} else {
			state.codeBtn.getCodeBtn = `${state.codeBtn.leftTime}秒`
		}
	}, 1000);
}

// 结束倒计时
const clearTimer = () => {
	clearInterval(ticker);
    ticker = null;
}

// 登录
const getLoginCode = () => {
	state.codeBtn.codeLoading = true;
	Request.post(Api.Get_Login_Code, {
		email: state.ruleForm.email
	}).then((res: any) =>{
		state.codeBtn.codeLoading = false;
		startTimer();
	}).catch((res: any) =>{
		// 提示失败
		state.codeBtn.codeLoading = false;
		showNotify({ type: 'danger', message: res.message });
	})
};

// 登录
const onLogin = () => {
	if (state.codeBtn.codeLoading) {
		return
	}
	state.loginBtn.loginLoading = true;
	Request.post(Api.AUTH_Login_By_Code, {
		type: 0,
		email: state.ruleForm.email,
		code: state.ruleForm.code
	}).then((res:any) =>{
		state.loginBtn.loginLoading = false;
		emit('logInSuccess', res);
	}).catch((res:any) =>{
		// 提示失败
		state.loginBtn.loginLoading = false;
		showNotify({ type: 'danger', message: res.message });
	})
};

// 页面销毁时，销毁倒计时
onUnmounted(() => {
	clearTimer()
});

// 暴露变量
defineExpose({
	onLogin,
});

</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;

	input:-webkit-autofill{
		-webkit-box-shadow: 0 0 0px 1000px var(--app-color-bg) inset;
		-webkit-text-fill-color: var(--el-input-text-color,var(--el-text-color-regular)) !important;
	}
}
</style>
