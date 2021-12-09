<template>
  <div class="common-layout-1">
    <el-container>
      <Menu></Menu>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
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

</style>
