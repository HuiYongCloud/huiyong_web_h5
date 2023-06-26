<template>
  <div class="page-home flex-center-center">
    <div class="flex-center-center" style="flex-direction: column;">
      <div class="flex">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="../../assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <h1>Home</h1>

			<ThemeSwitch class="mt30" @click="changeTheme"/>

      <div class="flex-center-center  mt30">
        <Button plain type="primary" @click="addCount"> + 1 </Button>
        <div class="count ml20">{{mainStore.count}}</div>
        <Button plain type="primary" class="ml20" @click="subCount"> - 1 </Button>
      </div>

      <div class="flex mt30">
        <Button plain type="primary" to="/login" class="mt10">去登录</Button>
        <Button plain type="primary" to="/401" class="ml10">4 0 1</Button>
        <Button plain type="primary" to="/404" class="ml10">4 0 4</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'vant';
import { appStore } from '/@/store'
import ThemeSwitch from '/@/components/theme-switch/index.vue';
const mainStore = appStore()

const changeTheme = () => {
	let isDark = false;
	if(mainStore.theme){
		isDark = mainStore.theme === 'dark'
	}else{
		isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
	}
	mainStore.theme = isDark ? 'light' : 'dark';
}

const addCount = () => {
  mainStore.count = mainStore.count + 1
}

const subCount = () => {
  mainStore.count = mainStore.count - 1
}

</script>

<style scoped lang="scss">
@import './index.scss';
</style>

