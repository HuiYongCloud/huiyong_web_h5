<template>
  <div class="page-terms-detail">
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref} from 'vue';
import { useRoute, useRouter } from "vue-router"
import { showNotify} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"

// 定义变量内容
const route = useRoute();
const router = useRouter();

const getDetail = (id: any) => {
	Request.post(Api.Terms_Detail, {
		id: id
	}).then((res:any) =>{
		
	}).catch((res:any) =>{
		showNotify({ type: 'danger', message: res.message });
	})
}

// 页面加载时
onMounted(() => {
    getDetail(route.query.id)
});
    
</script>

<style scoped lang="scss">
@import './index.scss';
</style>