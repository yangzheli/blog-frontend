<template>
  <div class="emoji-container">
    <template v-for="item in emojis">
      <span class="emoji-items" :class="['emoji-'+item]" @click="handleEmojiClick(item)"></span>
    </template>
  </div>
</template>

<script>
  export default {
    name: "Emoji",
    data() {
      return {
        emojis: [
          'laugh', 'teeth', 'laugh_cry', 'squint', 'sweating', 'laugh-squint', 'surprised', 'angel', 'miser', 'sleep',
          'love', 'disdain', 'dissatisfied', 'unhappy', 'star', 'alien', 'cry', 'pout', 'skeleton', 'poop',
          'pout-love', 'face-down', 'satisfied', 'o-ring', 'glasses', 'show-love', 'blush-unhappy', 'blush-tongue', 'satisfied-tongue', 'angry'
        ]
      }
    },
    methods: {
handleEmojiClick(item) {
  this.$emit('emojiClick', item);
}
    }
  }
</script>

<style scoped>
  @import "../assets/css/emoji.css";

  .emoji-container {
    margin: 10px;
    min-height: 200px;
    text-align: left;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }

.emoji-items {
  width: 64px;
  height: 64px;
  clear: both;
  display: inline-block;
  cursor: pointer;
  zoom: 0.75; /*表情缩放为实际尺寸的75%*/
}
</style>
