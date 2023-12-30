<template>
  <div class="flex-center-center" style="width: 100vw; padding: 50px 0;">
    <div class="home4-group">
      <MDPreview :content="state.content"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, onMounted, nextTick} from 'vue';

// 引入组件
const MDPreview = defineAsyncComponent(() => import('/@/components/MDPreview.vue'));

const state = reactive({
  content:"### 服务器配置 \n"
        + "| 类型 | CPU | 内存 | 网络 | \n" 
        + "| - | - | - | - | \n"
        + "| 腾迅轻量 | 4核 | 4GB | 8M | \n" 
        + "| 腾迅轻量 | 2核 | 4GB | 5M | \n" 
        + "| ECS服务器 | 2核 | 2GB | 3M |"
        + "\n"
        + "<div style='margin-top: 50px;' />"
        + "\n"
        + "\n"
        + "### 🎨 演示账号 \n"
        + "|名称 | 地址 | \n"
        + "|---|---| \n"
        + "|管理后台 | [admin.huiyong.online](https://admin.huiyong.online)| \n"
        + "|客户端 | [huiyong.online](https://huiyong.online) | \n"
        + "|账号 | test | \n"
        + "|密码 | test123 | \n"
})
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';

.home4-group{
  width: 100%; 
  max-width: 980px;
}

@media screen and (max-width: $md) {
  .home4-group{
    padding: 0 20px;  
  }
}
</style>
