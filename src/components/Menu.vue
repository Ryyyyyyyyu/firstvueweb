<template>
  <el-aside width="200px">
    <el-menu class="menu" router>

      <el-menu-item :index="item.path" v-for="(item, index) in this.$router.options.routes" :key="index"
                  v-if="!item.hidden && !item.children">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>

      <el-submenu :index="item.path" v-for="(item, index) in this.$router.options.routes" :key="index"
                  v-if="!item.hidden && item.children">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item :index="children.path"
                      v-for="(children, index1) in item.children" :key="index1">
          <span>{{ children.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>

  </el-aside>
</template>

<script>
export default {
  name: "Menu",
  data(){
    return {

    }
  }
}
</script>

<style scoped>

</style>
