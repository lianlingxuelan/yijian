import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 演示页面
      {
        path: 'order/valid',
        name: 'valid',
        meta: {
          title: '有效订单',
          auth: true,
          cache: true
        },
        component: _import('order/valid')
      },
      {
        path: 'order/invalid',
        name: 'invalid',
        meta: {
          title: '无效订单',
          auth: true
        },
        component: _import('order/invalid')
      },
      {
        path: 'order/rank',
        name: 'rank',
        meta: {
          title: '订单排名',
          auth: true
        },
        component: _import('order/rank')
      },
      {
        path: 'roi/edit',
        name: 'edit',
        meta: {
          title: 'ROI填写',
          auth: true
        },
        component: _import('roi/edit')
      },
      {
        path: 'roi/day_report',
        name: 'day_report',
        meta: {
          title: '按日统计',
          auth: true
        },
        component: _import('roi/day_report')
      },
      {
        path: 'roi/month_report',
        name: 'month_report',
        meta: {
          title: '按月统计',
          auth: true
        },
        component: _import('roi/month_report')
      },
      {
        path: 'roi/account_spend',
        name: 'account_spend',
        meta: {
          title: '广告花费',
          auth: true
        },
        component: _import('roi/account_spend')
      },
      {
        path: '/order/black',
        name: 'order_black',
        meta: {
          title: '黑名单客户',
          auth: true
        },
        component: _import('order/black')
      },
      {
        path: '/order/white',
        name: 'order_white',
        meta: {
          title: 'white',
          auth: true
        },
        component: _import('order/white')
      },
      {
        path: '/order/money',
        name: 'order_money',
        meta: {
          title: 'money',
          auth: true
        },
        component: _import('order/money')
      },
      // 新增商品
      {
        path: 'goods/add/:id?',
        name: 'goods_add',
        meta: {
          title: '新增商品',
          auth: true
        },
        component: _import('goods/add.vue')
      },
      {
        path: 'goods/list',
        name: 'goods_list',
        meta: {
          title: '商品管理',
          auth: true
        },
        component: _import('goods/list.vue')
      },
      // 首页管理
      {
        path: 'goods/home',
        name: 'goods_home',
        meta: {
          title: '首页管理',
          auth: true
        },
        component: _import('goods/home.vue')
      },
      // 销量统计
      {
        path: '/goods/report',
        name: 'goods_report',
        meta: {
          title: '销量统计',
          auth: true
        },
        component: _import('goods/report.vue')
      },
      {
        path: '/goods/theme',
        name: 'goods_theme',
        meta: {
          title: '单页模板',
          auth: true
        },
        component: _import('goods/theme.vue')
      },
      // 采购统计
      {
        path: '/goods/stats',
        name: 'goods_stats',
        meta: {
          title: '采购统计',
          auth: true
        },
        component: _import('goods/stats.vue')
      },
      {
        path: '/goods/comment/:id?',
        name: 'goods_comment',
        meta: {
          title: '商品评论',
          auth: true
        },
        component: _import('goods/comment.vue')
      },
      {
        path: '/site/addgoods',
        name: 'site_addgoods',
        meta: {
          title: '新增商品',
          auth: true
        },
        component: _import('site/addgoods.vue')
      },
      {
        path: '/site/add',
        name: 'site_add',
        meta: {
          title: '新增网站',
          auth: true
        },
        component: _import('site/add.vue')
      },
      {
        path: '/site/manager',
        name: 'site_manager',
        meta: {
          title: '网站管理',
          auth: true
        },
        component: _import('site/manager.vue')
      },
      {
        path: '/site/theme',
        name: 'site_theme',
        meta: {
          title: '商城模板',
          auth: true
        },
        component: _import('site/theme.vue')
      },
      // 代码管理
      {
        path: '/my/code',
        name: 'my_code',
        meta: {
          title: '代码管理',
          auth: true
        },
        component: _import('my/code.vue')
      },
      // 域名管理
      {
        path: '/my/domain',
        name: 'my_domain',
        meta: {
          title: '域名管理',
          auth: true
        },
        component: _import('my/domain.vue')
      },
      // 客服管理
      {
        path: '/my/kf',
        name: 'my_kf',
        meta: {
          title: '客服管理',
          auth: true
        },
        component: _import('my/kf.vue')
      },
      // 在线客服管理
      {
        path: '/my/zxkf',
        name: 'my_zxkf',
        meta: {
          title: '在线客服管理',
          auth: true
        },
        component: _import('my/zxkf.vue')
      },
      // 页面客服管理
      {
        path: '/my/page',
        name: 'my_page',
        meta: {
          title: '页面管理',
          auth: true
        },
        component: _import('my/page.vue')
      },

      // 用户权限
      {
        path: '/permission/management',
        name: 'management',
        meta: {
          title: '用户权限',
          auth: true
        },
        component: _import('permission/management')
      },
      {
        path: '/permission/roles',
        name: 'roles',
        meta: {
          title: '角色管理',
          auth: true
        },
        component: _import('permission/roles')
      },
      {
        path: '/permission/customer',
        name: 'customer',
        meta: {
          title: '客服指派',
          auth: true
        },
        component: _import('permission/customer')
      },
      {
        path: '/permission/purchase',
        name: 'purchase',
        meta: {
          title: '采购指派',
          auth: true
        },
        component: _import('permission/purchase')
      },
      // 系统设置
      {
        path: '/sys/option',
        name: 'sys_option',
        meta: {
          title: '系统设置',
          auth: true
        },
        component: _import('sys/option.vue')
      },
      // 系统设置
      {
        path: '/sys/option',
        name: 'sys_option',
        meta: {
          title: '系统设置',
          auth: true
        },
        component: _import('sys/option.vue')
      },
      // 公告设置
      {
        path: '/sys/notice',
        name: 'sys_notice',
        meta: {
          title: '公告设置',
          auth: true
        },
        component: _import('sys/notice.vue')
      },

      // paypal管理
      {
        path: '/sys/paypal',
        name: 'sys_paypal',
        meta: {
          title: 'paypal管理',
          auth: true
        },
        component: _import('sys/paypal.vue')
      },
      // 下单限制
      {
        path: '/sys/limit',
        name: 'sys_limit',
        meta: {
          title: '下单限制',
          auth: true
        },
        component: _import('sys/limit.vue')
      },
      {
        path: '/sys/sms',
        name: 'sys_sms',
        meta: {
          title: '短信管理',
          auth: true
        },
        component: _import('sys/sms.vue')
      },
      {
        path: '/sys/language',
        name: 'language',
        meta: {
          title: '多语言管理',
          auth: true
        },
        component: _import('sys/language')
      },
      {
        path: '/sys/goodstype',
        name: 'goodstype',
        meta: {
          title: '商品分类管理',
          auth: true
        },
        component: _import('sys/goodstype')
      },
      {
        path: '/sys/telrules',
        name: 'telrules',
        meta: {
          title: '电话规则管理',
          auth: true
        },
        component: _import('sys/telrules')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      },
      // 系统日志
      {
        path: 'sys/logs',
        name: 'logs',
        hidden: true,
        component: _import('sys/logs')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
