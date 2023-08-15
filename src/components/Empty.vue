<template>
  <div class="empty-box flex-center-center">
    <img class="empty-img" :src="props.img || defaultImg">
    <div class="empty-tip">{{ tip || '空空如也' }}</div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import defaultImg from '/@/assets/img/empty.png';

// 定义父组件传过来的值
const props = defineProps({
	img: {
		type: String,
		default: () => '',
	},
	tip: {
		type: String,
		default: () => '',
	},
});
</script>

<style lang="scss" scoped>
.empty-box {
  animation: 1s appear;
  flex-direction: column;
  height: 100%;
  padding-top: 200px;

  .empty-img{
    height: 200px;
    width: 200px;
  }
  
  .empty-tip{
    font-size: 14px;
    color: #b6b6b6;
    margin-top: 20px;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
