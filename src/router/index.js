import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";
import ProjectList from "@/views/projects/List"
import ProjectAdd from "@/views/projects/Add"
import InterfaceList from "@/views/interfaces/List"
import InterfaceAdd from "@/views/interfaces/Add"
Vue.use(Router)

const routes = [
  {
    // 登录页面路由
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  }, {
    // 首页页面路由
    path: '/home',
    name: 'Home',
    title: '首页',
    meta: {
      icon: 'el-icon-s-platform',
      requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    component: Home
  },
  {
    path: '/project',
    name: 'Project',
    redirect: '/project/list',
    title: '项目管理',
    component: Home,
    children: [
      {
        path: '/project/list',
        title: '项目列表',
        name: 'ProjectList',
        component: ProjectList
      }, {
        path: '/project/add',
        title: '项目新增',
        name: 'ProjectAdd',
        component: ProjectAdd
      }
    ]
  },
  {
    path: '/interface',
    name: 'Interface',
    redirect: '/interface/list',
    title: '接口管理',
    component: Home,
    children: [
      {
        path: '/interface/list',
        title: '接口列表',
        name: 'InterfaceList',
        component: InterfaceList
      }, {
        path: '/interface/add',
        title: '项目新增',
        name: 'InterfaceAdd',
        component: InterfaceAdd
      }
    ]
  },
  {
    path: '/404',
    component: Home,
    hidden: true
  },
  {
    // 会匹配所有路径
    path: '*', redirect: '/404', hidden: true
  }
]

const router = new Router({
  mode: 'history',
  routes,
})

// 添加路由导航
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限,能检测出带参数的路由
  if (to.matched.some(auth => auth.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next({path: '/login'})
    }
  } else {
    next();
  }
})

export default router;
