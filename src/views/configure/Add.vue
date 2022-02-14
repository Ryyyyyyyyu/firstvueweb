<template>
  <div>
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>配置管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>



  </div>
</template>

<script>
export default {
  name: "ConfigureAdd"
}
</script>

<style scoped>

</style>
