<template>
  <div>
    <d2-crud
            :columns="columns"
            :data="crudData"
            :options="crudOptions"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '订单号',
          width: '150px',
          key: 'orderid'
        },
        {
          title: '下单时间',
          width: '150px',
          key: 'ordertime'
        },
        {
          title: '发货时间',
          width: '150px',
          key: 'expresstime'
        },
        {
          title: '订单状态',
          key: 'orderstate'
        },
        {
          title: '返款状态',
          key: 'coststate'
        },
        {
          title: '返款日期',
          width: '150px',
          key: 'costtime'
        },
        {
          title: '物流公司',
          key: 'expressname'
        },
        {
          title: '物流订单号',
          width: '140px',
          key: 'expressnumber'
        },
        {
          title: '优化师',
          width: '100px',
          key: 'nickname'
        },
        {
          title: '货币',
          key: 'money'
        },
        {
          title: '订单金额',
          key: 'orderprice'
        },
        {
          title: '返款金额',
          key: 'amount'
        },
        {
          title: '运费',
          key: 'fee'
        },
        {
          title: '手续费',
          key: 'freight'
        },
        {
          title: '退款退货金额',
          key: 'refund_freight'
        },
        {
          title: '退货手续费',
          key: 'return_freight'
        },
        {
          title: '仓储费',
          key: 'storage_costs'
        },
        {
          title: '上架费',
          key: 'add_cost'
        },
        {
          title: '备注',
          key: 'desc'
        }
      ],
      crudOptions: {
        showSummary: true,
        summaryMethod (param) {
          const { columns, data } = param
          const sums = []
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '总价'
              return
            }
            if (['expressnumber', 'desc'].includes(column.property)) {
              sums[index] = ''
              return
            }
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
            } else {
              sums[index] = ''
            }
          })
          return sums
        }
      }
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    crudData () {
      if (!this.data.List) return []
      return this.data.List.map(item => {
        item.orderid = item.OrderBasic.orderid
        item.ordertime = item.OrderBasic.ordertime
        item.orderstate = item.OrderBasic.orderstate
        item.expresstime = item.OrderBasic.OrderExpress.expresstime
        item.coststate = item.OrderBasic.OrderCost.coststate
        item.costtime = new Date(item.OrderBasic.OrderCost.rebate_date).FormatDefault()
        item.expressname = item.OrderBasic.OrderExpress.expressname
        item.expressnumber = item.OrderBasic.OrderExpress.expressnumber
        item.nickname = item.OrderBasic.User.nickname
        item.money = item.OrderBasic.money
        item.orderprice = item.OrderBasic.orderprice
        return item
      })
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  /deep/ .cell {
    text-align: center;
  }
</style>
