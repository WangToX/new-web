<template>
  <div class="login">
    <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm">
      <h3 class="title">登录</h3>
      <el-form-item prop="username">
        <el-input  type="text" v-model="loginForm.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          type="text"
          v-model="loginForm.code"
          placeholder="验证码"
          style="width: 63%"
        ></el-input>
        <div class="login-code">
          <img :src="codeUrl" class="login-code-img" @click="getCode"/>
          </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.remember" style="margin:0 0 25px;">记住密码</el-checkbox>
      <el-form-item>
        <el-button type="primary" class="login-button" @click.native="handleLogin">
          <span>登 录</span>
        </el-button>
      </el-form-item>
    </el-form>
    <div class="login-footer">
      <span>Copyright © 2018-2022 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        remember: '',
        uuid: ''
      },
      codeUrl: '',
      captchaEnabled: true,
      loginRules: {
        username: [{ required: true, message: '请输入您的账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入您的密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
      },
      redirect: undefined
    }
  },
  created () {
    this.getCode()
  },
  watch: {
    $route: {
      handler: function (route) {
        console.log('watch-route:', route)
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    getCode () {
      getCodeImg().then(res => {
        console.log('res:', res)
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
        if (this.captchaEnabled) {
          this.codeUrl = 'data:image/gif;base64,' + res.img
          this.loginForm.uuid = res.uuid
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('Login', this.loginForm).then((res) => {
            console.log('login-res:', res)
            this.$router.push({ path: this.redirect || '/' })
          }).catch((err) => {
            console.log('login-err:', err)
            if (this.captchaEnabled) {
              this.getCode()
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background-image: url("@/assets/images/login-background.jpg");
  background-size: cover;
  // flex布局
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  box-sizing: border-box;
  width: 400px;
  background-color: white;
  border-radius: 6px;
  padding: 25px 25px 5px 25px;
}
.login-footer {
  // 文字上下居中
  height: 40px;
  line-height: 40px;
  // 文字左右居中
  text-align: center;
  // 位置相对于浏览器窗口下方固定
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #fff;
  // 字体
  font-family: Arial;
  font-size: 12px;
  // 字符间距
  letter-spacing: 1px;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.login-button {
  width: 100%;
}
.el-form-item {
  margin: 0 0 22px;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    height: 38px;
  }
}
</style>
