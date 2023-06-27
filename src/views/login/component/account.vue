<template>
	<div class="login-content-form">

		<Form>
			<Field
				v-model="state.ruleForm.email"
				name="邮箱"
				label="邮箱"
				placeholder="请输入邮箱"
				/>
			<Field
				v-model="state.ruleForm.password"
				name="密码"
				label="密码"
				placeholder="请输入密码"
				/>
		</Form>
		<Button type="primary" class="login-content-submit mt50" round @click="onLogin" :loading="state.loginLoading">登录</Button>
	</div>
</template>

<script setup lang="ts" name="loginAccount">
import { reactive, computed , onMounted, onUnmounted} from 'vue';
import { Form, Field, CellGroup, Radio, RadioGroup, Button, showNotify} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"
import { emailSuffix } from "/@/utils/matchingEamil"

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
	Request.post(Api.AUTH_Login, {
		type: 0,
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
	onLogin,
});

</script>

<style scoped lang="scss">

.login-content-form {
	padding-top: 20px;

	input:-webkit-autofill{
		-webkit-box-shadow: 0 0 0px 1000px var(--app-color-bg) inset;
		-webkit-text-fill-color: var(--el-input-text-color,var(--el-text-color-regular)) !important;
	}

	.el-autocomplete{
		width: 100% !important;
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

	.login-content-prefix{
		display: flex;
		align-items: center;
		width: 20px;
		padding-right: 4px;
	}

	.login-content-email{
		display: flex;
		align-items: center;
		width: 20px;
		padding-left: 4px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;
		padding-left: 4px;
		&:hover {
			color: #909399;
		}
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
