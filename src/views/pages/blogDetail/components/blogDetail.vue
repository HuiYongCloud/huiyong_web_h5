<template>
  <div class="blog-page flex">
    
    <!-- 博客详情 -->
    <div class="blog-detail-page">
      <h1 class="blog-title">{{state.blogDetail.title}}</h1>

      <div v-if="state.blogDetail && !state.blogDetail.blogCode && state.blogDetail.content">
        <div class="blog-info-box flex-center-start">
          <div class="flex-center-start">
            <img :src="blogTag" style="margin-right:8px; width: 12px; height: 10px; filter: drop-shadow(10000px 0 0 #999aaa); transform: translate(-10000px);"/>
					  <div class="item-status-num">{{state.blogDetail.tagName}}</div> 
          </div>
          
          <div class="item-status-dot"/>
          <div class="flex-center-start">
            <img :src="blogCalendar" style="margin-right:8px; width: 16px; height: 16px; filter: drop-shadow(10000px 0 0 #999aaa); transform: translate(-10000px);"/>
					  <div class="item-status-num">{{state.blogDetail.createTime}}</div>  
          </div>

					<div class="item-status-dot"/>
					<div class="item-status-num">阅读 {{state.blogDetail.readNum || 0}}</div>    

          <div class="item-status-dot"/>
					<div class="item-status-num">收藏 {{state.blogDetail.likeNum || 0}}</div>    

          <div class="item-status-dot"/>
          <div class="item-status-num">{{state.wordNum}}字</div>    
          <div class="item-status-dot"/>
					<div class="item-status-num">大概{{state.readTime}}</div>    

          <div style="margin-left: 15px;" v-if="!isRootBlog && state.blogDetail.content">
            <FavateBtn :width="75" :height="20" :size="12" :text="!state.blogDetail || state.blogDetail.isFavorite == false ? '收藏文章':'取消收藏'" @click="favorite"/>
          </div>
        </div>
        <div class="blog-content">
          <TuiViewer ref="tuiViewer"/>
        </div>
      </div>

      <!-- 101：私密，不能通过权限码观看 -->
      <div v-else-if="state.blogDetail && state.blogDetail.blogCode == 101">
        <Empty tip="当前为博主私密文章"/>
      </div>
      
      <!-- 102：私密，可通过权限码观看 -->
      <div v-else-if="state.blogDetail && state.blogDetail.blogCode == 102" class="blog-pricode-box flex-center-center">
        <div class="blog-pricode-tip">当前为博主私密文章，若查看需输入正确的权限码！</div>
        <UMessageInput mode="bottomLine" :font-size="40" :width="50" @finish="priCodeRes"/>
      </div>
    </div>

    <!-- 博客目录 -->
    <div class="blog-toc" :class="{'blog-toc-show': true}">
      <div class="blog-toc-title flex-center-start">
        <!-- <svg-icon icon-class="blog-toc" style="margin-left:8px"/> -->
        <div style="margin-left:10px">目录</div>
      </div>
      <!-- <div class="toc" id="toc"></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, nextTick, ref, computed} from 'vue';
import Empty from '/@/components/Empty.vue'
import FavateBtn from '/@/components/FavateBtn.vue'
import UMessageInput from '/@/components/UMessageInput.vue'
import Api from "/@/api/api"
import Request from "/@/api/request"
import { showNotify, showDialog } from 'vant';
import TuiViewer from '/@/components/TuiViewer.vue';
import blogCalendar from '/@/assets/svg/blog-calendar.svg';
import blogTag from '/@/assets/svg/blog-tag.svg';
import { appStore } from '/@/stores/appStore'
const mainStore = appStore()
const userInfo = mainStore.userInfo

// 定义子组件向父组件传值/事件
const emit = defineEmits(['onDetailLoad']);
const isRootBlog = computed(() => {
	return userInfo && userInfo.userId && userInfo.userId === state.blogDetail.userId;
});
// 定义父组件传过来的值
const props = defineProps({
	// 博客id
	blogId: {
		type: String,
		default: () => '',
	}
});

const tuiViewer = ref();
const state = reactive({
  blogDetail:'' as any,
  // 字数
  wordNum: '',
  // 阅读时间
  readTime:'',

  // 私密权限码
  priCode: null as any,
  // 显示目录
  showToc: false,

  imagePreview: false,
  showImage:'',
});

// 收藏、取消收藏
const favorite = () => {
  let url = (state.blogDetail && state.blogDetail.isFavorite == false) ? Api.Blog_Like_Add : Api.Blog_Like_Cancel
  Request.post(url, { blogId: props.blogId, priCode : state.priCode})
  .then(_ =>{ 
    state.blogDetail.isFavorite = !state.blogDetail.isFavorite
    showDialog({
      title: '提示',
      message: state.blogDetail.isFavorite == false? "已取消收藏" : "收藏成功",
      theme: 'round-button',
    }).then(() => {});
  })
  .catch(res =>{
    showNotify({ type: 'danger', message: res.message });
  })
}

// 权限码查看详情
const priCodeRes = (priCode:String)=>{
  state.priCode = priCode
  getBlogDetail()
}

const getBlogDetail = () => {
  // 重置状态
  state.blogDetail = ''
  state.showToc = false;
  Request.post(Api.Blog_Detail, { blogId: props.blogId, priCode : state.priCode})
  .then((res:any) =>{      
    state.blogDetail = res
    emit('onDetailLoad', {userId: res.userId, tagId: res.tagId});

    // 如果有文章，则可以查看
    if(res.content){
      setTimeout(() => {
      tuiViewer.value.setMarkdown(res.content)      
    }, 200);
    }
  })
  .catch(res =>{
    showNotify({ type: 'danger', message: res.message });
  })
}

// 页面加载时
onMounted(() => {
  nextTick(() => {
		// 获取详情
		getBlogDetail()
	});
});
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';

.blog-page{
  margin-bottom: 16px;

  // 博客详情 
  .blog-detail-page{
    width: 60vw;
    min-width: 500px;
    min-height: calc(100vh - 30px);

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
      // color: #999aaa;
      padding: 0px 24px 12px;

			.item-status-num{
				// color: #999aaa;
				font-size: 12px;
			}

			.item-status-dot{
				height: 3px;
				width: 3px;
				border-radius: 50%;
				// background-color: #555666;
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

  // 博客目录
  .blog-toc{
    width: 15vw;
    min-width: 200px;
    min-height: 300px;
    position: sticky;
    top: 10px;
    background:white;
    margin-left: 10px;
    padding:10px ;
    overflow: hidden;
    display: none;

    .blog-toc-title{
      font-size: 16px;
      color: #2c2c2c;
      margin-bottom: 10px;
      font-weight: bold;
      letter-spacing: 1px;
    }
  }

  .blog-toc-show{
    display: block;
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