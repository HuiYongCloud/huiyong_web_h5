<template>
  <div class="page-home h100">
    <Navbar/>
    <div class="flex-center-center mt50" style="flex-direction: column;">
      <h1>Home</h1>
      <div class="flex mt30">
        <Button plain type="primary" to="/login">登录</Button>
        <Button plain type="primary" to="/register" class="ml10">注册</Button>
      </div>

      <div class="flex mt30">
        <Button plain type="primary" to="/401" class="ml10">401</Button>
        <Button plain type="primary" to="/404" class="ml10">404</Button>
      </div>

      <div class="flex mt30">
        <Button plain type="primary" to="/resume?userId=U202111250003" class="ml10">简历</Button>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { defineAsyncComponent} from 'vue';
import { Button } from 'vant';
// 引入组件
const Navbar = defineAsyncComponent(() => import('/@/components/layout/navbar/index.vue'));

</script>

<style scoped lang="scss">
@import './index.scss';
</style>