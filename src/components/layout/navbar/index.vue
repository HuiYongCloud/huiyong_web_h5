<template>
	<div class="layout-nav-bar flex-center-end">
		<ThemeSwitch/>
		<div class="ml20">
			<Popover v-model:show="showPopover" :actions="actions" @select="onSelect">
				<template #reference>
					<div class="flex-center-center">
						<img class="user-header " :src="userInfo.userImage">
						<div class="user-name ml5">{{userInfo.userName}}</div>
						<Icon class="ml5" name="arrow-down" />
					</div>
				</template>
			</Popover>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref} from 'vue';
import { appStore } from '/@/stores/appStore'
import { Icon } from 'vant';
import { Popover } from 'vant';

// 定义变量
const mainStore = appStore()
const userInfo = mainStore.userInfo
const showPopover = ref(false);

// 引入组件
const ThemeSwitch = defineAsyncComponent(() => import('/@/components/theme-switch/index.vue'));
const actions = [
	{ text: '首页', type: 0 },
	{ text: '退出登录', type: 1 },
];
const onSelect = (action: any) => {
	console.log(action)
}

</script>

<style scoped lang="scss">
.layout-nav-bar {
	width: 100%;
	padding: 12px 15px;

	.user-header{
		border-radius: 50%;
		width: 25px;
		height: 25px;
	}

	.user-name{
		font-size: 14px;
	}
}
</style>
