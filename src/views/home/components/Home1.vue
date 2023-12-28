<template>
  <div class="flex-center-center" style="width: 100vw; height: 100vh; background-color: var(--el-bg-color-page); border-radius: 0 0 0 20vw;">
    <div class="flex-center-between" style="width: 100%; max-width: 980px;">
      <el-row :gutter="50">
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <div class="flex-center-center">
            <div>
              <div class="infoRow">私有化博客系统</div>
              <div class="infoRow-sub-1">一站式支持MarkDown、Drawio、XMind</div>
              <div class="infoRow-sub-2">免费、简单、强大...</div>
              <div class="desc">用思维导图、流程图、写文章、做笔记、记录生活;<br>搭建自己 / 组织 / 公司的知识储备系统;<br>这里就是你所寻找的。</div>
              <div class="flex-center-start">
                <div class="btn btn-1" @click="aboutMore()">关于更多</div>
                <div class="btn btn-2">部署文档</div>
              </div>
            </div>
          </div>
        </el-col>
        
        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
          <div class="flex-center-center">
            <div style="position: relative;">
              <div class="animation1"></div>
              <div class="animation2"></div>
              <div class="animation3"></div>
              <img class="pic" :src="svg2024" />
            </div>
          </div>          
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import svg2024 from '/@/assets/svg/2024.svg';

const aboutMore =() => {
  window.open("https://huiyong.online/blogDetail?blogId=202111260489", '_blank')
}
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';

.infoRow {
  font-size: 45px;
  color: var(--app-item-title);
  font-weight: 700;
  margin-bottom: 20px;
}

.infoRow-sub-1 {
  font-size: 28px;
  color: var(--app-item-title);
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 50px;
}

.infoRow-sub-2 {
  font-size: 28px;
  color: var(--app-item-title);
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 20px;
}    

.desc {
  color: var(--el-color-info);
  font-size: 16px;
  line-height: 1.8;
  margin-top: 30px;
  margin-bottom: 30px;
}

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
  
.pic {
  width: 500px;
  max-width: 80vw;
}

.animation1 {
  width: 38px;
  height: 38px;
  border: 7px solid #f5828b;
  border-radius: 50%;
  position: absolute;
  right: -50px;
  bottom: 86px;
  animation-name: zoom1;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  box-shadow: 0 12px 50px 0 rgba(0, 0, 0, 0.14);
}

.animation2 {
  border-radius: 50%;
  background-color: var(--el-color-primary);
  box-shadow: 0 20px 30px 0 rgba(48, 61, 114, 0.4);
  position: absolute;
  width: 25px;
  height: 25px;
  top: -10px;
  right: 60px;
  animation: spin 2s infinite alternate;
  bottom: 60px;
}

.animation3 {
  border-radius: 50%;
  background-color: var(--el-text-color-primary);
  box-shadow: 0 20px 30px 0 rgba(245, 130, 139, 0.4);
  position: absolute;
  width: 25px;
  height: 25px;
  bottom: 50px;
  left: 0px;
  animation: spin 3s infinite alternate;
}

@keyframes zoom1 {
  0% {transform: scale(0.9);}
  100% {transform: scale(1.5);}
}

@keyframes spin {
  0% {transform: translateY(0);}
  100% {transform: translateY(40px);}
}

@media screen and (max-width: $md) {
  .infoRow {
    margin: 100px 20px 0;
    font-size: 25px;
    font-weight: 700;
  }

  .infoRow-sub-1 {
    margin: 30px 20px 0;
    font-size: 20px;
    font-weight: 700;
  }

  .infoRow-sub-2 {
    margin: 5px 20px 0;
    font-size: 20px;
    font-weight: 700;
  }    

  .desc {
    font-size: 14px;
    margin: 20px;
  }

  .btn {
    height: 35px;
    padding: 0 15px;
    line-height: 35px;
    &.btn-1{
      margin-left: 20px;
    }
  }
}
</style>
