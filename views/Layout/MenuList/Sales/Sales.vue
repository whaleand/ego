<template>
  <keep-alive>
    <div class="container">
      <h3>销量统计</h3>
      <ul class="info">
        <li>
          <div class="left">
            <i class="iconfont icon-yinglitongji "></i>
          </div>
          <div class="right">
            <p>￥1234</p>
            <span>今日盈利</span>
          </div>
        </li>
        <li>
          <div class="left">
            <i class="iconfont icon-leijishouru"></i>
          </div>
          <div class="right">
            <p>￥8061</p>
            <span>本月盈利</span>

          </div>
        </li>
        <li>
          <div class="left">
            <i class="iconfont icon-zhichu"></i>
          </div>
          <div class="right">
            <p>￥2389</p>
            <span>本月支出</span>

          </div>
        </li>
      </ul>
      <div class="echarts">
        <div class="echart1"></div>
        <div class="echart2"></div>
      </div>
    </div>

  </keep-alive>
</template>
<script>
export default {
  data() {
    return {
      sale: []
    }
  },
  methods: {
    async getSales() {
      const { data: res } = await this.$http.get('/api/getsales')
      this.sale = res.sale
      return res
    },
    showEchart() {
      const echart1 = this.$echarts.init(document.querySelector('.echart1'))
      echart1.showLoading({
        text: '正在努力的读取数据中...' //loading话术
      })
      const echart2 = this.$echarts.init(document.querySelector('.echart2'), null, {})
      echart2.showLoading({
        text: '正在努力的读取数据中...' //loading话术
      })
      // ajax getting data...............
      this.getSales().then(res => {
        echart1.hideLoading()
        echart2.hideLoading()

        const option1 = {
          title: {
            text: '各类商品销量变化'
          },
          // 调色盘
          color: ['#5470c6', '#97d57a', '#fac858', '#ee6666', '#73c0de'],
          tooltip: {
            trigger: 'axis'
            // formatter: function (args) {
            //   return `${args[0].name}月份<br/>${args.name}${args[0].value}`
            // }
          },
          // 一定要和series的name一样才能显示
          legend: {
            data: ['食品', '化妆品', '书籍', '服饰', '百货'],
            x: 'right'
          },
          xAxis: {
            type: 'category',
            name: '月份',
            boundaryGap: false,
            // axisLine: {
            //   show: true,
            //   lineStyle: {
            //   }
            // },
            // x轴的显示
            data: ['一月份', '二月份', '三月份', '四月份', '五月份', '六月份']
          },
          yAxis: {
            type: 'value',
            name: '销量',
            axisTick: {
              length: 6,
              lineStyle: {
                type: 'dashed'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'black'
              }
            },
            // position: 'left',
            axisLabel: {
              formatter: '{value} 件'
            }
          },
          // 决定每一条数据
          series: [
            {
              name: '食品',
              type: 'line',
              data: this.sale[0].volume
            },
            {
              name: '化妆品',
              type: 'line',
              data: this.sale[1].volume
            },
            {
              name: '书籍',
              type: 'line',
              data: this.sale[2].volume
            },
            {
              name: '服饰',
              type: 'line',
              data: this.sale[3].volume
            },
            {
              name: '百货',
              type: 'line',
              data: this.sale[4].volume
            }
          ]
        }
        echart1.setOption(option1)

        const option2 = {
          title: {
            text: '各类商品销量占比',
            x: 'center'
          },
          tooltip: {
            show: true
          },
          series: [
            {
              name: '销量',
              type: 'pie',
              radius: '55%',
              data: this.sale.map(item => {
                return { name: item.cate, value: item.allVolume }
              }),
              label: {
                show: true,
                formatter: function (args) {
                  return args.name + ':' + args.percent + '%'
                }
              },
              // roseType: 'angle',
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }

        // 最后使用指定的配置项和数据
        echart2.setOption(option2)
      })

      // ajax callback

      // 初始化echarts实例对象echarts.init()

      // 指定图表的配置项和数据
    }
  },
  created() {},
  // 基于已经准备好的dom渲染
  mounted() {
    this.showEchart()
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  box-sizing: border-box;
  padding-top: 10px;
  h3 {
    font-weight: bold;
    font-size: 25px;
    text-align: center;
    margin: 10px 0;
  }
  .info {
    margin: 20px 5px 30px;
    display: flex;
    justify-content: space-around;
    li {
      width: 25%;
      height: 50px;
      display: flex;
      .left {
        flex: 1;
        border-radius: 5px;

        background: #545c64;
        line-height: 50px;
        text-align: center;
        i {
          font-size: 30px;
          color: white;
        }
      }
      .right {
        flex: 3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        padding-left: 20px;
        background-color: #fff;
        // align-items: center;
        p {
          padding: 5px 0;
          font-size: 20px;
          font-weight: bold;
        }
        span {
          font-size: 14px;
          color: gray;
        }
      }
    }
  }
  .echarts {
    width: 100%;
    box-sizing: border-box;
    min-width: 1024px;
    padding-left: 20px;
    padding-bottom: 40px;
    overflow: hidden;
    div {
      float: left;
    }
    .echart1 {
      width: 52%;
      height: 300px;
      margin-right: 20px;
      background-color: #fff;
      border-radius: 10px;
    }
    .echart2 {
      width: 42%;
      height: 300px;
      background-color: #fff;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
}
</style>