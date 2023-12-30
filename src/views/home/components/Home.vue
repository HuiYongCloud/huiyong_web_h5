<template>
  <div class="home-box">
    <Home1 @tabChange="tabChange"/>
    <Home2 @tabChange="tabChange"/>
    <Home3 @tabChange="tabChange"/>
    <Home4 @tabChange="tabChange"/>
    <Home5 @tabChange="tabChange"/>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const emit = defineEmits(['tabChange']);

const Home1 = defineAsyncComponent(() => import('./Home1.vue'));
const Home2 = defineAsyncComponent(() => import('./Home2.vue'));
const Home3 = defineAsyncComponent(() => import('./Home3.vue'));
const Home4 = defineAsyncComponent(() => import('./Home4.vue'));
const Home5 = defineAsyncComponent(() => import('./Home5.vue'));

const tabChange = (tabName: string) => {
  emit('tabChange', tabName)
}
</script>

<style scoped lang="scss">
</style>