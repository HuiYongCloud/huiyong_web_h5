<template>
  <div >
    <ThemeSwitch :sticky="true"/>
    <!-- 注册 -->
    <div class="user-register-page flex-center-start" v-show="state.inviteCode">
      <div style="width: 360px;">
        <Field v-model="state.userName" label="用户名" placeholder="输入用户名" autocomplete="off"/>
        <Field v-model="state.email" label="邮箱" type="email" placeholder="输入邮箱" autocomplete="off"/>
        <Field v-model="state.smsCode" type="number" label="验证码" placeholder="输入验证码" autocomplete="off">
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
        <Field v-model="state.password" label="密码" id="new_user_password" name="new_user[password]" type="password" autocomplete="new-password" placeholder="设置密码"/>
        <Field v-model="state.userImage" label="头像" placeholder="输入用户名" >
          <template #input>
            <div class="flex-center-start">
              <avatar :size="60" :src="state.userImage"/>
              <div class="ml10">
                <Button size="small" :loading="state.imageLoading" @click="clickUploadFile">{{state.imageLoadingStr}}</Button>
                <input type="file" ref="uploadFileRef" style="display:none" @change="changeImage($event)" accept=".jpg, .jpeg, .png, .gif, .webp"/>
              </div>
            </div>
          </template>
        </Field>
      </div>

      <!-- 注册、登录按钮 -->
      <div style="width: 360px;" class="auth-group register-btn flex-center-start">
        <Button type="primary" class="reg-button" round @click="register">立即注册</Button>

        <span class="to-login flex-center-start">
          <span>已有账号？&nbsp; </span>
          <span class="cursor-pointer ml10" style="color: var(--van-primary-color);" @click="toLogin()">去登录</span>
        </span>
      </div>
    </div>

    <!-- 邀请码 -->
    <invite-code @finish="finishinviteCode"/>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import Avatar from '/@/components/Avatar.vue'
import { useRoute, useRouter } from "vue-router"
import { Field, Button, showNotify} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"
import OssUtils from "/@/utils/ossUtils"
import { appStore } from "/@/stores/appStore";

const ThemeSwitch = defineAsyncComponent(() => import('/@/components/theme-switch/index.vue'));
const InviteCode = defineAsyncComponent(() => import('./components/InviteCode.vue'));
const mainStore = appStore()
const route = useRoute();
const router = useRouter();
const uploadFileRef = ref();

const state = reactive({
	codeBtn:{
		leftTime: 0,
		getCodeBtn: '发送验证码',
		codeLoading: false,
		disabled: false,
	},

  userName:'',
  email:'',
  smsCode:'',
  password:'',
  inviteCode:'',
  userAvatar: "",

  // 头像更换
  imageLoading: false,
  imageLoadingStr: "更换头像",

  userImage:"",
  avatarIndex: null as any,
  avatarList : [
    "https://img.huiyong.online/userImage/avatar4.gif",
    "https://img.huiyong.online/userImage/avatar6.gif",
    "https://img.huiyong.online/userImage/avatar7.gif",
    "https://img.huiyong.online/userImage/avatar8.gif",
    "https://img.huiyong.online/userImage/avatar9.gif",
  ]
});

/**
 * 编辑admin头像
 * 
 */
const clickUploadFile = () => {
	uploadFileRef.value.click()
}
const changeImage = (event: any) => {
	if(event.target.files && event.target.files.length > 0){
		// 要上传的文件
		let imageFile = event.target.files[0]
		let key = "adminUserImage/" + mainStore.userInfo.adminId + "/" + new Date().getTime() + imageFile.name
		OssUtils.upImage(key, imageFile, {
			error: (res: any) => { 
				state.imageLoading = false
				state.imageLoadingStr = "更换头像"
        showNotify({ type: 'danger', message: res });
			},
			
			success: (_: any) => {
				state.imageLoading = false
				state.imageLoadingStr = "更换头像"
				state.userImage = "https://img.huiyong.online/" + key
			},
			
			progress: (progress: any) => {
				state.imageLoading = true
				state.imageLoadingStr = parseFloat(progress) * 100 + "%"
			}
		})
	}
}

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
  state.inviteCode = code
}

const register = () => {
  Request.post(Api.UUA_Register, {
    userName: state.userName,
		email: state.email,
    code: state.smsCode,
    password: state.password,
    userImage: state.userImage,
    inviteCode: state.inviteCode
	}).then((res: any) =>{
    clearTimer();
    // 存储用户信息
    mainStore.userInfo = res
    // 登录成功操作页面
    toMainPage()
	}).catch((res: any) =>{
		// 提示失败
		state.codeBtn.codeLoading = false;
		showNotify({ type: 'danger', message: res.message });
	})
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

const toLogin = () => {
  router.push({name: 'login'})
}

// 页面加载时
onMounted(() => {
	nextTick(() => {
    state.avatarIndex = Math.floor((Math.random()*state.avatarList.length));
    state.userImage = state.avatarList[state.avatarIndex]
	})
});

onUnmounted(() => {
  clearTimer()
})
</script>

<style lang="scss">
@import './index.scss';
</style>
