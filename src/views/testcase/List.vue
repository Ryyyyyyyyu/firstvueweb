<template>
  <div>
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用例管理</el-breadcrumb-item>
        <el-breadcrumb-item>用例列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="">
          批量删除
        </el-button>
        <el-input placeholder="输入筛选关键字" class="handle-input mr10" v-model="searchKeyword"></el-input>
      </div>

      <el-table class="table" ref="multipleTable" :data="testcaseData" tooltip-effect="dark" border style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="id" label="id" width="55"></el-table-column>

        <el-table-column prop="name" label="用例名称">
        </el-table-column>

        <el-table-column prop="interface.project" label="所属项目">
        </el-table-column>

        <el-table-column prop="interface.name" label="所属接口">
        </el-table-column>

        <el-table-column prop="author" label="测试人员" width="100">
        </el-table-column>

        <el-table-column prop="create_time" label="创建时间" sortable align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="update_time" label="更新时间" sortable align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="name" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-video-play" @click="handleRun(scope.row)">运行</el-button>
            <el-button type="text" icon="el-icon-edit" @click="linkTo(scope.row.id)">编辑</el-button>
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

    <!--运行dialog-->
    <el-dialog title="选择运行环境" :visible.sync="runVisible">
      <el-form>
        <el-form-item label="运行环境" :label-width="formLabelWidth">
          <el-select v-model="env_id" placeholder="请选择运行环境" clearable>
            <el-option v-for="item in envs_data" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="runVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmRun">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {del_testcases, env_name, run_by_testcases, testcases_list} from '@/api/request'

export default {
  name: "TestcaseList",
  data() {
    return {
      testcaseData: [],
      cur_page: 1,  // 当前页码
      page_size: 10,  //每页显示数量
      total_nums: 1, // 数据总条数
      searchKeyword: '',

      envs_data: [],  // 返回的环境名称和id
      env_id: '',  // 环境id
      multipleSelection: [],  //选择的表单数据
      testcase_id: "",

      runVisible: false,  //运行dialog是否可见
      formLabelWidth: '120px',  // 表单宽度
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      testcases_list({
        'page': this.cur_page,
        'size': this.page_size
      }).then(response => {
        this.testcaseData = response.data.results;
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
      console.log(val);
      this.multipleSelection = val;
    },
    // 运行页面
    handleRun(row) {
      this.env_id = '';
      env_name().then(response => {
        this.envs_data = response.data;
      });
      this.testcase_id = row.id;
      this.runVisible = true;
    },
    // 执行项目下测试用例
    confirmRun() {
      run_by_testcases(this.testcase_id, this.env_id).then(response => {
        this.$message.success(response.data.msg);
      });
      this.runVisible = false;
    },
    // 跳转编辑测试用例页面
    linkTo(id) {
      this.$router.push({path: `/testcase/edit/${id}`});
    },
    // 删除功能
    handleDel(row) {
      this.$confirm('此操作将永久删除该用例,删除不可恢复,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del_testcases(row.id).then(response => {
          if (response.status === 204) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            if (this.testcaseData.length === 1 && this.cur_page !== 1) {
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
        this.$message.info(`请选择需删除的用例`);
      } else {
        this.$confirm('此操作将永久删除选中用例,删除不可恢复,是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < length; i++) {
            del_testcases(val[i].id).then(response => {
              console.log(`删除${val[i].name}成功`);
              if (i === length - 1) {
                if (this.testcaseData.length === length && this.cur_page !== 1) {
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
.red {
  color: #ff0000;
}
</style>
