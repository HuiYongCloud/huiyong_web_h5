<template>
  <div class="blog-detail-page flex-start-center">

	<!-- 右侧导航 -->
	<div class="blog-info-left">
		<blog-user-info/>
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
	isShowBlogDetail: '' as any,
	blogId: '',
	tagId: '',
});

const getBlogDetail = (id: any) => {
	Request.post(Api.Blog_Detail, {
		id: id
	}).then((res:any) =>{

	}).catch((res:any) =>{
	})
}

const getTagDetail = (id: any) => {
	Request.post(Api.Terms_Detail, {
		id: id
	}).then((res:any) =>{
	}).catch((res:any) =>{
	})
}

// 页面加载时
onMounted(() => {
	if(route.query.blogId){
		state.isShowBlogDetail == true
		getBlogDetail(route.query.blogId)
	}
	if(route.query.tagId){
		state.isShowBlogDetail == false
		getTagDetail(route.query.tagId)
	}
});
    
</script>

<style scoped lang="scss">
@import './index.scss';
</style>