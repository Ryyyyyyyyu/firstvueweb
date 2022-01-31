<template>
  <div class="table">
    <div class="crumbs">
      <!--   面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10">批量删除</el-button>
        <el-input placeholder="输入筛选关键字" class="handle-input mr10" v-model="searchKeyword"
                  @keyup.enter="searchProjects"></el-input>
      </div>
      <!--表格数据展示-->
      <el-table class="table" ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" width="55"></el-table-column>
        <el-table-column prop="name" label="项目名称" width="200">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>项目名: {{ scope.row.name }}</p>
              <p>接口数: {{ scope.row.interfaces }}</p>
              <p>套件数: {{ scope.row.testsuits }}</p>
              <p>用例数: {{ scope.row.testcases }}</p>
              <p>配置数: {{ scope.row.configures }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="leader" label="项目负责人" width="100">
        </el-table-column>
        <el-table-column prop="publish_app" label="应用名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="tester" label="测试人员" width="80" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间" sortable show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
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
          :page-sizes="[10, 20, 50, 100]"
          :page-size=page_size
          layout="total, sizes, prev, pager, next, jumper"
          :total=total_nums>
        </el-pagination>
      </div>
    </div>

    <!--  编辑dialog  -->
    <el-dialog title="修改项目" :visible.sync="editVisible">
      <el-form :model="form" :rules="editRules">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" prop="leader">
          <el-input v-model="form.leader" clearable></el-input>
        </el-form-item>
        <el-form-item label="测试人员" prop="tester">
          <el-input v-model="form.tester" clearable></el-input>
        </el-form-item>
        <el-form-item label="开发人员" prop="programmer">
          <el-input v-model="form.programmer" clearable></el-input>
        </el-form-item>
        <el-form-item label="发布应用" prop="publish_app">
          <el-input v-model="form.publish_app" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="desc">
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
import {del_project, edit_project, projects_list, env_name, run_by_project} from '@/api/request'

export default {
  name: "ProjectList",
  data() {
    return {
      tableData: [],
      cur_page: 1,  // 当前页码
      page_size: 10,  //每页显示数量
      total_nums: 1, // 数据总条数

      form: {},  // 编辑dialog层数据
      editVisible: false,  //编辑dialog是否可见
      runVisible: false,  //运行dialog是否可见
      formLabelWidth: '120px',  // 表单宽度

      searchKeyword: '',  // 搜索关键字
      envs_data: [],  // 返回的环境名称和id
      env_id: '',  // 环境id
      project_id : -1,

      // 编辑表单校验规则
      editRules: {
        name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'},
          {max: 50, message: '项目名称长度不超过50个字符', trigger: 'blur'}
        ],
        leader: [
          {required: true, message: '请输入项目负责人', trigger: 'blur'},
          {max: 20, message: '项目负责人长度不超过20个字符', trigger: 'blur'}
        ],
        tester: [
          {required: true, message: '请输入测试人员', trigger: 'blur'},
          {max: 50, message: '测试人员长度不超过50个字符', trigger: 'blur'}
        ],
        programmer: [
          {required: true, message: '请输入开发人员', trigger: 'blur'},
          {max: 50, message: '开发人员长度不超过50个字符', trigger: 'blur'}
        ],
        publish_app: [
          {required: true, message: '请输入发布应用名称', trigger: 'blur'},
          {max: 100, message: '发布应用名称长度不超过100个字符', trigger: 'blur'}
        ],
        desc: [
          {max: 200, message: '描述不能超过200字符', trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取所有项目信息
    getData() {
      projects_list({
        'page': this.cur_page,
        'size': this.page_size
      }).then(response => {
        this.tableData = response.data.results;
        this.cur_page = response.data.current_page_num || 1;
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
    // 运行页面
    handleRun(row) {
      this.env_id = '';
      env_name().then(response => {
        this.envs_data = response.data;
      });
      // console.log(row);
      this.project_id = row.id;
      this.runVisible = true;
    },
    // 编辑功能
    handleEdit(row) {
      // 深copy新建地址对象，避免编辑未提交影响表单展示数据
      this.form = JSON.parse(JSON.stringify(row));
      // this.form = row;
      this.editVisible = true;
    },
    // 删除功能
    handleDel(row) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del_project(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 编辑按钮保存功能
    saveEdit() {
      edit_project(this.form.id, this.form).then(response => {
        this.$message.success(`修改【 ${this.form.name} 】成功`);
        this.getData();
        this.editVisible = false;
      })
      // this.editVisible = false;
    },
    // 执行项目下测试用例
    confirmRun(){
      run_by_project(this.project_id, this.env_id).then(response =>{
        this.$message.success(response.data.msg);
      });
      this.runVisible = false;
    },
    searchProjects() {
      // TODO
    },
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.crumbs {
  padding-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.del-dialog-cnt {
  font-size: 16px;
  text-align: center
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}
</style>
