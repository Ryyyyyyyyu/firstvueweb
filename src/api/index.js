import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
import { Message } from 'element-ui';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

//创建实例
const request = axios.create({
  // 指定基本url地址
  // baseURL:'http://api.keyou.site:8000',
  timeout: 3000,
  // 指定请求HTTP响应码错误范围
  // status >= 200 && status < 300; // 默认的
	validateStatus: function(status) {
		return true
	},
})

// 请求拦截器
request.interceptors.request.use(function (config){
  console.log('请求拦截器开始工作了。。。')
  if (config.headers.Authorization === undefined){
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "JWT " + token;
    }
  }
  console.log(config.headers.Authorization)
  return config
}, function (error) {
  return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(function (response){
  console.log('响应拦截器开始工作了。。。')
  console.log(response)
  if (response.status === 401){
    Message.error({message:'您未登录或token已过期，请重新登录！'});
  } else if (response.status === 403){
    Message.error({message:'您暂无该权限，请申请权限操作！'});
  } else if (response.status === 404){
    Message.error({message:'请求地址不存在！！'});
  }
  return response
}, function (error) {
  console.log('error:' + error)
  // if (error.data.msg){
  //   Message.success({message:error.data.msg});
  //   }
  return Promise.reject(error)
  }
)

export default request;
