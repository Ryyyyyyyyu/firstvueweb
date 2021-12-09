// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from "vue-router";

import App from './App'
import router from './router'
import request from './api'

Vue.use(ElementUI);
Vue.use(VueRouter);

// 将请求对象绑定到vue的原型上
Vue.prototype.$request = request

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 注册路由
  router,
  render: h => h(App),
})
