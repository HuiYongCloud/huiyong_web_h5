/**
 * 封装Axios
 * 处理请求、响应错误信息
 */
import axios, { AxiosInstance } from 'axios';
import { showDialog } from 'vant';
import { appStore } from "/@/stores/appStore";

// 创建实例
const service : AxiosInstance = axios.create({
  baseURL: (import.meta.env.DEV) ? "http://localhost:8899" : `https://${window.HuiYongConfig.domain}`,
  // 使Session的Token跨域不失效
  withCredentials: true,                 
  timeout: 20000,
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送前做的操作
    config.headers['Content-Type'] = "application/json"
    config.headers['client'] = "h5"
    config.headers['token'] = appStore().userInfo ? appStore().userInfo.token : ''
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 获取协议内容
    const res = response.data
    switch(res.code){
      // 成功
      case 200:
        return Promise.resolve(res.data)
      
      // 登录失效
      case 403:   
        const mainStore = appStore() 
        if(mainStore.userInfo != null){
          // 过期或者账号已在别处登录，则提示token过期
          mainStore.userInfo = null
          showDialog({title: '提示', message:res.message,})
            .then(() => {
              mainStore.token_403 = '403'
              window.location.reload();
            });
        }else{
          // 否则直接打开登录页
          mainStore.token_403 = '403'
          window.location.reload();
        }
        return Promise.reject({code: res.code, message: res.message})

      default:
        return Promise.reject({code: res.code, message: res.message})
    }
  },

  error => {
    console.log(error)
    return Promise.reject({code: 404, message: "未请求到有效地址"})
  }
)

// 导出 axios 实例
export default service