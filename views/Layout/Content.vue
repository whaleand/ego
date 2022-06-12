<template>
  <div class="content">
    <div class="top-nav">
      &nbsp;&nbsp;&nbsp;{{ $t('goods.top')}}
      <div class="close">
        <el-button
          @click="close"
          type="text"
          style="color:gray"
        ><i class="iconfont icon-kaiguan_o"></i>
        </el-button>
      </div>
      <!-- 切换语言的下拉 -->
      <div class="dropdown">
        <el-dropdown
          large
          trigger="click"
          @command="langChange"
        >
          <span class="el-dropdown-link">
            <el-button
              class="lang"
              type="text"
            >{{ $t('goods.lang')}}</el-button>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="en">{{ $t('goods.en')}}</el-dropdown-item>
              <el-dropdown-item command="zh">{{ $t('goods.ch')}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
      <div class="welcome">
        {{ $t('goods.welcome')}}，
      </div>
    </div>
    <router-view></router-view>

  </div>

</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {
    langChange(command) {
      this.$i18n.locale = command
    },
    close() {
      localStorage.removeItem('token')
      this.$store.state.manager = false
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  background-color: #f1f1f1;
}
.top-nav {
  width: 100%;
  height: 50px;
  background-color: #545c64;
  color: white;
  line-height: 50px;
  .welcome {
    float: right;
    margin-right: 30px;
  }
  .dropdown {
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    // height: 30px;
    // background-color: #fff;
    .lang {
      color: white;
      &:hover {
        color: #ffd04b;
      }
    }
  }
  .close {
    float: right;
    margin-right: 10px;
    i {
      font-size: 30px;
      font-weight: 700;
      color: whitesmoke;
      &:hover {
        color: #ffd04b;
      }
    }
  }
}
</style>