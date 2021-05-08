import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home"

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
    path: '/',
    // 重定向到登录页面
    redirect:'/login'
  },{
    // 登录页面路由
    path:'/login',
    name: 'Login',
    component: Login
  },{
    // 首页页面路由
    path:'/home',
    name: 'Home',
    component: Home
  }
  ]
})
