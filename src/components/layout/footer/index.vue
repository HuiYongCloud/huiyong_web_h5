<template>
	<div class="layout-footer flex-center-center" :style="{'position': props.absolute ? 'absolute' : 'static'}">
		<div class="flex-center-start mb20 ml30" style="font-size: 12px; color: var(--app-item-sub);">
			<div style="letter-spacing: 1px;">HuiYong, © 2023</div>
			<div class="text-info" @click="toLink">赣ICP备20008193号</div>
			<!-- <div class="text-info" @click="toAbout">关于</div> -->
		</div>
	</div>
</template>

<script setup lang="ts">

// 定义父组件传过来的值
const props = defineProps({
    // 定位
    absolute: {
        type: Boolean,
        default: () => false,
    },
});
const toLink = () => window.open("https://beian.miit.gov.cn/", '_blank')
</script>

<style scoped lang="scss">
.layout-footer {
	bottom: 0;
	left: 0;
	width: 100%;

	.text-info{
		margin-left: 20px;
		cursor: pointer;
		&:hover{
			color: var(--el-color-primary);
		}
	}
}
</style>
