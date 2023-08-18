<template>
  <div class="blog-list-box">
    <div class="tab-box">
        <div class="tab-title-box flex-center-start">
          <div class="title-info" :class="{'title-info-active':state.status == 0}" @click="getBlogListByTagId()">博客列表</div>
          <div class="title-info" :class="{'title-info-active':state.status == 1}" @click="getBlogFocusList()">Ta的关注</div>
        </div>
    </div>

    <!-- 列表 -->
    <div v-if="state.list && state.list.length > 0" >
      <div class="info-item" v-for="(item, index) in state.list" :key="index">
        <!-- 博客列表 -->
        <blog-list-item  v-if="state.status == 0" :item="item"/>
        <!-- 关注列表 -->
        <blog-user-focus-list-item  v-else-if="state.status == 1" :item="item" @cancelFocus="cancelFocus"/>
      </div>
    </div>

    <!-- 空状态 -->
    <Empty v-if="state.list && state.list.length == 0"/>
  </div>  
</template>

<script setup lang="ts">
import {defineAsyncComponent, watch, reactive, nextTick, onMounted} from 'vue';
import Api from "/@/api/api"
import Request from "/@/api/request"
import { showNotify } from 'vant';

const Empty = defineAsyncComponent(() => import('/@/components/Empty.vue'));
const BlogListItem = defineAsyncComponent(() => import('./BlogListItem.vue'));
const BlogUserFocusListItem = defineAsyncComponent(() => import('./BlogUserFocusListItem.vue'));

// 定义父组件传过来的值
const props = defineProps({
  // 标签id
	tagId: {
		type: String,
		default: () => '',
	},
  // 标签id
  blogUserId: {
		type: String,
		default: () => '',
	},
});

const state = reactive({
  list: null as any,
  status : 0,
});

// 监听标签变更，更新列表
watch(
	() => props.tagId,
	(value) => {
		nextTick(() => {
      // 标签变更，获取列表
      getBlogListByTagId()
		})
	}
);

// 博客列表
const getBlogListByTagId= () => {
  state.status = 0
  Request.post(Api.Blog_List_By_Tag_Id, {
    id: props.tagId
  })
  .then((res : any) =>{ state.list = res})
  .catch(res =>{
    state.list = []
    showNotify({ type: 'danger', message: res.message });
  })
}

//关注列表
const getBlogFocusList = () => {
  state.status = 1
  Request.post(Api.BLOG_FOCUS_LIST, {userId: props.blogUserId})
  .then((res: any) =>{ state.list = res})
  .catch(res =>{
    state.list = []
    showNotify({ type: 'danger', message: res.message });
  })
}

// 取消关注博主
const cancelFocus = (focusUserId: any) => {
  Request.post(Api.BLOG_FOCUS_CANCEL, { userId: focusUserId})
  .then( _ =>{ 
    state.list = state.list.filter((item : any) => item.focusUserId != focusUserId)
    showNotify({ message: "已取消关注！" });
  })
  .catch(res =>{
    showNotify({ type: 'danger', message: res.message });
  })
}

// 页面加载时
onMounted(() => {
	if(state.status == 0){
		// 博主信息
		getBlogListByTagId()
	}else if(state.status == 1){
		// 博主信息
		getBlogFocusList()
	}
});
</script>

<style lang="scss" scoped>

.blog-list-box{
  width: 100%;

  .tab-box{
    user-select: none;
    border-bottom: 1px solid var(--el-border-color-light, #ebeef5);

    // 博客列表
    .tab-title-box{
      padding: 0 24px;
      height: 70px;
      width: 100%;
      animation: 0.2s appear;

      @keyframes appear {
        0% {
          opacity: 0;
        }
      }

      // 博客状态
      .title-info{
        font-size: 14px;
        margin-right: 24px;
        cursor: pointer;

        &:hover, &:active{
          color:var(--el-color-primary);
        }
      }

      .title-info-active{
        color:var(--el-color-primary);
        font-weight: bold;
      }
    }
  }
}
</style>