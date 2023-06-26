import { nextTick, h,render,defineAsyncComponent } from 'vue';
import './loading.scss';

const AppLoading = defineAsyncComponent(() =>
	import('/@/components/loading/index.vue')
)

/**
 * 页面全局 Loading
 * @method start 创建 loading
 * @method done 移除 loading
 */
export const NextLoading = {
	// 创建 loading
	start: () => {
		const bodys: Element = document.body;
		const div = <HTMLElement>document.createElement('div');
		div.setAttribute('class', 'loading-next');
		//使用render函数把组件挂载到容器上
		//第一个参数是我们使用h函数创造的VNode
		//第二个参数是需要挂载的位置
		render(h(AppLoading), div)
		bodys.insertBefore(div, bodys.childNodes[0]);
		window.nextLoading = true;
	},
	// 移除 loading
	done: (time: number = 0) => {
		nextTick(() => {
			setTimeout(() => {
				window.nextLoading = false;
				const el = <HTMLElement>document.querySelector('.loading-next');
				el?.parentNode?.removeChild(el);
			}, time);
		});
	},
};
