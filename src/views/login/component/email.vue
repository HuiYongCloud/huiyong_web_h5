<template>
	<Form class="login-content-form">
		<Field
			name="邮箱"
			label="邮箱"
			placeholder="请输入邮箱"
			:rules="[{ required: true, message: '请输入邮箱' }]"
			/>
		<Field
			name="密码"
			label="密码"
			placeholder="请输入密码"
			:rules="[{ required: true, message: '请输入密码' }]"
			/>
		<Button type="primary" class="login-content-submit" round @click="onLogin">登录</Button>
		<div class="font12 login-msg">* 温馨提示：建议使用Chrome、Microsoft Edge，360浏览器</div>
	</Form>
<!-- <el-form size="large" class="login-content-form">
		<el-form-item class="login-animation1">
			<el-autocomplete class="el-autocomplete" text placeholder="请输入邮箱" v-model="state.ruleForm.email" :fetch-suggestions="emailSuffix">
				<template #prefix>
					<el-icon><Message /></el-icon>
				</template>
				<template #suffix>
					<div class="login-content-email" @click="state.ruleForm.email = ''"><SvgIcon name="ele-CircleClose" :size="15" /></div>
				</template>
			</el-autocomplete>
		</el-form-item>
		<el-form-item class="login-animation2">
			<el-col :span="15">
				<el-input text maxlength="4" placeholder="请输入验证码" v-model="state.ruleForm.code" clearable autocomplete="off">
					<template #prefix>
						<el-icon class="el-input__icon"><ele-Position /></el-icon>
					</template>
				</el-input>
			</el-col>
			<el-col :span="1"></el-col>
			<el-col :span="8">
				<el-button 
					v-waves 
					class="login-content-code" 
					:loading="state.codeBtn.codeLoading" 
					:disabled="state.codeBtn.disabled"
					@click="getLoginCode">{{state.codeBtn.getCodeBtn}}</el-button>
			</el-col>
		</el-form-item>
		<el-form-item class="login-animation3">
			<el-button 
				round 
				type="primary" 
				v-waves 
				class="login-content-submit" 
				:loading="state.loginBtn.loginLoading" 
				:disabled="state.loginBtn.disabled" 
				@click="onLogin">登录</el-button>
		</el-form-item>

	</el-form> -->
</template>

<script setup lang="ts" name="loginMobile">
import { reactive, onUnmounted } from 'vue';
import { Form, Field, showNotify, Button} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"
import { emailSuffix } from "/@/utils/matchingEamil"
// import { ElMessage } from 'element-plus';

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

	// Chrome自动填充背景色问题修复
	input{
    	background-color: rgba(255,255,255,0) !important;
	}
	input:-webkit-autofill{
		transition: background-color 5000s ease-in-out 0s;
		-webkit-text-fill-color: var(--el-input-text-color,var(--el-text-color-regular)) !important;
	}
	input:-webkit-autofill:focus{
		-webkit-text-fill-color: var(--el-input-text-color,var(--el-text-color-regular)) !important;
	}

	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
	.login-msg {
		margin-top: 80px;
		color: var(--el-text-color-placeholder);
	}
}
</style>
