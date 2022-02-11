<template>
  <div>
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用例管理</el-breadcrumb-item>
        <el-breadcrumb-item>用例新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="选择项目">
                <el-select v-model="form.project" placeholder="请选择项目">
                  <el-option label="区域一" value="project_id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择接口">
                <el-select v-model="form.region" placeholder="请选择接口">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择配置">
                <el-select v-model="form.region" placeholder="请选择配置">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
              <el-transfer v-model="value" :data="data">
                <el-tree
                  :props="props"
                  :load="loadNode"
                  lazy
                  show-checkbox
                  @check-change="handleCheckChange">
                </el-tree>
              </el-transfer>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
export default {
  name: "TestcaseAdd",
  data() {
    return {
      activeName: 'first',
      form: {},
      value: [],
      data: [],
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{name: 'region1'}, {name: 'region2'}]);
      }
      if (node.level > 3) return resolve([]);

      let hasChild;
      if (node.data.name === 'region1') {
        hasChild = true;
      } else if (node.data.name === 'region2') {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        let data;
        if (hasChild) {
          data = [{
            name: 'zone' + this.count++
          }, {
            name: 'zone' + this.count++
          }];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    }
  }
}
</script>

<style scoped>

</style>
