<template>
  <div class="page-resume-detail flex-center-center">
    <div style="position: absolute; top: 0; right: 0; z-index: 100;">
      <Navbar/>
    </div>
	
	<div class="resume-preview">
		<PreViewer :detail="state.detail"/>
	</div>
	<Footer/>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, reactive, ref} from 'vue';
import { useRoute, useRouter } from "vue-router"
import { showNotify} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"

// 定义变量内容
const route = useRoute();
const router = useRouter();

// 引入组件
const Navbar = defineAsyncComponent(() => import('/@/components/layout/navbar/index.vue'));
const Footer = defineAsyncComponent(() => import('/@/components/layout/footer/index.vue'));
const PreViewer = defineAsyncComponent(() => import('./components/PreViewer.vue'));

const state = reactive({
  detail : '' as any,
});

const getDetail = (userId: any) => {
	Request.post(Api.Resume_Detail, {
		userId: userId
	}).then((res:any) =>{
		state.detail = res
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

// 页面加载时
onMounted(() => {
    getDetail(route.query.userId)
});
    
</script>

<style scoped lang="scss">
@import './index.scss';
</style>