<template>
  <div class="user-container">
    <div class="header">
      <div class="title">{{$t('user.information')}}</div>
      <div class="edit" @click="edit()">
        <i class="fa fa-fw fa-edit"></i>
        <span>{{$t('user.edit')}}</span>
      </div>
    </div>
    <div class="body">
      <div class="row">
        <span>{{$t('user.username')}}</span>
        <span v-if="!isEdit">{{user.username}}</span>
        <input v-if="isEdit" type="text" v-model="user.username" placeholder="用户名"/>
      </div>
      <div class="row">
        <span>{{$t('user.avatar')}}</span>
        <img v-if="!isEdit" :src="user.avatar">
        <input type="file" id="uploadFile" accept="image/png, image/jpg" @change="uploadAvatar()"
               style="display:none">
        <img v-if="isEdit" :src="user.avatar" @click="upload()" style="border: 1px solid #cccccc;cursor: pointer;">
        <span v-if="isEdit" style="width: 400px;line-height: 40px;font-size: 10px;
        font-weight: 400;margin-left: 20px">(提示:点击头像进行上传，只能上传jpg/png文件，且大小不超过1Mb)</span>
      </div>
      <div class="row">
        <span>{{$t('user.sex')}}</span>
        <span v-if="!isEdit">{{user.sex}}</span>
        <div v-if="isEdit">
          <div class="sex">
            <input type="radio" id="man" v-model="user.sex" value="男"/>
            <label for="man">男</label>
          </div>
          <div class="sex">
            <input type="radio" id="woman" v-model="user.sex" value="女"/>
            <label for="woman">女</label>
          </div>
          <div class="sex">
            <input type="radio" id="secret" v-model="user.sex" value="保密"/>
            <label for="secret">保密</label>
          </div>
        </div>
      </div>
      <div class="row">
        <span>{{$t('user.email')}}</span>
        <span v-if="!isEdit">{{user.email}}</span>
        <input v-if="isEdit" type="text" v-model="user.email" placeholder="邮箱" style="width: 250px;"/>
      </div>
    </div>
    <div class="footer">
      <div class="save">
        <Btn v-bind:title="$t('user.save')" type="complex" @click="saveUserInfo()"></Btn>
      </div>
      <div class="cancel">
        <Btn v-bind:title="$t('user.cancel')" type="complex" @click="cancel()"></Btn>
      </div>
    </div>
  </div>
</template>

<script>
  import Btn from '@/components/BlogButton.vue'

  export default {
    name: "User",
    components: {
      Btn
    },
    data() {
      return {
        user: {
          username: '',
          avatar: require('@/assets/image/icon-default-avatar.png'),//默认使用的头像
          sex: '',
          email: ''
        },
        isEdit: false,
      }
    },
    methods: {
      edit() {
        this.isEdit = !this.isEdit;
      },
      uploadAvatar() {
        var file = document.getElementById("uploadFile").files[0];
        var fileName = file.name;
        //图片后缀名
        var suffix = fileName.substr(fileName.lastIndexOf('.') + 1);
        if (suffix !== 'png' && suffix !== 'jpg') {
          this.$message({
            type: 'error',
            text: '只能上传jpg/png文件',
          });
          return;
        }
        //图片大小大于1Mb
        if (file.size > 1024 * 1024) {
          this.$message({
            type: 'error',
            text: '上传图片不超过1Mb',
          });
          return;
        }
        //将图片上传到服务器
        let formdata = new FormData();
        formdata.append('file', file);
        //访问后台服务器方法
        this.$api.upload.uploadFile(formdata).then(res => {
          this.user.avatar = '/api' + res;
          this.$message({
            type: 'success',
            text: '上传头像成功'
          });
        }).catch(err => {
        })
      },
      upload() {
        //通过用户头像触发上传图片按钮
        document.getElementById("uploadFile").click();
      },
      saveUserInfo() {
        if (this.user.username.trim() === '') {
          this.$message({
            type: 'error',
            text: '用户名不能为空'
          });
          return;
        }
        this.$api.user.updateUserInfo(this.user).then(res => {
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
        }).catch(err => {

        })
        this.isEdit = false;
        //对localStorage进行更新
        localStorage.setItem('user', JSON.stringify(this.user));
      },
      cancel() {
        this.isEdit = false;
      }
    },
    created() {
      var item = JSON.parse(localStorage.getItem('user'));
      this.user = item;
      //默认使用的头像
      if (item.avatar === null || item.avatar === '') {
        this.user.avatar = require('@/assets/image/icon-default-avatar.png');
      }
    }
  }
</script>

<style scoped>
  .header {
    display: block;
    color: #66757f;
    line-height: 40px;
    padding: 20px;
  }

  .title {
    display: inline-block;
    font-size: 25px;
    font-weight: 600;
  }

  .edit {
    display: inline-block;
    float: right;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
  }

  .row {
    display: block;
    height: 40px;
    padding: 20px;
    border-bottom: 1px solid #ddd;
  }

  .row span {
    width: 100px;
    float: left;
    line-height: 40px;
    font-size: 20px;
    font-weight: 400;
    text-align: left;
  }

  .row input {
    width: 200px;
    float: left;
    line-height: 40px;
    font-size: 20px;
    font-weight: 400;
    text-align: left;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    text-indent: 5px;
  }

  .row input:focus {
    border: 1px solid #97dffd;
    outline: none;
  }

  .row img {
    width: 40px;
    border-radius: 20px;
    float: left;
    line-height: 40px;
  }

  .sex {
    display: inline-block;
    height: 40px;
    float: left;
  }

  .sex input {
    display: inline-block;
    width: 50px;
    margin: 15px 0 15px 0;
  }

  .sex label {
    display: inline-block;
    line-height: 40px;
    font-size: 20px;
    font-weight: 400;
  }

  .footer {
    display: block;
    height: 40px;
    padding: 20px;
    text-align: right;
  }

  .save {
    display: inline-block;
  }

  .cancel {
    display: inline-block;
    margin: 0 10px 0 20px;
  }
</style>
