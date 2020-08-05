<template>
  <div :class="{'button':true,'type_simple':type==='simple','type_complex':type==='complex'}" @click="handleClick">
    {{title}}
  </div>
</template>

<script>
  export default {
    name: "BlogButton",
    props: {
      title: {
        type: String
      },
      type: {
        type: String,
        default: 'simple',
        validator: value => ['simple', 'complex'].includes(value)
      }
    },
    methods: {
      handleClick(event) {
        this.$emit('click', event)
      }
    }
  }
</script>

<style scoped>
  .button {
    display: inline-block;
    border: 1px solid #1da1f2;
    border-radius: 100px;
    font-weight: bold;
    height: 38px;
    line-height: 38px;
    padding: 0 24px;
    font-size: 15px;
    cursor: pointer;
  }

  .type_simple{
    color: #1da1f2;
  }

  .type_complex{
    background: #1da1f2;
    color: #ffffff;
  }

  .type_complex:hover{
    background: #673ab7;
    color: #ffffff;
    border: 1px solid #673ab7;
  }
</style>
