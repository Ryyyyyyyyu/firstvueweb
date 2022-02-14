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
import BuiltinEdit from "@/views/builtin/Edit"
import TestsuiteAdd from "@/views/testsuite/Add"
import TestsuiteList from "@/views/testsuite/List"
import TestcaseAdd from "@/views/testcase/Add"
import TestcaseList from "@/views/testcase/List"
import TestcaseEdit from "@/views/testcase/Edit"
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
    meta: {
      title: '首页',
      icon: 'el-icon-s-home',
      requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/project',
    name: 'Project',
    redirect: '/project/list',
    component: Home,
    meta: {
      title: '项目管理',
      icon: 'el-icon-s-claim',
      requiresAuth: true
    },
    children: [
      {
        path: '/project/list',
        name: 'ProjectList',
        component: ProjectList,
        meta: {
          title: '项目列表',
        }
      },
      {
        path: '/project/add',
        name: 'ProjectAdd',
        component: ProjectAdd,
        meta: {
          title: '项目新增',
        }
      }
    ]
  },
  {
    path: '/interface',
    name: 'Interface',
    redirect: '/interface/list',
    component: Home,
    meta: {
      title: '接口管理',
      icon: 'el-icon-s-flag',
      requiresAuth: true
    },
    children: [
      {
        path: '/interface/list',
        name: 'InterfaceList',
        component: InterfaceList,
        meta: {
          title: '接口列表',
        }
      },
      {
        path: '/interface/add',
        name: 'InterfaceAdd',
        component: InterfaceAdd,
        meta: {
          title: '接口新增',
        }
      }
    ]
  },
  {
    path: '/env',
    name: 'Env',
    redirect: '/env/list',
    component: Home,
    meta: {
      title: '环境管理',
      icon: 'el-icon-s-open',
      requiresAuth: true
    },
    children: [
      {
        path: '/env/list',
        name: 'EnvList',
        component: EnvList,
        meta: {
          title: '环境列表',
        }
      },
      {
        path: '/env/add',
        name: 'EnvAdd',
        component: EnvAdd,
        meta: {
          title: '环境新增',
        }
      }
    ]
  },
  {
    path: '/builtin',
    name: 'Builtin',
    redirect: '/builtin/list',
    component: Home,
    meta: {
      title: '内置函数',
      icon: 'el-icon-s-tools',
      requiresAuth: true
    },
    children: [
      {
        path: '/builtin/list',
        name: 'BuiltinList',
        component: BuiltinList,
        meta: {
          title: '函数列表',
        }
      },
      {
        path: '/builtin/edit/:id',
        name: 'BuiltinEdit',
        component: BuiltinEdit,
        hidden: true,
        meta: {
          title: '函数编辑',
        }
      }
    ]
  },
  {
    path: '/testcase',
    name: 'Testcase',
    redirect: '/testcase/list',
    component: Home,
    meta: {
      title: '用例管理',
      icon: 'el-icon-s-opportunity',
      requiresAuth: true
    },
    children: [
      {
        path: '/testcase/list',
        name: 'TestcaseList',
        component: TestcaseList,
        meta: {
          title: '用例列表',
        }
      },
      {
        path: '/testcase/add',
        name: 'TestcaseAdd',
        component: TestcaseAdd,
        meta: {
          title: '用例新增',
        }
      },
      {
        path: '/testcase/edit/:id',
        name: 'TestcaseEdit',
        component: TestcaseEdit,
        hidden: true,
        meta: {
          title: '用例编辑',
        }
      }
    ]
  },
  {
    path: '/testsuite',
    name: 'Testsuite',
    redirect: '/testsuite/list',
    component: Home,
    meta: {
      title: '套件管理',
      icon: 'el-icon-files',
      requiresAuth: true
    },
    children: [
      {
        path: '/testsuite/list',
        name: 'TestsuiteList',
        component: TestsuiteList,
        meta: {
          title: '套件列表',
        }
      },
      {
        path: '/testsuite/add',
        name: 'TestsuiteAdd',
        component: TestsuiteAdd,
        meta: {
          title: '套件新增',
        }
      }
    ]
  },
  {
    path: '/configure',
    name: 'Configure',
    redirect: '/configure/list',
    component: Home,
    meta: {
      title: '配置管理',
      icon: 'el-icon-s-ticket',
      requiresAuth: true
    },
    children: [
      {
        path: '/configure/list',
        name: 'ConfigureList',
        component: ConfigureList,
        meta: {
          title: '配置列表',
        }
      },
      {
        path: '/configure/add',
        name: 'ConfigureAdd',
        component: ConfigureAdd,
        meta: {
          title: '配置新增',
        }
      }
    ]
  },
  {
    path: '/report',
    name: 'Report',
    redirect: '/report/list',
    component: Home,
    meta: {
      title: '报告管理',
      icon: 'el-icon-s-marketing',
      requiresAuth: true
    },
    children: [
      {
        path: '/report/list',
        name: 'ReportList',
        component: ReportList,
        meta: {
          title: '报告列表',
        }
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
