import request from '@/api'

// let baseURL = 'http://127.0.0.1:8000';

// 登录
export const login = params => { return request.post(`/user/login/`, params) };
// 获取所有项目信息
export const projects_list = params => {return request.get(`/projects/?page=${params.page}&page_size=${params.size}`)};
// 更新项目信息
export const edit_project = (id, params) => {return request.put(`/projects/${id}/`, params)}
// 删除项目信息
export const del_project = (id) => {return request.delete(`/projects/${id}/`)}
