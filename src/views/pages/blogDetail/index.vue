<template>
  <div class="blog-detail-page flex-start-center">

	<!-- 右侧导航 -->
	<div class="blog-info-left">
		<BlogUserInfo  :detail="state.blogInfo"/>
		<BlogTagInfo :list="state.tagList" :tagId="state.tagId"/>
	</div>

	<div class="blog-content-page">
		<!-- 博客详情 -->
		<BlogDetail v-if="state.isShowBlogDetail === true" :blogId="state.blogId" @onDetailLoad="onDetailLoad"/>
		<!-- 文章列表 -->
		<!-- <BlogList v-if="state.isShowBlogDetail == false" :tagId="state.tagId"/> -->
	</div>

	<div class="blog-info-right">
		<Navbar/>

		<!-- 博客目录 -->
		<div class="blog-toc">
			<div class="blog-toc-title flex-center-start">
				<img :src="blogToc" style="margin-left:12px; width: 14px; height: 14px; filter: drop-shadow(10000px 0 0 var(--el-color-black)); transform: translate(-10000px);"/>
				<div style="margin-left:10px">目录</div>
			</div>
			<MdCatalog editorId="md-preview-id" :scrollElement="scrollElement" :theme="isDarkTheme()?'dark':'light'" />
		</div>
	</div>
</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, reactive} from 'vue';
import { useRoute, useRouter } from "vue-router"
import { showNotify} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"
import { MdCatalog } from 'md-editor-v3';
import { appStore } from '/@/stores/appStore'
import blogToc from '/@/assets/svg/blog-toc.svg';

// 引入组件
const Navbar = defineAsyncComponent(() => import('/@/components/layout/navbar/index.vue'));
const BlogUserInfo = defineAsyncComponent(() => import('./components/BlogUserInfo.vue'));
const BlogTagInfo = defineAsyncComponent(() => import('./components/BlogTagInfo.vue'));
// const BlogList = defineAsyncComponent(() => import('./components/blogList.vue'));
const BlogDetail = defineAsyncComponent(() => import('./components/blogDetail.vue'));

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
	userId:'' as any,	
	tagId:'' as any,
	blogId:'' as any,

	blogInfo: null as any,
	tagList: [] as any,

	isShowBlogDetail: '' as any,
});

const getBlogInfo = (userId: any) => {
	state.userId = userId
	Request.post(Api.BLOG_INFO_DETAIL, {userId: userId})
	.then((res:any) =>{
		state.blogInfo = res
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

const getTagList = (userId: any) => {
	Request.post(Api.BLOG_TAG_INFO_LIST, {
		userId: userId
	}).then((res:any) =>{
		state.tagList = res
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

const getTagDetail = (id: any) => {
	state.tagId = id
	state.isShowBlogDetail == false
	Request.post(Api.Terms_Detail, {
		id: id
	}).then((res:any) =>{
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

const onDetailLoad = (data: any) => {
	// 详情标签id
	state.tagId = data.tagId
	// 博主信息
	getBlogInfo(data.userId);
	// 标签列表
	getTagList(data.userId);
}

// 页面加载时
onMounted(() => {
	if(route.query.userId){
		// 博主信息
		getBlogInfo(route.query.userId)
		// 标签列表
		getTagList(route.query.userId);
	} else if(route.query.tagId){
		getTagDetail(route.query.tagId)
	} else if(route.query.blogId){
		state.blogId = route.query.blogId
		state.isShowBlogDetail = true
	}
});
    
</script>

<style scoped lang="scss">
@import './index.scss';
</style>