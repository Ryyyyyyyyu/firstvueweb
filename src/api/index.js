import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
import { Message } from 'element-ui';

// axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

//创建实例
const request = axios.create({
  // 指定基本url地址
  baseURL:'http://api.keyou.site:8000',
  timeout: 3000,
  // 指定请求HTTP响应码错误范围
  // status >= 200 && status < 300; 默认的
	// validateStatus: function(status) {
	// 	return true
	// },
})

// 请求拦截器
request.interceptors.request.use(function (config){
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
  console.log(response)
  if (response.status === 200){
    if (response.data.msg){
    Message.success({message:response.data.msg});
    }
  }
  return response
}, function (error) {
  console.log('error:' + error)
  if (error.data.msg){
    Message.success({message:error.data});
    }
  return Promise.reject(error)
  }
)

export default request;
