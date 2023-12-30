<template>
  	<div class="w100 flex-start-center">
		<BlogShareDialog ref="blogShareDialog"/>
		<div style="position: relative;" class="mind-detail-page flex-start-center">

			<!-- 个人信息导航 -->
			<div style="position: absolute; top: 0; right: 0; z-index: 100;">
				<Sticky>
					<Navbar 
						ref="navBar"
						:sticky="true" 
						:mindId="state.mindId"
						@openBlogDetail="openBlogDetail"/>
				</Sticky>
			</div>

			<!-- 左侧导航 -->
			<div class="mind-info-left">
				<BlogUserInfo :detail="state.blogInfo"/>
				<MindListInfo :list="state.mindList" :mindId="state.mindId" @changeMindDetail="openBlogDetail"/>
			</div>

			<div class="mind-content-page">
				<!-- 详情 -->
				<MindDetail ref="mindDetail" :mindId="state.mindId" @onDetailLoad="onDetailLoad"/>
			</div>
		</div>

		<BackTop/>
  	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import { useRoute, useRouter } from "vue-router"
import { showNotify, Sticky, BackTop } from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"

// 引入组件
const Navbar = defineAsyncComponent(() => import('/@/components/layout/navbar/index.vue'));
const BlogUserInfo = defineAsyncComponent(() => import('../blogDetail/components/BlogUserInfo.vue'));
const MindListInfo = defineAsyncComponent(() => import('./components/MindListInfo.vue'));
const MindDetail = defineAsyncComponent(() => import('./components/MindDetail.vue'));
const BlogShareDialog = defineAsyncComponent(() => import('/@/components/dialog/BlogShareDialog.vue'));

const route = useRoute();
const router = useRouter();
const mindDetail = ref();
const blogShareDialog = ref();
const state = reactive({
	mindUserId:'' as any,	
	mindId: null as any,
	mindCode: 0,

	mindList: [] as any,
	blogInfo: null as any,

	drawerBlogDetail: {} as any,
});

const openUserDetail = (userId: any) => {
	getBlogInfo(userId)
	getMindList(userId)
}

const getBlogInfo = (mindUserId: any) => {
	state.mindUserId = mindUserId

	if(state.blogInfo) return;
	Request.post(Api.BLOG_INFO_DETAIL, {userId: mindUserId})
	.then((res:any) =>{
		state.blogInfo = res
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

const getMindList = (userId: any) => {
	if(state.mindList.length > 0) return;
	Request.post(Api.Mind_List, {userId: userId})
	.then((res:any) =>{
		state.mindList = res

		if(!state.mindId && state.mindList && state.mindList.length > 0){
			state.mindId = state.mindList[0].mindId
		}

		if(route.query.userId && state.mindId){
			setTimeout(() => {
				mindDetail.value.getMindDetail(state.mindId)		
			}, 200);
		}
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

const onDetailLoad = (data: any) => {
	state.drawerBlogDetail = data
	state.mindCode = data.mindCode
	// 博主信息
	getBlogInfo(data.userId);
	// 列表
	getMindList(data.userId)
}

const openBlogDetail = (mindId: any) => {
	state.mindId = mindId
	if(mindDetail.value){
		mindDetail.value.getMindDetail(mindId)		
	}else{
		setTimeout(() => {
			mindDetail.value.getMindDetail(mindId)		
		}, 200);
	}
	// 变更路径
	router.push({
		name: 'mindDetail',
		query: {mindId: mindId}
	})
}

const openBlogShare = (mindId: any) => {
	Request.post(Api.Mind_Share, { mindId : mindId})
	.then((res : any) =>{
		blogShareDialog.value.openDialog(res);
	})
	.catch(res =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

// 返回时刷新页面
const backRefresh = ()=> {
	window.scrollTo(0, 0)
	window.location.reload();
}

// 页面加载时
onMounted(() => {
	nextTick(() => {
		if(route.query.userId){
			// 博主信息
			openUserDetail(route.query.userId)
		} else if(route.query.mindId){
			openBlogDetail(route.query.mindId)
		}

		// 监听返回
		// 由于上面router.push是当前页面，所以返回时，页面并没有刷新，这里手动调用刷新
		window.addEventListener('popstate', backRefresh)
	})
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