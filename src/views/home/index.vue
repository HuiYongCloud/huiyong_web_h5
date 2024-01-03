<template>
  <div 
    class="flex-center-start"
    style="flex-direction: column;">

    <!-- 内容 -->
    <!--   -->
    <div style="min-height: calc(100vh - 36px);">
      <Home v-if="state.tabName == 'home'" @tabChange="tabChange"/>
      <Search v-if="state.tabName == 'search'"/>
      <About v-if="state.tabName == 'about'"/>
      <Deploy v-if="state.tabName == 'deploy'"/>
    </div>

    <!-- 顶部导航 -->
    <div style="position: absolute; top: 0; right: 0; z-index: 100;">
      <Header :tabName="state.tabName" @tabChange="tabChange"/>
      <Navbar/>
    </div>   
    
    <!-- 底部 -->
    <div :class="{'home-footer': state.tabName == 'home'}">
      <Footer/>
    </div>

    <BackTop/>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue';
import { BackTop } from 'vant';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
// 引入组件
const Navbar = defineAsyncComponent(() => import('/@/components/layout/navbar/index.vue'));
const Footer = defineAsyncComponent(() => import('/@/components/layout/footer/index.vue'));
const Header = defineAsyncComponent(() => import('./components/Header.vue'));
const Search = defineAsyncComponent(() => import('./components/Search.vue'));
const Home = defineAsyncComponent(() => import('./components/Home.vue'));
const About = defineAsyncComponent(() => import('./components/About.vue'));
const Deploy = defineAsyncComponent(() => import('./components/Deploy.vue'));
// 定义变量
const state = reactive({
  tabName: 'home' as any,
})

const tabChange = (tabName: string) => {
  switch(tabName){
    case "home":
    case "search":
    case "deploy":
      state.tabName = tabName
      break;
    case "about":
      window.open("https://huiyong.online/blogDetail?blogId=202111260489", '_blank')
      break;  
    case "gitee":
      window.open("https://gitee.com/HuiYongCloud", '_blank')
      break;    
    case "github":
      window.open("https://github.com/HuiYongCloud", '_blank')
      break;        
  }
}

</script>

<style scoped lang="scss">
.home-footer{
  width: 100%; 
  background-color: var(--el-bg-color-page);
}
</style>