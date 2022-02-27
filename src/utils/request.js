import axios from 'axios'
import router from "@/router/index.js";

import { Notify } from 'vant';
import { Toast } from 'vant';
import store from '../store/index.js'


export function request(config) {
  // 创建axios的实例
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn/',
    // baseURL: 'http://localhost:3003',
    timeout: 5000
  })
  // 请求拦截器配置
  instance.interceptors.request.use(config => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    // config.headers.Authorization = window.sessionStorage.getItem('token')
    const token = window.sessionStorage.getItem('token')
    // console.log(token);
    if (token) {
      // console.log("Bearer " + token);
      config.headers.Authorization = "Bearer " + token
    }
    return config
  }, error => {

    return Promise.error(error)
  }
  )
  // 响应拦截器配置
  instance.interceptors.response.use(response => {

    //通过有需要授权才能访问接口，统一去往login授权
    Toast.clear()

    // console.log(response);

    return response.data ? response.data : response
  }, error => {
    // console.log(error.response);
    switch (error.response.status ? error.response.status : '') {
      case 401:
        Toast.fail('前往登录')
        setTimeout(() => {
          router.push({ path: '/login' })
        }, 1000)
        break
      case 400:

        Notify({ type: 'warning', message: error.response.data.message });
        router.push({ path: '/cart' })
        break
      default:
        return Promise.reject(error)
    }
    return Promise.reject(error)
  })
  // 发送真正的网络请求
  return instance(config);
}
export default request
