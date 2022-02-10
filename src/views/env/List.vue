<template>
  <div>
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>环境管理</el-breadcrumb-item>
        <el-breadcrumb-item>环境列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="deleteAll(multipleSelection)">
          批量删除
        </el-button>
        <el-input placeholder="输入筛选关键字" class="handle-input mr10" v-model="searchKeyword"></el-input>
      </div>
      <el-table :data="envData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange"
                stripe>
        <el-table-column type="selection" width="55" align="center"></el-table-column>

        <el-table-column prop="id" label="id" width="55"></el-table-column>

        <el-table-column prop="name" label="环境名称" width="200">
        </el-table-column>

        <el-table-column prop="base_url" label="base_url" width="250" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="desc" label="描述" width="200" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="create_time" label="创建时间" sortable align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="update_time" label="更新时间" sortable align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDel(scope.row)">删除
            </el-button>
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

    <el-dialog title="修改接口" :visible.sync="editVisible">
      <el-form ref="editForm" :model="form" :rules="editRules">
        <el-form-item label="接口名称" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="base_url" prop="base_url">
          <el-input v-model="form.base_url" clearable></el-input>
        </el-form-item>
        <el-form-item label="接口描述" prop="desc">
          <el-input v-model="form.desc" type="textarea" :rows="2" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {del_env, edit_env, envs_list} from "@/api/request";

export default {
  name: "EnvList",
  data() {
    return {
      envData: [],
      cur_page: 1,  // 当前页码
      page_size: 10,  //每页显示数量
      total_nums: 1, // 数据总条数

      editVisible: false,  //编辑dialog是否可见

      searchKeyword: '',
      multipleSelection: [],  //选择的表单数据
      form: {},  // 编辑dialog层数据

      editRules: {}
    }
  },
  created() {
    this.getEnv();
  },
  methods: {
    getEnv() {
      envs_list({
        'page': this.cur_page,
        'size': this.page_size
      }).then(response => {
        this.envData = response.data.results;
        this.cur_page = response.data['current_page_num'] || 1;
        this.total_nums = response.data.count || 1;
      })
    },
    // 处理每页数据数据量
    handleSizeChange(val) {
      this.page_size = val;
      this.getEnv();
    },
    // 获取分页数据
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getEnv();
    },
    // 表单选择
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    handleEdit(row) {
      // 深copy新建地址对象，避免编辑未提交影响表单展示数据
      this.form = JSON.parse(JSON.stringify(row));
      // this.form = row;
      this.editVisible = true;
    },
    // 删除功能
    handleDel(row) {
      this.$confirm('此操作将永久删除该环境,删除不可恢复,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del_env(row.id).then(response => {
          if (response.status === 204) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            if (this.envData.length === 1 && this.cur_page !== 1) {
              this.cur_page = this.cur_page - 1
            }
            this.getEnv();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    saveEdit() {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          await edit_env(this.form.id, this.form).then(response => {
            this.$message.success(`修改【 ${this.form.name} 】成功`);
            this.getEnv();
            this.editVisible = false;
          })
          // this.editVisible = false;
        } else {
          this.$message.error('请按提示填写');
          return false;
        }
      })
    },
    // 删除选中的数据
    deleteAll(val) {
      // console.log(val);
      const length = this.multipleSelection.length;
      if (length === 0) {
        this.$message.info(`请选择需删除的环境`);
      } else {
        this.$confirm('此操作将永久删除选中环境,删除不可恢复,是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < length; i++) {
            del_env(val[i].id).then(response => {
              console.log(`删除${val[i].name}成功`);
              if (i === length - 1) {
                if (this.envData.length === length && this.cur_page !== 1) {
                  this.cur_page = this.cur_page - 1
                }
                this.$message.success(`全部删除成功`);
                this.getEnv();
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
.handle-box {
  margin-bottom: 20px;
}

.red {
  color: #ff0000;
}
</style>
