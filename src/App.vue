<template>
  <div>
    您好，{{name}}

    <p>牛蛙，你好牛蛙</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'xxx'
      }
    }
  }
</script>

<style scoped lang="scss">
  div {
    color: #3399ff;
    font-size: 18px;

    p{
      transform: translateX(100px);
    }
  }
</style>
