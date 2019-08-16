<template>
    <d2-container class="month_report">
        <template slot="header">
            <el-row>
                <el-col :span="12">
                    <roi-search :groupshow="true" :GroupnameList="GroupnameList" :Months="Months" :moneys="moneys" :SearchContent="SearchContent"
                                @search="search" @filter_group="filter_group"></roi-search>
                </el-col>
                <el-col :span="12" style="text-align: right">
                    <el-button size="medium" type="warning">导出</el-button>
                </el-col>
            </el-row>
        </template>
        <d2-crud :columns="columns" :data="MonthReports" :options="options"/>
    </d2-container>
</template>
<script>
import RoiSearch from '@/components/roi/roi_search'
import roiApi from '@/api/roi'
import Res from '@/assets/js/application'
export default {
  name: 'month_report',
  components: {
    RoiSearch
  },
  data () {
    return {
      GroupnameList: [],
      Months: [],
      moneys: Res.moneys.slice(1),
      SearchContent: {
        MemberName: '不过滤',
        Money: '',
        Month: ''
      },
      amount: {
        orderamountRMB: 0,
        groupname: '合计',
        goodscount: 0,
        copycount: 0,
        validcount: 0,
        orderamount: 0,
        endcount: 0,
        endamount: 0,
        spend: 0,
        spend_rmb: 0,
        price: 0,
        price1: 0,
        roi: 0
      },
      MonthReports: [],
      dayReports: [],
      RoiParams: {},
      columns: [
        {
          title: '组长',
          key: 'groupname',
          sortable: true
        },
        {
          title: '优化师',
          key: 'nickname',
          sortable: true
        },
        {
          title: '入职时间',
          key: 'created_at',
          sortable: true
        },
        {
          title: '原创上新',
          key: 'goodscount',
          sortable: true
        },
        {
          title: '复制上架',
          key: 'copycount',
          sortable: true
        },
        {
          title: '有效单',
          key: 'validcount',
          sortable: true
        },
        {
          title: '有效销售额',
          key: 'orderamount',
          sortable: true
        },
        {
          title: '广告费($)',
          key: 'spend',
          sortable: true
        },
        {
          title: '广告费(￥)',
          key: 'spend_rmb',
          sortable: true
        },
        {
          title: '客单价(￥)',
          key: 'price',
          sortable: true
        },
        {
          title: '转化单价($)',
          key: 'price1',
          sortable: true
        },
        {
          title: 'ROI',
          key: 'roi',
          sortable: true
        }
      ],
      options: {
        border: true,
        spanMethod ({ rowIndex, columnIndex }) {
          if (rowIndex === 0) {
            if (columnIndex === 0) {
              return [1, 3]
            } else if (columnIndex === 1) {
              return [0, 0]
            } else if (columnIndex === 2) {
              return [0, 0]
            }
          }
        },
        rowClassName ({ rowIndex }) {
          if (rowIndex === 0) {
            return 'primary-row'
          }
          return ''
        }
      }
    }
  },
  mounted () {
    this.getMonthReport()
  },
  methods: {
    async getMonthReport () {
      let data = await roiApi.getMonthReport(this.SearchContent)
      this.Months = data.Months
      this.SearchContent.Month = data.Month
      this.SearchContent.Money = data.Money
      this.MonthReports = data.MonthReports
      this.dayReports = data.MonthReports
      this.RoiParams = data.RoiParams
      if (this.RoiParams) {
        if (this.SearchContent.Money === '฿') {
          if (!this.RoiParams.TH || !this.RoiParams.$ || !this.RoiParams[this.SearchContent.Money + 'QSL']) {
            this.$message('请先联系管理员设置本区域计算参数！')
          } else {
            this.HL = this.RoiParams.TH
            this.QSL = this.RoiParams[this.SearchContent.Money + 'QSL']
            this.ADHL = this.RoiParams.$
          }
        } else {
          if (!this.RoiParams[this.SearchContent.Money] || !this.RoiParams.$ || !this.RoiParams[this.SearchContent.Money + 'QSL']) {
            this.$message('请先联系管理员设置本区域计算参数！')
          } else {
            this.HL = this.RoiParams[this.SearchContent.Money]
            this.QSL = this.RoiParams[this.SearchContent.Money + 'QSL']
            this.ADHL = this.RoiParams.$
          }
        }
      }
      this.GroupnameList = this.MonthReports.reverse().filter((item, index) => {
        if (item.groupname) {
          const _index = this.MonthReports.findIndex((_item) => {
            return item.groupname === _item.groupname
          })
          return index === _index
        }
      })
      this.GroupnameList.unshift({ groupname: '不过滤' })
      this.MonthReports.map((item) => {
        this.amount.goodscount = this.amount.goodscount + item.goodscount
        item.goodscount = item.goodscount ? item.goodscount : '-'
        this.amount.copycount = this.amount.copycount + item.copycount
        item.copycount = item.copycount ? item.copycount : '-'
        this.amount.validcount = this.amount.validcount + item.validcount
        item.validcount = item.validcount ? item.validcount : '-'
        this.amount.orderamount = this.amount.orderamount + item.orderamount
        item.orderamount = item.orderamount ? item.orderamount : '-'
        this.amount.endcount = this.amount.endcount + item.endcount
        item.endcount = item.endcount ? item.endcount : '-'
        this.amount.endamount = this.amount.endamount + item.endamount
        item.endamount = item.endamount ? item.orderamount : '-'
        this.amount.spend = this.amount.spend + item.spend
        item.spendRMB = this.ADHL ? this.calc_spendRMB(item) : 0
        item.spendRMB = item.spendRMB ? item.spendRMB : 0
        this.amount.spendRMB = this.amount.spendRMB + item.spendRMB
        item.spend = item.spend ? item.spend.toFixed(3) : '-'
        this.amount.spendRMB = this.amount.spendRMB + item.spendRMB
        this.amount.spend_rmb = this.amount.spend_rmb + item.spend_rmb
        item.spend_rmb = item.spend_rmb ? item.spend_rmb.toFixed(3) : '-'
        item.orderamountRMB = (this.HL ? this.calc_amountRMB(item) : 0)
        item.orderamountRMB = item.orderamountRMB ? item.orderamountRMB : 0
        this.amount.orderamountRMB = this.amount.orderamountRMB + item.orderamountRMB
        this.amount.price = (this.amount.orderamountRMB / this.amount.validcount * this.QSL).toFixed(3)
        item.price = item.orderamountRMB / (item.validcount === 0 ? 1 : item.validcount)
        item.price = item.price ? (item.price * this.QSL).toFixed(2) : '-'
        this.amount.price1 = ((this.amount.spend + this.amount.spend_rmb) / this.amount.validcount).toFixed(2)
        item.price1 = item.price1 ? ((item.spend + this.calc_spend_rmb(item.spend_rmb)) / item.validcount).toFixed(2) : '-'
        this.amount.roi = (this.amount.orderamountRMB / this.amount.spendRMB * this.QSL).toFixed(3)
        item.roi = item.spendRMB ? (item.orderamountRMB / item.spendRMB * this.QSL).toFixed(2) : '-'
      })
      // 合计插入第一行
      this.MonthReports.unshift(this.amount)
    },
    calc_spendRMB (item) {
      if ((item.spend || item.spend_rmb) && this.ADHL) {
        return parseFloat(eval(item.spend + '' + this.ADHL + (item.spend_rmb ? '+' + item.spend_rmb : 0)).toFixed(3))
      }
    },
    calc_spend_rmb (rmb) {
      if (rmb !== '-' && this.ADHL) {
        let copyADHL = this.ADHL
        if (copyADHL[0] === '/') {
          copyADHL = copyADHL.replace('/', '*')
        } else if (copyADHL[0] === '*') {
          copyADHL = copyADHL.replace('*', '/')
        } else {
          return undefined
        }
        return parseFloat(eval(rmb + '' + copyADHL).toFixed(3))
      } else {
        return 0
      }
    },
    calc_amountRMB (item) {
      if (item.orderamount !== '-' && this.HL) {
        return parseFloat(eval(item.orderamount + '' + this.HL).toFixed(3))
      }
    },
    search () {
      this.getMonthReport()
    },
    filter_group () {
      if (this.SearchContent.MemberName === '不过滤') {
        this.MonthReports = this.dayReports
      } else {
        this.MonthReports = this.dayReports.filter((item) => {
          return item.groupname === this.SearchContent.MemberName
        })
      }
    }
  }
}
</script>

<style scoped>
    .month_report /deep/.el-table .primary-row {
        background: rgba(80, 133, 255, .2);
        color: #2769ff;
        font-weight: bold
    }
</style>
