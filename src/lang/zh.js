export default {
  route: {
    dashboard: '首页',
    test: '测试页面',
    i18n: '国际化',
    dialog: '弹窗',
    /* --------后台----------------- */
    /* 权限管理 */
    power: '权限管理',
    roleManage: '角色管理',
    roleList: '角色列表',
    roleUserNumList: '角色成员列表',
    modifyPower: '修改权限',
    userList: '用户列表',
    menuManage: '菜单管理',
    menuApiManage: '菜单接口管理',
    menuApiModify: '菜单接口修改',
    apiManage: '接口管理',
    /* 产品维护 */
    prodWeihu: '产品维护',
    logisticFollow: '物流跟踪',
    freightTemplateSet: '运费模板设置',
    freightTemplateAdd: '新增运费模板',
    logisticTools: '物流工具',
    storageProductManage: '仓库中的商品',
    publishProduct: '发布商品',
    publishProductAdd: '发布商品',
    updateProduct: '修改商品',
    productDetail: '商品详情',
    /* 报表管理 */
    reportFormManage: '报表管理',
    sellsReport: '销售报表',
    stockReport: '库存报表',
    orderReport: '订单报表',
    reportAnnualSeasons: '年季度报表',
    /* 审核管理 */
    checkManage: '审核管理 ',
    stockFirstCheck: '进货一审',
    stockSecondCheck: '进货二审',
    returnsFirstCheck: '退货一审',
    returnsSecondCheck: '退货二审',
    checkRecordStock: '进货审核记录',
    checkRecordReturns: '退货审核记录',
    /* 订单管理 */
    orderManage: '订单管理',
    waitShips: '待发货',
    waitShipsRe: '已发货的订单',
    waitReceive: '待收货',
    waitRefund: '待退款',
    /* 退货管理 */
    returnManage: '退货管理',
    waitCheck_done: '待命名',
    waitCheck_done_r: '待命名',
    waiteOver: '待命名',
    waiteOver_r: '待命名',
    waitCheck_all: '待命名',
    waitCheck_all_r: '待命名',
    waitMoney: '待命名',
    waitRecord: '待命名',
    /* 配送服务 */
    servicePeiSong: '配送服务',
    order: '待命名',
    psAddrRecord: '待命名',
    sendRecord: '待命名',
    sellRecord: '待命名',
    wuliuEdit: '待命名',
    wuliuRecord: '待命名',
    /* 设置 */
    setting: '设置',
    /* 开票管理 */
    billingRe: '开票记录',
    billingKefu: '开票信息-审核',
    billingCaiwu: '开票信息-出票',
    /* 物流 */
    wuliuCompany: '物流公司',
    size: '分类规格',
    sizeAdd: '新增分类规格',
    sizeValue: '属性查看',
    /* 优惠券 */
    youhuiquan: '优惠券管理',
    list: '优惠券列表',
    detail: '优惠券明细',
    add: '添加优惠券'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  }
}
