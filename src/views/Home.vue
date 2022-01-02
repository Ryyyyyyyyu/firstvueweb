<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menu></Menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "../components/Menu";
import Header from "../components/Header";

export default {
  name: "Home",
  components: {Menu, Header},
}
</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
}

.el-header{
  background: #409EFF;
  margin: 3px;
  padding: 0;
}

</style>
