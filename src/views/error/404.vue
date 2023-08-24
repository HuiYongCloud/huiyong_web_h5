<template>
  <div class="page-404 flex-center-center">
    <div class="flex-center-center" style="flex-direction: column;">
      <h1>404</h1>
      <div class="mt20 font16">从前有座山，山上有座庙。</div>
			<div class="mt10 font16">庙里的页面，现在找不到。</div>
      <Button to="/" class="mt50" plain type="primary">去首页</Button>
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
