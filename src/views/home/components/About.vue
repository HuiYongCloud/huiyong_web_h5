<template>
  <div class="about-box" style="padding-top: 260px; max-width: 980px;">
    <MDPreview :content="state.blogDetail.content"/>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, onMounted, nextTick} from 'vue';
import Api from "/@/api/api"
import Request from "/@/api/request"
import { showNotify, showDialog } from 'vant';

// 引入组件
const MDPreview = defineAsyncComponent(() => import('/@/components/MDPreview.vue'));

const state = reactive({
  blogDetail:'' as any,
})

const getBlogDetail = () => {
  // 重置状态
  Request.post(Api.Blog_Detail, { blogId: '202111260489'})
  .then((res:any) =>{      
    state.blogDetail = res
    // 滑动到顶部
    document.documentElement.scrollTop = 0   
  })
  .catch(res =>{
    showNotify({ type: 'danger', message: res.message });
  })
}

// 页面加载时
onMounted(() => {
  nextTick(() => {
		// 获取详情
		getBlogDetail()
	});
});
</script>

<style scoped lang="scss">
</style>