<template>
  <div 
    class="flex-center-start"
    style="flex-direction: column;">

    <!-- 内容 -->
    <!--   -->
    <div style="min-height: calc(100vh - 36px);">
      <Home v-if="state.tabName == 'home'" @tabChange="tabChange"/>
      <Search v-if="state.tabName == 'search'"/>
      <Deploy v-if="state.tabName == 'deploy'"/>
    </div>

    <!-- 顶部导航 -->
    <div style="position: absolute; top: 0; right: 0; z-index: 100;">
      <Header :tabName="state.tabName" @tabChange="tabChange"/>
      <Navbar/>
    </div>   
    
    <!-- 底部 -->
    <div v-if="state.tabName != 'deploy'" :class="{'home-footer': state.tabName == 'home'}">
      <Footer/>
    </div>

    <BackTop/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, defineAsyncComponent, nextTick} from 'vue';
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
      // 变更路径
      router.push({name: 'home',
        query: {
          tab: tabName,
          q: route.query.q
        }
      })
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

// 返回时刷新页面
const backRefresh = ()=> {
	window.location.reload();
}

onMounted(()=> {
	nextTick(() => {
    // 搜索关键字处理
    if(route.query.tab){
      state.tabName = route.query.tab
    }
    // 监听返回
    // 关键字历史记录返回时，是当前页面，所以返回时，页面并没有刷新，这里手动调用刷新
    window.addEventListener('popstate', backRefresh)
  })
})

onUnmounted(()=> {
  // 移除监听返回
	window.removeEventListener('popstate', backRefresh)
})
</script>

<style scoped lang="scss">
.home-footer{
  width: 100%; 
  background-color: var(--el-bg-color-page);
}
</style>