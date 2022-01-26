import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";
import ProjectList from "@/views/projects/List"
import ProjectAdd from "@/views/projects/Add"
import InterfaceList from "@/views/interfaces/List"
import InterfaceAdd from "@/views/interfaces/Add"
import EnvAdd from "@/views/env/Add"
import EnvList from "@/views/env/List"
import BuiltinList from "@/views/builtin/List"
import TestsuiteAdd from "@/views/testsuite/Add"
import TestsuiteList from "@/views/testsuite/List"
import TestcaseAdd from "@/views/testcase/Add"
import TestcaseList from "@/views/testcase/List"
import ConfigureAdd from "@/views/configure/Add"
import ConfigureList from "@/views/configure/List"
import ReportList from "@/views/report/List"


Vue.use(Router)

const routes = [
  {
    // 登录页面路由
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    // 首页页面路由
    path: '/home',
    name: 'Home',
    component: Home,
    title: '首页',
    meta: {
      icon: 'el-icon-s-home',
      requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/project',
    name: 'Project',
    redirect: '/project/list',
    title: '项目管理',
    component: Home,
    meta: {
      icon: 'el-icon-s-claim'
    },
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
    meta: {
      icon: 'el-icon-s-flag'
    },
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
    path: '/env',
    name: 'Env',
    redirect: '/env/list',
    title: '环境管理',
    component: Home,
    meta: {
      icon: 'el-icon-s-open'
    },
    children: [
      {
        path: '/env/list',
        title: '环境列表',
        name: 'EnvList',
        component: EnvList
      }, {
        path: '/env/add',
        title: '环境新增',
        name: 'EnvAdd',
        component: EnvAdd
      }
    ]
  },
  {
    path: '/builtin',
    name: 'Builtin',
    redirect: '/builtin/list',
    title: '内置函数',
    component: Home,
    meta: {
      icon: 'el-icon-s-tools'
    },
    children: [
      {
        path: '/builtin/list',
        title: '函数列表',
        name: 'BuiltinList',
        component: BuiltinList
      }
    ]
  },
  {
    path: '/testcase',
    name: 'Testcase',
    redirect: '/testcase/list',
    title: '用例管理',
    component: Home,
    meta: {
      icon: 'el-icon-s-opportunity'
    },
    children: [
      {
        path: '/testcase/list',
        title: '用例列表',
        name: 'TestcaseList',
        component: TestcaseList
      }, {
        path: '/testcase/add',
        title: '用例新增',
        name: 'TestcaseAdd',
        component: TestcaseAdd
      }
    ]
  },
  {
    path: '/testsuite',
    name: 'Testsuite',
    redirect: '/testsuite/list',
    title: '套件管理',
    component: Home,
    meta: {
      icon: 'el-icon-files'
    },
    children: [
      {
        path: '/testsuite/list',
        title: '套件列表',
        name: 'TestsuiteList',
        component: TestsuiteList
      }, {
        path: '/testsuite/add',
        title: '套件新增',
        name: 'TestsuiteAdd',
        component: TestsuiteAdd
      }
    ]
  },
  {
    path: '/configure',
    name: 'Configure',
    redirect: '/configure/list',
    title: '配置管理',
    component: Home,
    meta: {
      icon: 'el-icon-s-ticket'
    },
    children: [
      {
        path: '/configure/list',
        title: '套件列表',
        name: 'ConfigureList',
        component: ConfigureList
      }, {
        path: '/configure/add',
        title: '套件新增',
        name: 'ConfigureAdd',
        component: ConfigureAdd
      }
    ]
  },
  {
    path: '/report',
    name: 'Report',
    redirect: '/report/list',
    title: '报告管理',
    component: Home,
    meta: {
      icon: 'el-icon-s-marketing'
    },
    children: [
      {
        path: '/report/list',
        title: '报告列表',
        name: 'ReportList',
        component: ReportList
      }
    ]
  },
  // {
  //   path: '/404',
  //   component: Home,
  //   hidden: true
  // },
  // {
  //   // 会匹配所有路径
  //   path: '*', redirect: '/404', hidden: true
  // }
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
