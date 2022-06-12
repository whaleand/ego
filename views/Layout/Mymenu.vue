<template>
  <div class="menu">
    <div class="title">
      {{ $t('goods.title')}}
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      router=true
    >
      <el-menu-item index="/">
        <el-icon>
          <i class="iconfont icon-shouye"></i>
        </el-icon>
        <!-- <span>首页</span> -->
        <span>

          {{ $t('goods.home') }}</span>

      </el-menu-item>
      <el-menu-item index="/goods">
        <el-icon>
          <i class="iconfont icon-31quanbushangpin"></i>
        </el-icon>
        <span>{{$t('goods.good')}}</span>
      </el-menu-item>
      <el-menu-item index="/sales">
        <el-icon>
          <i class="iconfont icon-6xiaoliang"></i>
        </el-icon>
        <span>{{ $t('goods.sale') }}</span>
      </el-menu-item>
      <el-sub-menu index="">
        <template #title>
          <el-icon>
            <i class="iconfont icon-31dingdan"></i>
          </el-icon>
          <span>{{ $t('goods.order') }}</span>
        </template>
        <el-menu-item index="/orderslist">
          <el-icon>
            <document />
          </el-icon>
          <span>{{ $t('goods.Orderlist') }}</span>
        </el-menu-item>
        <el-menu-item index="/ordersback">
          <el-icon>
            <document />
          </el-icon>
          <span>{{ $t('goods.Returnorder') }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.title {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #545c64;
  color: white;
  font-size: 20px;
  font-weight: bold;
}
</style>