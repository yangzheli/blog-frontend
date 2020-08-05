<template>
  <div class="article-container">
    <div class="title">
      <input v-model="article.article_title" placeholder="请输入文章标题"/>
    </div>
    <div class="tags">
      <div class="top" @click="unfold=true">
        <div class="checkbox">
          <input type="checkbox" id="vue" v-model="tags" value="vue"/>
          <label for="vue">vue</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="mysql" v-model="tags" value="mysql"/>
          <label for="mysql">mysql</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="spring boot" v-model="tags" value="spring boot"/>
          <label for="spring boot">spring boot</label>
        </div>
      </div>
      <div class="bottom" v-show="unfold">
        <div class="checkbox">
          <input type="checkbox" id="js" v-model="tags" value="js"/>
          <label for="js">js</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="algorithm" v-model="tags" value="algorithm"/>
          <label for="algorithm">algorithm</label>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="life" v-model="tags" value="生活"/>
          <label for="life">生活</label>
        </div>
      </div>
      <div class="bottom" v-show="unfold">
        <div class="checkbox">
          <input type="checkbox" id="css" v-model="tags" value="css"/>
          <label for="js">css</label>
        </div>
      </div>
    </div>
    <div class="btn">
      <Btn v-if="isSave" title="save" type="complex" @click="saveArticle('save')"></Btn>
      <Btn v-if="!isSave" title="update" type="complex" @click="saveArticle('update')"></Btn>
    </div>
    <div class="content">
      <mavon-editor v-model="article.article_content" ref="md" @change="" @imgAdd="imgAdd"></mavon-editor>
    </div>
  </div>
</template>

<script>
  import Btn from '@/components/BlogButton.vue'

  export default {
    name: "ArticleEdit",
    components: {
      Btn
    },
    data() {
      return {
        article: {
          article_id: 1,
          article_title: '',
          article_content: '',
          article_tags: '',
        },
        tags: [],//保存标签值的数组
        unfold: false,
        isSave: true
      }
    },
    methods: {
      saveArticle(param) {
        if (this.article.article_title.trim() === '') {
          this.$message({
            type: 'error',
            text: '文章标题不能为空'
          });
          return;
        }
        if (this.article.article_content.trim() === '') {
          this.$message({
            type: 'error',
            text: '文章内容不能为空'
          });
          return;
        }
        //文章标签,用分号分隔
        if (this.tags.length === 0) {
          this.$message({
            type: 'error',
            text: '至少为文章添加一个标签'
          });
          return;
        }
        var choose_tags = '';
        for (var i = 0; i < this.tags.length; i++) {
          choose_tags += '[' + this.tags[i] + ']';
        }
        this.article.article_tags = choose_tags;
        if (param === 'save') { //保存
          this.$api.article.saveArticle(this.article).then(res => {
            this.$message({
              type: 'success',
              text: '保存成功'
            });
          }).catch(err => {

          })
        } else if (param === 'update') {  //更新
          this.$api.article.updateArticle(this.article).then(res => {
            this.$message({
              type: 'success',
              text: res.msg
            });
          }).catch(err => {

          })
        }
      },
      // 将图片上传到服务器，返回地址替换到md中
      imgAdd(pos, $file) {
        let formdata = new FormData();
        formdata.append('file', $file);
        //访问后台服务器方法
        this.$api.upload.uploadFile(formdata).then(res => {
          this.$refs.md.$img2Url(pos, '/api' + res);
          this.$message({
            type: 'success',
            text: '上传成功'
          });
        }).catch(err => {
        })
      },
      //将标签从字符串解析成数组
      parseTags(tags) {
        var reg = /\[(.+?)\]/g; //匹配'[]'中的标签
        var res = tags.match(reg);
        if (res === null || res.length === 0) {
          return res;
        }
        for (var i = 0; i < res.length; i++) {
          //去掉括号
          res[i] = res[i].replace(/[\[\]]/g, '');
        }
        return res;
      }
    },
    //挂载该组件自动拿到数据
    beforeMount() {
      var articleId = this.$route.query.articleId;
      if (Number(articleId) !== 0) {
        this.isSave = false;
        this.$api.article.getArticleByAId({article_id: articleId}).then(res => {
          this.tags = this.parseTags(res.article_tags);
          const obj = {
            article_id: articleId,
            article_title: res.article_title,
            article_content: res.article_content,
            article_tags: res.article_tags,
          };
          this.article = obj;
        }).catch(err => {
        })
      }
    },
  }
</script>

<style scoped>
  .article-container {
    height: 100%;
    position: relative;
  }

  .title {
    height: 45px;
    margin: 20px 0 20px 20px;
    display: inline-block;
    float: left;
  }

  .title input {
    min-width: 900px;
    line-height: 40px;
    border-radius: 2px;
    border: 1px solid #cccccc;
    text-indent: 5px;
    font-size: 18px;
  }

  .title input:focus {
    border: 1px solid #97dffd;
    outline: none;
  }

  .tags {
    position: absolute;
    top: 20px;
    left: 940px;
    display: inline-block;
    float: left;
    border: 1px solid #cccccc;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1000;
  }

  .checkbox {
    display: inline-block;
    width: 120px;
    height: 40px;
    position: relative;
  }

  .checkbox input {
    position: absolute;
    top: 12px;
    left: 5px;
  }

  .checkbox label {
    line-height: 40px;
    font-size: 20px;
    font-weight: 400;
    margin-left: 10px;
  }

  .btn {
    position: absolute;
    top: 20px;
    left: 1330px;
    /*display: inline-block;*/
    /*float: left;*/
    /*margin: 20px 0 20px 20px;*/
  }

  .content {
    width: 100%;
    height: 90%;
  }

  .markdown-body {
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
