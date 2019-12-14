import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      noCache: true
    }
  }]
},
  /* 权限管理 */
{
  path: '/power',
  component: Layout,
  name: 'power',
  meta: {
    title: 'power',
    icon: 'power-manage'
  },
  children: [{
    path: 'roleManage',
    component: () => import('@/views/power/roleManage/index'),
    name: 'roleManage',
    meta: {
      title: 'roleManage'
    }
  },
  {
    path: 'roleList',
    component: () => import('@/views/power/roleList/index'),
    name: 'roleList',
    meta: {
      title: 'roleList'
    }
  },
  {
    path: 'userList',
    component: () => import('@/views/power/userList/index'),
    name: 'userList',
    meta: {
      title: 'userList'
    }
  },
  {
    path: 'modifyPower/:power/:menutype',
    component: () => import('@/views/power/modifyPower/index'),
    hidden: true,
    name: 'modifyPower',
    meta: {
      title: 'modifyPower'
    }
  },
  {
    path: 'menuManage',
    component: () => import('@/views/power/menuManage/index'),
    name: 'menuManage',
    meta: {
      title: 'menuManage'
    }
  },
  {
    path: 'menuApiManage',
    component: () => import('@/views/power/menuApiManage/index'),
    name: 'menuApiManage',
    meta: {
      title: 'menuApiManage'
    }
  },
  {
    path: 'menuApiModify/:parId/:childId',
    component: () => import('@/views/power/menuApiModify/index'),
    hidden: true,
    name: 'menuApiModify',
    meta: {
      title: 'menuApiModify'
    }
  },
  {
    path: 'apiManage',
    component: () => import('@/views/power/ApiManage/index'),
    name: 'apiManage',
    meta: {
      title: 'apiManage'
    }
  }
  ]
},
  /* 产品维护 */
{
  path: '/prodWeihu',
  component: Layout,
  name: 'prodWeihu',
  meta: {
    title: 'prodWeihu',
    icon: 'prod-weihu'
  },
  children: [
    // { path: 'testUEditor', component: () => import('@/views/prodWeihu/testUEditor/index'), name: 'testUEditor', meta: { title: 'testUEditor' }},
    {
      path: 'logisticTools',
      component: () => import('@/views/prodWeihu/logisticTools/index'),
      name: 'logisticTools',
      meta: {
        title: 'logisticTools'
      }
    },
    {
      path: 'storageProductManage',
      component: () => import('@/views/prodWeihu/storageProductManage/index'),
      name: 'storageProductManage',
      meta: {
        title: 'storageProductManage'
      }
    },
    {
      path: 'publishProduct',
      component: () => import('@/views/prodWeihu/publishProduct/index'),
      name: 'publishProduct',
      meta: {
        title: 'publishProduct'
      }
    },
    {
      path: 'publishProduct/:id',
      hidden: true,
      component: () => import('@/views/prodWeihu/publishProduct/add'),
      name: 'publishProductAdd',
      meta: {
        title: 'publishProductAdd'
      }
    },
    {
      path: 'updateProduct/:id',
      hidden: true,
      component: () => import('@/views/prodWeihu/publishProduct/update'),
      name: 'updateProduct',
      meta: {
        title: 'updateProduct'
      }
    },
    {
      path: 'productDetail/:id',
      component: () => import('@/views/prodWeihu/productDetail/index'),
      hidden: true,
      name: 'productDetail',
      meta: {
        title: 'productDetail'
      }
    }
  ]
},
  /* 报表管理 */
{
  path: '/reportFormManage',
  component: Layout,
  name: 'reportFormManage',
  meta: {
    title: 'reportFormManage',
    icon: 'trade-manage'
  },
  children: [{
    path: 'sellsReport',
    component: () => import('@/views/reportFormManage/sellsReport/index'),
    name: 'sellsReport',
    meta: {
      title: 'sellsReport'
    }
  },
  {
    path: 'stockReport',
    component: () => import('@/views/reportFormManage/stockReport/index'),
    name: 'stockReport',
    meta: {
      title: 'stockReport'
    }
  },
  {
    path: 'orderReport',
    component: () => import('@/views/reportFormManage/orderReport/index'),
    name: 'orderReport',
    meta: {
      title: 'orderReport'
    }
  },
  {
    path: 'saleCount',
    component: () => import('@/views/reportFormManage/saleCount/index'),
    name: 'saleCount',
    meta: {
      title: 'saleCount'
    }
  }
  ]
},
  /* 审核管理 */
{
  path: '/checkManage',
  component: Layout,
  name: 'checkManage',
  meta: {
    title: 'checkManage',
    icon: 'icon-check'
  },
  children: [{
    path: 'stockFirstCheck',
    component: () => import('@/views/checkManage/stockFirstCheck/index'),
    name: 'stockFirstCheck',
    meta: {
      title: 'stockFirstCheck'
    }
  },
  {
    path: 'stockSecondCheck',
    component: () => import('@/views/checkManage/stockSecondCheck/index'),
    name: 'stockSecondCheck',
    meta: {
      title: 'stockSecondCheck'
    }
  },
  {
    path: 'checkRecordStock',
    component: () => import('@/views/checkManage/checkRecordStock/index'),
    name: 'checkRecordStock',
    meta: {
      title: 'checkRecordStock'
    }
  },
  {
    path: 'returnsFirstCheck',
    component: () => import('@/views/checkManage/returnsFirstCheck/index'),
    name: 'returnsFirstCheck',
    meta: {
      title: 'returnsFirstCheck'
    }
  },
  {
    path: 'returnsSecondCheck',
    component: () => import('@/views/checkManage/returnsSecondCheck/index'),
    name: 'returnsSecondCheck',
    meta: {
      title: 'returnsSecondCheck'
    }
  },
  {
    path: 'checkRecordReturns',
    component: () => import('@/views/checkManage/checkRecordReturns/index'),
    name: 'checkRecordReturns',
    meta: {
      title: 'checkRecordReturns'
    }
  },
  {
    path: 'billingKefu',
    component: () => import('@/views/checkManage/billingKefu/index'),
    name: 'billingKefu',
    meta: {
      title: 'billingKefu'
    }
  },
  {
    path: 'billingCaiwu',
    component: () => import('@/views/checkManage/billingCaiwu/index'),
    name: 'billingCaiwu',
    meta: {
      title: 'billingCaiwu'
    }
  },
  {
    path: 'billingRe',
    component: () => import('@/views/checkManage/billingRe/index'),
    name: 'billingRe',
    meta: {
      title: 'billingRe'
    }
  }
  ]
},
  /* 订单管理  */
{
  path: '/orderManage',
  component: Layout,
  name: 'orderManage',
  meta: {
    title: 'orderManage',
    icon: 'icon-order'
  },
  children: [{
    path: 'waitShips',
    component: () => import('@/views/orderManage/waitShips/index'),
    name: 'waitShips',
    meta: {
      title: 'waitShips'
    }
  },
  {
    path: 'waitShipsRe',
    component: () => import('@/views/orderManage/waitShipsRe/index'),
    name: 'waitShipsRe',
    meta: {
      title: 'waitShipsRe'
    }
  },
  {
    path: 'waitReceive',
    component: () => import('@/views/orderManage/waitReceive/index'),
    name: 'waitReceive',
    meta: {
      title: 'waitReceive'
    }
  },
  {
    path: 'waitRefund',
    component: () => import('@/views/orderManage/waitRefund/index'),
    name: 'waitRefund',
    meta: {
      title: 'waitRefund'
    }
  }
  ]
},
  /* 退货管理 */
{
  path: '/returnManage',
  component: Layout,
  name: 'returnManage',
  meta: {
    title: 'returnManage',
    icon: 'icon-peisong'
  },
  children: [{
    path: 'waitCheck_done',
    component: () => import('@/views/returnManage/waitCheck_done/index'),
    name: 'waitCheck_done',
    meta: {
      title: 'waitCheck_done'
    }
  },
  {
    path: 'waitCheck_done_r',
    component: () => import('@/views/returnManage/waitCheck_done_r/index'),
    name: 'waitCheck_done_r',
    meta: {
      title: 'waitCheck_done_r'
    }
  },
  {
    path: 'waitOver',
    component: () => import('@/views/returnManage/waitOver/index'),
    name: 'waitOver',
    meta: {
      title: 'waitOver'
    }
  },
  {
    path: 'waitOver_r',
    component: () => import('@/views/returnManage/waitOver_r/index'),
    name: 'waitOver_r',
    meta: {
      title: 'waitOver_r'
    }
  },
  {
    path: 'waitCheck_all',
    component: () => import('@/views/returnManage/waitCheck_all/index'),
    name: 'waitCheck_all',
    meta: {
      title: 'waitCheck_all'
    }
  },
  {
    path: 'waitCheck_all_r',
    component: () => import('@/views/returnManage/waitCheck_all_r/index'),
    name: 'waitCheck_all_r',
    meta: {
      title: 'waitCheck_all_r'
    }
  },
  {
    path: 'waitMoney',
    component: () => import('@/views/returnManage/waitMoney/index'),
    name: 'waitMoney',
    meta: {
      title: 'waitMoney'
    }
  },
  {
    path: 'waitRecord',
    component: () => import('@/views/returnManage/waitRecord/index'),
    name: 'waitRecord',
    meta: {
      title: 'waitRecord'
    }
  }
  ]
},
  /* 配送服务 */
{
  path: '/servicePeiSong',
  component: Layout,
  name: 'servicePeiSong',
  meta: {
    title: 'servicePeiSong',
    icon: 'icon-peisong'
  },
  children: [{
    path: 'order',
    component: () => import('@/views/servicePeiSong/order/index'),
    name: 'order',
    meta: {
      title: 'order'
    }
  },
  {
    path: 'psAddrRecord',
    component: () => import('@/views/servicePeiSong/psAddrRecord/index'),
    name: 'psAddrRecord',
    meta: {
      title: 'psAddrRecord'
    }
  },
  {
    path: 'sendRecord',
    component: () => import('@/views/servicePeiSong/sendRecord/index'),
    name: 'sendRecord',
    meta: {
      title: 'sendRecord'
    }
  },
  {
    path: 'sellRecord',
    component: () => import('@/views/servicePeiSong/sellRecord/index'),
    name: 'sellRecord',
    meta: {
      title: 'sellRecord'
    }
  },
  {
    path: 'wuliuEdit',
    component: () => import('@/views/servicePeiSong/wuliuEdit/index'),
    name: 'wuliuEdit',
    meta: {
      title: 'wuliuEdit'
    }
  },
  {
    path: 'wuliuRecord',
    component: () => import('@/views/servicePeiSong/wuliuRecord/index'),
    name: 'wuliuRecord',
    meta: {
      title: 'wuliuRecord'
    }
  }
  ]
},
  /* --设置--- */
{
  path: '/setting',
  component: Layout,
  meta: {
    title: 'setting',
    icon: 'icon-setting'
  },
  children: [{
    path: 'size',
    component: () => import('@/views/setting/size/index'),
    name: 'size',
    meta: {
      title: 'size'
    }
  },
  {
    path: 'sizeAdd',
    component: () => import('@/views/setting/sizeAdd/index'),
    hidden: true,
    name: 'sizeAdd',
    meta: {
      title: 'sizeAdd'
    }
  },
  {
    path: 'sizeValue/:id',
    component: () => import('@/views/setting/sizeValue/index'),
    hidden: true,
    name: 'sizeValue',
    meta: {
      title: 'sizeValue'
    }
  },
  {
    path: 'wuliuCompany',
    component: () => import('@/views/setting/wuliuCompany/index'),
    name: 'wuliuCompany',
    meta: {
      title: 'wuliuCompany'
    }
  },
  {
    path: 'addProductType',
    component: () => import('@/views/setting/addProductType/index'),
    name: 'addProductType',
    meta: {
      title: 'addProductType'
    }
  },
  {
    path: 'updateProductType',
    component: () => import('@/views/setting/updateProductType/index'),
    name: 'updateProductType',
    meta: {
      title: 'updateProductType'
    }
  },
  {
    path: 'sysType',
    component: () => import('@/views/setting/sysType/index'),
    name: 'sysType',
    meta: {
      title: 'sysType'
    }
  },
  {
    path: 'priceTable',
    component: () => import('@/views/setting/priceTable/index'),
    name: 'priceTable',
    meta: {
      title: 'priceTable'
    }
  },
  {
    path: 'addPrice',
    component: () => import('@/views/setting/addPrice/index'),
    name: 'addPrice',
    meta: {
      title: 'addPrice'
    }
  },
  {
    path: 'editorPrice',
    component: () => import('@/views/setting/addPrice/index'),
    name: 'editorPrice',
    meta: {
      title: 'editorPrice'
    }
  }
  ]
},
  /* --优惠券管理--- */
{
  path: '/youhuiquan',
  component: Layout,
  name: 'youhuiquan',
  meta: {
    title: 'youhuiquan',
    icon: 'icon-yhq'
  },
  children: [{
    path: 'list',
    component: () => import('@/views/youhuiquan/list/index'),
    name: 'list',
    meta: {
      title: 'list'
    }
  },
  {
    path: 'detail/:id',
    component: () => import('@/views/youhuiquan/detail/index'),
    name: 'yhqDetail',
    meta: {
      title: 'detail'
    }
  },
  {
    path: 'add',
    component: () => import('@/views/youhuiquan/add/index'),
    name: 'add',
    meta: {
      title: 'add'
    }
  },
  {
    path: 'editor/:id',
    component: () => import('@/views/youhuiquan/add/index'),
    name: 'yhqEditor',
    meta: {
      title: 'editor'
    }
  }
  ]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
