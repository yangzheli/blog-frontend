<template>
  <div class="layout-container">
    <Header></Header>
    <div class="body">
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="slider">
        <Slider></Slider>
      </div>
    </div>
    <!--<div class="footer">-->
    <!--<div class="copyright">© 2020 xxx</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Slider from '@/components/Slider.vue'

  export default {
    name: "Layout",
    components: {
      Header, Slider
    }
  }
</script>

<style scoped>
  .body {
    width: 1000px;
    margin: 20px auto;
  }

  .content {
    width: 65%;
    height: 100%;
    float: left;
  }

  .slider {
    width: 30%;
    min-height: 450px;
    float: right;
  }

  .footer {
    position: absolute;
    left: 50%;
    bottom: 10px;
  }

  .copyright {
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #66757f;
  }
</style>
