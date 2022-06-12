<template>
  <div class="example-pagination-block">
    <el-pagination background  layout="prev, pager, next,jumper,total" :total="total" :page-size="pageSize"
    @current-change='pageChange'
    :current-page="currentPage"
    />
    <!-- @current-change='pageChange' -->
  </div>
</template>

<script>
export default {
name:'Mypaganation',
props:{
  total:{
    type:Number,
    default:0
  },
  pageSize:{
    type:Number,
    default:10
  },
  
},
data(){
  return{
    currentPage:1,
  }
},
methods:{
 pageChange(x){
   this.currentPage=x
   this.$emit('pageChange',x)
 }
}
}
</script>

<style lang="less" scoped>
div{
  margin: 0 auto;
  width: fit-content;
}

</style>