import request from '@/api'

// let baseURL = 'http://127.0.0.1:8000';

// 登录
export const login = params => {
  return request.post(`/user/login/`, params)
};

// 获取所有项目信息
export const projects_list = params => {
  if (params.name) {
    return request.get(`/projects/?page=${params.page}&page_size=${params.size}&name=${params.name}`)
  } else {
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
// 获取项目下所有的ID和名称
export const project_interfaces = (project_id) => {
  return request.get(`/projects/${project_id}/interfaces/`)
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
// 获取所有接口的ID和名称
export const interface_name = (project_id) => {
  if (project_id) {
    return request.get(`/interfaces/names/?project_id=${project_id}`)
  } else{
    return request.get(`/interfaces/names/`)
  }
};


// 新增环境信息
export const add_env = params => {
  return request.post(`/envs/`, params)
}
// 更新环境信息
export const edit_env = (id, params) => {
  return request.put(`/envs/${id}/`, params)
};
// 删除环境信息
export const del_env = (id) => {
  return request.delete(`/envs/${id}/`)
};
// 获取所有环境变量的ID和名称
export const env_name = () => {
  return request.get(`/envs/names/`)
};
// 获取环境列表
export const envs_list = (params) => {
  return request.get(`/envs/?page=${params.page}&page_size=${params.size}`)
};

//获取debugtalks列表
export const debugtalk_list = params => {
  return request.get(`/debugtalks/?page=${params.page}&page_size=${params.size}`)
};
//获取debugtalks函数源码
export const builtins_code = id => {
  return request.get(`/debugtalks/${id}/`)
};
// 更新debugtalks
export const edit_debugtalks = (id, params) => {
  return request.put(`/debugtalks/${id}/`, {'debugtalk': params})
};

// 获取用例列表
export const testcases_list = params => {
  return request.get(`/testcases/?page=${params.page}&page_size=${params.size}`)
};
// 运行测试用例
export const run_by_testcases = (testcases_id, env_id) => {
  return request.post(`/testcases/${testcases_id}/run/`, {"env_id": env_id})
};
// 删除测试用例
export const del_testcases = (id) => {
  return request.delete(`/testcases/${id}/`)
};

// 获取配置列表
export const configures_list = params => {
  return request.get(`/configures/?page=${params.page}&page_size=${params.size}`)
};
// 删除配置信息
export const del_configures = (id) => {
  return request.delete(`/configures/${id}/`)
};
