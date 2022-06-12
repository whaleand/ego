import { createI18n } from 'vue-i18n'// 准备语言
// const message = {
//   // 1.英文
//   en: {
//     goods: {
//       home: 'home',
//       good: 'goods manage'
//     }
//   },
//   // 2.中文
//   zh: {
//     goods: {
//       home: '首页',
//       good: '商品管理'
//     }

//   }
// }

// 通过选项，配置vuei18n实例
const i18n = createI18n({
  locale: 'en',//选择当前语言
  messages: {////语言环境 一定要叫messages
    en: {
      goods: {
        home: 'Home',
        good: 'Goods Manage',
        sale: 'Sales Statistics',
        order: 'Order Management',
        top: 'Top',
        welcome: 'Welcome',
        lang: 'language',
        title: 'Commodity Management System',
        Orderlist: 'Order List',
        Returnorder: 'Return Order',
        ch: 'Chinese',
        en: 'English'
      }
    }
    ,
    // 2.中文
    zh: {
      goods: {
        home: '首页',
        good: '商品管理',
        sale: '销量统计',
        order: '订单管理',
        top: '顶部',
        welcome: '欢迎你',
        lang: '语言',
        title: '商品管理系统',
        Orderlist: '订单列表',
        Returnorder: '退货订单',
        ch: '中文',
        en: '英文'
      }
    }
  }
})

export default i18n