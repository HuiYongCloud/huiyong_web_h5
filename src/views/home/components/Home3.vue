<template>
  <div class="flex-center-center" style="width: 100vw;">
    <div class="home3-group">
      <div class="home3-title">功能录制</div>
      <div class="home3-title-sub">Drawio</div>
      <img class="svg-img" src="https://img.huiyong.online/blogImage/2023-12-16/72f62307-a383-4411-9385-be189e807254.gif">
      <div class="home3-title-sub">XMind</div>
      <img class="svg-img" src="https://img.huiyong.online/blogImage/2023-12-29/b889a650-88b7-437b-9117-4ce661bb3152.gif">
      <div class="flex">
        <div class="btn btn-1" @click="aboutMore()">关于更多</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const aboutMore =() => {
  window.open("https://huiyong.online/blogDetail?blogId=202111260489", '_blank')
}

</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';

.home3-title {
  font-weight: 700;
  color: var(--app-item-title);
  font-size: 40px;
  margin-bottom: 40px;
}

.home3-title-sub {
  font-weight: 700;
  color: var(--app-item-sub);
  font-size: 20px;
  margin-top: 40px;
}

.svg-img{
  width: 100%;
  margin-top: 20px;
}

.home3-group{
  width: 100%; 
  max-width: 980px;

  .btn {
    height: 44px;
    padding: 0 20px;
    line-height: 44px;
    cursor: pointer;
    background: var(--el-color-primary);
    color: var(--el-color-white);
    font-weight: 600;
    font-size: 15px;
    border-radius: 5px;
    transition: all 0.5s;
    margin-right: 10px;
    margin-top: 30px;

    &:hover {
      transform: translateY(-4px);
    }

    &.btn-1{  
      background: var(--el-color-primary);
    }

    &.btn-2{
      background: #f5828b;
    }  
  }
}

@media screen and (max-width: $md) {
  .home3-group{
    padding: 0 20px;

    .btn {
      height: 35px;
      padding: 0 15px;
      line-height: 35px;
    }    
  }
}
</style>
