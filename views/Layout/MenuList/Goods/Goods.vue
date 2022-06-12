<template>
  <div class="goods">
    <!-- 头部区域 -->
    <div class="header">
      <el-input
        v-model="searchContent"
        placeholder="请输入内容"
        style="width:80%"
        @change="search"
      />
      <el-button
        type="primary"
        style="margin-left:10px"
        @click="search"
      >查询</el-button>
      <el-button
        v-if="$store.state.manager"
        type="primary"
        @click="addDialogVisible"
      >添加</el-button>

      <!-- 弹框显示 -->
      <Addgoods ref="addGoods"></Addgoods>

    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        height="460"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="50"
        />
        <el-table-column
          prop="good_name"
          label="商品名称"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="good_price"
          label="商品价格"
          width="100"
        />
        <el-table-column
          prop="good_num"
          label="商品数量"
          width="100"
        />
        <el-table-column
          prop="good_cate"
          label="商品类目"
          width="100"
        />
        <!-- <img src="" alt="" > -->
        <el-table-column
          prop="good_img"
          label="商品图片"
          width="100"
          show-overflow-tooltip
        />

        <el-table-column
          prop="good_sellPoint"
          label="商品卖点"
          show-overflow-tooltip
        />
        <el-table-column
          prop="good_descr"
          label="商品描述"
          show-overflow-tooltip
        />
        <el-table-column
          label="操作"
          width="150"
          v-if="$store.state.manager"
        >
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区域 -->
    <Pagination
      ref="pagination"
      :pageSize="pageSize"
      :total="total"
      @pageChange="pageChange"
    ></Pagination>
  </div>
</template>

<script>
import axios from 'axios'
import Pagination from '../../../../components/Mypaganation.vue'
import Addgoods from './Addgoods.vue'
export default {
  components: {
    Pagination,
    Addgoods
  },
  data() {
    return {
      tableData: [],
      searchContent: '',
      pageSize: 10,
      total: 0,
      // 定义搜索或者浏览的状态,
      flag: 0
    }
  },
  methods: {
    async getGoods(x) {
      const { data: res } = await axios.get('http://127.0.0.1:3020/api/getgoods', {
        params: {
          pageSize: 10,
          pageNum: x
        }
      })
      this.tableData = res.data[0]
      this.total = res.data[1]
      // console.log(typeof this.tableData[1].good_img);
    },
    async searchGoods(content, x) {
      const { data: res } = await axios.get('http://127.0.0.1:3020/api/searchgoods', {
        params: {
          content,
          pageNum: x,
          pageSize: 10
        }
      })
      this.tableData = res.data[0]
      this.total = res.data[1]
    },
    async deleteGood(id) {
      const { data: res } = await axios.get('http://127.0.0.1:3020/api/deletegoods', {
        params: {
          id
        }
      })
      if (res.status === 0) {
        return true
      }
    },
    // 页码改变
    pageChange(val) {
      // 获取的
      if (this.flag == 0) {
        this.getGoods(val)
      }
      // 搜索中
      if (this.flag == 1) {
        this.searchGoods(this.searchContent, val)
      }
    },
    // 搜索事件
    search() {
      if (this.searchContent) {
        this.flag = 1
        this.searchGoods(this.searchContent, 1)
        this.$refs.pagination.currentPage = 1
      } else {
        this.flag = 0
        this.getGoods(1)
      }
    },
    // 添加商品
    addDialogVisible() {
      this.$refs.addGoods.flag = 0
      this.$refs.addGoods.addDialogVisible = true
      this.$refs.addGoods.title = '添加商品'
      this.$refs.addGoods.btn = '添加'
    },
    // 删除事件
    handleDelete(index, row) {
      // console.log(row.id);

      this.$confirm('确认删除商品信息？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteGood(row.id)
          this.getGoods(this.$refs.pagination.currentPage)
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '已经删除该商品'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
    },
    // 编辑商品
    handleEdit(index, row) {
      this.$refs.addGoods.flag = 1
      this.$refs.addGoods.addDialogVisible = true
      // 有个bug,一定要等dom加载完成后，否则第一次出来的弹框没有内容
      this.$nextTick(() => {
        this.$refs.addGoods.$refs.wEditor.editor.txt.html(row.good_descr)

        this.$refs.addGoods.title = '编辑商品'
        this.$refs.addGoods.btn = '编辑'
        this.$refs.addGoods.editId = row.id
        this.$refs.addGoods.ruleForm = row
        // console.log(row);
      })

      // 方法2：侦听器修改
      // row.good_descr
    }
  },
  created() {
    this.getGoods(1)
  }
}
</script>

<style lang="less" scoped>
.header {
  margin-top: 10px;
  margin-left: 10px;
}
.table {
  width: 98%;
  margin-top: 10px;
  padding-left: 10px;
  el-table-column {
    text-align: center;
  }
}
</style>