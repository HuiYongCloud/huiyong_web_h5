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
  border: 1px solid var(--el-border-color-light, #ebeef5);

  .tag-title {
    background-color: var(--el-color-primary-dark-2);
    font-size: 14px;
    padding: 10px 16px;
    font-style: bold;
    color: #333333;
  }
  
  .tag-list-info{
    overflow: auto;
    margin-bottom: 10px;
  }

  .info-list{
    .info-item {
      padding: 5px 12px;
      cursor: pointer;
      transition: all .01s;
      position: relative;
      min-height: 40px;
      border-left: 3px solid transparent;

      &:hover{
        color: var(--el-color-primary);
        background-color: rgba(var(--el-color-primary-rgb), .1);
      }

      .info-title{
        color: var(--el-menu-text-color);
      }

      .info-value{
        color: var(--el-text-color-secondary);
      }
    }

    .info-item-active{
      border-left: 3px solid var(--el-color-primary);
      color: var(--el-color-primary);
      background-color: rgba(var(--el-color-primary-rgb), .1);
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
