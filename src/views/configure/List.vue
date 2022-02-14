<template>
  <div>
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>配置管理</el-breadcrumb-item>
        <el-breadcrumb-item>配置列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="deleteAll(multipleSelection)">
          批量删除
        </el-button>
        <el-input placeholder="输入筛选关键字" class="handle-input mr10" v-model="searchKeyword"
                  @keyup.enter.native=""></el-input>
      </div>
      <!--表格数据展示-->
      <el-table class="table" ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="id" label="id" width="55"></el-table-column>

        <el-table-column prop="name" label="配置名称" width="200">
        </el-table-column>

        <el-table-column prop="interface.project" label="所属项目" width="200">
        </el-table-column>

        <el-table-column prop="interface.name" label="所属接口" width="200">
        </el-table-column>

        <el-table-column prop="author" label="编辑人员" width="100" align="center">
        </el-table-column>

        <el-table-column prop="create_time" label="创建时间" sortable show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="update_time" label="更新时间" sortable show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDel(scope.row)">删除</el-button>
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
import {configures_list, del_configures, del_project} from "@/api/request";

export default {
  name: "ConfigureList",
  data() {
    return {
      tableData: [],
      cur_page: 1,  // 当前页码
      page_size: 10,  //每页显示数量
      total_nums: 1, // 数据总条数

      multipleSelection: [],  //选择的表单数据
      form: {},  // 编辑dialog层数据
      searchKeyword: '',  // 搜索关键字
    }
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取所有配置信息
    getData() {
      configures_list({
        'page': this.cur_page,
        'size': this.page_size
      }).then(response => {
        this.tableData = response.data.results;
        this.cur_page = response.data['current_page_num'] || 1;
        this.total_nums = response.data.count || 1;
      })
    },
    // 处理每页数据数据量
    handleSizeChange(val) {
      this.page_size = val;
      this.getData();
    },
    // 获取分页数据
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 表单选择
    handleSelectionChange(val) {
      // console.log(val)
      this.multipleSelection = val;
    },
    // 删除功能
    handleDel(row) {
      this.$confirm('此操作将永久删除该配置,删除不可恢复,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del_project(row.id).then(response => {
          if (response.status === 204) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            if (this.tableData.length === 1 && this.cur_page !== 1) {
              this.cur_page = this.cur_page - 1
            }
            this.getData();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 删除选中的数据
    deleteAll(val) {
      // console.log(val);
      const length = this.multipleSelection.length;
      if (length === 0) {
        this.$message.info(`请选择需删除的配置`);
      } else {
        this.$confirm('此操作将永久删除选中配置,删除不可恢复,是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < length; i++) {
            del_configures(val[i].id).then(response => {
              console.log(`删除${val[i].name}成功`);
              if (i === length - 1) {
                if (this.tableData.length === length && this.cur_page !== 1) {
                  this.cur_page = this.cur_page - 1
                }
                this.$message.success(`全部删除成功`);
                this.getData();
              }
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
  }
}
</script>

<style scoped>

</style>
