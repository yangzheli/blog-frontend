<template>
  <div class="slider-container">
    <div class="personal">
      <div class="head">{{$t('slider.self')}}</div>
      <div class="left">
        <div class="username">Luigi</div>
        <div class="msg">韶华易逝 莫负流年</div>
        <div class="address"><img src="@/assets/image/icon-location.png">深圳</div>
      </div>
      <div class="right">
        <img src="@/assets/image/icon-logo.jpg">
        <div class="self_link">
          <a href="https://github.com/Luigi001" target="_blank"><i class="fa fa-fw fa-github"></i></a>
          <a href="https://github.com/Luigi001" target="_blank"><i class="fa fa-fw fa-qq"></i></a>
          <a href="https://github.com/Luigi001" target="_blank"><i class="fa fa-fw fa-wechat"></i></a>
        </div>
      </div>
    </div>
    <div class="tags">
      <div class="head">{{$t('slider.tags')}}</div>
      <div class="tags_item" v-for="item in tags" @click="archive(item)">{{item}}</div>
    </div>
    <div class="links">
      <div class="head">{{$t('slider.links')}}</div>
      <a href="http://mangoya.cn" target="_blank">Aimee</a>
      <a href="http://47.105.189.195:2000" target="_blank">pppercy_Wang</a>
      <a href="http://powman.org" target="_blank">愤怒的泡面</a>
      <a href="https://ma-jinyao.cn" target="_blank">jinyaoMa</a>
    </div>
  </div>
</template>

<script>


  export default {
    name: "Slider",
    data() {
      return {
        tags: ['vue', 'mysql', 'spring boot', 'js', 'css', 'algorithm', '生活']
      }
    },
    methods: {
      archive(item) {
        this.$router.push({path: '/archive', query: {tag: item}}).catch(err => {  //向history栈中添加一个新纪录，当用户点击浏览器回退按钮时，会回到上一个URL
          err
        }); //增加回调函数
      }
    }
  }
</script>

<style scoped>
  .slider-container {
    height: 100%;
    position: relative;
    background-color: #ffffff;
    padding: 10px 0 0 0;
  }

  .personal {
    border-bottom: 1px solid #ddd;
  }

  .head {
    display: block;
    text-align: left;
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
    margin: 10px 0;
    padding-left: 15px;
    color: #FF5151;
    border-left: 3px solid #FF5151;
  }

  .left {
    display: inline-block;
    float: left;
    text-align: left;
    line-height: 25px;
    font-weight: 500;
    font-size: 18px;
  }

  .username {
    margin: 15px 0;
    color: #491690;
  }

  .msg {
    margin: 15px 0;
    font-weight: 500;
    font-size: 16px;
    color: #491690;
  }

  .address {
    margin: 15px 0;
    font-weight: 400;
    font-size: 16px;
    color: #491690;
  }

  .address img {
    width: 20px;
    vertical-align: middle;
    margin: 0 5px 3px 0;
  }

  .right {
    display: inline-block;
  }

  .right img {
    width: 70px;
    border-radius: 50%;
  }

  .self_link a {
    display: inline-block;
    margin: 10px 0;
  }

  .self_link a:hover i {
    color: #fff;
    background: #F4692C;
  }

  .self_link a i {
    font-size: 18px;
    width: 42px;
    height: 42px;
    line-height: 42px;
    border-radius: 42px;
    color: #1882c2;
    background: rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    margin: 0 3px;
  }

  .tags {
    margin-top: 20px;
    border-bottom: 1px solid #ddd;
  }

  .tags_item {
    min-width: 50px;
    display: inline-block;
    margin: 10px;
    color: #491690;
    cursor: pointer;
  }

  .tags_item:hover {
    color: #FF5151;
  }

  .links {
    margin-top: 20px;
  }

  .links a {
    display: block;
    text-align: left;
    margin: 20px 0 20px 10px;
    color: #491690;
    text-decoration: none;
  }

  .links a:hover {
    color: #FF5151;
  }
</style>
