<template>
  <div class="comment-container">
    <div class="title">
      <i class="fa fa-fw fa-comments"></i>
      <span style="line-height: 30px">评论区</span>
    </div>
    <div class="comment_items" v-for="(item,index) in comments" :key="index">
      <div class="top">
        <img :src="item.avatar!==''?item.avatar:require('@/assets/image/icon-default-avatar.png')" @click="">
        <div class="left" @click="">{{item.username}}</div>
        <div class="right">{{item.comment_time}}</div>
      </div>
      <div class="bottom" v-html="parseEmoji(item.comments)"></div>
    </div>
    <div class="comment">
      <textarea id="text" class="text" v-model="content" placeholder="快来留个言吧!(提示:字数不能超过50哦)"></textarea>
      <div class="comment_bottom">
        <div class="emoji" @click="emojiPanelVisible=!emojiPanelVisible"><img src="@/assets/image/icon-emoji.png"></div>
        <div class="btn">
          <Btn title="评论" type="complex" @click="comment()"></Btn>
        </div>
      </div>
      <Emoji v-if="emojiPanelVisible" @emojiClick="appendEmoji"></Emoji>
    </div>
  </div>
</template>

<script>
  import Btn from '@/components/BlogButton.vue'
  import Emoji from '@/components/Emoji.vue'

  export default {
    name: "Comment",
    inject: ['reload'],//注入reload方法
    components: {
      Btn, Emoji
    },
    props: {
      article_id: {
        type: [Number, String],
      }
    },
    data() {
      return {
        content: '',//留言内容
        comments: [],
        emojiPanelVisible: false,
        emojis: [
          'laugh', 'teeth', 'laugh_cry', 'squint', 'sweating', 'laugh-squint', 'surprised', 'angel', 'miser', 'sleep',
          'love', 'disdain', 'dissatisfied', 'unhappy', 'star', 'alien', 'cry', 'pout', 'skeleton', 'poop',
          'pout-love', 'face-down', 'satisfied', 'o-ring', 'glasses', 'show-love', 'blush-unhappy', 'blush-tongue', 'satisfied-tongue', 'angry'
        ]
      }
    },
    methods: {
      getCommentsByArticleId() {
        this.$api.comment.getCommentsByArticleId({article_id: this.article_id}).then(res => {
          this.comments = res;
        }).catch(err => {
        })
      },
      comment() {
        if (this.content.trim() === '') {
          this.$message({
            type: 'error',
            text: '评论不能为空',
          });
          return;
        }
        if (this.content.length > 50) {
          this.$message({
            type: 'error',
            text: '评论太长了!',
          });
          return;
        }
        var user = JSON.parse(localStorage.getItem("user"));
        const params = {
          article_id: this.article_id,
          userId: '2',  //默认使用用户ID为2，匿名用户
          comments: this.content
        };
        //用户已登录
        if (user !== undefined && user !== null) {
          params.userId = user.userId;
        }
        this.$api.comment.saveComment(params).then(res => {
          this.$message({
            type: 'success',
            text: res.msg,
          });
        }).catch(err => {
        })
        this.reload();
      },
      appendEmoji(item) {
        var value = document.getElementById('text').value;
        this.content = value + '[' + item + ']';
      },
      parseEmoji(comments) {
        comments = comments.replace(/\[.*?\]/g, this.emoji);
        return comments;
      },
      emoji(word) {
        const type = word.substring(1, word.length - 1);
        if (this.emojis.indexOf(type) !== -1) {
          return `<span class="emoji-items emoji-${type}" ></span>`;
        } else {
          return word;
        }
      }
    },
    created() {
      this.getCommentsByArticleId();
    }
  }
</script>

<style scoped>
  .comment-container {
    min-height: 200px;
    border: 2px solid #cccccc;
    border-radius: 5px;
    box-shadow: 1px 1px 2px #cccccc;
    margin: 40px 0 100px 0;
  }

  .title {
    text-align: left;
    height: 30px;
    background: #f1f1f1;
    padding: 0 10px;
    font-weight: 700;
  }

  .comment_items {
    text-align: left;
    border-bottom: 1px solid #cccccc;
    clear: both;
    margin: 10px 10px 10px 10px;
  }

  .top img {
    width: 30px;
    border-radius: 15px;
    cursor: pointer;
  }

  .left {
    display: inline-block;
    font-weight: 700;
    padding-left: 10px;
    line-height: 30px;
    transform: translate(0%, -25%);
    text-align: center;
    cursor: pointer;
  }

  .right {
    float: right;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    font-weight: 500;
  }

  .bottom {
    margin: 10px 0;
  }

  .comment {
    min-height: 150px;
    margin: 20px 10px 20px 10px;
  }

  .text {
    min-height: 150px;
    width: 99%;
    border: 1px dotted #cccccc;
    border-radius: 5px;
    resize: none;
  }

  .text:focus {
    outline: none;
  }

  .comment_bottom {
    min-height: 40px;
    margin: 10px 10px 0 10px;
  }

  .emoji {
    display: inline-block;
    float: left;
  }

  .emoji img {
    width: 24px;
    cursor: pointer;
  }

  .btn {
    display: inline-block;
    float: right;
  }
</style>

//额外定义一个全局style标签，解决加上scoped导致v-html绑定的样式不生效的问题
<style>
  @import "../assets/css/emoji.css";

  .emoji-items {
    width: 64px;
    height: 64px;
    clear: both;
    display: inline-block;
    cursor: pointer;
    zoom: 0.5; /*表情缩放为实际尺寸的50%*/
  }
</style>
