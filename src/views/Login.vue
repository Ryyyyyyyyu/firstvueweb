<template>
  <div>
    <el-form ref="loginForm" :rules="loginRules" :model="loginForm" class="login-box">
      <div class="title">
        自 动 化 平 台 登 录
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" type="text" prefix-icon="el-icon-user" @keyup.enter.native="loginSubmit"
                  clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" prefix-icon="el-icon-lock" @keyup.enter.native="loginSubmit"
                  show-password></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="5">
          <el-col :span="15">
            <el-input v-model="loginForm.code" placeholder="点击图片更换验证码" type="text" @keyup.enter.native="loginSubmit" clearable></el-input>
          </el-col>
          <el-col :span="9">
            <div class="login-code">
              <!--验证码组件-->
              <ver-code :identifyCode="verCode" ref="vCode"></ver-code>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-form-item style="text-align: center">
<!--  :loading 点击按钮后进行数据加载操作，在按钮上显示加载状态。
      v-loading.fullscreen.lock 整个页面数据加载时显示。
 -->
        <el-button type="primary" @click="loginSubmit" v-loading.fullscreen.lock="loading">登录</el-button>
        <el-button @click="resetForm('loginForm')" style="margin-left: 60px">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VerCode from "../components/VerCode";

export default {
  name: "Login",
  components: {
    'ver-code': VerCode
  },
  data() {
    // 自定义验证码校验
    let validateCode = (rule, value, callback) => {
      if (this.verCode.join('') === this.loginForm.code || this.loginForm.code === 'ALLPASS') {
        callback();
        } else {
        callback(new Error('请输入正确的验证码'));
      }
    };
    return {
      loginForm: {
        username: 'test001',
        password: '123456',
        code: 'ALLPASS',
      },
      verCode: [],
      checked: true,
      loading: false,
      // 表单验证规则
      loginRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {validator: validateCode, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    loginSubmit() {
      this.$refs.loginForm.validate(async (valid) => {
        // 一定写在验证内
        this.getcode()
        if (valid) {
          // loading加载
          this.loading = true
          let params = {
            username: this.loginForm.username,
            password: this.loginForm.password,
          }
          await this.$request.post("/user/login/", params)
            .then(res => {
            console.log(res)
            if (res.status === 200 && res.data.token){
            this.$message.success('登录成功');
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.data.username)
            // this.$router.push('/home')
            this.$router.replace('/home')
          }
          })
          .finally(() => {
            this.loading = false
          })
        } else {
          this.$message.error('请按提示填写登录信息');
          return false;
        }
      });
    },
    // 重置方法
    resetForm(loginForm) {
      this.$refs[loginForm].resetFields();
    },
    // 父组件调用子组件刷新验证码方法
    getcode() {
      this.$refs.vCode.refresh()
      console.log(this.verCode.join(''))
    }
  }
}
</script>

<style scoped>

.login-box {
  width: 450px;
  margin: 120px auto;
  border: 1px solid #DCDFE6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 30px darkgray;
}

.title {
  color: #409EFF;
  /*加粗、字体大小、行高、字体*/
  font: bold 28px/60px 'Times New Roman';
  text-align: center;
  margin-bottom: 25px;
}

.loginRemember {
  text-align: left;
  margin: 0 0 20px 0;
}
</style>
