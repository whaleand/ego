import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import './assets/css/reset.css'
import './assets/css/index.css'
import './assets/css/font/iconfont.css'
import i18n from './lang/index.js'
import axios from 'axios'

// 导入echarts
import * as echarts from 'echarts'

const app=createApp(App)

app.config.warnHandler=()=>null
// // 持久化,刷新也还能进去
// let user=localStorage.getItem('user')
// if(user){
//   user=JSON.parse(user)
//   store.commit('loginModule/setUser',user)
// }

// 挂载echarts
app.config.globalProperties.$echarts=echarts

// 挂载axios

axios.defaults.baseURL = 'http://localhost:3020'
// 拦截器，每次请求携带token
axios.interceptors.request.use(config=>{
  const token=localStorage.getItem('token')
  if(token)
  config.headers.authorization=token
  return config
})
app.config.globalProperties.$http = axios

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(store).use(ElementPlus).use(router).use(router).use(i18n).mount('#app')
