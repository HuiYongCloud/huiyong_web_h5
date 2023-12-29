<template>
  <div class="flex-center-center">
    <div class="home2-box">
      <div class="home2-title">为什么选择 HuiYong.Online ？</div>
      <el-row style="margin-top: 60px;">
        <template v-for="(item, index) in functionList" :key="index">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" >
            <div class="home2-item">
              <div class="flex">
                <div class="img-box flex-center-center">
                  <img :src="item.img" style="filter: drop-shadow(10000px 0 0 var(--el-text-color-primary)); transform: translate(-10000px);">
                </div>
                <div class="info">
                  <div class="name">{{ item.name }}</div>
                  <div class="value">{{ item.value }}</div>
                </div>
              </div>   
            </div>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import MicroService from './svg/MicroService.svg';
import Docker from './svg/Docker.svg';
import Theme from './svg/Theme.svg';
import Window from './svg/Window.svg';
import MD from './svg/MD.svg';
import Drawio from './svg/Drawio.svg';
import XMind from './svg/XMind.svg';
import Img from './svg/Img.svg';
import Video from './svg/Video.svg';
import BaseDoc from './svg/BaseDoc.svg';
import YinSi from './svg/yinsi.svg';
import RBAC from './svg/RBAC.svg';
import Log from './svg/Log.svg';
import BoardMap from './svg/BoardMap.svg';
import InAndOut from './svg/InAndOut.svg';

const functionList = [
  {
    img: Theme,
    name: '主题',
    value: '支持明亮/暗黑模式，护眼。'
  },
  {
    img: MicroService,
    name: '微服务',
    value: '微服务治理、流量管控，安全、稳定。'
  },
  {
    img: Docker,
    name: 'Docker',
    value: '镜像部署，方便快捷。'
  },  
  {
    img: MD,
    name: 'MarkDown',
    value: '完善的MarkDown语法支持'
  },
  {
    img: Drawio,
    name: 'Drawio',
    value: '内置强大、免费的Drawio绘图工具。'
  },
  {
    img: XMind,
    name: 'XMind',
    value: '内置强大的思维导图工具。'
  },
  {
    img: Window,
    name: '屏幕适配',
    value: '兼容各种大小屏，移动端、PC、平板等。'
  },  
  {
    img: Img,
    name: '图片',
    value: '文件上传、断点续传、秒传。'
  },
  {
    img: Video,
    name: '视频',
    value: '文章可加入视频，视频播放。'
  },
  {
    img: BaseDoc,
    name: '基本样式',
    value: '粗体、斜体、删除线、引用、列表、图片、表格、语法高亮等。'
  },
  {
    img: YinSi,
    name: '隐私',
    value: '公开/私密文章，私密文章仅自己可看，或者分享权限码给好友可看。'
  },
  {
    img: RBAC,
    name: '权限管理',
    value: '完善的权限管理系统，角色、用户、菜单，独立管理。'
  },
  {
    img: Log,
    name: '文章互动',
    value: '点赞、关注、收藏'
  },
  {
    img: BoardMap,
    name: '数据面板',
    value: '博客访问记录，趋势、日统计、月统计展示。'
  },
  {
    img: InAndOut,
    name: '导入导出',
    value: '支持Drawio导入导出，支持XMind导入导出。'
  },
]
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';

.home2-box{
  margin: 100px 0 70px; 
  max-width: 980px;
}

.home2-title {
  font-size: 30px;
  font-weight: 700;
  color: var(--app-item-title);
  text-align: center;
  margin-bottom: 40px;
}

.home2-item {
  margin-bottom: 50px;
  padding-right: 15px;

  .img-box {
    height: 50px;
    width: 50px;
    min-width: 50px;
    border-radius: 10px;
    background-color: rgba(30, 165, 154, 0.1);

    img{
      width: 28px;
      height: 28px;
    }    
  }

  .info{
    margin-left: 10px;
    .name {
      margin-bottom: 8px;
      color: var(--el-text-color-primary);
      font-weight: bold;
      font-size: 16px;
    }

    .value {
      font-size: 14px;
      color: var(--app-item-sub);
      line-height: 1.5;
    }
  }
}

@media screen and (max-width: $md) {
  .home2-box{
    padding: 0 20px;
  }

  .home2-title {
    font-size: 28px;
  }

  .home2-item {
    margin-bottom: 30px;

    .img-box {
      height: 40px;
      width: 40px;
      min-width: 40px;

      img{
        width: 20px;
        height: 20px;
      }
    }

    .info{
      .name {
        font-size: 15px;
      }

      .value {
        font-size: 12px;
      }
    }
  }  
}
</style>
