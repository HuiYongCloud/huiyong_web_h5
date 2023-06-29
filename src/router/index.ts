import { createRouter, createWebHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { NextLoading } from '/@/components/loading/loading';

// 页面配置
const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/home' },
    { 
        path: '/home', 
        name: 'home', 
        component: () => import('/@/views/home/index.vue') ,
        meta: { title: '首页' }
    },
    { 
        path: '/login', 
        name: 'login', 
        component: () => import('/@/views/login/index.vue')  ,
        meta: { title: '登录' }
    },
    { 
        path: '/register', 
        name: 'register', 
        component: () => import('/@/views/register/index.vue')  ,
        meta: { title: '注册' }
    },
]

// 根路由404配置
const routePage404: Array<RouteRecordRaw> = [
    {
        path: '/401',
        component: () => import('/@/views/error/401.vue'),
        meta: { title: '401' }
    },
    {
        path: '/404',
        component: () => import('/@/views/error/404.vue'),
        meta: { title: '404' }
    },
    {
        path: '/:pathMatch(.*)',
        component: () => import('/@/views/error/404.vue'),
        meta: { title: '404' }
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
const router: Router = createRouter(options)

// 路由加载前
router.beforeEach(async (to, from, next) => {
    NProgress.configure({ showSpinner: false });
	NProgress.start();

    if (to.path === '/login') {
		next();
		NProgress.done();
	}else{
        NextLoading.start();
        next();
        NextLoading.done(1000);
    }
})

router.afterEach((to, from, next) => {
    //遍历meta改变title
    if (to.meta.title) {
        document.title = to.meta.title as string
    }
    window.scrollTo(0, 0)
  })

export default router