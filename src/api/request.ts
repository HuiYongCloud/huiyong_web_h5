/**
 * 封装Axios
 * 处理请求、响应错误信息
 */
import axios, { AxiosInstance } from 'axios';
import { showConfirmDialog } from 'vant';
import NProgress from 'nprogress';
import { appStore } from "/@/stores/appStore";

// 创建实例
const service : AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // 使Session的Token跨域不失效
  withCredentials: true,                 
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' , 'client': 'admin'},
})

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 获取协议内容
    const res = response.data
    switch(res.code){
      // 成功
      case 200:
        return Promise.resolve(res.data)
      
      // 登录失效
      case 403:        
        const mainStore = appStore()
        // 过期或者账号已在别处登录
        if(mainStore.userInfo != null){
          NProgress.done();
          // 清除浏览器全部临时缓存
          mainStore.userInfo = ''
          showConfirmDialog({title: '提示', message:res.message,})
            .then(() => {window.location.reload();})
            .catch(() => {});
        }
        return Promise.reject({code: res.code, message: res.message})

      default:
        return Promise.reject({code: res.code, message: res.message})
    }
  },

  error => {
    return Promise.reject({code: 404, message: "未请求到有效地址"})
  }
)

// 导出 axios 实例
export default service