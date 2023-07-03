<template>
	<div class="login-password-content-form">
		<Form>
			<Field v-model="state.ruleForm.email" placeholder="请输入邮箱" autofocus clearable clear-trigger="focus"/>
			<Field v-model="state.ruleForm.password" placeholder="请输入密码" type="password" clearable clear-trigger="focus"/>
		</Form>
	</div>
</template>

<script setup lang="ts" name="loginAccount">
import { reactive } from 'vue';
import { Form, Field, showNotify} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"

// 定义子组件向父组件传值/事件
const emit = defineEmits(['logInSuccess']);

// 定义变量内容
const state = reactive({
	loginLoading: false,
	isShowPassword: false,
	ruleForm: {
		email: '',
		password: ''
	},
});

// 登录
const onLogin = () => {
	state.loginLoading = true;
	Request.post(Api.Login_Password, {
		email: state.ruleForm.email,
		password: state.ruleForm.password
	}).then((res:any) =>{
		state.loginLoading = false;
		emit('logInSuccess', res);
	}).catch((res:any) =>{
		// 提示失败
		state.loginLoading = false;
		showNotify({ type: 'danger', message: res.message });
	})
};

// 暴露变量
defineExpose({
	onLogin
});

</script>

<style lang="scss">
.login-password-content-form {
	padding-top: 20px;

	input:-webkit-autofill{
		-webkit-box-shadow: 0 0 0px 1000px var(--van-cell-background) inset;
		-webkit-text-fill-color: var(--el-input-text-color,var(--el-text-color-regular)) !important;
	}
}
</style>
