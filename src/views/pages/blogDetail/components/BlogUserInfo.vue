<template>
  <div v-if="props.detail">
    <div class="root-info-pc">
      <div class="user-info flex-center-start">
        <avatar :size="45" :src="props.detail.userImage"/>
        <div>
          <div class="user-name">{{props.detail.userName}}</div>
          <div class="user-code-year-box flex-center-center">
            <img class="code-year-img" :src="imgPig">
            <span class="code-year">{{props.detail.codeYear}}</span>
          </div>
        </div>
      </div>

      <div class="blog-info flex">
        <div class="info-item flex-center-start">
          <div class="info-title">访问：</div>
          <div class="info-value">{{props.detail.blogInfoReadNum || 0}}</div>
        </div>
        <div class="info-item flex-center-start">
          <div class="info-title">文章：</div>
          <div class="info-value">{{props.detail.blogNum || 0}}</div>
        </div>
        <div class="info-item flex-center-start">
          <div class="info-title">收藏：</div>
          <div class="info-value">{{props.detail.blogLikeNum || 0}}</div>
        </div>
        <div class="info-item flex-center-start">
          <div class="info-title">关注：</div>
          <div class="info-value">{{props.detail.focusNum || 0}}</div>
        </div>
      </div>

      <div style="padding-top: 24px;" v-if="!isRootBlog && props.detail">
        <favate-btn width="100%" :height="30" :size="13" v-if="props.detail.focusId" text="取消关注" @click="cancelFocus"/>
        <favate-btn width="100%" :height="30" :size="13" v-if="!props.detail.focusId" text="关注博主" @click="addFocus"/>
      </div>
    </div>

    <div class="root-info-mobile">
      <Sticky>
        <div class="root-info-mobile-group flex-center-between">
          <div class="user-info flex">
            <avatar :size="45" :src="props.detail.userImage"/>
            <div class="user-name-box flex-start-between">
              <div class="user-name-top flex-center-start">
                <div class="user-name">{{props.detail.userName}}</div>
                <div class="ml10" v-if="!isRootBlog && props.detail">
                  <favate-btn :width="75" :height="20" :size="12" v-if="props.detail.focusId" text="取消关注" @click="cancelFocus"/>
                  <favate-btn :width="75" :height="20" :size="12" v-if="!props.detail.focusId" text="关注博主" @click="addFocus"/>
                </div>
              </div>
              
              <div class="blog-info flex">
                <div class="info-item flex-center-start">
                  <div class="info-title">访问：</div>
                  <div class="info-value">{{props.detail.blogInfoReadNum || 0}}</div>
                </div>
                <div class="info-item flex-center-start">
                  <div class="info-title">文章：</div>
                  <div class="info-value">{{props.detail.blogNum || 0}}</div>
                </div>
                <div class="info-item flex-center-start">
                  <div class="info-title">关注：</div>
                  <div class="info-value">{{props.detail.focusNum || 0}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sticky>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Avatar from '/@/components/Avatar.vue'
import FavateBtn from '/@/components/FavateBtn.vue'
import Api from "/@/api/api"
import Request from "/@/api/request"
import { showNotify, Sticky} from 'vant';
import imgPig from '/@/assets/img/pig1.gif';
import { appStore } from '/@/stores/appStore'
import blogToc from '/@/assets/svg/blog-toc.svg';

const mainStore = appStore()
const userInfo = mainStore.userInfo

// 定义父组件传过来的值
const props = defineProps({
  // 详情
	detail: {
		type: Object,
		default: () => null,
	},
});

const isRootBlog = computed(() => {
	return userInfo && userInfo.userId && userInfo.userId === props.detail.blogUserId;
});

const addFocus = ()=>{
  Request.post(Api.BLOG_FOCUS_ADD, { userId: props.detail.blogUserId})
  .then( res =>{
    props.detail.focusId = res
    props.detail.focusNum = props.detail.focusNum + 1
    showNotify({ type: 'primary', message: "关注成功！" })
  })
  .catch(res =>{showNotify({ type: 'danger', message: res.message })})
}

const cancelFocus = ()=>{
  Request.post(Api.BLOG_FOCUS_CANCEL, { userId: props.detail.blogUserId})
  .then( _ =>{ 
    props.detail.focusId = ''
    props.detail.focusNum = props.detail.focusNum - 1
    showNotify({ type: 'primary', message: "已取消关注！" })
  })
  .catch(res =>{showNotify({ type: 'danger', message: res.message })})
}
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';

.root-info-pc{
  display: inline-block;
  width: 100%;
  font-size: 14px;
  padding: 16px;
  margin-bottom: 8px;
  border: 1px solid var(--app-border-color);

  .user-info {

    .user-name{
      color: var(--el-color-black);
      margin-bottom: 5px;
      margin-left: 12px;
      font-size: 15px;
      letter-spacing: 2px;
      font-weight: bold;
    }

    .user-code-year-box{
      height: 16px;
      border-radius: 0 8px 8px 0;
      background-color: #EBCDFF;
      margin-left: 15px;
    
      .code-year-img{
        height: 20px;
        width: 20px;
        margin-left: -4px;
      }

      .code-year{
        font-size: 12px;
        color: #622BD0;
        padding: 0 2px 0 2px;
        transform: scale(0.85);
        letter-spacing: 1px;
      }
    }
  }

  .blog-info {
    padding: 0 0 0px;
    flex-wrap: wrap;

    .info-item {
      width: 50%;
      margin: 24px 0 0;

      .info-title{
        color: var(--el-color-black);
        font-size: 14px;
      }

      .info-value{
        color: var(--el-text-color-regular);
      }
    }
  }
}

.root-info-mobile{
  display: none;

  .root-info-mobile-group{
    padding: 10px;
    background-image: radial-gradient(transparent 1px,var(--app-color-bg) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
  }
}

@media screen and (max-width: $lg) {
  .root-info-pc{
    display: none;
  }

  .root-info-mobile{
    width: 100vw;
    font-size: 14px;
    display: inline-block;

    .user-info {

      .user-name-box{
        height: 45px;
        flex-direction: column;

        .user-name-top{

          .user-name{
            color: var(--el-color-black);
            margin-left: 12px;
            font-size: 15px;
            line-height: 15px;
            font-weight: bold;
          }

          .user-code-year-box{
            width: 52px;
            height: 12px;
            border-radius: 0 6px 6px 0;
            position: relative;
            background-color: #EBCDFF;
            margin-left: 15px;

            .code-year-img{
              height: 16px;
              width: 16px;
              margin-left: -4px;
            }

            .code-year{
              position: absolute;
              right: 0;
              bottom: 1px;
              font-size: 12px;
              color: #622BD0;
              line-height: 12px;
              padding: 0;
              transform: scale(0.7);
            }
          }         
        }

        .blog-info {
          padding: 0 0 0px;

          .info-item {
            margin: 0 2px 0 12px;    

            .info-title{
              color: var(--app-item-title);
              letter-spacing: 1px;
              font-size: 12px;
            }

            .info-value{
              color: var(--app-item-sub);
              font-size: 12px;
            }
          }
        }         
      }
    }
  }
}
</style>
