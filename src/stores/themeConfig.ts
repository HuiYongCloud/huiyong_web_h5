import { defineStore } from 'pinia';

/**
 * 布局配置
 * 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I567R1，感谢@lanbao123
 * 2020.05.28 by lyt 优化。开发时配置不生效问题
 * 修改配置时：
 * 1、需要每次都清理 `window.localStorage` 浏览器永久缓存
 * 2、或者点击布局配置最底部 `一键恢复默认` 按钮即可看到效果
 */
export const useThemeConfig = defineStore('themeConfig', {
	state: () => ({
		/**
		 * 全局网站标题 / 副标题
		 */
		// 网站主标题（菜单导航、浏览器当前网页标题）
		globalTitle: 'HuiYong',
		// 网站副标题（登录页顶部文字）
		globalViceTitle: 'HuiYong',
		// 网站副标题（登录页顶部文字）
		globalViceTitleMsg: '好记性不如烂笔头',
		// 默认全局组件大小，可选值"<large|'default'|small>"，默认 'large'
		globalComponentSize: 'default',
	}),
});
