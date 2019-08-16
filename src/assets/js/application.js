const Res = {
  areas: [{ value: 'tw', name: '台湾' }, { value: 'hk', name: '香港' }, { value: 'my', name: '马来西亚' }, {
    value: 'sg',
    name: '新加坡'
  }, { value: 'th', name: '泰国' }, { value: 'all', name: '通用' }],
  moneys: [ { name: '所有', value: 'all' }, { name: 'NT(新台币)', value: 'NT' }, { name: 'HK(港币)', value: 'HK' }, {
    name: 'RM(马币)',
    value: 'RM'
  }, { name: 'S$(新币)', value: 'S$' },
  { name: '฿(泰铢)', value: '฿' }, { name: 'Rp(印尼卢比)', value: 'Rp' }, { name: 'RMB(人民币)', value: '￥' }, {
    name: '円(日币)', value: '円'
  }],
  orderstates: [{ name: '所有单', value: 'all' }, { name: '待确认', value: 'new' }, {
    name: '待发货',
    value: 'waitsend'
  }, { name: '配货中', value: 'picking' }, { name: '待收货', value: 'sending' },
  { name: '已完成', value: 'end' }, { name: '已退货', value: 'return' }, { name: '黑名单用户订单', value: 'black' }, {
    name: '重复单',
    value: 'repeat'
  }, { name: '已付款', value: 'alreadypay' }],
  searchtypes: [{
    name: '订单信息',
    options: [
      { name: '订单号', value: 'orderid' },
      { name: '商品名', value: 'goodsname' },
      { name: '物流单号', value: 'expressnumber' },
      { name: '物流名称', value: 'expressname' },
      { name: '采购物流单号', value: 'pur_info' }
    ]
  },
  {
    name: '客户信息',
    options: [{ name: '姓名', value: 'clientname' }, { name: '电话', value: 'clientphone' }, {
      name: '地址',
      value: 'clientaddress'
    }, { name: '邮件', value: 'clientemail' }]
  },
  { name: '全部', options: [{ name: '搜全部', value: 'all' }] }],
  pickerOptions: {
    shortcuts: [
      {
        text: '今天',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime())
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '昨天',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
          end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '本周',
        onClick (picker) {
          const end = new Date()
          const start = new Date(new Date() - (new Date().getDay() - 1) * 86400000)
          end.setTime(start.getTime() + 3600 * 1000 * 24 * 6)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '上周',
        onClick (picker) {
          const end = new Date(new Date() - (new Date().getDay()) * 86400000)
          const start = new Date()
          start.setTime(end.getTime() - 3600 * 1000 * 24 * 6)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '本月',
        onClick (picker) {
          const Nowdate = new Date()
          const start = new Date(Nowdate.getFullYear(), Nowdate.getMonth(), 1)
          const MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1, 1)
          const end = new Date(MonthNextFirstDay - 3600 * 1000 * 24 * 1)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '上月',
        onClick (picker) {
          const Nowdate = new Date()
          const start = new Date(Nowdate.getFullYear(), Nowdate.getMonth() - 1, 1)
          const MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth(), 1)
          const end = new Date(MonthNextFirstDay - 3600 * 1000 * 24 * 1)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '过去7天',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '过去30天',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '过去三个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }]
  }
}
export default Res
