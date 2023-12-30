<template>
  <div class="flex-center-center" style="width: 100vw; padding: 0 0 100px; background-color: var(--el-bg-color-page); border-radius:20vw 0 0 0;">
    <div style="width: 100%; max-width: 980px;">
      <el-row :gutter="50">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="item-group">
            <div class="item-title">梁惠涌</div>
            <div class="item-desc">专注前端、后端、运维、高并发、k8s、DevOps。</div>
            <div class="flex mt10">
              <a class="link-txt" href="https://github.com/HuiYongCloud" target="_blank">GitHub</a>
              <a class="link-txt" href="https://gitee.com/HuiYongCloud" target="_blank">Gitee</a>
              <a class="link-txt" href="https://huiyong.online/blogDetail?userId=U202111250003" target="_blank">Blog</a>
            </div>
          </div>        
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="item-group">
            <div class="item-title">更多作品</div>
            <div class="flex mt10">
              <template v-for="item in linkList" :key="item.name">
                <el-tooltip :content="item.desc" placement="top">
                  <a class="link-txt" :href="item.url" target="_blank">{{ item.name }}</a>
                </el-tooltip>
              </template>
            </div>

            <div class="item-desc mt20 mb10">欢迎加入微信交流群，加微备注：HuiYong.Online</div>
            <img src="/QRCode.svg" width="180">
          </div>        
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
const linkList = [
  {
    name: 'HuiYongCloud',
    url: 'https://github.com/HuiYongCloud',
    desc: '私有化博客系统'
  }
]
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';
.item-group{
  margin-top: 50px;
}

.item-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--app-item-title);
  line-height: 1.4;
  margin-bottom: 20px;
}

.item-desc {
  color: var(--app-item-sub);
  font-size: 16px;
  line-height: 1.5;
}

.link-txt {
  font-size: 14px;
  margin-right: 10px;
  color: var(--app-item-sub);
  &:hover{
    color: var(--el-color-primary);
  }
}

@media screen and (max-width: $md) {
  .item-group{
    padding: 0 40px;
  }
}
</style>
