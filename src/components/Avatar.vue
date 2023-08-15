<template>
  <div class="avatar-box flex-center-center" :style="{height: props.size+'px', width: props.size+'px'}">
    <img class="avatar-img" :src="props.src">
  </div>
</template>

<script setup lang="ts">

// 定义父组件传过来的值
const props = defineProps({
	// 图片地址
	src: {
		type: String,
		default: () => '',
	},
  // 大小
  size: {
		type: Number,
		default: () => '',
	},
});
</script>

<style lang="scss" scoped>
.avatar-box {
  position: relative;
  animation: 1s appear;
  height: 60px;
  width: 60px;
  border-radius: 4px;
  overflow: hidden;

  .avatar-img{
    height: 100%;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
