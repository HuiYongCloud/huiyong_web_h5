<template>
  <div class="blog-detail-page flex-start-center">

	<!-- 右侧导航 -->
	<div class="blog-info-left">
		<BlogUserInfo :detail="state.blogInfo"/>
		<BlogTagInfo :list="state.tagList"/>
	</div>

	<div class="blog-content-page">
		<!-- 博客详情 -->
		<BlogDetail v-if="state.isShowBlogDetail === true" :blogId="state.blogId"/>
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
		if(!state.tagList){
			getTagList(userId)
		}
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

// 页面加载时
onMounted(() => {
	if(route.query.userId){
		getBlogInfo(route.query.userId)
	} else if(route.query.tagId){
		getTagDetail(route.query.tagId)
	} else if(route.query.blogId){
		console.log(route.query.blogId)
		state.blogId = route.query.blogId
		state.isShowBlogDetail = true
	}
});
    
</script>

<style scoped lang="scss">
@import './index.scss';
</style>