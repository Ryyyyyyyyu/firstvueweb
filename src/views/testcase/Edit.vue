<template>
  <div>
    <div class="crumbs">
    <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用例管理</el-breadcrumb-item>
        <el-breadcrumb-item>用例编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestcaseEdit"
}
</script>

<style scoped>

</style>
