<template>
  <div class="menu_item" @click="push(url)">
    <div class="top">{{title}}</div>
    <div class="bottom"></div>
  </div>
</template>

<script>
  export default {
    name: "MenuItem",
    props: {
      title: {
        type: String
      },
      url: {
        type: String
      }
    }, //静态传递
    methods: {
      push() {
        this.$router.push({path: this.url}).catch(err => {  //向history栈中添加一个新纪录，当用户点击浏览器回退按钮时，会回到上一个URL
          err
        }); //增加回调函数
      }
    }
  }
</script>

<style scoped>
  .menu_item {
    width: 110px;
    height: 100%;
    float: left;
    display: inline-block;
    cursor: pointer;
  }

  .top {
    height: 90%;
    line-height: 63px;
    color: #66757f;
    font-weight: 600;
    font-size: 130%;
  }

  .top:hover {
    background: #eeeeee;
  }

  .top:hover + .bottom {
    background-color: #FF5151;
  }

  .bottom {
    height: 10%;
    position: relative;
  }
</style>
