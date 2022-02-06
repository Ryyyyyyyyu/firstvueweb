import request from '@/api'

// let baseURL = 'http://127.0.0.1:8000';

// 登录
export const login = params => {
  return request.post(`/user/login/`, params)
};

// 获取所有项目信息
export const projects_list = params => {
  if(params.name){
    return request.get(`/projects/?page=${params.page}&page_size=${params.size}&name=${params.name}`)
  }else {
    return request.get(`/projects/?page=${params.page}&page_size=${params.size}`)
  }
};
// 新增项目
export const add_project = params => {
  return request.post(`/projects/`, params)
}
// 更新项目信息
export const edit_project = (id, params) => {
  return request.put(`/projects/${id}/`, params)
};
// 删除项目信息
export const del_project = (id) => {
  return request.delete(`/projects/${id}/`)
};
// 运行项目下测试用例
export const run_by_project = (project_id, env_id) => {
  return request.post(`/projects/${project_id}/run/`, {"env_id": env_id})
};
// 获取所有项目的ID和名称
export const project_name = () => {
  return request.get(`/projects/names/`)
};

// 获取所有接口信息
export const interface_list = params => {
  return request.get(`/interfaces/?page=${params.page}&page_size=${params.size}`)
};
// 新增接口
export const add_interface = params => {
  return request.post(`/interfaces/`, params)
}
// 更新接口信息
export const edit_interface = (id, params) => {
  return request.put(`/interfaces/${id}/`, params)
};
// 删除接口信息
export const del_interface = (id) => {
  return request.delete(`/interfaces/${id}/`)
};
// 运行接口下测试用例
export const run_by_interface = (interface_id, env_id) => {
  return request.post(`/interfaces/${interface_id}/run/`, {"env_id": env_id})
};

// 获取所有环境变量的ID和名称
export const env_name = () => {
  return request.get(`/envs/names/`)
};
// 获取环境列表
export const envs_list = (params) => {
  return request.get(`/envs/?page=${params.page}&page_size=${params.size}`)
};
