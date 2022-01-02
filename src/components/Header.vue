<template>
  <div class="header">
    <div class="title">自动化测试平台</div>
    <div class="header-right">
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ username }}<i class="el-icon-caret-bottom"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
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
  },
  methods:{
      handleCommand(command){
        console.log(command)
        if(command === 'logout'){
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('username')
          this.$router.push('/login')
        }
      }
    }
}
</script>

<style scoped>
.title {
  float: left;
  width: 70%;
  font: normal 28px/60px "microsoft yahei";
}

.header-right {
  float: right;
  font: normal 28px/60px "microsoft yahei";
  height: 60px;
  width: 100px;
  padding: 0;
  text-align: center;
}

.user-name{
  height: 55px;
}

</style>
