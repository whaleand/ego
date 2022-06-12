<template>
   <el-dialog
    v-model="dialogVisible"
    title="合同查看"
    width="70%"
    height="400"
    :before-close="handleClose"
  >
  <!-- 加载pdf直接iframe -->
    <iframe :src="src" frameborder="0" style="width:100%;height:300px"></iframe>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components:{
    pdf
  },
data(){
  return{
    dialogVisible:false,
    src:"/static/hetong.pdf"
  }
},

}
</script>

<style lang="less" scoped>

</style>