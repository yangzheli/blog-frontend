<template>
  <div class="admin-container">
    <div class="tag">
      <i class="fa fa-fw fa-2x fa-tags"></i>
      <Btn v-bind:title="tag" type="complex"></Btn>
      <Btn title="写文章" type="complex" @click="writeArticle(0)" style="float: right"></Btn>
    </div>
    <div class="article_item" v-for="(article,index) in articleList" :key="index">
      <div class="create_time">{{article.create_time}}</div>
      <div class="title">{{article.article_title}}</div>
      <div class="edit" @click="writeArticle(article.article_id)">
        <i class="fa fa-fw fa-edit"></i>
        <span>{{$t('user.edit')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Btn from '@/components/BlogButton.vue'

  export default {
    name: "Admin",
    components: {
      Btn
    },
    data() {
      return {
        tag: 'all',
        articleList: [],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      }
    },
    methods: {
      writeArticle(aId) {
        this.$router.push({ //向history栈中添加一个新纪录，当用户点击浏览器回退按钮时，会回到上一个URL
          path: '/article/edit', query: {articleId:aId}
        }).catch(err => {
          err
        }); //增加回调函数
      },
      //根据标签查询文章,所有文章标签为all
      getArticleByTag() {
        this.$api.article.getArticleByTag({article_tag: this.tag}).then(res => {
          this.articleList = res;
        }).catch(err => {

        });
      }
    },
    created() {
      this.getArticleByTag();
    }
  }
</script>

<style scoped>
  .tag {
    display: block;
    text-align: left;
    margin: 20px;
  }

  .tag i {
    color: #FF5151;
    vertical-align: middle;
    margin-right: 10px;
  }

  .article_item {
    border-bottom: 1px solid #cccccc;
    height: 80px;
  }

  .create_time {
    width: 100px;
    float: left;
    text-align: right;
    padding: 16px 24px 16px 0;
    font-weight: 500;
    font-size: 18px;
    line-height: 48px;
  }

  .title {
    min-width: 80px;
    float: left;
    font-weight: 600;
    font-size: 16px;
    line-height: 48px;
    padding: 16px 0 16px 24px;
    color: #ff3300;
    cursor: pointer;
    letter-spacing: 1px;
  }

  .edit {
    float: right;
    font-weight: 600;
    font-size: 16px;
    line-height: 48px;
    cursor: pointer;
    padding: 16px 0 16px 24px;
  }
</style>
