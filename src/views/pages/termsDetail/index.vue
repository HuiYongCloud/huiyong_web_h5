<template>
  <div class="terms-page flex-start-center">
	<div class="content-page">
		<MDPreview :content="state.content"/>
	</div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, reactive, ref} from 'vue';
import { useRoute, useRouter } from "vue-router"
import { showNotify} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"

// 引入组件
const MDPreview = defineAsyncComponent(() => import('/@/components/MDPreview.vue'));

// 定义变量内容
const route = useRoute();
const state = reactive({
  	content:'',
});
const getDetail = (id: any) => {
	Request.post(Api.Terms_Detail, {
		id: id
	}).then((res:any) =>{
		state.content = res
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

// 页面加载时
onMounted(() => {
    getDetail(route.query.id)
});
    
</script>

<style lang="scss">
@import './index.scss';
</style>