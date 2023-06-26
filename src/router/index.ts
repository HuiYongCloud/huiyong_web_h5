import { createRouter, createWebHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'

// 页面配置
const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: () => import('/@/views/home/index.vue') },
    { path: '/login', name: 'login', component: () => import('/@/views/login/index.vue') },
]

// 根路由404配置
const routePage404: Array<RouteRecordRaw> = [
    {
        path: '/401',
        component: () => import('/@/views/error/401.vue'),
    },
    {
        path: '/404',
        component: () => import('/@/views/error/404.vue'),
    },
    {
        path: '/:pathMatch(.*)',
        component: () => import('/@/views/error/404.vue'),
    },
]

// RouterOptions是路由选项类型
const options: RouterOptions = {
    routes: [...routes, ...routePage404],
    history: createWebHistory()
    // history: createWebHashHistory(),     // 页面地址会带上#，        比如：http://127.0.0.1:5173/#/
    // history: createWebHistory(),         // history 路由模式就没有， 比如：http://127.0.0.1:5173/
}

// Router是路由对象类型
import { NextLoading } from '/@/components/loading/loading';
const router: Router = createRouter(options)

// 路由加载前
router.beforeEach(async (to, from, next) => {
	NextLoading.start();
    next();
    NextLoading.done(1000);
})

export default router