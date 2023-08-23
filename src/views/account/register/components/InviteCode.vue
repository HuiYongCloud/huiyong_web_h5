<template>
  <div class="invite-code-input flex-center-center" :class="{'slide-out-top':state.check}">
    <div class="invite-title">欢迎加入，填写邀请码</div>
    <UMessageInput ref="uMessageInputRef" mode="bottomLine" :value="state.value" @finish="finish"/>
    <div class="no-invite-tip">个人时间有限，暂不开放获取邀请码，谢谢！</div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref} from 'vue';
import Api from "/@/api/api"
import Request from "/@/api/request"
import { showDialog } from 'vant';

const UMessageInput = defineAsyncComponent(() => import('/@/components/UMessageInput.vue'));
// 定义子组件向父组件传值/事件
const emit = defineEmits(['finish']);
const uMessageInputRef = ref();

const state = reactive({
  value:'123',
  check: false,
})

const finish = (value: String) => {
  Request.post(Api.INVITE_CHECK, {inviteCode: value})
  .then( _ =>{
    emit('finish', value);
    state.check = true;
  }).catch(res =>{
    // 提示失败
    showDialog({
      title: '提示',
      message: res.message,
      theme: 'round-button',
    }).then(() => {});
    uMessageInputRef.value.setValue("")
  })
}
</script>

<style lang="scss" scoped>
.invite-code-input{
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  background-color: var(--app-color-bg);

  .invite-title{
    position: absolute;
    top: 10vh;
    color: var(--app-item-title);
    font-size: 30px;
    letter-spacing: 1px;
    font-weight: bold;
  }

  .no-invite-tip{
    position: absolute;
    bottom: 40px;
    color: var(--app-item-sub);
    font-size: 12px;
    letter-spacing: 1px;
    margin: 0 60px;
  }
}

// 离开动画
// https://animista.net/play/exits/scale-out/scale-out-hor-left
.slide-out-top {
	animation: slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

@keyframes slide-out-top {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

@media screen and (max-width: 1023px) {
  .invite-code-input{
    .invite-title{
      top: 25vh;
      font-size: 18px;
    }
  }
}
</style>