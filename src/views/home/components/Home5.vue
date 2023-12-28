<template>
  <div class="block5Container">
    <div class="blockContent">
      <div class="infoBox">
        <div class="infoTitle">梁惠涌</div>
        <div class="infoDesc">专注前端、后端、运维、高并发、k8s、DevOps。</div>
        <div class="linkBtnList">
          <div class="linkBtn">
            <a href="https://github.com/HuiYongCloud" target="_blank">GitHub</a>
          </div>
          <div class="linkBtn">
            <a href="https://gitee.com/HuiYongCloud" target="_blank">Gitee</a>
          </div>
          <div class="linkBtn">
            <a href="https://huiyong.online/blogDetail?userId=U202111250003" target="_blank">Blog</a>
          </div>
        </div>
      </div>
      <div class="linkBox">
        <div class="linkTitle">更多作品</div>
        <div class="linkList">
          <div class="linkItem" v-for="item in linkList" :key="item.name">
            <el-tooltip :content="item.desc" placement="top">
              <a :href="item.url" target="_blank">{{ item.name }}</a>
            </el-tooltip>
          </div>
        </div>
      </div>
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
.block5Container {
  background-color: var(--el-bg-color-page);
  border-radius: 450px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .blockContent {
    width: 100%;
    max-width: 980px;
    height: 350px;
    display: flex;
    padding-top: 100px;

    .infoBox {
      .infoTitle {
        font-size: 20px;
        font-weight: 700;
        color: var(--app-item-title);
        line-height: 1.4;
        margin-bottom: 20px;
      }

      .infoDesc {
        color: var(--app-item-sub);
        font-size: 16px;
      }

      .linkBtnList {
        margin-top: 30px;
        display: flex;
        align-items: center;
        .linkBtn {
          height: 38px;
          margin-right: 10px;

          a {
            color: var(--app-item-title);
          }
        }
      }
    }

    .linkBox {
      margin-left: 150px;
      .linkTitle {
        font-size: 20px;
        font-weight: 700;
        color: var(--app-item-title);
        line-height: 1.4;
        margin-bottom: 20px;
      }

      .linkList {
        display: flex;
        flex-wrap: wrap;

        .linkItem {
          margin-right: 20px;
          margin-bottom: 10px;

          a {
            color: var(--app-item-sub);
            font-size: 15px;
            transition: all 0.5s;
            text-decoration: none;

            &:hover {
              color: #1ea59a;
            }
          }
        }
      }
    }
  }
}
</style>
