<template>
	<Dialog v-model:show="state.dialog.isShowDialog" :showConfirmButton="false" width="500">
		<div class="flex-center-start mt50 mb40" style="flex-direction: column;">
			<img :src="Success" style="width: 60px; height: 60px; filter: drop-shadow(10000px 0 0 #67c23a); transform: translate(-10000px);">
			<div class="mt15 mb15" style="font-size: 20px;">复制分享链接成功</div>
			<div class="share-content">{{state.shareContent}}</div>
			<FavateBtn :width="100" :height="28" :size="12" text="知道了" @click="closeDialog"/>
		</div>
	</Dialog>
</template>

<script setup lang="ts" name="systemRoleDialog">
import { defineAsyncComponent, reactive } from 'vue';
import { Dialog } from 'vant';
import useClipboard from 'vue-clipboard3';
import Success from '/@/assets/svg/success.svg'

const { toClipboard } = useClipboard();
const FavateBtn = defineAsyncComponent(() => import('/@/components/FavateBtn.vue'));

// 定义变量内容
const state = reactive({
	shareContent:'' as any,
	dialog: {
		isShowDialog: false,
	}
});

// 打开弹窗
const openDialog = (text: any) => {
	toClipboard(text);
	state.shareContent = text;
	state.dialog.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style lang="scss">
.share-content{
	white-space: pre-line; 
	line-height: 25px;
	padding: 10px 20px;
	background-color: #f0f9eb;
	border-radius: 4px;
	border: 1px solid;
	color: #67c23a;
	font-size: 12px;
	margin-bottom: 40px;
	margin-top: 20px;
}

[data-theme="dark"] {
	.share-content{
		background-color: #1c2518;
	}
}
</style>
