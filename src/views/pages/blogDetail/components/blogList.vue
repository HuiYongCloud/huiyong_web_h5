<template>
  <div class="blog-list-box">
    <div class="top-box">
      <div class="top-status-box">
        <div class="status-left" v-if="isShowUserDetail">
          <div class="status-info status-pointer" :class="{'status-select':status == '0'}" @click="getBlogListByStatus('0')">公开</div>
          <div class="status-info status-pointer" :class="{'status-select':status == '1'}" @click="getBlogListByStatus('1')">私密</div>
          <div class="status-info status-pointer" :class="{'status-select':status == '4'}" @click="getBlogListByStatus('4')">收藏</div>
          <div class="status-info status-pointer" :class="{'status-select':status == '5'}" @click="getBlogFocusList('5')">关注</div>
          <div v-if="isRoot" class="status-info status-pointer show-in-pc" :class="{'status-select':status == '2'}" @click="getBlogListByStatus('2')">草稿</div>
          <div v-if="isRoot" class="status-info status-pointer show-in-pc" :class="{'status-select':status == '3'}" @click="getBlogListByStatus('3')">回收站</div>
        </div>

        <div class="status-left" v-else-if="isShowTagDetail">
          <!-- 标签详情 -->
          <div class="tag-box" v-show="tagDetail" >
            <div class="tag-title">{{tagDetail.tagName}}</div>
            <div class="tag-content-num">文章数：{{tagDetail.blogContentNum}}</div>              
          </div>
        </div>

        <div class="status-right">
          <nuxt-link v-if="isRoot" to="/blogEdit" class="write-btn" target="_blank">写博客</nuxt-link>
        </div>
      </div>
    </div>

    <!-- 列表 -->
    <div v-if="list && list.length > 0" >
      <!-- 关注列表 -->
      <div v-if="status == '5'">
          <div class="info-item" v-for="(item, index) in list" :key="index">
          <blog-user-focus-list-item :item="item" @cancelFocus="cancelFocus"/>
        </div>
      </div>

      <client-only v-else>
        <draggable v-model="list" @end="onEnd(list)" :disabled="!draggableItem" draggable=".info-item" handle=".draggable-box" animation="250">
          <div class="info-item" v-for="(item, index) in list" :key="index">
            <!-- 博客列表 -->
            <blog-list-item 
              :draggableItem="draggableItem"
              :item="item" 
              :status="status >= 0 ? status : (item.openStatus == 1 ? 1 : 0)"
              @showAddPri="showAddPri"
              @deleteItem="deleteItem"/>
          </div>
        </draggable>
      </client-only>
    </div>

    <!-- 空状态 -->
    <empty v-if="list && list.length == 0"/>

    <!-- 设置权限码 -->
		<add-pri-code 
			:blogId="showAddPriItem.blogId"
			:show="showAddPriCode" 
			@close="showAddPriCode = false" 
			@onChange="changePriStatus()"/>
  </div>  
</template>

<script>
import Api from "@/utils/api.js";
import BlogListItem from './BlogListItem.vue';
import BlogUserFocusListItem from './BlogUserFocusListItem.vue';
import AddPriCode from '@/components/AddPriCode.vue'

export default {
  props: ["userInfo", "userId", "tagDetail", "asyncList", "isShowUserDetail", "isShowTagDetail"],

  components:{
    AddPriCode,
    BlogListItem,
    BlogUserFocusListItem
  },

  watch: {
    asyncList: {
      immediate: true,
      handler(val) {
        this.list = val;
      }
    },
	},

  computed:{
    isRoot(){
      return this.userInfo && this.userInfo.userId && this.userInfo.userId === this.userId;
    },

    draggableItem(){
      return this.isRoot && this.isShowTagDetail
    }
  },

  data(){
    return {
      list:'',

      // 博客状态，0：公开，1：私密，2：草稿，3：回收站，4：收藏
      status : '0',

      showAddPriCode: false,
      showAddPriItem: ''
    }
  },

  methods:{
    showAddPri(item){
      this.showAddPriItem = item
      this.showAddPriCode = true
    },

    changePriStatus(){
      this.list.forEach(item => {
        if(item.blogId == this.showAddPriItem.blogId){
          item.openStatus = 1
        }
      })
    },

    deleteItem(blogId){
      this.list = this.list.filter(item => item.blogId !== blogId)
    },

    //关注列表，状态5
    getBlogFocusList(status){
      if(this.status != status){
        this.list = []
      }
      this.status = status
      this.$axios.post(Api.BLOG_FOCUS_LIST, {userId: this.userId})
      .then(res =>{ 
        this.list = res
      })
      .catch(res =>{
        this.$message.warning(res.message);
      })
    },

    // 博客列表，状态：0，1，2，3，4
    getBlogListByStatus(status){
      if(this.status != status){
        this.list = ''
      }
      this.status = status
      this.$axios.post(Api.BLOG_LIST_BY_USER_ID, {
        status: status,
        userId: this.userId
      })
      .then(res =>{ 
        this.list = res
      })
      .catch(res =>{
        this.$message.warning(res.message);
      })
    },

    // 取消关注博主
    cancelFocus(focusUserId){
      this.$axios.post(Api.BLOG_FOCUS_CANCEL, { userId: focusUserId})
      .then( _ =>{ 
        this.list = this.list.filter(item => item.focusUserId != focusUserId)
        this.$message.success("已取消关注！");
      })
      .catch(res =>{this.$message.warning(res.message);})
    },

    // 更新拖拽后的菜单顺序
    onEnd (list) {
      list.forEach((item,index) => {item.orderNum = index} )
      this.$axios.post(Api.BLOG_LIST_EDIT, list).catch(res =>{
        this.$message.warning(res.message);
      })
    },
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/css/index.less';

.blog-list-box{
  width: 55vw;
  min-width: 500px;
  background:white;
  min-height: calc(100vh - 26px);

  .top-box{
    user-select: none;
    border-bottom: 1px solid #f0f2f5;
  }
  
  // 博客列表
  .top-status-box{
    padding: 0 24px;
    height: 70px;
    width: 100%;
    .flex-center-between();

    .status-left{
      .flex-center-start();

      // 标签内容
      .tag-box{
        position: relative;
        animation: 0.2s appear;

        // 标签详情
        .tag-title{
          font-size: 15px;
          color: #222226;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .tag-content-num{
            font-size: 12px;
            color: #919da9;
            margin-top: 5px;
        }

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

    .status-right{
      .flex-center-start();

      .write-btn{
        padding: 8px 13px;
        text-align: center;
        color: #fff;
        background: #ff4d4d;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;

        &:hover, &:active{
          background-color: #fc1944;
        }
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .blog-list-box{
    width: 100%;
    min-width: 100%;
    
    .top-status-box{
      height: auto;
      padding: 0 10px 10px;

      .status-right{
        display: none;
      }  

      .status-left{

        // 标签内容
        .tag-box{

          // 标签详情
          .tag-title{
            font-size: 14px;
            color: #222226;
          }
          .tag-content-num{
            font-size: 12px;
            color: #919da9;
          }
        }
      }
    }
  }
}
</style>