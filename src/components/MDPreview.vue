<template>
	<div>
		<MdPreview 
			editorId="md-preview"
			:theme="isDarkTheme()?'dark':'light'" 
			:modelValue="props.content"
			previewTheme="github"
			:noImgZoomIn="true"
			codeTheme="github" />

		<el-image-viewer
			v-if="state.imagePreview" 
			@close="closePreview" 
			:url-list="[state.showImage]" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive} from 'vue';
import { appStore } from '/@/stores/appStore'
import { MdPreview, config} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import MarkdownItMark from 'markdown-it-mark';

// 定义变量内容
const state = reactive({
	imagePreview: false,
	showImage: '',
});

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
	}
});

/** 关闭图片预览 */
const closePreview = () => {
	state.imagePreview = false
}

// 添加图片预览功能
const initImageClick = () => {
	// 延时5秒，保证图片节点加载进来
	setTimeout(() => {
		let imgList = document.getElementsByTagName("img");
		for (var i = 0; i < imgList.length; i++) {
			let item = imgList[i];
			var a = item.getAttribute("class");
			// 图片则可以显示
			// if(a == 'md-zoom' || a ==  'drawio-svg'){
				item.addEventListener("click", (e:any) => {
					state.showImage = e.target.currentSrc
					state.imagePreview = true
				});
			// }
		};
	}, 1000);
}

// 页面加载时
onMounted(() => {
	initImageClick()
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