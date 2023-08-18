<template>
  <div class="blog-list-box">
    <div class="top-box">
      <div class="top-status-box flex-center-between">
        <div class="status-left flex-center-start">
          <div class="status-info status-pointer">列表</div>
          <div class="status-info status-pointer">关注</div>
        </div>
      </div>
    </div>

    <!-- 列表 -->
    <div v-if="state.list && state.list.length > 0" >
        <div class="info-item" v-for="(item, index) in state.list" :key="index">
          <!-- 博客列表 -->
          <blog-list-item :item="item" />
        </div>

        <!-- 关注列表 -->
        <div class="info-item" v-for="(item, index) in state.list" :key="index">
          <blog-user-focus-list-item :item="item" @cancelFocus="cancelFocus"/>
        </div>
    </div>

    <!-- 空状态 -->
    <Empty v-if="state.list && state.list.length == 0"/>
  </div>  
</template>

<script setup lang="ts">
import {defineAsyncComponent, watch, reactive, nextTick, computed} from 'vue';
import Api from "/@/api/api"
import Request from "/@/api/request"
import Empty from '/@/components/Empty.vue'
import BlogListItem from './BlogListItem.vue';
import BlogUserFocusListItem from './BlogUserFocusListItem.vue';
import { showNotify } from 'vant';

// 定义父组件传过来的值
const props = defineProps({
	// 博客id
	blogId: {
		type: String,
		default: () => '',
	},
  // 博主id
	blogUserId: {
		type: String,
		default: () => '',
	},
  // 标签id
	tagId: {
		type: String,
		default: () => '',
	},
});

const state = reactive({
  list:[],
  // 博客状态，0：列表 5:关注列表
  status : '0',
});

// 监听标签变更，更新列表
watch(
	() => props.tagId,
	(value) => {
		nextTick(() => {
      // 标签变更，获取列表
      getBlogListByStatus(0)
		})
	}
);

//关注列表，状态5
const getBlogFocusList = (status: any) => {
  if(state.status != status){
    state.list = []
  }
  state.status = status
  Request.post(Api.BLOG_FOCUS_LIST, {userId: props.blogUserId})
  .then((res: any) =>{ 
    state.list = res
  })
  .catch(res =>{
    showNotify({ type: 'danger', message: res.message });
  })
}

// 博客列表，状态：0，1，2，3，4
const getBlogListByStatus= (status: any) => {
  if(state.status != status){
    state.list = []
  }
  state.status = status
  Request.post(Api.Blog_List_By_Tag_Id, {
    id: props.blogUserId
  })
  .then((res : any) =>{ 
    state.list = res
  })
  .catch(res =>{
    showNotify({ type: 'danger', message: res.message });
  })
}

// 取消关注博主
const cancelFocus = (focusUserId: any) => {
  Request.post(Api.BLOG_FOCUS_CANCEL, { userId: focusUserId})
  .then( _ =>{ 
    state.list = state.list.filter((item : any) => item.focusUserId != focusUserId)
    showNotify({ message: "已取消关注！" });
  })
  .catch(res =>{
    showNotify({ type: 'danger', message: res.message });
  })
}

</script>

<style lang="scss" scoped>

.blog-list-box{
  width: 100%;
  min-width: 500px;
  min-height: calc(100vh - 26px);

  .top-box{
    user-select: none;
    border-bottom: 1px solid var(--el-border-color-light, #ebeef5);

    // 博客列表
    .top-status-box{
      padding: 0 24px;
      height: 70px;
      width: 100%;

      .status-left{
        // 标签内容
        .tag-box{
          position: relative;
          animation: 0.2s appear;

          .tag-close{
            font-size: 16px;
            color: #AAAAAA;
            cursor: pointer;
          }

          &:hover, &:active{
            .tag-close{
              color: #409EFF;
            }
          }

          @keyframes appear {
            0% {
              opacity: 0;
            }
          }
        }

        // 博客状态
        .status-info{
          font-size: 14px;
          color: #999999;
          margin-right: 24px;
        }

        .status-pointer{
          cursor: pointer;
        }

        .status-select{
          color: #303133;
        }
      }
    }
  }
}
</style>