<template>
  <div>
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>接口管理</el-breadcrumb-item>
        <el-breadcrumb-item>接口新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-form ref="form" :rules="rulesForm" :model="interfaceForm" label-width="80px">
        <el-form-item label="接口名称" prop="name">
          <el-input v-model="interfaceForm.name"></el-input>
        </el-form-item>
        <el-form-item label="测试人员" prop="tester">
          <el-input v-model="interfaceForm.tester"></el-input>
        </el-form-item>
        <el-form-item label="所属项目" prop="project_id">
          <el-select v-model="interfaceForm.project_id" placeholder="请选择所属项目">
            <el-option v-for="item in projectsName" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目描述" prop="desc">
          <el-input v-model="interfaceForm.desc" type="textarea" :rows="2" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(interfaceForm)">提交</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import {add_interface, project_name} from "@/api/request";

export default {
  name: "InterfaceAdd",
  data() {
    return {
      interfaceForm: {
        name: '',
        tester: '',
        project_id: '',
        desc: ''
      },
      projectsName: [],
      rulesForm: {
        name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'},
          {max: 50, message: '项目名称长度不超过50个字符', trigger: 'blur'}
        ],
        tester: [
          {required: true, message: '请输入测试人员', trigger: 'blur'},
          {max: 50, message: '测试人员长度不超过50个字符', trigger: 'blur'}
        ],
        project_id: [
          {required: true, message: '请选择所属项目', trigger: 'blur'}
        ],
        desc: [
          {max: 200, message: '描述不能超过200字符', trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.getProjectName();
  },
  methods: {
    getProjectName() {
      project_name().then(response => {
        this.projectsName = response.data;
      })
    },
    // 提交项目信息
    onSubmit(interfaceForm) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          add_interface(interfaceForm).then(response => {
            if (response.status === 201) {
              this.$message.success('新增接口成功！');
              setTimeout(() => {
                // console.log(this.$refs)
                // 创建成功后清理表单数据
                this.$refs['form'].resetFields();
              }, 1000);
            } else {
              // console.log(response.data)
              this.$message.error(JSON.stringify(response.data));
            }
          })
        } else {
          // this.$message.error('参数有误');
          return false;
        }
      });
    },
    // 重置方法
    resetForm(form) {
      // console.log(this.$refs);
      this.$refs[form].resetFields();
    },
  }
}
</script>

<style scoped>

</style>
