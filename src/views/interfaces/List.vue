<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>接口管理</el-breadcrumb-item>
        <el-breadcrumb-item>接口列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="deleteAll(multipleSelection)">
          批量删除
        </el-button>
        <el-input placeholder="输入筛选关键字" class="handle-input mr10" v-model="searchKeyword"></el-input>
      </div>
      <el-table class="table" ref="multipleTable" :data="interfaceData" tooltip-effect="dark" border style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" width="55"></el-table-column>
        <el-table-column prop="name" label="接口名称" width="250">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>接口名: {{ scope.row.name }}</p>
              <p>用例数: {{ scope.row.testcases }}</p>
              <p>配置数: {{ scope.row.configures }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="tester" label="测试人员" width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="project" label="所属项目" width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-video-play" @click="handleRun(scope.row)">运行</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
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

    <el-dialog title="修改接口" :visible.sync="editVisible">
      <el-form ref="editForm" :model="form" :rules="editRules">
        <el-form-item label="接口名称" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="测试人员" prop="tester">
          <el-input v-model="form.tester" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属项目" prop="programmer">
          <el-select v-model="form.project_id" placeholder="请选择所属项目">
            <el-option v-for="item in projectsName" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
import {del_interface, edit_interface, env_name, interface_list, project_name, run_by_interface} from '@/api/request'

export default {
  name: "InterfaceList",
  data() {
    return {
      interfaceData: [],
      cur_page: 1,  // 当前页码
      page_size: 10,  //每页显示数量
      total_nums: 1, // 数据总条数
      searchKeyword: '',

      envs_data: [],  // 返回的环境名称和id
      env_id: '',  // 环境id
      interface_id: -1,

      multipleSelection: [],  //选择的表单数据
      projectsName: [],

      form: {},  // 编辑dialog层数据
      editVisible: false,  //编辑dialog是否可见
      runVisible: false,  //运行dialog是否可见
      formLabelWidth: '120px',  // 表单宽度

      editRules: {
        name: [
          {required: true, message: '请输入接口名称', trigger: 'blur'},
          {max: 50, message: '接口名称长度不超过50个字符', trigger: 'blur'}
        ],
        tester: [
          {required: true, message: '请输入测试人员', trigger: 'blur'},
          {max: 50, message: '测试人员长度不超过50个字符', trigger: 'blur'}
        ],
        desc: [
          {max: 200, message: '描述不能超过200字符', trigger: 'blur'}
        ],
      },
    }
  },
  created() {
    this.getInterface();
    this.getProjectName();
  },
  methods: {
    getInterface() {
      interface_list({
        'page': this.cur_page,
        'size': this.page_size
      }).then(response => {
        this.interfaceData = response.data.results;
        this.cur_page = response.data['current_page_num'] || 1;
        this.total_nums = response.data.count || 1;
      })
    },
    getProjectName(){
      project_name().then(response => {
        this.projectsName = response.data;
      })
    },
    // 处理每页数据数据量
    handleSizeChange(val) {
      this.page_size = val;
      this.getInterface();
    },
    // 获取分页数据
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getInterface();
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
      // console.log(row);
      this.interface_id = row.id;
      this.runVisible = true;
    },
    handleEdit(row) {
      // 深copy新建地址对象，避免编辑未提交影响表单展示数据
      this.form = JSON.parse(JSON.stringify(row));
      // this.form = row;
      this.editVisible = true;
    },
    // 执行项目下测试用例
    confirmRun() {
      run_by_interface(this.interface_id, this.env_id).then(response => {
        this.$message.success(response.data.msg);
      });
      this.runVisible = false;
    },
    saveEdit(){
      console.log(this.form)
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          await edit_interface(this.form.id, this.form).then(response => {
            this.$message.success(`修改【 ${this.form.name} 】成功`);
            this.getInterface();
            this.editVisible = false;
          })
          // this.editVisible = false;
        } else {
          this.$message.error('请按提示填写');
          return false;
        }
      })
    },
    // 删除功能
    handleDel(row) {
      this.$confirm('此操作将永久删除该接口,删除不可恢复,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del_interface(row.id).then(response => {
          if (response.status === 204) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            if (this.interfaceData.length === 1 && this.cur_page !== 1) {
              this.cur_page = this.cur_page - 1
            }
            this.getInterface();
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
        this.$message.info(`请选择需删除的接口`);
      } else {
        this.$confirm('此操作将永久删除选中接口,删除不可恢复,是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < length; i++) {
            del_interface(val[i].id).then(response => {
              console.log(`删除${val[i].name}成功`);
              if (i === length - 1) {
                if (this.interfaceData.length === length && this.cur_page !== 1) {
                  this.cur_page = this.cur_page - 1
                }
                this.$message.success(`全部删除成功`);
                this.getInterface();
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
