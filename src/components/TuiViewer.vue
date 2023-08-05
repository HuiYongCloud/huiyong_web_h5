<template>
    <div id="viewer"></div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted, watch, computed} from 'vue';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
// 语法高亮
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
// 支持所有语言语法高亮
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
// import '/@/theme/tuiEditer/github.css';
// import '/@/theme/tuiEditer/github-dark.css';
import { appStore } from '/@/stores/appStore'

const mainStore = appStore()
const isDarkTheme = () => {
  let isDark = false;
	if(mainStore.theme){
		isDark = mainStore.theme === 'dark'
	}else{
		isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
	}
  return isDark;
}

const theme = computed({
  get: () => mainStore.theme as any,
  set: () => {},
})
// 监听主题变化
watch(theme, () => {
	window.location.reload();
});

// 定义父组件传过来的值
const props = defineProps({
	// 列表内容
	content: {
		type: String,
		default: () => '',
	},
});

// 定义变量内容
const state = reactive({
    viewer : '' as any,
    options : '' as any,
});

const setMarkdown = (mdStr:string) => {
    state.viewer.setMarkdown(mdStr)
}

// 页面加载时
onMounted(() => {
    state.options = {
        el: <HTMLElement>document.getElementById('viewer'),
		initialValue: props.content,
		plugins: [codeSyntaxHighlight],
		height: '100%',
		theme: isDarkTheme() ? 'dark' : 'light',
	}
	state.viewer = new Viewer(state.options);
});

/**
 * 销毁时
 * 
 */ 
 onUnmounted(async () => {
    // 销毁
    state.viewer.destroy();
});

// 暴露变量
defineExpose({
	setMarkdown,
});
</script>

<style lang="scss">
.token.operator{
	background: transparent;
}
</style>