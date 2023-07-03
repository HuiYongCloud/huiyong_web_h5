<template>
  <div class="page-home flex-center-center">
    <div class="flex-center-center" style="flex-direction: column;">
      <h1>Register</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive} from 'vue';
import { useRoute, useRouter } from "vue-router"
import { showNotify} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"

const state = reactive({
	detail: ''
});

// 定义变量内容
const route = useRoute();
const router = useRouter();

const getDetail = (id: any) => {
	Request.post(Api.Terms_Detail, {
		id: id
	}).then((res:any) =>{
		state.detail = res
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