<template>
  <div class="page-home flex-center-center">
    <div class="flex-center-center" style="flex-direction: column;">
      <h1>Home</h1>
      <div class="flex mt30">
        <Button plain type="primary" to="/login" class="mt10">去登录</Button>
        <Button plain type="primary" to="/401" class="ml10">4 0 1</Button>
        <Button plain type="primary" to="/404" class="ml10">4 0 4</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'vant';
</script>

<style scoped lang="scss">
@import './index.scss';
</style>