import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

//创建实例
const request = axios.create({
  // 指定基本url地址
  baseURL:'http://api.keyou.site:8000',
  // 指定请求HTTP响应码错误范围
  // status >= 200 && status < 300; 默认的
	// validateStatus: function(status) {
	// 	return true
	// },
})

// 请求拦截器
axios.interceptors.request.use(function (config){
  console.log(config)
  return config
})

// 响应拦截器
axios.interceptors.response.use(function (response){
  console.log(response)
  return response
})

export default request;
