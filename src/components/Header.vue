<template>
  <div class="header">
    <div class="logo">自动化测试平台</div>
    <div class="header-right">
      <el-dropdown class="user-name" trigger="click">
      <span class="el-dropdown-link">
        {{ username }} <i class="el-icon-caret-bottom"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      username: window.localStorage.getItem('username')
    }
  }
}
</script>

<style scoped>
.logo {
  float: left;
  width: 250px;
  line-height: 70px;
}

.header-right {
  float: right;
  padding-right: 5px;
}

</style>
