<template>
  	<div class="w100 flex-start-center">
		<div style="position: relative;" class="blog-detail-page flex-start-center">

			<!-- 个人信息导航 -->
			<div style="position: absolute; top: 0; right: 0; z-index: 100;">
				<Sticky><Navbar :sticky="true"/></Sticky>
			</div>

			<!-- 右侧导航 -->
			<div class="blog-info-left">
				<BlogUserInfo  :detail="state.blogInfo"/>
				<BlogTagInfo :list="state.tagList" :tagId="state.tagId" @changeTagInfo="openTagInfo"/>
			</div>

			<div class="blog-content-page">
				<!-- 博客详情 -->
				<BlogDetail v-if="state.isShowBlogDetail === true" :blogId="state.blogId" @onDetailLoad="onDetailLoad"/>
				<!-- 文章列表 -->
				<BlogList 
					v-if="state.isShowBlogDetail == false" 
					:tagId="state.tagId" 
					:blogUserId="state.blogUserId"
					@openBlogDetail="openBlogDetail"/>
			</div>

			<div class="blog-info-right">
				<div class="flex-center-between">
					<div class="blog-toc-title flex-center-start mt15" v-show="state.blogCode == 200">
						<img :src="blogToc" style="margin-left:12px; width: 14px; height: 14px; filter: drop-shadow(10000px 0 0 var(--el-color-black)); transform: translate(-10000px);"/>
						<div style="margin-left:10px">目录</div>
					</div>
				</div>
				<!-- 博客目录 -->
				<MdCatalog editorId="md-preview-id" :scrollElement="scrollElement" :theme="isDarkTheme()?'dark':'light'" />
			</div>
		</div>

		<BackTop/>
  	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive} from 'vue';
import { useRoute, useRouter } from "vue-router"
import { showNotify, Sticky, BackTop } from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"
import { MdCatalog } from 'md-editor-v3';
import { appStore } from '/@/stores/appStore'
import blogToc from '/@/assets/svg/blog-toc.svg';

// 引入组件
const Navbar = defineAsyncComponent(() => import('/@/components/layout/navbar/index.vue'));
const BlogUserInfo = defineAsyncComponent(() => import('./components/BlogUserInfo.vue'));
const BlogTagInfo = defineAsyncComponent(() => import('./components/BlogTagInfo.vue'));
const BlogList = defineAsyncComponent(() => import('./components/BlogList.vue'));
const BlogDetail = defineAsyncComponent(() => import('./components/BlogDetail.vue'));

// 定义变量内容
const mainStore = appStore()
const isDarkTheme = () => {
  let isDark = false;
	if(mainStore.theme){
		isDark = mainStore.theme === 'dark'
	}else{
		isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
	}
  return isDark;
}
const scrollElement = document.documentElement;
const route = useRoute();
const router = useRouter();
const state = reactive({
	blogUserId:'' as any,	
	tagId:'' as any,
	blogId:'' as any,
	blogCode: 0,

	blogInfo: null as any,
	tagList: [] as any,

	isShowBlogDetail: '' as any,
});

const getBlogInfo = (blogUserId: any) => {
	state.blogUserId = blogUserId
	Request.post(Api.BLOG_INFO_DETAIL, {userId: blogUserId})
	.then((res:any) =>{
		state.blogInfo = res
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

const getTagList = () => {
	Request.post(Api.Blog_Tag_List, {
		userId: state.blogUserId
	}).then((res:any) =>{
		state.tagList = res
		if(!state.tagId && state.tagList && state.tagList.length > 0){
			state.tagId = state.tagList[0].tagId
		}
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

const getTagUserId = (tagId: any) => {
	state.tagId = tagId
	state.isShowBlogDetail == false
	Request.post(Api.Get_Tag_User_Id, {
		id: tagId
	}).then((userId:any) =>{
		// 博主信息
		getBlogInfo(userId)
		// 标签列表
		getTagList();
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

const onDetailLoad = (data: any) => {
	// 详情标签id
	state.tagId = data.tagId
	state.blogCode = data.blogCode
	// 博主信息
	getBlogInfo(data.userId);
	// 标签列表
	getTagList();
}

const openTagInfo = (tagId: any) => {
	state.tagId = tagId
	state.isShowBlogDetail = false

	// 变更路径
	router.push({
		name: 'blogDetail',
		query: {tagId: tagId}
	})
}

const openBlogDetail = (blogId: any) => {
	state.blogId = blogId
	state.isShowBlogDetail = true

	// 变更路径
	router.push({
		name: 'blogDetail',
		query: {blogId: blogId}
	})
}

// 返回时刷新页面
const backRefresh = ()=> {
	window.location.reload();
}

// 页面加载时
onMounted(() => {
	if(route.query.userId){
		// 博主信息
		getBlogInfo(route.query.userId)
		// 标签列表
		getTagList();
	} else if(route.query.tagId){
		// 标签博主
		getTagUserId(route.query.tagId)
	} else if(route.query.blogId){
		openBlogDetail(route.query.blogId)
	}

	// 监听返回
	// 由于上面router.push是当前页面，所以返回时，页面并没有刷新，这里手动调用刷新
	window.addEventListener('popstate', backRefresh)
});

// 页面卸载
onUnmounted(() => {
	// 移除监听返回
	window.removeEventListener('popstate', backRefresh)
})
    
</script>

<style scoped lang="scss">
@import './index.scss';
</style>