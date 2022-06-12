<template>
  <div class="table">
    <el-table
      :data="memberInformation"
      height="400"
      border
      stripe
    >
      <el-table-column
        prop="id"
        label="id"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="70"
      >
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="生日"
      >
      </el-table-column>
      <el-table-column
        prop="user_desc"
        label="身份"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['memberInformation']
}
</script>

<style lang="less" scopd>
</style>