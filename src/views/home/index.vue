<template>
  <div class="page-home h100 flex-center-center" style="flex-direction: column;">
    <div style="position: absolute; top: 0; right: 0;">
      <Navbar/>
    </div>

    <Footer/>

    <div class="home-title">Hui Yong</div>
    <div class="flex-center-center" style="margin: 0 50px; width: calc(100% - 100px); flex-direction: column;">
      <div class="search-input  mt50 w100" :class="{'search-input-focus': state.inputFocus}">
        <input 
          class="input-class"
          type="text" 
          autofocus 
          autocomplete="off"
          id="searchSugrec"
          placeholder="搜索"
          @focus="state.inputFocus = true"
          v-model="state.seachKey" />
      </div>

      <img class="home-back-img" style="margin-top: 100px;" :src="homeBack">
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, nextTick} from 'vue';
import homeBack from '/@/assets/img/home-back.webp';
// 引入组件
const Navbar = defineAsyncComponent(() => import('/@/components/layout/navbar/index.vue'));
const Footer = defineAsyncComponent(() => import('/@/components/layout/footer/index.vue'));

const state = reactive({
  seachKey: "",
  inputFocus: false
})

const searchListener = (event: any) => {
  if(event.srcElement.id != 'searchSugrec'){
    state.inputFocus = false
  }
}

onMounted(()=> {
	nextTick(() => {
    document.body.addEventListener('click', searchListener, true);
  })
})

onUnmounted(()=> {
  document.body.removeEventListener('click', searchListener);
})

</script>

<style scoped lang="scss">
@import './index.scss';
</style>