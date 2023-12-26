<template>
  <div class="mind-preview">
    <div v-show="state.mode === 'mind'" ref="mindMapContainer" style="height: 100%;" />
    <div v-show="state.mode === 'list'" style="height: 100%; overflow: scroll; padding: 200px 0 50px;" class="flex-start-center">
      <TreeList ref="treeList" :mindMap="state.mindMap"/>
    </div>
    <div class="mind-toolbarContainer flex-center-center">
      <div class="mind-toolbar flex">
        <div class="mind-toolbarBlock flex">
          <!-- 思维导图 -->
          <div class="toolbarBtn" @click="onChangeMode('mind')"
            :class="{active: state.mode === 'mind'}">
            <div class="icon-box">
              <img :src="TabMind" :width="13"/>
            </div>
            <div class="text">思维导图</div>
          </div>

          <!-- 大纲 -->
          <div class="toolbarBtn" @click="onChangeMode('list')"
            :class="{active: state.mode === 'list'}">
            <div class="icon-box">
              <img :src="TabList" :width="13"/>
            </div>
            <div class="text">大纲</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted, nextTick, ref, defineAsyncComponent, watch} from 'vue';
import MindMap from 'simple-mind-map'
import MiniMap from 'simple-mind-map/src/plugins/MiniMap.js'
import Watermark from 'simple-mind-map/src/plugins/Watermark.js'
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation.js'
import ExportPDF from 'simple-mind-map/src/plugins/ExportPDF.js'
import ExportXMind from 'simple-mind-map/src/plugins/ExportXMind.js'
import Export from 'simple-mind-map/src/plugins/Export.js'
import Drag from 'simple-mind-map/src/plugins/Drag.js'
import Select from 'simple-mind-map/src/plugins/Select.js'
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js'
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent.js'
import NodeImgAdjust from 'simple-mind-map/src/plugins/NodeImgAdjust.js'
import SearchPlugin from 'simple-mind-map/src/plugins/Search.js'
import Painter from 'simple-mind-map/src/plugins/Painter.js'
import ScrollbarPlugin from 'simple-mind-map/src/plugins/Scrollbar.js'
import Formula from 'simple-mind-map/src/plugins/Formula.js'

import { getUrlFileContent } from '/@/utils/urldownload';
import TabMind from '/@/assets/mind-map/tab_mind.svg';
import TabList from '/@/assets/mind-map/tab_list.svg';
const emit = defineEmits(['onSaveMind']);
// 注册插件
MindMap.usePlugin(MiniMap)
  .usePlugin(Watermark)
  .usePlugin(Drag)
  .usePlugin(KeyboardNavigation)
  .usePlugin(ExportPDF)
  .usePlugin(ExportXMind)
  .usePlugin(Export)
  .usePlugin(Select)
  .usePlugin(AssociativeLine)
  .usePlugin(NodeImgAdjust)
  .usePlugin(TouchEvent)
  .usePlugin(SearchPlugin)
  .usePlugin(Painter)
  .usePlugin(ScrollbarPlugin)
  .usePlugin(Formula)

const TreeList = defineAsyncComponent(() => import('./TreeList.vue'));
const mindMapContainer = ref();
const treeList = ref();

const state = reactive({
	mindMap: null as any,
  mode: 'mind' as any,
  mindMapData: {"data":{"text":"根节点"},"children":[]} as any
});

const upData = (content: any) => {
  getUrlFileContent(content, (mindData: any) => {
    state.mindMapData = JSON.parse(mindData)
    if(state.mindMap){
      state.mindMap.setData(state.mindMapData)
    }else{
      state.mindMap = new MindMap({
        el: mindMapContainer.value,
        data: state.mindMapData,
        readonly: true
      })

      // 设置背景色
      state.mindMap.setThemeConfig({
          backgroundColor: 'var(--app-color-bg)'
      })

      // 水印
      state.mindMap.watermark.updateWatermark({
        text: 'HuiYong.Online',
        lineSpacing: 50,
        textSpacing: 50,
        angle: 45,
        textStyle: {
          color: '#aaaaaa',
          opacity: 0.3,
          fontSize: 12
        }
      })
    }
  })
}

const onChangeMode = (mode : string) => {
  state.mode = mode
  if(mode === 'list'){
    treeList.value.openTree()
  }else{
    state.mindMap.setData(state.mindMapData)
  }
}

/**
 * 页面加载时
 * 
 */ 
 onMounted(() => {
	nextTick(() => {
  });
});

// 暴露变量
defineExpose({
	upData,
});
</script>

<style lang="scss" scoped>
@import '/@/theme/media.scss';
@import '/@/theme/flex.scss';
@import "simple-mind-map/dist/simpleMindMap.esm.css";

.mind-preview{
  width: 100%;
  position: relative; 
  height: calc(100vh - 130px);
}

@media screen and (max-width: $lg) {
  .mind-preview {
    height: calc(100vh - 170px);
  }
}

.mind-toolbarContainer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  .mind-toolbar {
    width: max-content;
    padding: 0 20px;
    padding-top: 20px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(26, 26, 26, 0.8);

    .mind-toolbarBlock {
      background-color: #fff;
      padding: 10px 20px;
      border-radius: 6px;
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.06);
      margin-right: 20px;

      &:last-of-type {
        margin-right: 0;
      }

      .toolbarBtn {
        cursor: pointer;
        margin-right: 20px;
        &:last-of-type {
          margin-right: 0;
        }
        &:hover {
          &:not(.disabled) {
            .icon-box {
              background: #f5f5f5;
            }
          }
        }
        &.active {
          .icon-box {
            background: #f5f5f5;
          }
        }
        &.disabled {
          color: #bcbcbc;
          cursor: not-allowed;
          &.focus{
            pointer-events: none;
          }
        }
        .icon-box {
          display: flex;
          height: 26px;
          width: 100%;
          background: #fff;
          border-radius: 4px;
          border: 1px solid #e9e9e9;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 0 5px;
          @include flex(center, center);
        }
        .text {
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
