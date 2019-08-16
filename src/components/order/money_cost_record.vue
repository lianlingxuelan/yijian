<template>
  <div>
    <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="isShowIcon">
      <el-table-column type="expand" >
        <template slot-scope="props" v-if="props.row.OrderCostLogs.length !== 0">
        <el-table
                class="m-sub-table"
                :data="props.row.OrderCostLogs"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :row-style="{background:'#eef1f6'}"
                style="width: 100%">
          <template v-for="(subItem, subIndex) in subColumn">
            <el-table-column
                    :key="`column_${subIndex}`"
                    :label="subItem.title"
                    :prop="subItem.key">
            </el-table-column>
          </template>
        </el-table>
        </template>
      </el-table-column>
      <template v-for="(item, index) in column">
        <el-table-column
                :key="`column_${index}`"
                :label="item.title"
                :prop="item.key"
                :width="item.width">
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      column: [
        {
          title: '订单号',
          key: 'orderid',
          width: '150px'
        },
        {
          title: '下单时间',
          key: 'ordertime',
          width: '150px'
        },
        {
          title: '发货时间',
          key: 'OrderExpress.expresstime',
          width: '150px'
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
          title: '最新返款日期',
          key: 'rebate_date',
          width: '150px'
        },
        {
          title: '物流公司',
          key: 'OrderExpress.expressname'
        },
        {
          title: '物流订单号',
          key: 'OrderExpress.expressnumber',
          width: '150px'
        },
        {
          title: '优化师',
          key: 'User.nickname',
          width: '100px'
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
      subColumn: [
        {
          title: '导入时间',
          key: 'created_at'
        },
        {
          title: '返款日期',
          key: 'rebate_date'
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
        }
      ],
      merges: []
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    tableData () {
      if (!this.data.List) return []
      let result = this.data.List.map(item => {
        if (item.OrderCost && item.OrderCost.rebate_date) {
          item.rebate_date = new Date(item.OrderCost.rebate_date).FormatDefault().toString()
        }
        item.coststate = item.OrderCost ? item.OrderCost.coststate : '未返款'
        item.orderid = item.orderid.toString()
        return item
      })
      return result
    }
  },
  created () {
  },
  methods: {
    isShowIcon (row) {
      if (row.row.OrderCostLogs.length > 0) return ''
      else return 'hiderow'
    },
    getExcelIndex (n) {
      const ordA = 'A'.charCodeAt(0)
      const ordZ = 'Z'.charCodeAt(0)
      const len = ordZ - ordA + 1
      let s = ''
      while (n >= 0) {
        s = String.fromCharCode(n % len + ordA) + s
        n = Math.floor(n / len) - 1
      }
      return s
    },
    handleExportData () {
      let exportData = []
      let row = 2
      let merges = []
      const len = this.column.length
      this.tableData.forEach(a => {
        if (a.OrderCostLogs.length === 0) {
          exportData.push(a)
          row++
        } else {
          let srow = row
          a.OrderCostLogs.forEach(b => {
            Object.keys(b).forEach(key => {
              a[`log_${key}`] = b[key]
            })
            exportData.push(a)
            row++
          })
          for (let i = 0; i < len; i++) {
            merges.push([`${this.getExcelIndex(i)}${srow}`, `${this.getExcelIndex(i)}${row - 1}`])
          }
        }
      })
      this.merges = merges
      return exportData
    },
    exportExcel () {
      this.$export.excel({
        columns: [
          ...this.column.map(item => {
            item.label = item.title
            item.prop = item.key
            return item
          }),
          ...this.subColumn.map(item => {
            item.prop = `log_${item.key}`
            item.label = item.title
            return item
          })
        ],
        data: this.handleExportData(),
        title: 'export-test',
        merges: this.merges
      })
        .then(() => {
          this.$message('导出表格成功')
        })
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/ .cell {
    text-align: center;
  }
  /deep/ .hiderow .el-table__expand-column .cell {
    display: none;
    pointer-events: none;
  }
</style>
