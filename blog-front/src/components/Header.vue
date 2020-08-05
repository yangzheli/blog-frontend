<template>
  <div class="header-container">
    <div class="menu">
      <div class="logo"><img src="@/assets/image/icon-logo.jpg"></div>
      <MenuItem v-bind:title="$t('menu.home')" url="/"></MenuItem>
      <MenuItem v-bind:title="$t('menu.archive')" url="/archive?tag=all"></MenuItem>
      <MenuItem v-bind:title="$t('menu.about')" url="/about"></MenuItem>
      <MenuItem title="管理员" url="/admin"></MenuItem>
      <div class="right">
        <div class="switch">
          <Toggle v-model="value" inactive="中" active="英"></Toggle>
        </div>
        <div v-show="!hasLogin" class="login" @click="login()">
          <menu-item v-bind:title="$t('menu.login')"></menu-item>
        </div>
        <div v-show="hasLogin" class="user">
          <img :src="avatarUrl" @click="userInfo()">
          <div class="loginOut" @click="loginOut()">{{$t('menu.loginOut')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuItem from '@/components/MenuItem.vue';
  import Toggle from "@/components/Switch.vue";

  export default {
    name: "Header",
    components: {
      MenuItem, Toggle
    },
    data() {
      return {
        value: localStorage.getItem('lang') !== 'zh',//中英文切换
        hasLogin: false,//用户是否登录
        avatarUrl: '',
      }
    },
    methods: {
      login() {
        this.$router.push({ //向history栈中添加一个新纪录，当用户点击浏览器回退按钮时，会回到上一个URL
          path: '/login'
        }).catch(err => {
          err
        }); //增加回调函数
      },
      routeChange() {
        if (localStorage.getItem("user") !== undefined && localStorage.getItem("user") !== null) {
          this.hasLogin = true;
        }
      },
      userInfo() {
        this.$router.push({ //向history栈中添加一个新纪录，当用户点击浏览器回退按钮时，会回到上一个URL
          path: '/user'
        }).catch(err => {
          err
        }); //增加回调函数
      },
      loginOut() {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        this.$message({
          type: 'success',
          text: '退出登录成功'
        })
        this.hasLogin = false;
      },
      updateAvatarUrl() {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user === null || user.avatar === '') {
          this.avatarUrl = require('@/assets/image/icon-default-avatar.png');
        } else {
          this.avatarUrl = user.avatar;
        }
      }
    },
    watch: {
      //监听，当路由发生变化时执行方法
      '$route': 'routeChange'
    },
    //页面刷新时同样先判断用户是否登录
    created() {
      this.routeChange();
      this.updateAvatarUrl();
    }
  }
</script>

<style scoped>
  .header-container {
    width: 100%;
    height: 70px;
    background-color: #ffffff;
    border-bottom: 1px solid #ddd;
    font-family: Tahoma sans-serif;
    /*
    控制元素及其子元素的文本都不能被选中
    */
    -moz-user-select: none; /*firefox浏览器*/
    -webkit-user-select: none; /*safari、chrome浏览器*/
    -ms-user-select: none; /*ie浏览器*/
    user-select: none;
  }

  .menu {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }

  .logo img {
    float: left;
    width: 50px;
    margin: 10px 30px 10px 10px;
    cursor: pointer;
  }

  .right {
    float: right;
    height: 100%;
  }

  .switch {
    display: inline-block;
    width: 100px;
    vertical-align: top;
    margin: 20px 0 0 0;
  }

  .login {
    display: inline-block;
    height: 100%;
  }

  .user {
    display: inline-block;
    min-width: 100px;
    vertical-align: top;
    margin: 20px 0 0 0;
  }

  .user img {
    width: 30px;
    cursor: pointer;
    border-radius: 15px;
  }

  .user :before {
    content: "|";
    display: inline-block;
    padding-right: 5px;
  }

  .loginOut {
    display: inline-block;
    height: 30px;
    font-weight: 600;
    font-size: 20px;
    color: #66757f;
    vertical-align: top;
    cursor: pointer;
  }
</style>
