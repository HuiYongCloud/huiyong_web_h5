<template>
  <div>
    <div class="app-header-pc" :class="{ active: state.active }">
      <div class="flex-center-between" style="height: 100%; max-width: 980px; margin: 0 auto;">
        <div class="flex-center-center">
          <img src="/logo.svg" width="22" style="margin-right: 10px;">
          <span style="color: var(--el-color-black); font-size: 22px;">HuiYong.Online</span>
        </div>
        <div class="flex-center-center">
          <div class="navItem" @click="tabChange('home')" :class="{active: props.tabName === 'home'}">首页</div>
          <div class="navItem" @click="tabChange('search')" :class="{active: props.tabName === 'search'}">搜索</div>
          <div class="navItem" @click="tabChange('deploy')" :class="{active: props.tabName === 'deploy'}">部署文档</div>
          <div class="navItem" @click="tabChange('about')">关于</div>
          <div class="navItem" @click="tabChange('gitee')">Gitee</div>
          <div class="navItem" @click="tabChange('github')">Github</div>
        </div>
      </div>
    </div>
    <div class="app-header-mobile" :class="{ active: state.active }">
      <div class="flex-center-center" style="height: 50px; width: 50px;" @click="state.showDrawer = !state.showDrawer">
				<img v-if="!state.showDrawer" :src="menuOpen" style="width: 18px; height: 18px; filter: drop-shadow(10000px 0 0 var(--el-color-black)); transform: translate(-10000px);"/>
				<img v-if="state.showDrawer" :src="menuClose" style="width: 18px; height: 18px; filter: drop-shadow(10000px 0 0 var(--el-color-black)); transform: translate(-10000px);"/>
			</div>
      <Popup 
				v-model:show="state.showDrawer"  
				position="left"
  			:style="{ width: '240px', height: '100%', }">
        <div class="navItem" @click="tabChange('home')" :class="{active: props.tabName === 'home'}">首页</div>
        <div class="navItem" @click="tabChange('search')" :class="{active: props.tabName === 'search'}">搜索</div>
        <div class="navItem" @click="tabChange('deploy')" :class="{active: props.tabName === 'deploy'}">部署文档</div>
        <div class="navItem" @click="tabChange('about')">关于</div>
        <div class="navItem" @click="tabChange('gitee')">Gitee</div>
        <div class="navItem" @click="tabChange('github')">Github</div>
      </Popup>          
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, nextTick, reactive, onUnmounted, ref } from 'vue'
const emit = defineEmits(['tabChange']);
import menuOpen from '/@/assets/svg/menu-open.svg';
import menuClose from '/@/assets/svg/menu-close.svg';
import { Popup } from 'vant';

// 定义父组件传过来的值
const props = defineProps({
	// 标签名
	tabName: {
		type: String,
		default: () => '',
	}
});

const state = reactive({
  active: false,
  showDrawer: false,
})

const tabChange = (tabName: string) => {
  state.showDrawer = false
  emit('tabChange', tabName)
}

const onScroll = () => {
  state.active = window.scrollY > 0
}

onMounted(() => {
  nextTick(() => {
    window.addEventListener('scroll', onScroll)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped lang="scss">
@import '/@/theme/media.scss';
.app-header-pc {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  transition: all 0.5s;
  background-color: transparent;

  &.active {
    background-color: var(--app-color-bg);
    box-shadow: 0 5px 30px -10px rgba(0, 0, 0, 0.1);
  }

  .navItem {
    color: var(--app-item-sub);
    font-size: 15px;
    transition: all 0.5s;
    padding: 20px;
    cursor: pointer;

    &:last-of-type {
      padding-right: 0;
    }

    &.active,&:hover {
      color: var(--el-color-primary);
    }
  }
}

.app-header-mobile {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: transparent;

  &.active {
    background-color: var(--app-color-bg);
    box-shadow: 0 5px 30px -10px rgba(0, 0, 0, 0.12);
  }  

  .navItem {
    line-height: 40px;
    height: 40px;
    padding: 0 16px;
    color: var(--app-item-title);
    font-size: 14px;
    cursor: pointer;

    &:last-of-type {
      padding-right: 0;
    }

    &.active,&:hover {
      color: var(--el-color-primary);
    }
  }
}

[data-theme='dark'] {
  .app-header-pc {
    &.active {
      box-shadow: 0 5px 30px -10px rgba(255, 255, 255, 0.1);
    }
  }
  .app-header-mobile {
    &.active {
      box-shadow: 0 5px 30px -10px rgba(255, 255, 255, 0.12);
    }
  }
}

@media screen and (max-width: $lg) {
	.app-header-pc{
		display: none;
	}

	.app-header-mobile{
		display: block;
	}
}

@media screen and (min-width: $lg) {
	.app-header-pc{
		display: block;
	}

	.app-header-mobile{
		display: none;
	}
}
</style>
