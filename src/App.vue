<template >
	<el-config-provider>
		<ConfigProvider id="app" :theme="state.sysTheme" >
			<router-view :key="route.path"/>
		</ConfigProvider>
	</el-config-provider>
</template>

<script setup lang="ts">
import { onMounted, nextTick, watch, computed, ref, reactive} from 'vue';
import { ConfigProvider } from 'vant';
import { appStore } from '/@/stores/appStore'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const mainStore = appStore()
const state = reactive({
	sysTheme: '' as any,
});
const theme = computed({
  get: () => mainStore.theme as any,
  set: () => {},
})
// 监听主题变化
watch(theme, () => {
  	onInitTheme()
});

// 初始化主题色
const onInitTheme = () => {
	let isDark = false;
	if(mainStore.theme){
		isDark = mainStore.theme === 'dark'
	}else{
		isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
	}
	const body = document.documentElement as HTMLElement;
	body.setAttribute('data-theme', isDark ? 'dark' : 'light')
	state.sysTheme = isDark ? 'dark' : 'light';
}

// 系统主题色切换监听
const initSysThemeLister = () => {
	if(!mainStore.theme){
		window.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener('change', () => {
			onInitTheme();
		})
	}
}

onMounted(() => {
	nextTick(() => {
		// 主题色
		onInitTheme()
		// 监听系统主题色切换
		initSysThemeLister()
	});
});
</script>