<template>
  <div class="search-bog" style="max-width: 980px;">
    <div class="flex-center-start" style="flex-direction: column;">
      <!-- 搜索 -->
      <div class="flex-center-center" style="flex-direction: column; padding: 20px 0px;">
        <div 
          class="base-search-input" 
          :class="{'search-input-focus': state.inputFocus}" >
          <input 
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

        <!-- 背景 -->
        <div v-if="!state.seachKey" >
          <img :src="homeBack" style="width: 100%; padding: 0 25px; margin-top: 10vh;">
        </div>        
      </div>
    </div> 

    <div ref="seachListGroup" v-if="state.seachKey" class="seach-list-group">
      <!-- <VanPullRefresh 
        v-model="state.reFreshing" 
        class="flex-start-center"
        @refresh="onPullDownRefresh" 
        style="min-height: calc(100vh - 240px); padding-bottom: 50px;"> -->

        <VanList
          v-model:loading="state.listLoading"
          v-model:error="state.loadError"
          :finished="!state.hasMore"
          error-text="请求失败，点击重新加载"
          @load="onReachBottom">

          <!-- item -->
          <div class="seach-list" v-for="(item, index) in state.list.data" :key="index">

              <!-- 用户 -->
              <div v-if="item.type == 'user'" class="item-user">
              <div class="flex-center-between">
                  <div class="flex-center-start">
                  <VanImage round class="user-header" :src="item.userImage" style="height: 25px; width: 25px;"/>
                  <div
                      class="item-link-active"
                      v-html="item.userName" 
                      style="margin-left: 10px; font-size: 12px; font-weight: bold;"
                      @click="openBlogUser(item.id)"/>
                  <span class="open-status-1 ml10">博主</span>
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

              <!-- 博客 -->
              <div v-if="item.type == 'blog'"  class="item-blog">
              <!-- 博主信息 -->
              <div class="flex-center-start">
                  <VanImage round class="user-header" :src="item.userImage" style="height: 25px; width: 25px;"/>
                  <div 
                  v-html="item.userName" 
                  class="item-link-active" 
                  style="margin-left: 10px; font-size: 12px; font-weight: bold;"
                  @click="openBlogUser(item.userId)"/>
              </div>

              <!-- 博客信息 -->
              <div class="blog-content-group">
                  <div class="flex-center-between" style="margin-bottom: 10px;">
                  <span>
                      <span 
                        class="item-link-active" 
                        v-html="item.title" 
                        style="font-size: 12px; font-weight: bold;"
                        @click="openBlogDetail(item.id)"/>
                      <span v-if="item.openStatus == 0" class="open-status-0 ml10">私密，博主可搜索</span>
                  </span>
                  <div style="color: var(--app-item-sub); margin-left: 10px;">{{item.timeStr}}</div>
                  </div>
                  <div class="blog-centent" style="font-size: 12px; padding-right: 10px; overflow: hidden; white-space: break-word;" v-html="item.content"></div>
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

          <div v-if="state.list.data.length == 0" class="flex-center-center" style="padding-top: 20vh;">
              <div style="color: var(--app-item-sub); font-size: 15px;">空空如也！</div>
          </div>
        </VanList>
      <!-- </VanPullRefresh> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import { List as VanList, PullRefresh as VanPullRefresh, Image as VanImage} from 'vant';
import Api from "/@/api/api"
import Request from "/@/api/request"
import imgPig from '/@/assets/img/pig1.gif';
import homeBack from '/@/assets/img/home-back.webp';
import { useRoute, useRouter } from 'vue-router';

// 定义变量
const route = useRoute();
const router = useRouter();
const seachListGroup = ref();
const state = reactive({
  seachKey: '' as any,
  
  pageNum: 1,
  pageSize: 10,
  //列表页面是否开始加载
  listLoading: true,
  //是否关闭底部上拉加载
  hasMore: true,
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

const openResume =(userId: any) => {
  router.push({
		name: 'resume',
		query: {userId: userId}
	})
}

const openBlogUser =(userId: any) => {
  router.push({
		name: 'blogDetail',
		query: {userId: userId}
	})
}

const openBlogDetail =(blogId: any) => {
  router.push({
		name: 'blogDetail',
		query: {blogId: blogId}
	})
}

const onInputChange = () => {
  // 变更路径
	router.push({
		name: 'home',
		query: {q: state.seachKey}
	})

  onPullDownRefresh()
}

// 下拉刷新
const onPullDownRefresh = () => {
  loadPage(1);
}

// 页面上拉
const onReachBottom = () =>  {
  if (state.hasMore) {
    loadPage(state.pageNum);
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
      // 滑动到顶部
      seachListGroup.value.scrollTop = 0   

      state.list.userFirstIndex = 0
      state.list.blogFirstIndex = 0
      state.list.data = res.list;
    } else {
      state.list.data.push(...res.list);
    }
    
    //是否加载完成判断
    state.hasMore = state.pageNum * state.pageSize <= res.total;
    state.listLoading = false;
    // 下一页
    ++state.pageNum;

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
    state.listLoading = false;
    state.reFreshing = false;
	})
}

onMounted(()=> {
	nextTick(() => {
    document.body.addEventListener('click', searchListener, true);

    // 搜索关键字处理
    if(route.query.q){
      state.seachKey = route.query.q
      // 刷新
      onPullDownRefresh();
    }
  })
})

onUnmounted(()=> {
  document.body.removeEventListener('click', searchListener);
})
</script>

<style scoped lang="scss">
@import './Search.scss';
</style>