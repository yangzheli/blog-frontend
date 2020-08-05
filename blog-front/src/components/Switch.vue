<template>
<div class="switch-container">
  <span class="text">{{inactive}}</span>
  <span class="switch" :class="{'switch-on':isChecked}" :value="value" @click="toggle"></span>
  <span class="text">{{active}}</span>
</div>
</template>

<script>
  export default {
    name: "Toggle",
    props: {
      active: {
        type: String
      },
      inactive: {
        type: String
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isChecked: this.value,
      }
    },
    methods: {
      toggle() {
        this.isChecked = !this.isChecked;
        this.$i18n.locale = (this.$i18n.locale === 'zh' ? 'en' : 'zh'); //中英文切换
        localStorage.setItem('lang', this.$i18n.locale);  //将用户设置存储到localStorage
      }
    }
  }
</script>

<style scoped>
  .switch-container {
    width: 100px;
    height: 32px;
  }

  .text {
    display: inline-block;
    color: #66757f;
    line-height: 32px;
    font-weight: 600;
    font-size: 100%;
    vertical-align: top;
  }

  .switch {
    display: inline-block;
    position: relative;
    width: 52px;
    height: 32px;
    border: 1px solid #DFDFDF;
    border-radius: 16px;
    box-sizing: border-box;
    background: #DFDFDF;
    cursor: pointer;
  }

  .switch:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 30px;
    border-radius: 15px;
    background: #DFDFDF;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }

  .switch:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }

  .switch-on {
    border-color: #1AAD19;
    background: #1AAD19;
  }

  .switch-on:before {
    border-color: #1AAD19;
    background: #1AAD19;
  }

  .switch-on:after {
    transform: translateX(20px);
  }
</style>
