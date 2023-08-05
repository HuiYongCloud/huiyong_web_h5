<template>
  <div class="terms-page flex-start-center">
	<div class="content-page">
		<TuiViewer ref="tuiViewer"/>
	</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref} from 'vue';
import { useRoute, useRouter } from "vue-router"
import { showNotify} from 'vant';
import TuiViewer from '/@/components/TuiViewer.vue';
import Api from "/@/api/api"
import Request from "/@/api/request"

// 定义变量内容
const route = useRoute();
const router = useRouter();
const tuiViewer = ref();

const getDetail = (id: any) => {
	Request.post(Api.Terms_Detail, {
		id: id
	}).then((res:any) =>{
		tuiViewer.value.setMarkdown(res)
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