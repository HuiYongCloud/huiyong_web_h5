<template>
  <div>
    <div class="root-tag show-in-pc" ref="tagListRoot">
      <div class="tag-title">文章分类</div>

      <div class="tag-list-info" :style="{height: tagListHeight}">
        <draggable class="info-list" v-model="list" @end="onEnd(list)" :disabled="!draggableTag" draggable=".info-item" handle=".draggable-box" animation="250">
          <div class="info-item" :class="[item.tagId == tagId?'info-item-active':'', draggableTag?'info-item-edit':'']" v-for="(item, index) in list" :key="index" @click="toTagInfo(item.tagId)">
            <div class="info-title">{{item.tagName}}</div>

            <div class="right-box" @click.stop="">
              <div class="info-value">{{item.blogContentNum}}</div>
              <i class="btn-icon el-icon-edit" @click="editMenu(item)"></i>
              <i class="btn-icon el-icon-delete" @click="deleteTag(item)"></i>
              <div class="draggable-box">
                <svg-icon icon-class="draggable" class="draggable-icon"/>
              </div>
            </div>
          </div>
        </draggable>
      </div>

      <!-- 编辑分类 -->
      <edit-tag 
        :show="showTagEdit" 
        :item="showTagItem"
        @close="showTagEdit = false" 
        @closeAndEdit="closeAndEdit"/>
    </div>
    <svg-icon icon-class="tag-list" class="tag-list-icon" @click="tagDrawer = !tagDrawer" />
    <el-drawer
      :visible.sync="tagDrawer"
      :append-to-body="true"
      size="50%"
      :with-header="false">
        <div class="root-tag">
          <div class="tag-title">文章分类</div>

          <div class="info-list">
            <div class="info-item" :class="{'info-item-active':item.tagId == tagId}" v-for="(item, index) in list" :key="index" @click="toTagInfo(item.tagId)">
              <div class="info-title">{{item.tagName}}</div>
              <div class="info-value">{{item.blogContentNum}}</div>
            </div>
          </div>
        </div>
    </el-drawer>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import Api from "@/utils/api.js";
import SvgIcon from '~/components/SvgIcon.vue';
import EditTag from '@/components/EditTag.vue'

export default {
  props: ["userId", "tagId", "userInfo", "asyncList"],

  components:{
    Avatar,
    SvgIcon,
    EditTag
  },

  watch: {
    asyncList: {
      immediate: true,
      handler(val) {
        this.list = val;
      }
    },
	},

  data(){
    return {
      tagListHeight: '',

      list:'',
      tagDrawer: false,

      showTagEdit: false,
      showTagItem:'',
    }
  },

  computed:{
    draggableTag(){
      return this.userInfo && this.userInfo.userId && this.userInfo.userId === this.userId;
    }
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        var top = this.$refs.tagListRoot.offsetTop + 50
        this.tagListHeight = 'calc( 100vh - '+ top +'px )'
      }, 200);
    })
  },

  methods:{
    toTagInfo(tagId){
      location.href = '/blogDetail?tagId='+tagId
    },

    closeAndEdit(editValue){
      this.showTagEdit = false;
      this.list.forEach(item => {
        if(editValue.tagId == item.tagId){
          item.tagName = editValue.tagName
        }
      })
    },

    // 编辑分类
    editMenu(item){
      this.showTagEdit = true
      this.showTagItem = item
    },

    // 删除分类
    deleteTag(item){
      if(item.blogContentNum > 0){
        this.$confirm('当前分类下还有博客！', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false
        });          
      }else{
        this.$confirm('确定删除该分类吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {        
          
          // 删除
          this.$axios.post(Api.BLOG_TAG_DELETE, {id : item.tagId}).then(_ =>{
            // 列表移除item
            this.list = this.list.filter(point => point.tagId != item.tagId)
          }).catch(res =>{
            this.$message.warning(res.message);
          })
        });
      }
    },

    // 更新拖拽后的菜单顺序
    onEnd (list) {
      list.forEach((item,index) => {
        item.orderNum = index
      } )

      this.$axios.post(Api.BLOG_TAG_LIST_EDIT, list).catch(res =>{
        this.$message.warning(res.message);
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import '@/assets/css/index.less';

.root-tag{
  font-size: 14px;

  .tag-title {
    background-color: #d6ecf8;
    font-size: 14px;
    padding: 10px 16px;
    font-style: bold;
    color: #333333;
  }
  
  .tag-list-info{
    overflow: auto;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px 0 #e2e2e2;
  }

  .info-list{
    .info-item-edit{
      &:hover, &:active{
        background: #f6f6f6;
        .btn-icon{
          display: inline-block;
        }

        .draggable-box{
          display: inline-block;
        }

        .info-value{
          display: none;
        }
      }
    }

    .info-item {
      .flex-center-between();
      padding: 5px 15px;
      cursor: pointer;
      background-color: white;
      transition: all .01s;
      position: relative;
      min-height: 40px;

      &:hover{
		    background-color:#edf0f5;
      }

      .info-title{
        color: #333333;
      }

      .info-value{
        color: #999999;
      }

      .right-box{
        .flex-center-start();
      }

      .btn-icon{
        display: none;
        color: #999999;
        padding: 5px;
        font-size: 12px;

        &:hover{
          color: #409EFF;
        }
      }

      .draggable-box{
        margin-right: -10px;
        padding: 5px;
        cursor: move;
        .flex-center-center();
        display: none;

        .draggable-icon{
          font-size: 14px;
          color: #999;
        }
      }
    }

    .info-item-active{
      border-left: 3px solid #3386ff;
      background: #e3e8f0;
    }
  }

  ::-webkit-scrollbar {
    display: none !important;
  }
}

.tag-list-icon{
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;
  font-size: 40px;
  display: none;
}

@media screen and (max-width: 1023px) {
  .root-tag{
    box-shadow: none;
  }
  
  .tag-list-icon{
    display: inline-block;
  }
}
</style>
