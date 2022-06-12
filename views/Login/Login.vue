<template>
  <div class="container">
    <div class="login">
      <div class="head">
        登录
      </div>
      <div class="form">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
        >
          <el-form-item
            label="账号"
            prop="num"
          >
            <el-input
              v-model="ruleForm.num"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              v-model="ruleForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm(ruleForm)"
            >登录</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      ruleForm: {
        num: '',
        password: ''
      },
      rules: {
        num: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 2, max: 10, message: '账号长度为3-10位！', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations('loginModule', ['setUser']),
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.login()
        } else {
          // console.log('error submit!')
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    async login() {
      const { data: res } = await this.$http({
        method: 'post',
        url: '/api/login',
        data: {
          username: this.ruleForm.num,
          password: this.ruleForm.password
        },
        transformRequest: [
          function (data) {
            return qs.stringify(data)
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          // 'Content-Type': 'multipart/form-data'
        }
      })
      if (res.status === 0) {
        // console.log(res);
        // 登录成功后，1存储登录信息2.跳转
        this.$message({
          message: '登录成功！',
          type: 'success'
        })

        // let obj = {
        //   user: res.user,
        //   token: res.token
        // }
        // token存储到本地
        // localStorage.setItem('user', JSON.stringify(obj))
        localStorage.setItem('token',res.token)
        // 跳转
        this.$router.push('/')
      } else {
        this.$message.error('登录失败！')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: skyblue;
}
.login {
  margin: 100px auto;
  width: 500px;
  height: 250px;
  background-color: #fff;
  border-radius: 20px;

  .head {
    height: 60px;
    border-radius: 20px;

    background-color: #f5f7fb;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    color: #409eff;
  }
  .form {
    padding-top: 30px;
    // padding-right: 40px;
    width: 500px;
    // margin: 0 auto;
    margin-left: -20px;
  }
}
</style>