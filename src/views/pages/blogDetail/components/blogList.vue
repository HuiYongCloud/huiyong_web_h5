<template>
  <div class="blog-list-box">
    <Tabs v-model:active="state.tabActive" shrink @click-tab="onClickTab">
      <Tab title="博客列表"/>
      <Tab title="Ta的关注"/>
    </Tabs>

    <!-- 列表 -->
    <div class="info-item" v-for="(item, index) in state.list" :key="index">
      <!-- 博客列表 -->
      <blog-list-item  v-if="state.tabActive == 0" :item="item" :blogUserId="props.blogUserId" @openBlogDetail="openBlogDetail"/>
      <!-- 关注列表 -->
      <blog-user-focus-list-item  v-else-if="state.tabActive == 1" :item="item" @cancelFocus="cancelFocus"/>
    </div>

    <!-- 空状态 -->
    <Empty v-if="state.list && state.list.length == 0"/>
  </div>  
</template>

<script setup lang="ts">
import {defineAsyncComponent, watch, reactive, nextTick, onMounted} from 'vue';
import Api from "/@/api/api"
import Request from "/@/api/request"
import { Tabs, Tab, showNotify } from 'vant';

const Empty = defineAsyncComponent(() => import('/@/components/Empty.vue'));
const BlogListItem = defineAsyncComponent(() => import('./BlogListItem.vue'));
const BlogUserFocusListItem = defineAsyncComponent(() => import('./BlogUserFocusListItem.vue'));

// 定义子组件向父组件传值/事件
const emit = defineEmits(['openBlogDetail']);
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
  tabActive : 0,
  list: null as any,
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

const onClickTab = () => {
  state.list = null
  if(state.tabActive == 0){
		// 博主信息
		getBlogListByTagId()
	}else if(state.tabActive == 1){
		// 博主信息
		getBlogFocusList()
	}
}

// 博客列表
const getBlogListByTagId= () => {
  if(!props.tagId){
    state.list = []
    return
  }
  state.tabActive = 0
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
  state.tabActive = 1
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

// 打开博客详情
const openBlogDetail = (blogId: String) => {
	emit('openBlogDetail', blogId);
}

// 页面加载时
onMounted(() => {
  onClickTab()
});
</script>

<style lang="scss">

.blog-list-box{
  .van-tabs__nav{
    background: transparent !important;
  }
}
</style>