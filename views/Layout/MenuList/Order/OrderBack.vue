<template>
  <div class="container">
    <h3>退货订单管理</h3>
    <div class="table">
      <el-table
        :data="backList"
      >
        <el-table-column
          prop="id"
          label="id"
          width="70"
        >
        </el-table-column>
        <el-table-column
          prop="good_name"
          label="商品名称"
        >
        </el-table-column>
        <el-table-column
          prop="good_price"
                    width="100"

          label="单价"
        >
        </el-table-column>
        <el-table-column
          prop="good_count"
                    width="70"

          label="数量"
        >
        </el-table-column>
        <el-table-column
          prop="payment"
          label="实付款"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="reason"
          label="退货理由"
        >
        </el-table-column>
        <el-table-column
          label="审批情况"
          width="100"
        >
        待审批
        </el-table-column>
        <el-table-column
          label="审批操作"
          width="150"
        >
          <template #default>
            <el-button
              size="small"
              type="success"
            >同意</el-button>
            <el-button
              size="small"
              type="danger"
            >拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/bus.js'
export default {
  data() {
    return {
      backList: []
    }
  },
  methods: {
    async getOrderBack() {
      const { data: res } = await this.$http.get('/api/getorder', { params: { num: 2 } })
      this.backList = res.orders
    }
  },
  created() {
    this.getOrderBack()
  }
}
</script>

<style lang="less" scoped>
h3{
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  margin: 20px 0;
}
</style>