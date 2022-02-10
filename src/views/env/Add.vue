<template>
  <div>
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>环境管理</el-breadcrumb-item>
        <el-breadcrumb-item>环境新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-form ref="form" :rules="rulesForm" :model="envForm" label-width="80px">
        <el-form-item label="接口名称" prop="name">
          <el-input v-model="envForm.name"></el-input>
        </el-form-item>
        <el-form-item label="请求地址" prop="base_url">
          <el-input v-model="envForm.base_url"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="desc">
          <el-input v-model="envForm.desc" type="textarea" :rows="2" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(envForm)">提交</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import {add_env} from "@/api/request";

export default {
  name: "EnvAdd",
  data() {
    return {
      envForm: {
        name: '',  // 环境名称
        base_url: '',  // base_url
        desc: '',  // 简要描述
      },

      rulesForm: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'},
          {max: 50, message: '名称长度不超过50个字符', trigger: 'blur'}
        ],
        base_url: [
          {required: true, message: '请输入请求base url', trigger: 'blur'}
        ],
        desc: [
          {required: true, message: '请输入简要描述', trigger: 'blur'}
        ],
      },
    }
  },
  methods: {
    onSubmit(interfaceForm) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          add_env(interfaceForm).then(response => {
            if (response.status === 201) {
              this.$message.success('新增成功！');
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
