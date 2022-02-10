<template>
  <div>
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>函数管理</el-breadcrumb-item>
        <el-breadcrumb-item>函数列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-search" class="handle-del mr10" @click="">
          搜索
        </el-button>
        <el-input placeholder="输入筛选关键字" class="handle-input mr10" v-model="searchKeyword"></el-input>
      </div>
      <el-table :data="data" border class="table" ref="multipleTable" stripe>
        <el-table-column prop="id" label="id" width="55">
        </el-table-column>

        <el-table-column prop="project" label="项目名称">
        </el-table-column>

        <el-table-column prop="create_time" label="创建时间" sortable align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="update_time" label="更新时间" sortable align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="name" label="内置函数名" align="center">
          <template slot-scope="scope">
            <el-link icon="el-icon-edit" type="primary" @click="linkTo(scope.row.id)">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination" style="margin-top: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="cur_page"
          :page-sizes="[3, 10, 20, 50, 100]"
          :page-size="page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total=total_nums>
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import {debugtalk_list} from "@/api/request";

export default {
  name: "BuiltinList",
  data() {
    return {
      data: [],
      cur_page: 1,  // 当前页码
      page_size: 10,  //每页显示数量
      total_nums: 1, // 数据总条数

      searchKeyword: '',
    }
  },
  created() {
    this.getDebugtalk()
  },
  methods: {
    getDebugtalk() {
      debugtalk_list({
        'page': this.cur_page,
        'size': this.page_size
      }).then(response => {
        this.data = response.data.results;
        this.cur_page = response.data["current_page_num"] || 1;
        this.total_nums = response.data.count || 1;
      })
    },
    // 处理每页数据数据量
    handleSizeChange(val) {
      this.page_size = val;
      this.getDebugtalk();
    },
    // 获取分页数据
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getDebugtalk();
    },
    linkTo(id) {
      // console.log(id);
      // console.log(this.$router);
      this.$router.push({path: `/builtin/edit/${id}`});
    }
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
</style>
