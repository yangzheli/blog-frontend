<template>
  <div class="archive-container">
    <div class="tag">
      <i class="fa fa-fw fa-2x fa-tags"></i>
      <Btn v-bind:title="tag" type="complex"></Btn>
    </div>
    <div class="container" v-for="(value,index) in articleYearList" :key="index">
      <div class="head">
        <div class="year">{{value.create_year}}</div>
        <div class="total">共有{{value.count}}篇文章</div>
      </div>
      <div v-for="(article,index) in articleList" :key="index">
        <div class="article_item" v-if="article.create_year===value.create_year">
          <div class="create_time">{{formate(article.create_time)}}</div>
          <div class="title_container" @click="articlePreview(article)">
            <div class="title">{{article.article_title}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tips" v-if="articleYearList.length===0">什么也找不到呀</div>
  </div>
</template>

<script>
  import Btn from '@/components/BlogButton.vue'

  export default {
    name: "Archive",
    components: {
      Btn
    },
    data() {
      return {
        tag: 'all',//默认查询所有文章
        articleYearList: [],
        articleList: [],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      }
    },
    methods: {
      //根据标签查询文章年份和数量,所有文章标签为all
      getArticleYearByTag() {
        this.tag = this.$route.query.tag;
        this.$api.article.getArticleYearByTag({article_tag: this.tag}).then(res => {
          this.articleYearList = res;
        }).catch(err => {

        })
        this.getArticleByTag();
      },
      //根据标签查询文章,所有文章标签为all
      getArticleByTag() {
        this.$api.article.getArticleByTag({article_tag: this.tag}).then(res => {
          this.articleList = res;
        }).catch(err => {

        });
      },
      //将年-月-日格式化成月（英）日
      formate(time) {
        if (time === undefined || time === null) {
          return null;
        }
        var month = time.split('-')[1], day = time.split('-')[2];
        var res = this.months[month - 1] + ' ' + day;
        return res;
      },
      articlePreview(article) {
        this.$router.push({path: '/article/preview', query: {articleId: article.article_id}}).catch(err => {  //向history栈中添加一个新纪录，当用户点击浏览器回退按钮时，会回到上一个URL
          err
        }); //增加回调函数
      },
    },
    created() {
      this.getArticleYearByTag();
    },
    //挂载该组件自动拿到数据
    beforeMount() {
      this.tag = this.$route.query.tag;
    },
    watch: {
      //监听，当路由发生变化时执行方法
      '$route': 'getArticleYearByTag'
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

  .container {
    margin: 10px;
    clear: both;
  }

  .tips{
    display: block;
    text-align: left;
    margin: 20px;
    font-size: 18px;
    font-weight: 600;
    line-height: 30px;
    color: #491690;
  }

  .head {
    display: block;
    height: 80px;
    clear: both;
  }

  .year {
    width: 100px;
    float: left;
    text-align: right;
    padding: 16px 24px 16px 0;
    font-weight: 700;
    font-size: 32px;
    line-height: 48px;
    background: #f1f1f1;
    border-right: 4px solid #f1f1f1;
  }

  .total {
    float: left;
    font-weight: 600;
    font-size: 16px;
    line-height: 48px;
    padding: 16px 0 16px 24px;
    letter-spacing: 2px;
  }

  .article_item {
    display: block;
    margin: 0;
    padding: 0;
    clear: both;
  }

  .create_time {
    width: 100px;
    float: left;
    text-align: right;
    padding: 16px 24px 16px 0;
    font-weight: 500;
    font-size: 18px;
    line-height: 48px;
    border-right: 4px solid #f1f1f1;
  }

  .title_container {
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

  .title {
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
</style>
