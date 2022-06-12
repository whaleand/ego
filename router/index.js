import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Layout/index.vue'
import Login from '../views/Login/Login.vue'
import HomePage from '../views/Layout/MenuList/HomePage/HomePage.vue'
import Sales from '../views/Layout/MenuList/Sales/Sales.vue'
import Goods from '../views/Layout/MenuList/Goods/Goods.vue'
import OrderBack from '../views/Layout/MenuList/Order/OrderBack.vue'
import OrderList from '../views/Layout/MenuList/Order/OrderList.vue'
// 异步
// const Goods = () => import('../views/Layout/MenuList/Goods/Goods.vue')
// const Standards = () => { import('../views/Layout/MenuList/Standards/Standards.vue') }
// const Advert = () => { import('../views/Layout/MenuList/Advert/Advert.vue') }
// const Order = () => { import('../views/Layout/MenuList/Order/Order.vue') }

const routes = [
  {
    path: '/', component: Home,
    // 配置路由元信息
    meta: {
      islogin: true
    },
    children: [
      { path: '/', component: HomePage, name: 'HomePage' ,meta:{islogin:true}},
      { path: '/goods', component: Goods,meta:{islogin:true} },
      { path: '/sales', component:Sales },
      { path: '/orders', redirect: '/orderslist' },
      { path: '/orderslist', component: OrderList },
      { path: '/ordersback', component: OrderBack },
    ]
  },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// 路由拦截
router.beforeEach((to, from, next) => {
  {
    //  1.判断是否需要登录
    // to.matched可以得到包括本身和父级的所有路由
    if (to.matched.some(item => item.meta.islogin)) {
      // 表示需要登录,则判断用户是否已经登录
      // let token = store.state.loginModule.userinfo.token
      let token=localStorage.getItem('token')
      if(token){
        next()
      }else{
        next('/login')
      }
    } else {
      //表示不需要登录
      next()
    }
  }
})

export default router
