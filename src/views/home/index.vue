<template>
  <div 
    :class = "[state.seachKey ? 'flex-center-start' : 'flex-center-center']"
    :style="{'padding-top': state.seachKey ? '50px' : '0px'}"
    class="page-home h100" 
    style="flex-direction: column;">
    
    <!-- 导航 -->
    <div style="position: absolute; top: 0; right: 0;">
      <Navbar/>
    </div>

    <!-- logo -->
    <div class="home-title">Hui Yong</div>

    <!-- 搜索 -->
    <div class="flex-center-center" style="padding: 20px 0px;">
      <div 
        class="search-input" 
        :class="{'search-input-focus': state.inputFocus}" 
        style="width: calc(100vw - 50px); margin: 0 25px; ">
        <input 
          class="input-class"
          type="text" 
          autofocus 
          autocomplete="off"
          id="searchInput"
          placeholder="搜索"
          @focus="state.inputFocus = true"
          v-on:input="onInputChange"
          @keyup.enter="onPullDownRefresh"
          v-model="state.seachKey" />
      </div>
    </div>

    <!-- 列表 -->
    <div v-if="state.seachKey" style="margin-bottom: 50px;">
      <VanPullRefresh v-model="state.reFreshing" @refresh="onPullDownRefresh">
        <VanList
          v-model:loading="state.listLoading"
          v-model:error="state.loadError"
          :finished="state.hasMore"
          @load="onReachBottom">

          <!-- item -->
          <div v-for="(item, index) in state.list.data" :key="index">

            <!-- 用户 -->
            <div v-if="item.type == 'user'" class="item-user">
              <!-- 用户分割线 -->
              <VanDivider content-position="left" v-if="index == state.list.userFirstIndex">用户</VanDivider>
              <div @click="toUserDetail(item.id)">
                <div class="flex-center-between">
                  <div class="flex-center-start">
                    <VanImage round class="user-header" :src="item.userImage" style="height: 25px; width: 25px;"/>
                    <div v-html="item.userName" style="margin-left: 10px; font-size: 14px;"/>
                  </div>

                  <div class="flex-center-start">
                    <div class="user-code-year-box flex-center-center">
                      <img class="code-year-img" :src="imgPig">
                      <span class="code-year">{{item.codeYear}}</span>
                    </div>
                    <div style="color: var(--app-item-sub); margin-left: 10px;">{{item.timeStr}}</div>
                  </div>
                </div>

                <div class="flex-center-start" style="margin-top: 10px;">
                    <div class="item-status-num">访问量 {{item.blogInfoReadNum || 0}}</div>
                    <div class="item-status-dot"/>
                    <div class="item-status-num">被关注 {{item.focusNum || 0}}</div>                         
                    <div class="item-status-dot"/>
                    <div class="item-status-num">文章 {{item.blogNum || 0}}</div>
                    <div class="item-status-dot"/>
                    <div class="item-status-num">被收藏 {{item.blogLikeNum || 0}}</div>
                </div>
              </div>
            </div>

            <!-- 博客 -->
            <div v-if="item.type == 'blog'"  class="item-blog">
              <!-- 博客分割线 -->
              <VanDivider content-position="left" v-if="index == state.list.blogFirstIndex">博客</VanDivider>
              <div @click="toBlogDetail(item.id)">
                <!-- 博主信息 -->
                <div class="flex-center-start">
                  <VanImage round class="user-header" :src="item.userImage" style="height: 25px; width: 25px;"/>
                  <div v-html="item.userName" style="margin-left: 10px; font-size: 14px;"/>
                </div>
                <!-- 博客信息 -->
                <div class="item-content-group">
                  <div class="flex-center-between" style="margin-bottom: 10px;">
                    <div>
                      <span class="item-title" v-html="item.title"></span>
                      <span v-if="item.openStatus == 0" class="open-status-0 ml10">私密，博主可搜索</span>
                      <!-- <span v-if="item.openStatus == 1" class="open-status-1 ml10">公开</span> -->
                    </div>
                    <div style="color: var(--app-item-sub); margin-left: 10px;">{{item.timeStr}}</div>
                  </div>
                  <div class="blog-centent" v-html="item.content"></div>
                  <div class="item-bottom flex-center-between">
                    <div class="item-bottom-left flex-center-start">
                      <div class="item-status-num">阅读 {{item.readNum || 0}}</div>
                      <div class="item-status-dot"/>
                      <div class="item-status-num">收藏 {{item.favoriteNum || 0}}</div>                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 底部 -->
          <Footer/>
        </VanList>
      </VanPullRefresh>
    </div>

    <!-- 背景图 -->
    <div
      v-if="!state.seachKey" 
      style="margin: 50px 25px 0px;" >
      <img class="home-back-img" :src="homeBack">

      <!-- 底部 -->
      <Footer absolute/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import homeBack from '/@/assets/img/home-back.webp';
import { List as VanList, PullRefresh as VanPullRefresh, Image as VanImage, Divider as VanDivider} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"
import imgPig from '/@/assets/img/pig1.gif';
import { useRoute, useRouter } from 'vue-router';

// 引入组件
const Navbar = defineAsyncComponent(() => import('/@/components/layout/navbar/index.vue'));
const Footer = defineAsyncComponent(() => import('/@/components/layout/footer/index.vue'));
// 定义变量
const route = useRoute();
const router = useRouter();
const state = reactive({
  seachKey: "" as any,
  listLoading: false,
  
  pageNum: 1,
  pageSize: 10,
  //列表页面是否开始加载
  list_status: "load_before",
  //是否关闭底部上拉加载
  hasMore: false,
  // 加载失败
  loadError: false,
  // 下拉刷新
  reFreshing: false,
  
  list:{
    // 用户数据第一个数据下标
    userFirstIndex: 0,
    // 博客数据第一个数据下标
    blogFirstIndex: 0,
    total: 0,
    count: 0,
    data: [] as any
  },

  inputFocus: false
})

const searchListener = (event: any) => {
  if(event.srcElement.id != 'searchInput'){
    state.inputFocus = false
  }
}

const toUserDetail = (id: any) => {
  router.push({
		name: 'blogDetail',
		query: {userId: id}
	})
}

const toBlogDetail = (id: any) => {
  router.push({
		name: 'blogDetail',
		query: {blogId: id}
	})
}

const onInputChange = () => {
  // 变更路径
	router.push({
		name: 'home',
		query: {seachKey: state.seachKey}
	})

  onPullDownRefresh()
}

// 下拉刷新
const onPullDownRefresh = () => {
  loadPage(1); //第一次加载数据
}

// 页面上拉
const onReachBottom = () =>  {
  if (state.hasMore) {
    loadPage(++state.pageNum);
  }
}

const loadPage = (pageNum: number) => {
  if(state.pageNum != pageNum){
    state.pageNum = pageNum;
  }

  // 空字段
  if(!state.seachKey){
    state.list.data = [];
    state.hasMore = false;
    return;
  }

  Request.post(Api.ES_Search, {
		searchKey: state.seachKey,
    pageNum: state.pageNum,
    pageSize : state.pageSize
	}).then((res:any) =>{
    state.loadError = false;
    state.reFreshing = false;
    //处理列表数据
    if (pageNum == 1) {
      state.list.userFirstIndex = 0
      state.list.blogFirstIndex = 0
      state.list.data = res.list;
    } else {
      state.list.data.push(...res.list);
    }
    //是否加载完成判断
    state.hasMore = state.pageNum * state.pageSize <= res.total;

    // 更新下标
    if(state.list.userFirstIndex == 0){
      for (let [index,item] of state.list.data.entries()){
        if(item.type === 'user'){
          state.list.userFirstIndex = index
          break
        }
      }
    }
    if(state.list.blogFirstIndex == 0){
      for (let [index,item] of state.list.data.entries()){
        if(item.type === 'blog'){
          state.list.blogFirstIndex = index
          break
        }
      }
    }
	}).catch((res:any) =>{
    state.loadError = true;
    state.reFreshing = false;
	})
}

// 返回时刷新页面
const backRefresh = ()=> {
	window.location.reload();
}

onMounted(()=> {
	nextTick(() => {
    document.body.addEventListener('click', searchListener, true);

    // 搜索关键字处理
    if(route.query.seachKey){
      state.seachKey = route.query.seachKey
      // 刷新
      onPullDownRefresh();
    }
    // 监听返回
    // 关键字历史记录返回时，是当前页面，所以返回时，页面并没有刷新，这里手动调用刷新
    window.addEventListener('popstate', backRefresh)
  })
})

onUnmounted(()=> {
  document.body.removeEventListener('click', searchListener);
  // 移除监听返回
	window.removeEventListener('popstate', backRefresh)
})

</script>

<style scoped lang="scss">
@import './index.scss';
</style>