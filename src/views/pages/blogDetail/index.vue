<template>
  	<div class="w100 flex-start-center">
		<div style="position: relative;" class="blog-detail-page flex-start-center">

			<!-- 个人信息导航 -->
			<div style="position: absolute; top: 0; right: 0; z-index: 100;">
				<Sticky>
					<Navbar 
						ref="navBar"
						:sticky="true" 
						:blogDetail="state.drawerBlogDetail"
						:tagList="state.tagList"
						:tagId="state.tagId"
						:blogId="state.blogId"
						@openTagInfo="openTagInfo"
						@openBlogDetail="openBlogDetail"/>
				</Sticky>
			</div>

			<!-- 右侧导航 -->
			<div class="blog-info-left">
				<BlogUserInfo :detail="state.blogInfo"/>
				<BlogTagInfo :list="state.tagList" :tagId="state.tagId" @changeTagInfo="openTagInfo"/>
			</div>

			<div class="blog-content-page">
				<!-- 博客详情 -->
				<BlogDetail v-if="state.isShowBlogDetail === true" :blogId="state.blogId" @onDetailLoad="onDetailLoad"/>
				<!-- 文章列表 -->
				<BlogList 
					v-if="state.isShowBlogDetail === false" 
					:tagId="state.tagId" 
					:blogUserId="state.blogUserId"
					@openBlogDetail="openBlogDetail"
					@openBlogShare="openBlogShare"/>
				</div>

			<div class="blog-info-right">
				<template  v-if="state.isShowBlogDetail == true">
					<div class="flex-center-between" >
						<div class="blog-toc-title flex-center-start mt15" v-show="state.blogCode == 200">
							<img :src="blogToc" style="margin-left:12px; width: 14px; height: 14px; filter: drop-shadow(10000px 0 0 var(--el-color-black)); transform: translate(-10000px);"/>
							<div style="margin-left:10px">目录</div>
						</div>
					</div>
					<!-- 博客目录 -->
					<MdCatalog editorId="md-preview" :theme="isDarkTheme()?'dark':'light'" @click="handleClickCatalog"/>
				</template>
			</div>
		</div>
		<el-backtop :right="20" :bottom="20" />
		<BlogShareDialog ref="blogShareDialog"/>
  	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import { useRoute, useRouter } from "vue-router"
import { showNotify, Sticky } from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"
import { MdCatalog } from 'md-editor-v3';
import { TocItem } from "md-editor-v3/lib/types/MdCatalog/MdCatalog";
import { appStore } from '/@/stores/appStore'
import blogToc from '/@/assets/svg/blog-toc.svg';

// 引入组件
const Navbar = defineAsyncComponent(() => import('/@/components/layout/navbar/index.vue'));
const BlogUserInfo = defineAsyncComponent(() => import('./components/BlogUserInfo.vue'));
const BlogTagInfo = defineAsyncComponent(() => import('./components/BlogTagInfo.vue'));
const BlogList = defineAsyncComponent(() => import('./components/BlogList.vue'));
const BlogDetail = defineAsyncComponent(() => import('./components/BlogDetail.vue'));
const BlogShareDialog = defineAsyncComponent(() => import('/@/components/dialog/BlogShareDialog.vue'));

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

const route = useRoute();
const router = useRouter();
const blogShareDialog = ref();
const navBar = ref();
const state = reactive({
	blogUserId:'' as any,	
	tagId: null as any,
	blogId: null as any,
	blogCode: 0,

	blogInfo: null as any,
	tagList: [] as any,

	drawerBlogDetail: {} as any,
	
	isShowBlogDetail: '' as any,
});


// 点击目录
const handleClickCatalog = (e: MouseEvent, t: TocItem) => {
	const el = document.getElementById(t.text);
	const fullPath = route.fullPath.split("#")[0]
	router.replace(`${fullPath}#${t.text}`);
	if (el) {
		// el.scrollTop = 0
		el.scrollIntoView();
	}
};

const openUserDetail = (userId: any) => {
	state.isShowBlogDetail = false
	getBlogInfo(route.query.userId)
}

const getBlogInfo = (blogUserId: any) => {
	state.blogUserId = blogUserId
	Request.post(Api.BLOG_INFO_DETAIL, {userId: blogUserId})
	.then((res:any) =>{
		state.blogInfo = res
		// 标签列表
		getTagList();
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

		// 设置标题
		state.tagList.forEach( (item: any) => {
			if(item.tagId == state.tagId && ( route.query.tagId || route.query.userId )){
				document.title = item.tagName
			}
		});
		if(document.title == '博客详情'){
			document.title = state.blogInfo.userName
		}
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

const openTagDetail = (tagId: any) => {
	state.tagId = tagId
	state.isShowBlogDetail = false
	Request.post(Api.Get_Tag_User_Id, {
		id: tagId
	}).then((userId:any) =>{
		// 如果是标签详情，则获取博主信息
		getBlogInfo(userId)
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

const onDetailLoad = (data: any) => {
	state.drawerBlogDetail = data
	// 详情标签id
	state.tagId = data.tagId
	state.blogCode = data.blogCode
	// 博主信息
	getBlogInfo(data.userId);
	// 更新菜单
	navBar.value.getBlogList(state.tagId)
}

const openTagInfo = (item: any) => {
	state.tagId = item.tagId
	state.isShowBlogDetail = false
	// 变更路径
	router.push({
		name: 'blogDetail',
		query: {tagId: item.tagId}
	})
	// 变更标题
	document.title = item.tagName
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

const openBlogShare = (blogId: any) => {
	Request.post(Api.Blog_Share, { blogId : blogId})
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
		} else if(route.query.tagId){
			// 标签博主
			openTagDetail(route.query.tagId)
		} else if(route.query.blogId){
			openBlogDetail(route.query.blogId)
		}

		// 兼容老版本
		if(route.query.id){
			openBlogDetail(route.query.id)
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