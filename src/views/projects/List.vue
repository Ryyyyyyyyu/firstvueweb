<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10">批量删除</el-button>
        <el-input placeholder="输入筛选关键字" class="handle-input mr10"></el-input>
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" width="55"></el-table-column>
        <el-table-column prop="name" label="项目名称" width="120">
        </el-table-column>
        <el-table-column prop="leader" label="项目负责人" width="100">
        </el-table-column>
        <el-table-column prop="publish_app" label="应用名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="tester" label="测试人员" width="55" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-video-play">运行</el-button>
            <el-button type="text" icon="el-icon-edit">编辑</el-button>
            <el-button type="text" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  data() {
    return {
      tableData: [{
        "id": 1,
        "name": "自动化测试平台项目",
        "leader": "可可",
        "tester": "优优",
        "programmer": "可优",
        "publish_app": "自动化测试平台应用",
        "desc": "该平台当前主要用于接口自动化测试.",
        "is_valid": true,
        "create_time": "2019-11-06 14:21:19",
        "update_time": "2019-11-06 14:43:13",
        "interfaces": 4,
        "testsuits": 1,
        "testcases": 5,
        "configures": 2
      }]
    }
  }
}
</script>

<style scoped>
.handle-input {
  width: 300px;
  display: inline-block;
}

.mr10 {
  margin-right: 10px;
}
</style>
