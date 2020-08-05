<template>
  <transition name="fade">
    <div class="message" v-bind:class="type" v-show="show">
      <i class="icon" v-bind:class="'icon-'+type"></i>
      <span class="text">{{text}}</span>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Message",
    // props: {
    //   type: {
    //     type: String,
    //     default: 'info',
    //     validator: val => ['info', 'success', 'warning', 'error'].includes(val)
    //   },
    //   text: {
    //     type: String,
    //     default: ''
    //   },
    //   show: {
    //     type: Boolean,
    //     default: false
    //   }
    // }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .message {
    position: fixed;
    top: 20px;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    min-width: 250px;
    padding: 10px 20px;
    background: #f5f5f5;
    font-size: 14px;
    line-height: 1.4;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  }

  .info {
    background: #c8c8c8;
  }

  .success {
    background: #e2ffe8;
  }

  .warning {
    background: #f9f6df;
  }

  .error {
    background: #fecdcf;
  }

  .icon {
    display: inline-block;
    float: left;
    width: 30px;
    height: 30px;
  }

  .icon-info {
    background: url("../assets/image/icon-info.png") no-repeat;
    background-size: 30px;
  }

  .icon-success {
    background: url("../assets/image/icon-success.png") no-repeat;
    background-size: 30px;
  }

  .icon-warning {
    background: url("../assets/image/icon-warning.png") no-repeat;
    background-size: 30px;
  }

  .icon-error {
    background: url("../assets/image/icon-error.png") no-repeat;
    background-size: 30px;
  }

  .text{
    height: 30px;
    font-size: 15px;
    letter-spacing: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
