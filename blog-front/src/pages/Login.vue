<template>
  <div class="login-container">
    <div class="dialog">
      <div class="header">
        <div class="left">登录</div>
        <div class="right" @click="register()">新用户注册</div>
      </div>
      <input type="text" v-model="username" placeholder="用户名">
      <input type="password" v-model="password" placeholder="密码">
      <div class="validate">
        <input type="text" v-model="validateCode" placeholder="请输入验证码">
        <img :src="imgUrl" @click="refreshCode()">
      </div>
      <div class="login_btn" @click="login()">登录</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
        validateCode: '',
        imgUrl: '/api/common/validate?' + Math.ceil(Math.random() * 10),
      }
    },
    methods: {
      refreshCode() {
        //生成一个随机数（防止缓存）
        var num = Math.ceil(Math.random() * 10);
        this.imgUrl = '/api/common/validate?' + num;
      },
      login() {
        if (this.username.trim() === '' || this.password.trim() === '') {
          this.$message({
            type: 'error',
            text: '用户名或密码不能为空'
          });
          return;
        }
        if (this.validateCode.trim() === '') {
          this.$message({
            type: 'error',
            text: '验证码不能为空'
          });
          return;
        }
        const params = {
          username: this.username,
          password: this.password,
          validateCode: this.validateCode,
        };
        this.$api.user.login(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'error',
              text: res.msg
            });
            return;
          }
          this.$message({
            type: 'success',
            text: res.msg
          });
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem('accessToken', res.token);
        }).catch(err => {

        })
        this.$router.push({ //向history栈中添加一个新纪录，当用户点击浏览器回退按钮时，会回到上一个URL
          path: '/'
        }).catch(err => {
          err
        }); //增加回调函数
      },
      register() {
        this.$router.push({ //向history栈中添加一个新纪录，当用户点击浏览器回退按钮时，会回到上一个URL
          path: '/register'
        }).catch(err => {
          err
        }); //增加回调函数
      }
    }
  }
</script>

<style scoped>
  .login-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .dialog {
    width: 400px;
    height: 420px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
  }

  .header {
    width: 300px;
    margin: 40px auto 0 auto;
    height: 30px;
  }

  .left {
    float: left;
    line-height: 30px;
    font-size: 24px;
    font-weight: 600;
    color: #696969;
  }

  .right {
    float: right;
    line-height: 30px;
    font-size: 16px;
    font-weight: 400;
    color: #97dffd;
    cursor: pointer;
  }

  .close_btn img {
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .dialog input {
    width: 300px;
    display: block;
    line-height: 40px;
    border-radius: 2px;
    border: 1px solid #cccccc;
    text-indent: 5px;
    font-size: 16px;
    margin: 20px auto;
  }

  .dialog input:focus {
    border: 1px solid #97dffd;
    outline: none;
  }

  .validate {
    width: 300px;
    height: 40px;
    margin: 20px auto;
  }

  .validate input {
    width: 160px;
    line-height: 40px;
    float: left;
    margin: 0;
  }

  .validate img {
    float: right;
    border: 1px solid #cccccc;
    cursor: pointer;
  }

  .login_btn {
    width: 300px;
    line-height: 40px;
    text-align: center;
    margin: 20px auto;
    color: #ffffff;
    background: #97dffd;
    border: 1px solid #97dffd;
    border-radius: 5px;
    cursor: pointer;
  }

  .login_btn:hover {
    background: #673ab7;
    border: 1px solid #673ab7;
    transition: all 0.3s ease-in-out;
  }
</style>
