<template>
  <div class="root-tag" v-if="props.list && props.list.length > 0">
    <div class="tag-title">思维导图</div>
    <div class="tag-list-info">
      <div class="info-list">
        <div 
          v-for="(item, index) in props.list" 
          class="info-item flex-center-between" 
          :class="[item.mindId == props.mindId? 'info-item-active':'']" 
          :key="index" 
          @click="changeMindDetail(item.mindId)">
          <div class="info-title">{{item.title}}</div>
          <!-- <div class="info-value">{{item.readNum}}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// 定义父组件传过来的值
const props = defineProps({
	// 用户信息
	mindId: {
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
const emit = defineEmits(['changeMindDetail']);
const changeMindDetail = (mindId: String)=>{
  emit('changeMindDetail', mindId);
}
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';

.root-tag{
  font-size: 14px;
  border: 1px solid var(--app-border-color);

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
        color: var(--app-item-title);
      }

      .info-value{
        color: var(--app-item-sub);
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
