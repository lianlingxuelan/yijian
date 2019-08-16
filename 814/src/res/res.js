export const areas = [
  { value: 'tw', name: '台湾' },
  { value: 'hk', name: '香港' },
  { value: 'my', name: '马来西亚' },
  { value: 'sg', name: '新加坡' },
  { value: 'th', name: '泰国' },
  { value: 'all', name: '通用' }
]
export const languages = [
  { value: 'tw', name: '繁体(台湾)' },
  { value: 'hk', name: '繁体(香港)' },
  { value: 'my', name: '简体(马来)' },
  { value: 'sg', name: '简体(新加坡)' },
  { value: 'en', name: '英语' },
  { value: 'th', name: '泰语(泰国)' },
  { value: 'cn', name: '简体(中国)' },
  { value: 'jpn', name: '日语(日本)' }
]
export const classtypes = [
  { name: '关于我们', value: '1' },
  { name: '联系我们', value: '2' },
  { name: '隐私协议', value: '3' },
  { name: '服务条例', value: '4' },
  { name: '退换货政策', value: '5' },
  { name: '其他页面', value: '0' }
]
export const moneys = [
  { name: 'NT(新台币)', value: 'NT' },
  { name: 'HK(港币)', value: 'HK' },
  { name: 'RM(马币)', value: 'RM' },
  { name: 'S$(新币)', value: 'S$' },
  { name: '฿(泰铢)', value: '฿' },
  { name: 'Rp(印尼卢比)', value: 'Rp' },
  { name: 'RMB(人民币)', value: '￥' },
  { name: '円(日币)', value: '円' }
]
export const orderOptions = {
  costState: [
    { label: '不过滤返款状态', value: '0' },
    { label: '已返款', value: '1' },
    { label: '未返款', value: '2' },
    { label: '超额返款', value: '3' },
    { label: '部分返款', value: '4' }
  ],
  orderState: [
    { label: '不过滤订单状态', value: '0' },
    { label: '待收货', value: '1' },
    { label: '已完成', value: '2' }
  ],
  expName: [
    { label: '不过滤物流', value: '0' },
    { label: 'DHL', value: '1' },
    { label: '嘉里', value: '2' },
    { label: '新竹', value: '3' },
    { label: '黑猫', value: '4' },
    { label: 'NJV', value: '5' },
    { label: '顺丰', value: '6' }
  ],
  sortState: [
    { label: '下单时间', value: '1' },
    { label: '发货时间', value: '2' },
    { label: '返款时间', value: '3' }
  ]
}
export const orderMoneyExportDemo = {
  order: {
    '订单号': 'orderid',
    '返款日期': 'rebate_date',
    '返款金额': 'amount',
    '手续费': 'freight',
    '运费': 'fee',
    '退货手续费': 'return_freight',
    '仓储费': 'storage_costs',
    '退款退货金额': 'refund_freight',
    '上架费': 'add_cost',
    '备注': 'desc'
  },
  express: {
    '物流订单号': 'orderid',
    '返款日期': 'rebate_date',
    '返款金额': 'amount',
    '手续费': 'freight',
    '运费': 'fee',
    '退货手续费': 'return_freight',
    '仓储费': 'storage_costs',
    '退款退货金额': 'refund_freight',
    '上架费': 'add_cost',
    '备注': 'desc'
  }
}
export const goodsThemeClass = [
  { value: '通用', label: '通用' },
  { value: '服饰', label: '服饰' },
  { value: '数码', label: '数码' },
  { value: '工具', label: '工具' }
]
export const defaultSMSList = [
  '你好！訂購的AAA。已送到711南投縣草屯鎮碧山路307.309號，取貨截至時間8.4日，這幾天記得自取，收到回復謝謝',
  '第一次是:您好，您訂購的Airpods耳機已到711德欣，只能保留到7月25號，您看什麼时候方便去自取呢，收到回覆謝謝',
  '最后一次是：您好，您訂購的痘痘貼，711門市只能保留到今天（或者明天），今天晚上12点前务必去自取（明天务必去自取），收到回覆謝謝'
]
export const placeholder = [
  { label: '订单号', text: '{{orderid}}' },
  { label: '商品名', text: '{{goodsName}}' },
  { label: '地址', text: '{{address}}' },
  { label: '时间', text: '{{time}}' },
  { label: '地址', text: '{{address}}' },
  { label: '货币', text: '{{money}}' },
  { label: '价格', text: '{{price}}' },
  { label: '手机号', text: '{phone{}}' }
]

export const shares = [
  { name: '组内共享', value: '组内共享' },
  { name: '站内共享', value: '共享' },
  { name: '不共享', value: '不共享' }
]
export const colors = [
  { value: 'white', name: '白色' },
  { value: 'red', name: '红色' },
  { value: 'yello', name: '黄色' },
  { value: 'green', name: '绿色' },
  { value: 'blue', name: '蓝色' },
  { value: 'purple', name: '紫色' },
  { value: 'pink', name: '粉色' }
]
export const types = [
  { value: 'ad', name: '广告代码' },
  { value: 'kf', name: '客服代码' },
  { value: 'tj', name: '统计代码' }
]
export const cdntypes = [
  { label: '七牛', value: 'qiniu' },
  { label: '阿里云', value: 'aliyun' },
  { label: '腾讯云(开发中)', value: 'qclund' }
]
export const ipSelect = [
  { label: '淘宝', value: 'TAOBAO' },
  { label: '京东', value: 'JD' }
]
