<template>
  <div>
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>函数管理</el-breadcrumb-item>
        <el-breadcrumb-item>函数编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <h5>{{ project_name }}/debugtalk文件 </h5>
      <editor
        style="font-size: 15px"
        v-model="content"
        @init="editorInit"
        lang="python"
        theme="chrome"
        width="100%"
        height="500px"
        :options="{enableSnippets:true,enableBasicAutocompletion: true,enableLiveAutocompletion: true}">
      </editor>
    </el-row>

    <el-row class="btn_class">
      <el-button type="primary" size="medium" style="margin-right: 10px;" @click="saveBuiltin">保存</el-button>
      <el-button type="danger" size="medium" @click="toIndexPage">回到列表</el-button>
    </el-row>
  </div>
</template>

<script>
import {builtins_code, edit_debugtalks} from "@/api/request";

export default {
  name: "BuiltinEdit",
  data() {
    return {
      content: '',
      c_content: '',
      debugtalk_id: null,
      project_name: ''
    }
  },
  components: {
    editor: require('vue2-ace-editor'),
  },
  methods: {
    editorInit() {
      require('brace/ext/language_tools');
      require('brace/mode/python');
      require('brace/theme/chrome');
      require('brace/snippets/python');
    },
    getCode() {
      builtins_code(this.debugtalk_id).then(response => {
        this.content = response.data.debugtalk;
        this.project_name = response.data.project;
        this.c_content = this.content;
      })
    },
    saveBuiltin() {
      edit_debugtalks(this.debugtalk_id, this.content).then(response => {
        this.$message.success('更新成功');
        this.c_content = this.content;
        this.$router.push('/builtin/list');
      })
    },
    toIndexPage() {
      this.$router.push('/builtin/list');
    },
  },
  // 通过路由规则进入该组件被调用
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // beforeRouteEnter不能通过this访问组件实例，但是可以通过 vm 访问组件实例
      vm.debugtalk_id = to.params.id;
      vm.getCode();
    })
  },
  // 通过路由规则离开该组件被调用
  beforeRouteLeave(to, from, next) {
    if (this.c_content === this.content) {
      next();
    } else {
      this.$confirm('正在离开本页面，本页面内所有未保存数据都会丢失，是否离开', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消离开页面'
        });
      });
    }
  },
}
</script>

<style scoped>
.btn_class {
  margin-top: 20px;
}
</style>
