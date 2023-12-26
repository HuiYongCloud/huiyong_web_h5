<template>
  <div class="indicator-tree">
    <el-tree
      ref="tree"
      class="outlineTree"
      node-key="uid"
      :draggable="false"
      default-expand-all
      :data="state.data"
      :props="state.defaultProps"
      :allow-drag="checkAllowDrag"
      @node-drop="onNodeDrop"
      @current-change="onCurrentChange">
      <template #default="{ node, data }">
        <span style="max-width: 500px; line-height: 1.8;">
          <span 
            v-if="node.data.treeIndex > 0 && node.data.childrenNum == 0" 
            style="display: block; float: left; margin-right: 10px; margin-top: 10px; border-radius: 50%; height: 3px; width: 3px; background: #6d768d;"/>
          <span>{{ node.label }}</span>
          <img 
            v-if="node.data.hyperlink" 
            :src="TreeLink" 
            style="margin-left: 8px; margin-right: 8px; display: inline-block; vertical-align: top;" width="20" height="20"
            @click.stop="openLink(node.data.hyperlink)">
        </span>
      </template>
    </el-tree>
  </div>

</template>

<script setup lang="ts" name="Toolbar">
import { nextTick, onMounted, onUnmounted, reactive, ref} from 'vue';
import TreeLink from '/@/assets/mind-map/tree_link.svg'

// 定义父组件传过来的值
const props = defineProps({
  mindMap: {
		type: Object,
		default: () => null,
	}
});

const tree = ref();
const state = reactive({
  data: [] as any,
  isReadonly: false,
  defaultProps: {
    children: 'children',
    label: 'label',
  },
  currentData: null as any
});

// 根节点不允许拖拽
const checkAllowDrag = (node: any) => {
    return node.treeIndex != 0
}

// 拖拽结束事件
const onNodeDrop = (data:any, target:any, position:any) => {
    // 被拖拽的节点
    const node = props.mindMap.renderer.findNodeByUid(data.data.uid)
    // 拖拽到的目标节点
    const targetNode = props.mindMap.renderer.findNodeByUid(target.data.uid)
    if (!node || !targetNode) {
        return
    }
    // 根据不同拖拽的情况调用不同的方法
    switch (position) {
      case 'before':
        props.mindMap.execCommand('INSERT_BEFORE', node, targetNode)
        break
      case 'after':
        props.mindMap.execCommand('INSERT_AFTER', node, targetNode)
        break
      case 'inner':
        props.mindMap.execCommand('MOVE_NODE_TO', node, targetNode)
        break
      default:
        break
    }
}

// 当前选中的树节点变化事件
const onCurrentChange = (data: any) => {
  state.currentData = data
}

// 初始化节点
const initTreeData = (root: any, treeIndex: any) => {
  let text = root.data.text.replaceAll(/\n/g, '<br>')
  root.label = text
  root.hyperlink = root.data.hyperlink
  root.uid = root.data.uid

  root.data.childrenNum  = root.children ? root.children.length : 0
  root.childrenNum = root.data.childrenNum

  root.data.treeIndex = treeIndex
  root.treeIndex = treeIndex
  if (root.children && root.children.length > 0) {
    root.children.forEach((item: any) => {
      initTreeData(item, treeIndex + 1)
    })
  }
}

// 打开弹窗
const openTree = () => {
  setTimeout(() => {
    let data = props.mindMap.getData()
    var treeIndex = 0; // 层级
    initTreeData(data, treeIndex)
    state.data = [data]
  }, 200);
};

const openLink = (link: any) => {
  window.open(link, '_blank');
}

/**
 * 页面加载时
 * 
 */ 
onMounted(() => {
	nextTick(() => {
  });
});

/**
 * 页面注销时
 * 
 */
onUnmounted(() => {
});

// 暴露变量
defineExpose({
	openTree,
});
</script>

<style lang="scss" scoped>
.indicator-tree {
  :deep(){
      // 修改图标
      // .el-tree .el-tree-node__expand-icon.expanded {
      //   -webkit-transform: rotate(0deg);
      //   transform: rotate(0deg);
      // }
      // .el-tree .el-icon-caret-right:before {
      //   content: "\e783";
      //   font-size: 18px;
      // }
      // .el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
      //   content: "\e781";
      //   font-size: 18px;
      // }
      // // 修改选中样式
      // .el-tree-node__content:hover {
      //   background-color: #deefff;
      //   border-radius: 2px;
      //   color: #1381e1 !important;
      //   font-size: 14px;
      // }
      // .el-tree-node:focus>.el-tree-node__content{
      //   background-color: #deefff !important;
      //   color: #1381e1 !important;
      // }

      // 设置树形组件节点的定位和左内边距
      .el-tree-node {
        white-space: wrap !important;
        position: relative;
      }
    
      // 设置树形组件节点的 before 伪类的样式
      .el-tree-node:before {
        width: 1px;
        height: 100%;
        content: '';
        position: absolute;
        top: -38px;
        bottom: 0;
        left: 0;
        right: auto;
        border-width: 1px;
        border-left: 1px solid #d9d9d9ab;
      }
    
      // 设置树形组件节点的 after 伪类的样式
      .el-tree-node:after {
        width: 13px;
        height: 13px;
        content: '';
        position: absolute;
        left: 0;
        right: auto;
        top: 12px;
        bottom: auto;
        border-width: 1px;
        border-top: 1px solid #d9d9d9ab;
      }
    
      // 设置树形组件首节点的左边框不显示
      .el-tree > .el-tree-node:before {
        border-left: none;
      }
    
      // 设置树形组件首节点的顶部边框不显示
      .el-tree > .el-tree-node:after {
        border-top: none;
      }
    
      // 设置树形组件末节点的 before 伪类的高度
      .el-tree .el-tree-node:last-child:before {
        height: 50px;
      }
    
      // 设置树形组件节点字体大小、以及取消左内边距
      .el-tree .el-tree-node__content {
        // color: #000;
        height: auto !important;
        padding-top: 2px;
        padding-bottom: 2px;
        font-size: 14px;
        padding-left: 0 !important;
      }
    
      // 设置树形组件孩子节点左内边距
      .el-tree .el-tree-node__children {
        padding-left: 11.5px;
        .el-tree-node{
          padding-left: 13px;
        }
      }
    
      // 设置树形组件复选框左右外边距
      .el-tree .el-tree-node__content > label.el-checkbox {
        margin: 0 5px 0 5px !important;
      }
    
      // 设置树形组件展开图标定位、图层、内边距
      .el-tree .el-tree-node__expand-icon {
        position: relative;
        z-index: 99;
      }
    
      // 设置树形组件叶子节点的默认图标不显示
      .el-tree .el-tree-node__expand-icon.is-leaf {
        display: none;
      }
    
      // 设置树形组件叶子节点的横线
      .el-tree .leaf-node-line {
        width: 23px;
        height: 13px;
        content: '';
        position: absolute;
        left: 13px;
        right: auto;
        top: 12px;
        bottom: auto;
        border-width: 1px;
        border-top: 1px solid #d9d9d9ab;
      }
    
      // 设置树形组件有叶子节点的左外边距
      .el-tree .el-tree-node__content:has(.is-leaf){
        padding-left: 8px !important;
      }
  }
}
</style>
