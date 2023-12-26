<template>
  <div class="blog-page flex">
    
    <!-- 博客详情 -->
    <div class="blog-detail-page">
      <h1 class="blog-title">{{state.mindDetail.title}}</h1>

      <div v-if="state.mindDetail && state.mindDetail.blogCode == 200">
        <div class="blog-info-box flex-center-start" style="flex-flow: wrap;">          
          <div class="flex-center-start mt5">
            <img :src="blogCalendar" style="margin-right:8px; width: 16px; height: 16px; filter: drop-shadow(10000px 0 0 #999aaa); transform: translate(-10000px);"/>
					  <div class="item-status-num">{{state.mindDetail.createTime}}</div>  
          </div>

					<div class="item-status-dot mt5"/>
					<div class="item-status-num mt5">阅读 {{state.mindDetail.readNum || 0}}</div>    
        </div>
        <div class="blog-content">
          <Preview ref="mindPreview"/>
        </div>
      </div>

      <!-- 101：私密，不能通过权限码观看 -->
      <div v-else-if="state.mindDetail && state.mindDetail.blogCode == 101">
        <Empty tip="博主私密思维导图"/>
      </div>
      
      <!-- 102：私密，可通过权限码观看 -->
      <div v-else-if="state.mindDetail && state.mindDetail.blogCode == 102" class="blog-pricode-box flex-center-center">
        <div class="blog-pricode-tip">博主私密思维导图，请输入权限码！</div>
        <UMessageInput mode="bottomLine" :font-size="40" :width="50" @finish="priCodeRes"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineAsyncComponent, reactive, ref} from 'vue';
import Api from "/@/api/api"
import Request from "/@/api/request"
import { showNotify } from 'vant';
import blogCalendar from '/@/assets/svg/blog-calendar.svg';

// 引入组件
const Preview = defineAsyncComponent(() => import('/@/components/MindMap/Preview.vue'));
const Empty = defineAsyncComponent(() => import('/@/components/Empty.vue'));
const UMessageInput = defineAsyncComponent(() => import('/@/components/UMessageInput.vue'));

// 定义子组件向父组件传值/事件
const emit = defineEmits(['onDetailLoad']);
const mindPreview = ref();

const state = reactive({
  mindId: '',
  mindDetail:'' as any,

  // 私密权限码
  priCode: null as any,

  imagePreview: false,
  showImage:'',
});

// 权限码查看详情
const priCodeRes = (priCode:String)=>{
  state.priCode = priCode
  getMindDetail(state.mindId)
}

const getMindDetail = (mindId: string) => {
  // 重置状态
  state.mindId = mindId
  state.mindDetail = ''
  Request.post(Api.Mind_Detail, { mindId: state.mindId, priCode : state.priCode})
  .then((res:any) =>{      
    state.mindDetail = res
    // 设置标题
    document.title = res.title
    // 回调显示博客内容
    emit('onDetailLoad', res);
    // 如果有思维导图，则可以查看
    if(state.mindDetail.content){
      // 滑动到顶部
      document.documentElement.scrollTop = 0   
      setTimeout(() => {
        mindPreview.value.upData(state.mindDetail.content)        
      }, 500);
    }
  })
  .catch(res =>{
    showNotify({ type: 'danger', message: res.message });
  })
}

// 暴露变量
defineExpose({
	getMindDetail,
});
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';

.blog-page{
  margin-bottom: 16px;

  // 博客详情 
  .blog-detail-page{
    width: 100%;
    min-width: 500px;

    .blog-pricode-box{
      flex: 1;
      height: 100%;
      flex-direction: column;

      .blog-pricode-tip{
        color: #b6b6b6;
        font-size: 14px;
        letter-spacing: 1px;
        margin-top: 30vh;
        margin-bottom: 50px;
      }
    }

    .blog-title{
      color: var(--el-color-black);
      font-size: 24px;
      font-weight: bold;
      padding: 12px 24px;
      letter-spacing: 1px;
    }

    .blog-info-box{
      padding: 0px 24px 12px;

			.item-status-num{
				font-size: 12px;
        white-space: nowrap;
			}

			.item-status-dot{
				height: 3px;
				width: 3px;
				border-radius: 50%;
				background-color: var(--el-text-color-regular);
				margin: 0 8px;
			}
    }

    .blog-content {
      word-break: break-word;
      font-size: 14px;
      line-height: 2;
      padding: 12px 24px;
    }
  }
}

@media screen and (max-width: $lg) {
  .blog-page {
    margin: 0px;

    .blog-detail-page{
      width: 100%;
      min-width: 100vw;

      .blog-title{
        font-size: 22px;
        padding: 12px;
      }

      .blog-info-box{
        padding: 0px 12px 6px;
      }

      .blog-content {
        padding: 12px;
      }
    }

    .blog-toc{
      display: none;
    }
    
    .blog-toc-show{
      display: none;
    }
  }
}
</style>