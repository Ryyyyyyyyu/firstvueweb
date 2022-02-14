<template>
  <div>
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用例管理</el-breadcrumb-item>
        <el-breadcrumb-item>用例新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="选择项目">
                <el-select v-model="form.project_id" @change="getInterfaceName()" placeholder="请选择项目">
                  <el-option v-for="item in projects_name" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择接口">
                <el-select v-model="form.interface_id" placeholder="请选择接口">
                  <el-option v-for="item in interfaces_name" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择配置">
                <el-select v-model="form.region" placeholder="请选择配置">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import {project_name, project_interfaces} from '@/api/request'

export default {
  name: "TestcaseAdd",
  data() {
    return {
      activeName: 'first',
      form: {
        project_id: '',
        interface_id:''
      },
      projects_name: [],
      interfaces_name: []
    };
  },
  mounted() {
    this.getProjectName();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getProjectName() {
      project_name().then(response => {
        this.projects_name = response.data;
      })
    },
    // 改变项目时获取该项目下所有接口名
    getInterfaceName() {
      this.form.interface_id = '';
      project_interfaces(this.form.project_id).then(response => {
        this.interfaces_name = response.data;
      })
    },
  }
}
</script>

<style scoped>

</style>
