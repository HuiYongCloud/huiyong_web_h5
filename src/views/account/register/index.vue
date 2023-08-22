<template>
  <div >
    <ThemeSwitch :sticky="true"/>
    <!-- 注册 -->
    <div class="user-register-page flex-center-start">
      <div style="width: 360px;">
        <Field v-model="state.userName" label="用户名" placeholder="输入用户名" />
        <Field v-model="state.email" label="邮箱" type="email" placeholder="输入邮箱"/>
        <Field v-model="state.smsCode" type="number" label="验证码" placeholder="输入验证码" >
          <template #button>
            <Button 
              size="small" 
              type="primary" 
              :loading="state.codeBtn.codeLoading" 
              :disabled="state.codeBtn.disabled"
              @click="getRegCode"
            >{{state.codeBtn.getCodeBtn}}</Button>
          </template>
        </Field>
        <Field v-model="state.password" label="密码" type="password" placeholder="设置密码"/>
        <Field v-model="state.userImage" label="头像" placeholder="输入用户名" >
          <template #input>
            <div class="flex-center-start">
              <avatar :size="60" :src="state.userImage"/>
              <div class="select-img ml10 flex-center-center">
                <input type="file" class="upload-file" accept=".jpg, .jpeg, .png, .gif"/>
                <Button size="small" :loading="state.imageLoading">{{state.imageLoadingStr}}</Button>
              </div>
            </div>
          </template>
        </Field>
      </div>

      <!-- 注册、登录按钮 -->
      <div style="width: 360px;" class="auth-group register-btn flex-center-start">
        <Button type="primary" class="reg-button" round @click="register" :loading="state.registerLoading">立即注册</Button>

        <span class="to-login flex-center-start">
          <span>已有账号？&nbsp; </span>
          <span class="cursor-pointer ml10" style="color: var(--van-primary-color);" @click="toLogin()">去登录</span>
        </span>
      </div>
    </div>

    <!-- 邀请码 -->
    <!-- <invite-code @finish="finishinviteCode"/> -->
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import Avatar from '/@/components/Avatar.vue'
import { useRoute, useRouter } from "vue-router"
import { Field, Button, showNotify} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"
import InviteCode from './components/InviteCode.vue'

const ThemeSwitch = defineAsyncComponent(() => import('/@/components/theme-switch/index.vue'));

const route = useRoute();
const router = useRouter();

const state = reactive({
	codeBtn:{
		leftTime: 0,
		getCodeBtn: '发送验证码',
		codeLoading: false,
		disabled: false,
	},

  registerLoading: false,
  invateCode:'',

  userName:'Better',
  email:'1026946613@qq.com',
  smsCode:'',
  password:'',
  inviteCode:'1881',
  userAvatar: "",

  // 头像更换
  imageLoading: false,
  imageLoadingStr: "更换头像",

  userImage:"",
  avatarIndex: null as any,
  avatarList : [
    // "https://img.huiyong.online/userImage/avatar1.gif",
    // "https://img.huiyong.online/userImage/avatar2.gif",
    "https://img.huiyong.online/userImage/avatar4.gif",
    "https://img.huiyong.online/userImage/avatar6.gif",
    "https://img.huiyong.online/userImage/avatar7.gif",
    "https://img.huiyong.online/userImage/avatar8.gif",
    "https://img.huiyong.online/userImage/avatar9.gif",
  ]
});

// 倒计时
let ticker = null as any
const startTimer = () => {
	state.codeBtn.disabled = true,
	state.codeBtn.leftTime = 60;
	state.codeBtn.getCodeBtn = `${state.codeBtn.leftTime}秒`
	ticker = setInterval(() => {
		--state.codeBtn.leftTime;
		if (state.codeBtn.leftTime <= 0) {
			state.codeBtn.leftTime = 0;
			clearTimer();
			state.codeBtn.getCodeBtn = '发送验证码'
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

// 获取验证码
const getRegCode = () => {
	state.codeBtn.codeLoading = true;
	Request.post(Api.Get_Reg_Code, {
		email: state.email
	}).then((res: any) =>{
		state.codeBtn.codeLoading = false;
		startTimer();
	}).catch((res: any) =>{
		// 提示失败
		state.codeBtn.codeLoading = false;
		showNotify({ type: 'danger', message: res.message });
	})
};

const finishinviteCode = (code: any) => {
  state.invateCode = code
}

const register = () => {
  router.push({name: 'home'})
}

const toLogin = () => {
  router.push({name: 'login'})
}

// 页面加载时
onMounted(() => {
	nextTick(() => {
    state.avatarIndex = Math.round(Math.random()* state.avatarList.length) - 1;
    state.userImage = state.avatarList[state.avatarIndex]
	})
});
</script>

<style lang="scss">
@import './index.scss';
</style>
