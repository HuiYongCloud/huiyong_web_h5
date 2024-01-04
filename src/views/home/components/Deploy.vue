<template>
  <div class="deploy-page flex">
    <div class="left-nav-pc">
      <div v-for="(item, index) in state.list" :key="index">
        <div class="nav-item" :class="{active: state.activeBlogId == item.blogId }" @click="changeBlogId(item.blogId)">{{item.name}}</div>
      </div>
    </div>

    <div class="right-content" ref="rightContent">
      <MDPreview :content="state.content"/>
      <Footer/>
    </div>

    <div class="left-nav-mobile">
      <div class="flex-center-center" style="position: relative; width: 13px; height: 60px;" @click="state.showDrawer = !state.showDrawer">
				<img :src="Holder" style="width: 13px; height: 60px; position: absolute; top: 0; left: 0; filter: drop-shadow(10000px 0 0 var(--deploy-page-holder-color)); transform: translate(-10000px);"/>
				<img :src="Arrow" style="width: 13px; height: 13px; position: absolute; top: 22px; left: 0; filter: drop-shadow(10000px 0 0 var(--el-color-white)); transform: translate(-10000px);"/>
			</div>
      <Popup 
				v-model:show="state.showDrawer"  
				position="left"
  			:style="{ width: '240px', height: '100%', paddingTop: '50px'}">
        <div v-for="(item, index) in state.list" :key="index">
          <div class="nav-item" :class="{active: state.activeBlogId == item.blogId }" @click="changeBlogId(item.blogId)">{{item.name}}</div>
        </div>
      </Popup>   
    </div>

    <el-backtop target=".right-content" :right="20" :bottom="20" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, onMounted, nextTick, ref} from 'vue';
import Api from "/@/api/api"
import Request from "/@/api/request"
import { showNotify, Popup} from 'vant';
import Holder from './svg/holder.svg';
import Arrow from './svg/arrow.svg';
// 引入组件
const MDPreview = defineAsyncComponent(() => import('/@/components/MDPreview.vue'));
const Footer = defineAsyncComponent(() => import('/@/components/layout/footer/index.vue'));

const rightContent = ref();
const state = reactive({
  showDrawer: false,
  list : [
    {name: "部署说明", blogId: '2024010415572701'},
    {name: "HY-A部署", blogId: '2024010415575201'},
    {name: "HY-B部署", blogId: '2024010415580901'},
    {name: "HY-C部署", blogId: '2024010416001801'},
    {name: "1、Nacos配置说明", blogId: '2024010416004601'},
    {name: "2、Nginx部署说明", blogId: '2024010416011001'},
    {name: "3、前端页面部署", blogId: '2024010416013701'},
    {name: "4、Admin运维菜单", blogId: '2024010416020301'},
    {name: "5、账号说明", blogId: '2024010416022701'},
    {name: "6、站点地图", blogId: '2024010416024701'},
  ],
  activeBlogId: '2024010415572701',
  content:""
})

const changeBlogId = (blogId : string) => {
  state.showDrawer = false;
  state.activeBlogId = blogId;

  // 重置状态
  Request.post(Api.Blog_Detail, { blogId: blogId})
  .then((res:any) =>{      
    state.content = res.content
    // 滑动到顶部
    rightContent.value.scrollTop = 0
  })
  .catch(res =>{
    showNotify({ type: 'danger', message: res.message });
  })
}

onMounted(()=> {
	nextTick(() => {
    changeBlogId('1')
  })
})
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';


.deploy-page{
  
  margin-top: 60px;
  width: 100vw;
  height: calc(100vh - 60px);

  .left-nav-pc{
    width: 200px;
    height: 100%;
    min-width: 200px;
    border-right: 1px solid var(--app-border-color);
  }

  .left-nav-mobile{
    position: fixed;
    left: 0;
    top: calc(50vh - 23px);
    --deploy-page-holder-color: rgba(0, 0, 0, 0.3);
  }

  .nav-item {
    line-height: 40px;
    height: 40px;
    padding: 0 16px;
    color: var(--app-item-title);
    font-size: 14px;
    cursor: pointer;

    &:last-of-type {
      padding-right: 0;
    }

    &.active,&:hover {
      color: var(--el-color-primary);
    }
  }  

  .right-content{
    height: 100%;
    overflow-y: scroll;
    padding: 40px 40px 0;
  }
}


@media screen and (max-width: $lg) {
  .deploy-page{
    .left-nav-pc{
      display: none;
    }

    .left-nav-mobile{
      display: block;
    }

    .right-content{
      padding: 15px 15px 0;
    }
  }
}

@media screen and (min-width: $lg) {
  .deploy-page{
    .left-nav-pc{
      display: block;
    }

    .left-nav-mobile{
      display: none;
    }
  }  
}

[data-theme='dark'] {
  .deploy-page{
    .left-nav-mobile{
      --deploy-page-holder-color: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
