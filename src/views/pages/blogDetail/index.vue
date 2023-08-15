<template>
  <div class="blog-detail-page flex-start-center">

	<!-- 右侧导航 -->
	<div class="blog-info-left">
		<blog-user-info :detail="state.blogInfoDetail"/>
		<!-- <blog-tag-info/> -->
	</div>

	<div class="blog-content-page">
		<!-- 博客详情 -->
		<!-- <blog-detail v-if="state.isShowBlogDetail == true" :blogId="state.blogId"/> -->
		<!-- 文章列表 -->
		<!-- <blog-list v-if="state.isShowBlogDetail == false" :tagId="state.tagId"/> -->
	</div>
</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref} from 'vue';
import { useRoute, useRouter } from "vue-router"
import { showNotify} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"
import BlogUserInfo from './components/BlogUserInfo.vue';
import BlogTagInfo from './components/BlogTagInfo.vue';
import BlogList from './components/blogList.vue'
import BlogDetail from './components/blogDetail.vue';

// 定义变量内容
const route = useRoute();
const router = useRouter();
const state = reactive({
	userId:'' as any,
	blogInfoDetail: '' as any,
	
	tagId:'' as any,
	blogId:'' as any,
	isShowBlogDetail: '' as any,
});

const getBlogInfoDetail = (id: any) => {
	state.userId = id
	Request.post(Api.BLOG_INFO_DETAIL, {
		id: id
	}).then((res:any) =>{
		state.blogInfoDetail = res
	}).catch((res:any) =>{
	})
}

const getTagDetail = (id: any) => {
	state.tagId = id
	state.isShowBlogDetail == false
	Request.post(Api.Terms_Detail, {
		id: id
	}).then((res:any) =>{
	}).catch((res:any) =>{
	})
}

const getBlogDetail = (id: any) => {
	state.blogId = id
	state.isShowBlogDetail == true
	Request.post(Api.Blog_Detail, {
		id: id
	}).then((res:any) =>{

	}).catch((res:any) =>{
	})
}

// 页面加载时
onMounted(() => {
	if(route.query.userId){
		getBlogInfoDetail(route.query.userId)
	} else if(route.query.tagId){
		getTagDetail(route.query.tagId)
	} else if(route.query.blogId){
		getBlogDetail(route.query.blogId)
	}
});
    
</script>

<style scoped lang="scss">
@import './index.scss';
</style>