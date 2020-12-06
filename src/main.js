import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://www.test.com/api/'
Vue.prototype.$http = axios
// 通过axios请求拦截器添加 token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  // console.log(config);
  // 为请求头对象，添加 Token 验证的 Authorzation 字段
  config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token')
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
