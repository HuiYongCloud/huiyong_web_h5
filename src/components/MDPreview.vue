<template>
	<div>
		<MdPreview 
			editorId="md-preview-id"
			:theme="isDarkTheme()?'dark':'light'" 
			:modelValue="props.content"
			previewTheme="github"
			codeTheme="github" />
	</div>
</template>

<script setup lang="ts">
import { appStore } from '/@/stores/appStore'
import { MdPreview, config} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import highlight from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import mermaid from 'mermaid';
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
		highlight: {
			instance: highlight,
		},
		katex: {
			instance: katex
		},
		cropper: {
			instance: Cropper
		},
		mermaid: {
			instance: mermaid
		}
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
.md-editor{
	background: transparent !important;
}
.md-editor-preview-wrapper{
	padding: 0px !important;
}
</style>