<template>
  <div >
    <!-- 注册 -->
    <div class="user-register-page flex-center-start">
      <div style="width: 360px;">
        <Field v-model="state.userName" label="用户名" placeholder="输入用户名" />
        <Field v-model="state.email" label="邮箱" placeholder="输入邮箱" />
        <Field v-model="state.smsCode" label="验证码" placeholder="输入验证码" >
          <template #button>
            <Button size="small" type="primary">发送验证码</Button>
          </template>
        </Field>
        <Field v-model="state.password" label="密码" placeholder="设置密码" />
        <Field v-model="state.userImage" label="头像" placeholder="输入用户名" >
          <template #input>
            <div class="flex-center-start">
              <avatar :size="60" :src="state.userImage" v-if="state.invateCode"/>
              <div class="select-img flex-center-center">
                <input type="file" class="upload-file" accept=".jpg, .jpeg, .png, .gif"/>
                <el-button type="text" size="small" :loading="state.imageLoading">{{state.imageLoadingStr}}</el-button>
              </div>
            </div>
          </template>
        </Field>

        <!-- 用户名 -->
        <!-- <div class="input-box flex-center-start">
          <div class="input-title">用户名</div>
          <el-input id="accounts" v-model="state.userName" placeholder="输入用户名" clearable></el-input>
        </div> -->

        <!-- 邮箱 -->
        <!-- <div class="input-box flex-center-start">
          <div class="input-title">邮箱</div>
          <el-autocomplete 
            type="email" 
            v-model="state.email" 
            placeholder="输入邮箱" 
            clearable 
            :fetch-suggestions="queryEamil"
            @blur="regEmail()" 
            @input="regEmail()"/>
        </div> -->

        <!-- 验证码 -->
        <!-- <div class="input-box flex-center-start">
          <div class="input-title">验证码</div>
          <el-input :disabled="!regEmailSuccess" v-model="smsCode" maxlength="4" placeholder="输入验证码">
            <el-button 
              :disabled="!regEmailSuccess || getCodeBtnCountDown" 
              slot="suffix" 
              type="primary" 
              size="mini" 
              plain 
              @click="getSmsCode"
              >{{getCodeBtnText}}</el-button>
          </el-input>
        </div> -->

        <!-- 密码 -->
        <!-- <div class="input-box flex-center-start">
          <div class="input-title">密码</div>
          <el-input 
            id="password"
            :disabled="email.length <= 0 || smsCode.length != 4" 
            v-model="password" 
            placeholder="设置密码" 
            show-password 
            clearable></el-input>
        </div> -->

        <!-- 头像 -->
        <!-- <div class="input-box flex-center-start">
          <div class="input-title">头像</div>
          <avatar :size="60" :src="state.userImage" v-if="state.invateCode"/>
          <div class="select-img flex-center-center">
            <input type="file" class="upload-file" @change="addImage($event)" accept=".jpg, .jpeg, .png, .gif"/>
            <el-button type="text" size="small" :loading="state.imageLoading">{{state.imageLoadingStr}}</el-button>
          </div>
        </div> -->  
      </div>

      <!-- 注册、登录按钮 -->
      <div style="width: 360px;" class="auth-group register-btn flex-center-start">
        <Button type="primary" class="reg-button" round @click="register" :loading="state.registerLoading">立即注册</Button>

        <span class="to-login flex-center-start">
          <span>已有账号？&nbsp; </span>
          <nuxt-link style="color : #409EFF" to="/userLogin">去登录</nuxt-link>
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
import { Field, Button } from 'vant';
// import InviteCode from './components/InviteCode.vue'
// import OssUtils from "@/utils/ossUtils.js"
let interval;

const state = reactive({
  registerLoading: false,
  isInviteSuccess: false,
      invateCode:'',

      userName:'',
      email:'',
      smsCode:'',
      password:'',
      inviteCode:'',
      userAvatar: "",

      passwordEnalble: false,
      regEmailSuccess: false,

      getCodeBtnCountDown: false,
      getCodeBtnText:"立即获取",

      // 头像更换
      imageLoading: false,
      imageLoadingStr: "更换头像",

      userImage:"",
      avatarPop: false,
      avatarIndex: null as any,
      avatarList : [
        // "https://img.huiyong.online/userImage/avatar1.gif",
        // "https://img.huiyong.online/userImage/avatar2.gif",
        "https://img.huiyong.online/userImage/avatar4.gif",
        "https://img.huiyong.online/userImage/avatar6.gif",
        "https://img.huiyong.online/userImage/avatar7.gif",
        "https://img.huiyong.online/userImage/avatar8.gif",
        "https://img.huiyong.online/userImage/avatar9.gif",
      ],

      emailAllEnd:[
        {value : "@qq.com"},
        {value : "@163.com"},
        {value : "@sina.com"},
        {value : "@sina.cn"},
        {value : "@sohu.com"},
        {value : "@126.com"},
        {value : "@139.com"},
        {value : "@189.cn"},
        {value : "@outlook.com"},
        {value : "@hotmail.com"},
        {value : "@foxmail.com"},
        {value : "@21cn.com"},
        {value : "@aliyun.com"},
        {value : "@vip.163.com"},
        {value : "@vip.126.com"},
        {value : "@188.com"},
        {value : "@live.cn"},
        {value : "@gmail.com"},
        {value : "@yahoo.com"},
        {value : "@yeah.com"}
      ]
});

const finishinviteCode = (code: any) => {
  state.isInviteSuccess = true
  state.invateCode = code
}

const selectImage = (index: any) => {
  state.avatarIndex = index
  state.avatarPop = false
  state.userImage = state.avatarList[state.avatarIndex]
}

const register = () => {

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
