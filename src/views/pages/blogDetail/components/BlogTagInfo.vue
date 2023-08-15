<template>
  <div class="root-tag show-in-pc">
    <div class="tag-title">文章分类</div>
    <div class="tag-list-info">
      <div class="info-list">
        <div 
          v-for="(item, index) in props.list" 
          class="info-item flex-center-between" 
          :class="[item.tagId == props.tagId? 'info-item-active':'']" 
          :key="index" 
          @click="changeTagInfo(item.tagId)">
          <div class="info-title">{{item.tagName}}</div>
          <div class="info-value">{{item.blogContentNum}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// 定义父组件传过来的值
const props = defineProps({
	// 用户信息
	tagId: {
		type: String,
		default: () => '',
	},
  // 详情
	list: {
		type: Object,
		default: () => [],
	},
});


// 定义子组件向父组件传值/事件
const emit = defineEmits(['changeTagInfo']);
const changeTagInfo = (tagId: String)=>{
  emit('changeTagInfo', tagId);
}
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';

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
    .info-item {
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

@media screen and (max-width: $lg) {
  .root-tag{
    display: none;
  }
}
</style>
