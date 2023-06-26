<template>
  <div class="page-404 flex-center-center">
    <div class="flex-center-center" style="flex-direction: column;">
      <h1>404</h1>
      <div class="mt20 font16">暂无权限</div>
      <Button to="/home" class="mt50" plain type="primary">去首页</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'vant';

</script>

<style scoped lang="scss">
.page-404{
  height: 100vh;
  color: var(--el-color-black);
}
</style>
