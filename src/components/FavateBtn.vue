<template>
  <div class="favate-btn" 
    :style="{width: props.width+'px', fontSize: props.size + 'px', height: props.height+'px', lineHeight : props.height+'px', borderRadius : props.height / 2+'px'}"
    @mouseover="state.hover = true"
    @mouseleave="state.hover = false"
    @click="click">
    <div class="favate-btn-back" :class="{'favate-btn-back-show': state.hover}"/>
    <div class="favate-btn-text flex-center-center">{{props.text}}</div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';

// 定义父组件传过来的值
const props = defineProps({
	// 宽
	width: {
		type: [Number, String],
		default: () => 0,
	},
  // 高
  height: {
		type: Number,
		default: () => 26,
	},  
  // 文案
  text: {
		type: String,
		default: () => '',
	},
  // 大小
  size: {
		type: Number,
		default: () => 13,
	}
});

const state = reactive({
	hover: false,
});

// 定义子组件向父组件传值/事件
const emit = defineEmits(['click']);
const click = ()=>{
  emit('click');
}
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';
.favate-btn{
  border: 1px solid var(--app-border-color);
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 1s ease;
  overflow: hidden;

  &:hover, &:active{
    border-color: #555666;
    color:var(--el-color-black) !important;
  }

  .favate-btn-back{
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;    
    background: var(--el-color-black);
    transform: translateX(-100%);
    transition: all 0.3s;
  }

  .favate-btn-back-show{
    transform: translateX(0px);
    color:var(--el-color-white) !important;
  }

  .favate-btn-text{
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;  
    color: var(--el-color-black);

    &:hover, &:active{
      color:var(--el-color-white) !important;
    }
  }
}

@media screen and (max-width: $lg) {
  .favate-btn{
    height: 20px;
    border-radius: 11px;
    border: 1px solid #ccccd8;
    font-size: 12px;
  }
}
</style>
