<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style lang="less" scoped>
#app{
  min-width: 1024px;
  max-width: 1920px;
  margin: 0 auto;
}
</style>