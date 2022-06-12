<template>
<div class="home">  
  <Mymenu class="menu"></Mymenu>
  <Content class="content">
  </Content>
</div>
</template>

<script>
import Content from './Content.vue'
import Mymenu from './Mymenu.vue'
export default {
  components: {
    Content,
    Mymenu
  }
}
</script>

<style lang="less" scoped>
.home{
  display: flex;
  .menu{
    background-color: #545c64;
    width: 200px;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 99 !important;
  }
  .content{
    margin-left: 200px;
    width: 100%;
  }
  
}
</style>