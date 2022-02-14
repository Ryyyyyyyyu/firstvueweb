<template>
  <div id="app">
    <!--    将组件渲染到该地方-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}

.crumbs {
  padding-bottom: 20px;
}

.mr10 {
  margin-right: 10px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.red {
  color: #ff0000;
}
</style>
