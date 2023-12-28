<template>
  <div class="block2Container">
    <div class="blockContent">
      <div class="blockTitle">为什么选择 HuiYong.Online ？</div>
      <!-- <div class="dataList">
        <div class="dataItem" v-for="(item, index) in dataList" :key="index">
          <div class="iconBox">
            <span class="icon iconfont" :class="[item.icon]"></span>
          </div>
          <div class="dataValue">{{ item.value }}</div>
        </div>
      </div> -->
      <!-- <div class="desc">如果你是开发者：Simple mind map提供了一个功能完善的 js 思维导图库，不依赖任何框架，你可以使用它来快速完成Web思维导图产品的开发。</div>
      <div class="desc">如果你是使用者：Simple mind map提供了一个完整的思维导图软件，支持在线和客户端两种使用方式，所有功能完全免费。</div> -->
      <div class="functionList">
        <div class="functionItem" v-for="(item, index) in functionList" :key="index">
          <div class="icon iconfont" :class="[item.icon]"></div>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dataList = [
  {
    icon: 'iconstar',
    value: 'Github star数量600+'
  },
  {
    icon: 'iconfork',
    value: 'Github fork数量150+'
  },
  {
    icon: 'iconxiazai',
    value: 'npm总下载次数10000+'
  },
  {
    icon: 'iconteamwork',
    value: '代码贡献者8+'
  }
]
const functionList = [
  {
    icon: 'iconjingzi',
    name: '微服务',
    value: 'Gateway+Nacos+Sentinel服务治理、流量管控'
  },
  {
    icon: 'iconjingzi',
    name: 'Docker',
    value: '镜像部署，方便快捷'
  },  
  {
    icon: 'iconjingzi',
    name: '主题',
    value: '支持明亮/暗黑模式，程序员更应该护眼。'
  },
  {
    icon: 'iconjiegou',
    name: '无广告',
    value: '无任何广告。'
  },
  {
    icon: 'iconjianpan',
    name: '快捷键',
    value: '常用操作支持快捷键，方便使用。'
  },
  {
    icon: 'iconzitixiahuaxian',
    name: 'MarkDown',
    value: 'MarkDown'
  },
  {
    icon: 'iconimage',
    name: 'Drawio',
    value: '选中任一节点，选择上传图片，让内容达到图文并茂。'
  },
  {
    icon: 'icongaikuozonglan',
    name: 'XMind',
    value: '补充表述几个节点之间的关系。'
  },
  {
    icon: 'iconxiaolian',
    name: '图片',
    value: '图片秒传'
  },
  {
    icon: 'iconchaolianjie',
    name: '视频',
    value: '节点可插入超链接，鼠标点击即可实现跳转。'
  },
  {
    icon: 'iconflow-Mark',
    name: '基本文本样式',
    value: '加粗、下划线。'
  },
  {
    icon: 'iconbiaoqian',
    name: '隐私',
    value: '如果添加带颜色的标签，来突出要表达的重点。'
  },
  {
    icon: 'iconlianjiexian',
    name: '权限管理',
    value: '通过添加关联线来表明节点之间的关联关系。'
  },
  {
    icon: 'iconmouseL',
    name: '日志',
    value: '画布和节点都可以进行拖动。'
  },
  {
    icon: 'icondaohang',
    name: '数据面板',
    value: '通过导航器可以方便知道当前画布处于思维导图的哪个部分。'
  },
  {
    icon: 'icondaochu',
    name: '导入导出',
    value: '支持多种文件格式的导入和导出。'
  },
]
</script>

<style lang="scss" scoped>
.block2Container {
  display: flex;
  justify-content: center;
  align-items: center;

  .blockContent {
    padding: 100px 0;
    width: 100%;
    max-width: 980px;

    .dataList {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      .dataItem {
        box-shadow: 0 5px 30px -10px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        margin-right: 30px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &:last-of-type {
          margin-right: 0;
        }

        .iconBox {
          width: 55px;
          height: 55px;
          border-radius: 10px;
          background-color: rgba(30, 165, 154, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;

          .icon {
            font-size: 30px;
            color: var(--app-item-title);
          }
        }

        .dataValue {
          color: var(--app-item-title);
          font-weight: 700;
        }
      }
    }

    .blockTitle {
      font-size: 30px;
      font-weight: 700;
      color: var(--app-item-title);
      text-align: center;
      margin-bottom: 40px;
    }

    .desc {
      color: var(--el-color-info);
      font-size: 17px;
      line-height: 1.7;
    }

    .functionList {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 60px;
      .functionItem {
        display: flex;
        width: 30%;
        margin-bottom: 50px;

        .icon {
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 50px;
          margin-right: 24px;
          color: var(--app-item-sub);
        }

        .info {
          .name {
            margin-bottom: 5px;
            color: var(--app-item-title);
            font-weight: 600;
            font-size: 18px;
          }

          .value {
            font-size: 14px;
            color: var(--app-item-sub);
          }
        }
      }
    }
  }
}
</style>
