<template>
	<div class="layout-footer flex-center-center">
		<div class="flex-center-start mb20 ml30" style="font-size: 12px; color: var(--app-item-sub);">
			<div style="letter-spacing: 1px;">HuiYong, © 2023</div>
			<div class="text-info" @click="toLink">赣ICP备20008193号</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const toLink = () => window.open("https://beian.miit.gov.cn/", '_blank')
</script>

<style scoped lang="scss">
.layout-footer {
	width: 100%;
	position: absolute;
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
