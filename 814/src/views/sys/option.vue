<template>
  <d2-container>
    <m-tabs
        @handaleSave="handaleSave"
        :tab_value="tab_value"
        :list="list"
        :data="data"/>
  </d2-container>
</template>

<script>
import { getConfig, saveConfig } from '@api/sys'
import { cdntypes, ipSelect } from '../../res/res'
export default {
  data () {
    return {
      tab_value: 'PTConfig',
      list: [
        // {
        //   title: 'tab-模板',
        //   key: 'demo',
        //   items: [
        //     { label: '平台主名称', type: 'input', key: 'name' },
        //     { label: '运行在开发模式', type: 'switch', key: 'mode' },
        //     { label: '禁止登陆提示信息', type: 'textarea', key: 'info' },
        //     { label: 'CDN类型',
        //       type: 'select',
        //       key: 'cdn',
        //       options: [
        //         { label: '七牛', value: 'qiniu' },
        //         { label: '阿里云', value: 'aliyun' },
        //         { label: '腾讯云(开发中)', value: 'tencent', disabled: true }
        //       ]
        //     }
        //   ]
        // },
        {
          title: '基础设置',
          key: 'PTConfig',
          items: [
            { label: '平台主名称', type: 'input', key: 'ptname' },
            { label: '平台二级名称', type: 'input', key: 'ptsubname' },
            {
              label: '运行在开发模式',
              type: 'select',
              key: 'debug',
              options: [
                { label: '是', value: '是' },
                { label: '否', value: '否' }
              ]
            },
            {
              label: '普通用户登录',
              type: 'select',
              key: 'ptloginenable',
              options: [
                { label: '允许', value: '允许' },
                { label: '禁止', value: '禁止' }
              ]
            },
            { label: '禁止登陆提示信息', type: 'textarea', key: 'ptlogininfo' },
            { label: '平台代号', type: 'input', key: 'appid' },
            { label: '主题颜色', type: 'input', key: 'theme' }
          ]
        },
        {
          title: '汇率设置',
          key: 'HLConfig',
          items: [
            { label: '美元汇率', type: 'input', key: '$' },
            { label: '台币汇率', type: 'input', key: 'NT' },
            { label: '港币汇率', type: 'input', key: 'HK' },
            { label: '马来汇率', type: 'input', key: 'RM' },
            { label: '新加坡汇率', type: 'input', key: 'S$' },
            { label: '泰国汇率', type: 'input', key: 'TH' },
            { label: '印尼汇率', type: 'input', key: 'Rp' },
            { label: '日本汇率', type: 'input', key: 'JPN' }
          ]
        },
        {
          title: '下单设置',
          key: 'OrderConfig',
          items: [
            { label: '主下单服务器', type: 'input', key: 'server' },
            { label: '备用下单服务器1', type: 'input', key: 'bakserver1' },
            { label: '备用下单服务器2', type: 'input', key: 'bakserver2' },
            { label: '备用下单服务器3', type: 'input', key: 'bakserver3' }
          ]
        },
        {
          title: '杂项设置',
          key: 'ExportConfig',
          items: [
            { label: '导单系统地址', type: 'input', key: 'export_url' },
            { label: '导单系统Key', type: 'input', key: 'expressKey' },
            {
              label: '编辑商品开关',
              type: 'select',
              key: 'edit_switch',
              options: [
                { label: '开', value: '开' },
                { label: '关', value: '关' }
              ]
            },
            {
              label: '全局开启跳转',
              type: 'select',
              key: 'screen_skip',
              options: [
                { label: '开', value: 1 },
                { label: '关', value: 0 }
              ]
            },
            { label: '跳转条件', type: 'input', key: 'clock_url' },
            { label: '白名单订单号', type: 'input', key: 'prefix_orderid' },
            { label: 'clock账号', type: 'input', key: 'clock_account' },
            { label: 'clock密码', type: 'input', key: 'clock_password' },
            {
              label: 'IP来源查询接口设置',
              type: 'select',
              key: 'ipquery_type',
              options: ipSelect
            },
            { label: 'SMS账号', type: 'input', key: 'wmsKey' },
            { label: 'SMS秘钥', type: 'input', key: 'wmsPass' }
          ]
        },
        {
          title: 'CDN设置',
          key: 'CdnConfig',
          items: [
            {
              label: 'CDN类型',
              type: 'select',
              key: 'cdntype',
              options: cdntypes
            },
            { label: 'accesskey', type: 'input', key: 'accesskey' },
            { label: 'secretkey', type: 'input', key: 'secretkey' },
            { label: 'bucket', type: 'input', key: 'bucket' },
            { label: 'region', type: 'input', key: 'region' },
            { label: '访问地址前缀', type: 'input', key: 'cdnbase' }
          ]
        },
        {
          title: 'apikey设置',
          key: 'ApikeyConfig',
          items: [
            { label: 'jdwxKey', type: 'input', key: 'jdwxapikey' },
            { label: 'trackingmoreKey', type: 'input', key: 'trackingmoreapikey' },
            { label: 'stripe_sk', type: 'input', key: 'stripe_sk' },
            { label: 'stripe_pk', type: 'input', key: 'stripe_pk' }
          ]
        },
        {
          title: '企业微信设置',
          key: 'QYWXConfig',
          items: [
            {
              label: '启用',
              type: 'select',
              key: 'enable',
              options: [
                { label: '是', value: '是' },
                { label: '否', value: '否' }
              ]
            },
            { label: 'appid', type: 'input', key: 'wxappid' },
            { label: 'agentid', type: 'input', key: 'agentid' },
            { label: 'secret', type: 'input', key: 'secret' }
          ]
        },
        {
          title: 'Beta版本设置',
          key: 'BetaConfig',
          items: [
            {
              label: '全员使用',
              type: 'select',
              key: 'state',
              options: [
                { label: '开', value: true },
                { label: '关', value: false }
              ]
            },
            { label: '部分使用', type: 'input', key: 'userid' },
            { label: 'A版地址', type: 'input', key: 'apia' },
            { label: 'B版地址', type: 'input', key: 'apib' }
          ]
        },
        {
          title: '物流仓储系统设置',
          key: 'ExpressConfig',
          items: [
            { label: '物流系统地址', type: 'input', key: 'expressUrl' },
            { label: '物流系统Key', type: 'input', key: 'expressKey' },
            { label: '仓储系统地址', type: 'input', key: 'wmsUrl' },
            { label: '仓储系统Key', type: 'input', key: 'wmsKey' },
            { label: '仓储系统用户', type: 'input', key: 'wmsUser' },
            { label: '仓储系统密码', type: 'input', key: 'wmsPass' }
          ]
        }
      ],
      data: {}
    }
  },
  created () {
    this.refreshData()
  },
  methods: {
    async refreshData () {
      let res = await getConfig()
      const {
        expressUrl,
        expressKey,
        wmsUrl,
        wmsKey,
        wmsUser,
        wmsPass
      } = res.ExportConfig
      res.ExpressConfig = {
        expressUrl,
        expressKey,
        wmsUrl,
        wmsKey,
        wmsUser,
        wmsPass
      }
      this.data = res
    },
    async SaveConfig (key) {
      let data = { config: this.data[key] }
      let res = {}
      switch (key) {
        case 'ApikeyConfig':
          res = await saveConfig('saveapikey', data)
          break
        case 'BetaConfig':
          res = await saveConfig('saveBeta', data)
          break
        case 'CdnConfig':
          res = await saveConfig('savecdn', data)
          break
        case 'ExportConfig':
          res = await saveConfig('saveexport', data)
          break
        case 'HLConfig':
          res = await saveConfig('savehl', data)
          break
        case 'OrderConfig':
          res = await saveConfig('saveorder', data)
          break
        case 'PTConfig':
          res = await saveConfig('savebasic', data)
          break
        case 'QYWXConfig':
          res = await saveConfig('saveqywx', data)
          break
      }
      if (!res.Error) {
        this.$message({
          message: res.Info,
          type: 'success'
        })
        this.refreshData()
      } else if (res.Info) {
        this.$message({
          message: res.Info,
          type: 'error'
        })
      }
      this.refreshData()
    },
    handaleSave (key) {
      let KEY = key
      if (key === 'ExpressConfig') KEY = 'ExportConfig'
      this.SaveConfig(KEY)
    }
  }
}
</script>

<style lang="less" scoped></style>
