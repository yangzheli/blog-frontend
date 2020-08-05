<template>
  <div class="article-container">
    <div class="title">{{article.article_title}}</div>
    <mavon-editor v-model="article.article_content" defaultOpen="preview" :subfield="false" :editable="false"
                  :toolbarsFlag="false" style="box-shadow: none"></mavon-editor>
    <Comment :article_id="articleId"></Comment>
  </div>
</template>

<script>
  import Comment from '@/components/Comment.vue'

  export default {
    name: "ArticlePreview",
    components: {
      Comment
    },
    data() {
      return {
        article: {},
        articleId: 1,
      }
    },
    //挂载该组件自动拿到数据
    beforeMount() {
      this.articleId = this.$route.query.articleId;
      this.$api.article.getArticleByAId({article_id: this.articleId}).then(res => {
        this.article = res;
      }).catch(err => {

      })
    },
  }
</script>

<style scoped>
  .article-container {
    min-height: 800px;
    background-color: #ffffff;
  }

  .title {
    text-align: left;
    color: #444;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
    margin: 20px auto;
  }

  .markdown-body {
    min-height: 800px;
    box-shadow: none;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }

  .comment {
    color: #444;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
    margin: 20px auto;
  }
</style>
