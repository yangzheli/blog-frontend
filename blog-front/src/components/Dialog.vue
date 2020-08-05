<template>
  <div class="dialog-container" v-show="dialogVisible">
    <div class="dialog">
      <div class="dialog_title">{{title}}</div>
      <div class="close_btn">
        <img src="@/assets/image/icon-dialog-close.png" @click="closeDialog()">
      </div>
      <!--<div class="dialog_time"></div>-->
      <div class="dialog_content"></div>
      <div class="btns">
        <div class="confirm_btn" @click="confirmBtn()">确认</div>
        <div class="default_btn" @click="closeBtn()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dialog",
    props: {
      title: {
        type: String,
        default: '新建'
      },
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        placeholder: "&nbsp;&nbsp;时间：2020/6/1",
      }
    },
    methods: {
      confirmBtn() {
        // this.$emit('confirm');
        this.closeDialog();
      },
      closeBtn() {
        // this.$emit('cancel');
        this.closeDialog();
      },
      closeDialog() {
        //父子组件的数据流是单向的，可以通过$emit将值传递给父组件(需要使用sync修饰符)
        this.$emit('update:dialogVisible', false);
      }
    }
  }
</script>

<style scoped>
  .dialog-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
  }

  .dialog {
    width: 500px;
    height: 380px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
  }

  .dialog_title {
    width: 100%;
    height: 60px;
    font-size: 18px;
    color: #696969;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .close_btn {
    position: absolute;
    top: 20px;
    right: 16px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
  }

  .close_btn img {
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .dialog_time {
    height: 30px;
    margin: 0 20px 0 20px;
    text-align: left;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
    border: 1px solid #808080;;
    border-radius: 1px;
  }

  .dialog_content {
    height: 200px;
    text-align: left;
    color: #797979;
    line-height: 26px;
    margin: 10px 20px 0 20px;
    box-sizing: border-box;
    font-size: 18px;
    font-weight: 600;
    border: 1px solid #808080;
    border-radius: 1px;
  }

  /*为空时显示*/
  .dialog_content:empty:before {
    content: attr(placeholder);
    color: #808080;
  }

  /*焦点时内容为空*/
  .dialog_content:focus:before {
    content: none;
  }

  .btns {
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 16px;
    box-sizing: border-box;
  }

  .confirm_btn {
    width: 80px;
    height: 70%;
    float: left;
    margin-left: 55%;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #ffffff;
    background: #509EE3;
    border: 1px solid #509EE3;
    border-radius: 5px;
    cursor: pointer;
  }

  .default_btn {
    width: 80px;
    height: 70%;
    float: left;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #787878;
    background: #ffffff;
    border: 1px solid #c8c8c8;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
