<template>
	<MdPreview 
		editorId="md-preview-id"
		:theme="isDarkTheme()?'dark':'light'" 
		:modelValue="props.content"
		previewTheme="github"
		codeTheme="github" />
</template>

<script setup lang="ts">
import { reactive} from 'vue';
import { appStore } from '/@/stores/appStore'
import { MdPreview, MdCatalog, config} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import MarkdownItMark from 'markdown-it-mark';

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

config({
	markdownItConfig : (mdit: any) => {
		mdit.use(MarkdownItMark);
	},
	editorExtensions: {
		cropper: {
			instance: Cropper
		},
	}
});

// 定义父组件传过来的值
const props = defineProps({
	// 列表内容
	content: {
		type: String,
		default: () => '',
	},
});
</script>

<style lang="scss">
ul {
    list-style-type: disc !important;
}
.md-editor{
	background: transparent !important;
}
.md-editor-preview-wrapper{
	padding: 0px !important;
}
</style>