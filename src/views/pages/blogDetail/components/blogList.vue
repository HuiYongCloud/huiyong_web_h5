<template>
  <div class="blog-list-box">
    <Tabs v-model:active="state.tabActive" shrink @change="onChangeTab">
      <Tab title="博客列表"/>
      <Tab title="Ta的收藏"/>
      <Tab title="Ta的关注"/>
    </Tabs>

    <!-- 列表 -->
    <div class="info-item" v-for="(item, index) in state.list" :key="index">
      <!-- 博客列表 -->
      <BlogListItem
        v-if="state.tabActive == 0 || state.tabActive == 1" 
        :item="item" 
        :blogUserId="props.blogUserId" 
        @openBlogDetail="openBlogDetail"
        @openBlogShare="openBlogShare"/>
      <!-- 关注列表 -->
      <BlogUserFocusListItem 
        v-else-if="state.tabActive == 2" 
        :item="item" 
        :blogUserId="props.blogUserId" 
        @cancelFocus="cancelFocus"/>
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
const emit = defineEmits(['openBlogDetail', 'openBlogShare']);
// 定义父组件传过来的值
const props = defineProps({
  // 标签id
	tagId: {
		type: String,
		default: () => '',
	}, 
  // 博主id
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
      state.list = null
      getListByTabActive(0)
		})
	}
);

const onChangeTab = () => {
  state.list = null
  getListByTabActive(state.tabActive)
}

// 博客列表
const getListByTabActive= (tabActive: any) => {
  if(state.tabActive != tabActive){
    state.tabActive = tabActive
    state.list = null
  }

  let url = '';
  let params = null;

  switch(state.tabActive){
    // 博客列表
    case 0: 
      if(!props.tagId){
        state.list = null
        return
      }
      url = Api.Blog_List_By_Tag_Id;
    break;
    // 收藏列表
    case 1: url = Api.Blog_Like_List; break;
    // 关注列表
    case 2: url = Api.BLOG_FOCUS_LIST; break;
  }

  switch(state.tabActive){
    case 0: params = {id: props.tagId}; break;
    case 1: params = {userId: props.blogUserId}; break;
    case 2: params = {userId: props.blogUserId}; break;
  }

  Request.post(url, params)
  .then((res : any) =>{ 
    state.list = res
  })
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
    showNotify({ type: 'primary', message: "已取消关注！" });
  })
  .catch(res =>{
    showNotify({ type: 'danger', message: res.message });
  })
}

// 分享博客
const openBlogShare = (blogId: any) => {
	emit('openBlogShare', blogId);
}
// 打开博客详情
const openBlogDetail = (blogId: String) => {
	emit('openBlogDetail', blogId);
}

// 页面加载时
onMounted(() => {
  onChangeTab()
});

</script>

<style lang="scss">

.blog-list-box{
  .van-tabs__nav{
    background: transparent !important;
  }
}
</style>