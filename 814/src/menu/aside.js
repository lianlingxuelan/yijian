// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '订单',
    icon: 'list-ul',
    children: [
      { path: '/order/valid', title: '有效订单', icon: 'check' },
      { path: '/order/invalid', title: '无效订单', icon: 'close' },
      { path: '/order/rank', title: '订单排名', icon: 'signal' },
      { path: '/order/black', title: '黑名单客户', icon: 'pie-chart' },
      { path: '/order/money', title: '返款管理', icon: 'pie-chart' },
      { path: '/order/white', title: '来源白名单', icon: 'pie-chart' }
    ]
  },
  {
    title: 'ROI',
    icon: 'cny',
    children: [
      { path: '/roi/edit', title: 'ROI填写', icon: 'edit' },
      { path: '/roi/day_report', title: '按日统计', icon: 'list' },
      { path: '/roi/month_report', title: '按月统计', icon: 'list' },
      { path: '/roi/account_spend', title: '广告花费', icon: 'list-alt' }
    ]
  },
  {
    title: '商品',
    icon: 'shopping-bag',
    children: [
      { path: '/goods/add', title: '新增商品', icon: 'plus' },
      { path: '/goods/list', title: '商品管理', icon: 'th-large' },
      { path: '/goods/home', title: '首页管理', icon: 'th-large' },
      { path: '/goods/report', title: '销量统计', icon: 'list-alt' },
      { path: '/goods/stats', title: '采购统计', icon: 'list-alt' },
      { path: '/goods/theme', title: '单页模板', icon: 'list-alt' }
    ]
  },
  {
    title: '网站',
    icon: 'shopping-bag',
    children: [
      { path: '/site/addgoods', title: '新增商品', icon: 'plus' },
      { path: '/site/add', title: '新增网站', icon: 'plus' },
      { path: '/site/manager', title: '网站管理', icon: 'th-large' },
      // { path: '/site/stats', title: '统计', icon: 'list-alt' },
      // { path: '/site/report', title: '报表', icon: 'list-alt' },
      { path: '/site/theme', title: '商城模板', icon: 'list-alt' }
    ]
  },
  {
    title: '我的',
    icon: 'user',
    children: [
      { path: '/my/code', title: '代码', icon: 'facebook-official' },
      { path: '/my/domain', title: '域名', icon: 'internet-explorer' },
      { path: '/my/kf', title: '客服', icon: 'meh-o' },
      { path: '/my/zxkf', title: '在线客服', icon: 'volume-control-phone' },
      { path: '/my/page', title: '页面', icon: 'desktop' }
    ]
  },
  {
    title: '权限',
    icon: 'user',
    children: [
      { path: '/permission/management', title: '用户权限', icon: 'facebook-official' },
      { path: '/permission/roles', title: '角色管理', icon: 'facebook-official' },
      { path: '/permission/customer', title: '客服指派', icon: 'meh-o' },
      { path: '/permission/purchase', title: '采购指派', icon: 'yen' }
    ]
  },
  {
    title: '系统',
    icon: 'cog',
    children: [
      { path: '/sys/option', title: '设置', icon: 'cogs' },
      { path: '/sys/notice', title: '公告管理', icon: 'bell-o' },
      { path: '/sys/language', title: '多语言管理', icon: 'language' },
      { path: '/sys/sms', title: '短信模板管理', icon: 'list' },
      { path: '/sys/logs', title: '日志', icon: 'file-text-o' },
      { path: '/sys/goodstype', title: '商品分类管理', icon: 'file-text-o' },
      { path: '/sys/paypal', title: 'paypal管理', icon: 'file-text-o' },
      { path: '/sys/telrules', title: '电话规则管理', icon: 'volume-control-phone' },
      { path: '/sys/limit', title: '下单限制', icon: 'file-text-o' }
    ]
  }
]
