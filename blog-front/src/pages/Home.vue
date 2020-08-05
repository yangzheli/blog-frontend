<template>
  <div class="home-container">
    <div class="article_item" v-for="(article,index) in articleList" :key="index">
      <div class="header">
        <div class="title" @click="articlePreview(article)">{{article.article_title}}</div>
        <div class="create_time"><i class="fa fa-fw fa-clock-o"></i>{{article.create_time}}
        </div>
        <div class="tags">
          <i class="fa fa-fw fa-tags"></i>
          <span v-for="tag in parseTags(article.article_tags)" @click="archive(tag)">{{tag}}</span>
        </div>
      </div>
      <div :id="changeId(index)" class="body"></div>
      <div class="footer" @click="articlePreview(article)">READ MORE</div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'

  export default {
    name: "Home",
    data() {
      return {
        articleList: [],  //文章列表
      }
    },
    methods: {
      getArticleByTag() {
        this.$api.article.getArticleByTag({article_tag: 'all'}).then(res => {
          this.articleList = res;
        }).catch(err => {

        })
      },
      marked(content, index) {
        var reg = /\#\#\#([\s\S]+?)\#\#\#/;//匹配前言中的内容
        if (content.match[reg] === null) {
          return;
        }
        var res = content.match(reg)[0];
        document.getElementById('body_' + index).innerHTML = marked(res.substr(0, res.length - 3).trim());
      },
      changeId(index) {
        return "body_" + index;
      },
      articlePreview(article) {
        this.$router.push({path: '/article/preview', query: {articleId: article.article_id}}).catch(err => {  //向history栈中添加一个新纪录，当用户点击浏览器回退按钮时，会回到上一个URL
          err
        }); //增加回调函数
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
      },
      archive(tag) {
        this.$router.push({path: '/archive', query: {tag: tag}}).catch(err => {  //向history栈中添加一个新纪录，当用户点击浏览器回退按钮时，会回到上一个URL
          err
        }); //增加回调函数
      }
    },
    created() {
      this.getArticleByTag();
    },
    updated() {
      for (var i = 0; i < this.articleList.length; i++) {
        this.marked(this.articleList[i].article_content, i);
      }
    },
  }
</script>

<style scoped>
  .article_item {
    min-height: 100px;
    padding: 10px 0 20px 0;
    background-color: #ffffff;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  .header {
    min-height: 100px;
  }

  .title {
    display: inline-block;
    color: #444;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
    margin: 10px 0 0 0;
    position: relative;
  }

  .title:after {
    content: "";
    width: 0;
    height: 3px;
    background: #f30;
    position: absolute;
    top: 100%;
    left: 0;
    transition: all .8s;
  }

  .title:hover:after {
    left: 0;
    width: 100%;
  }

  .create_time {
    font-weight: 500;
    font-size: 18px;
    margin: 10px 0 0 0;
  }

  .create_time i {
    margin: 0 10px 0 0;
  }

  .tags {
    font-weight: 500;
    font-size: 18px;
    margin: 10px 0 0 0;
  }

  .tags span {
    margin: 0 5px;
    cursor: pointer;
  }

  .tags span:nth-child(3n+1) {
    color: mediumpurple;
  }

  .tags span:nth-child(3n+2) {
    color: cornflowerblue;
  }

  .tags span:nth-child(3n+3) {
    color: mediumspringgreen;
  }

  .body {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
  }

  .footer {
    color: #FF5151;
    line-height: 2;
    font-weight: 500;
    font-size: 18px;
    margin: 20px 0 0 0;
    cursor: pointer;
  }
</style>
