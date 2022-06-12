<template>
  <div class="container">
    <h3>
      订单列表
    </h3>
    <!-- <ul class="tabs" @click="tabChange">
      <a href="javascript:;" class="active">
        <li>所有订单</li>
      </a>
      <a href="javascript:;">
        <li>待发货</li>
      </a>
      <a href="javascript:;">
        <li>待收货</li>
      </a>
      <a href="javascript:;">
        <li>待退货</li>
      </a>
      <a href="javascript:;">
        <li>已退货</li>
      </a>
      <a href="javascript:;">
        <li>交易完成</li>
      </a>
    </ul> -->
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#ff6b33"
      text-color="blank"
      class="menu"
    >
      <el-menu-item
        index="1"
        class="tabItem"
      >所有订单</el-menu-item>
      <el-menu-item
        index="2"
        class="tabItem"
      >待发货</el-menu-item>
      <el-menu-item
        index="3"
        class="tabItem"
      >待收货</el-menu-item>
      <el-menu-item
        index="4"
        class="tabItem"
      >待退货</el-menu-item>
      <el-menu-item
        index="5"
        class="tabItem"
      >已退货</el-menu-item>
      <el-menu-item
        index="6"
        class="tabItem"
      >交易完成</el-menu-item>
    </el-menu>
    <!-- 订单表 -->
    <el-table
      :data="orderList"
      ref="table"
      :row-class-name="orderListClassName"
    >
      <el-table-column
        prop="id"
        label="id"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="good_name"
        label="商品名称"
      >
      </el-table-column>
      <el-table-column
        prop="good_price"
        label="单价"
        width="100"
      >
      </el-table-column>

      <el-table-column
        prop="good_count"
        label="数量"
        width="100"
      >
      </el-table-column>

      <el-table-column
        prop="payment"
        label="实付款"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="交易状态"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import emitter from '@/utils/bus.js'
export default {
  data() {
    return {
      // 选中的菜单栏
      activeIndex: '1',
      orderList: [],
      list0: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: []
    }
  },
  methods: {
    orderListClassName(row) {
      // console.log(row)
    },
    async getOrder() {
      const { data: res } = await this.$http.get('/api/getorder', { params: { num: 1 } })
      this.orderList = res.orders
      if (this.orderList) {
        this.list0 = this.orderList
        this.list1 = this.orderList.filter(item => item.state == '待发货')
        this.list2 = this.orderList.filter(item => item.state == '待收货')
        this.list3 = this.orderList.filter(item => item.state == '待退货')
        this.list4 = this.orderList.filter(item => item.state == '已退货')
        this.list5 = this.orderList.filter(item => item.state == '交易完成')
        // console.log(this.list2)
        emitter.emit('backOrders', this.list3)
      }
    },
    handleSelect(index) {
      switch (index) {
        case '1':
          this.orderList = this.list0
          break
        case '2':
          this.orderList = this.list1
          break
        case '3':
          this.orderList = this.list2
          break
        case '4':
          this.orderList = this.list3
          break
        case '5':
          this.orderList = this.list4
          break
        case '6':
          this.orderList = this.list5
          break
      }
    }
  },
  created() {
    this.getOrder()
  }
}
</script>

<style lang="less" scoped>
.container {
  h3 {
    font-weight: bold;
    font-size: 25px;
    text-align: center;
    margin: 10px 0;
  }
  // .tabs {
  //   display: flex;
  //   justify-content: space-around;
  //   a {
  //     display: block;
  //     color: black;
  //     font-weight: bold;
  //     text-decoration: none;
  //     padding: 10px 10px;
  //   }
  //   .active {
  //     color: #ff6b33;
  //     border-bottom: 2px solid #ff6b33;
  //   }
  // }
  .menu {
    width: 100%;
  }
  .tabItem {
    width: 15%;
    // // width: 20%;
  }
}
</style>