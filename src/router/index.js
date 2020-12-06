import Vue from 'vue'
import VueRouter from 'vue-router'

// 组件导入
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/users.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' }, // 访问根目录 默认从定向到login
  { path: '/login', component: Login }, // 访问路由 login
  { 
    path: '/home', 
    component: Home ,
    redirect:'/welcome',
    children:[
      {path:'/welcome',component:Welcome},
      {path:'/users',component:Users}
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to,from,next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next() 方式 next('/login') 强制跳转
  if(to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('login');
  next();
});


export default router
