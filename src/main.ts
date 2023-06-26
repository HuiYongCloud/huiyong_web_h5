import { createApp } from 'vue'
import App from '/@/App.vue'
import router from '/@/router'
import {createPinia} from 'pinia'
//pinia持久化
import piniaPersist from 'pinia-plugin-persist'
import { ConfigProvider } from 'vant';
// 1. 引入项目样式
import '/@/theme/index.scss';
// 2. 引入组件样式
import 'vant/lib/index.css';
// 创建 Pinia 实例
const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)
app.use(ConfigProvider);
app.use(router)
app.use(pinia)
app.mount('#app')