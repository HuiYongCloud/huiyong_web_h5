<template>
    <div :class="{'theme-toggle-sticky':props.sticky}" class="flex-center-center">
      <el-switch
        size="default"
        v-model="state.isDark"
        class="theme-switch-class"
        @change="onThemeChange">
        <template #inactive-action>
          <img :src="Sun" width="16">
        </template>
        <template #active-action>
          <img :src="Moon" width="16">
        </template>
      </el-switch>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, nextTick} from 'vue';
import { appStore } from '/@/stores/appStore'
const mainStore = appStore()

import Sun from './sun.svg'
import Moon from './moon.svg'

// 定义父组件传过来的值
const props = defineProps({
	// 是否使用粘性布局
	sticky: {
		type: Boolean,
		default: () => false,
	},
})

const state = reactive({
	isDark: false
});

// 日间模式/深色模式，切换
const onThemeChange = () => {
	mainStore.theme = state.isDark ? 'dark' : 'light';
};

// 页面加载时
onMounted(() => {
  nextTick(() => {
    if(mainStore.theme){
      state.isDark = mainStore.theme === 'dark'
    }else{
      state.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  });
});
</script>


<style scoped lang="scss">

.theme-toggle-sticky{
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
}

.theme-switch-class{
  --el-switch-border-color: #dcdfe6;
  --el-switch-on-color: #2c2c2c; 
  --el-switch-off-color: #f2f2f2;
}

[data-theme='dark'] {
  .theme-switch-class{
    --el-switch-border-color: #4C4D4F;
  }
}
</style>