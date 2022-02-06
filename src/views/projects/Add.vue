<template>
  <div>
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form ref="form" :rules="rulesForm" :model="projectForm" label-width="80px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="leader">
          <el-input v-model="projectForm.leader"></el-input>
        </el-form-item>
        <el-form-item label="测试人员" prop="tester">
          <el-input v-model="projectForm.tester"></el-input>
        </el-form-item>
        <el-form-item label="开发人员" prop="programmer">
          <el-input v-model="projectForm.programmer"></el-input>
        </el-form-item>
        <el-form-item label="发布应用" prop="publish_app">
          <el-input v-model="projectForm.publish_app"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="desc">
          <el-input v-model="projectForm.desc" type="textarea" :rows="2" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(projectForm)">提交</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {add_project} from '@/api/request'

export default {
  name: "ProjectAdd",
  data() {
    return {
      projectForm: {
        name: '',
        leader: '',
        tester: '',
        programmer: '',
        publish_app: '',
        desc: ''
      },
      rulesForm:{
      name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'},
          {max: 50, message: '项目名称长度不超过50个字符', trigger: 'blur'}
        ],
        leader: [
          {required: true, message: '请输入项目负责人', trigger: 'blur'},
          {max: 20, message: '项目负责人长度不超过20个字符', trigger: 'blur'}
        ],
        tester: [
          {required: true, message: '请输入测试人员', trigger: 'blur'},
          {max: 50, message: '测试人员长度不超过50个字符', trigger: 'blur'}
        ],
        programmer: [
          {required: true, message: '请输入开发人员', trigger: 'blur'},
          {max: 50, message: '开发人员长度不超过50个字符', trigger: 'blur'}
        ],
        publish_app: [
          {required: true, message: '请输入发布应用名称', trigger: 'blur'},
          {max: 100, message: '发布应用名称长度不超过100个字符', trigger: 'blur'}
        ],
        desc: [
          {max: 200, message: '描述不能超过200字符', trigger: 'blur'}
        ],
    }
    };
  },
  methods: {
    // 提交项目信息
    onSubmit(projectForm) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          add_project(projectForm).then(response => {
            if(response.status === 201){
              this.$message.success('新增项目成功！');
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
.crumbs {
  padding-bottom: 20px;
}

.container {
  width: 500px;
}
</style>
