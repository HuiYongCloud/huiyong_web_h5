<template>
  <div class="invite-code-input flex-center-center" :class="{'slide-out-top':state.isLeft}">
    <div class="invite-title">欢迎加入，填写邀请码</div>
    <u-message-input mode="bottomLine" @finish="finish"/>

    <div class="no-invite-tip">个人时间有限，没有时间监管博客内容，暂不开放获取邀请码，谢谢！</div>
    <!-- <div class="no-invite-tip">没有邀请码？可邮件1026946613@qq.com申请！</div> -->
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import UMessageInput from '/@/components/UMessageInput.vue'

const state = reactive({
  value:'',
      isInit: false,
      isLeft: false,
})

// 页面加载时
onMounted(() => {
	nextTick(() => {
    state.isInit = true;
	})
});

const finish = (value) => {
  // this.$axios.post(Api.INVITE_CHECK, {inviteCode: value}).then( res =>{
  //   this.$emit('finish', value);
  //   this.isLeft = true;
  // }).catch(res =>{
  //   // 提示失败
  //   this.$message.warning(res.message);
  //   this.value = ""
  // })
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
    transform: translateY(-1000px);
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