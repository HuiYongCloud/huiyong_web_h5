<template>
  <div class="home-box">
    <Home1/>
    <!-- <Home2/>
    <Home3/>
    <Home4/>
    <Home5/> -->
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, onMounted, nextTick} from 'vue';
import Api from "/@/api/api"
import Request from "/@/api/request"

const Home1 = defineAsyncComponent(() => import('./Home1.vue'));
const Home2 = defineAsyncComponent(() => import('./Home2.vue'));
const Home3 = defineAsyncComponent(() => import('./Home3.vue'));
const Home4 = defineAsyncComponent(() => import('./Home4.vue'));
const Home5 = defineAsyncComponent(() => import('./Home5.vue'));

// 页面加载时
onMounted(() => {
  nextTick(() => {
	});
});
</script>

<style scoped lang="scss">
</style>