<template>
    <d2-container>
        <template slot="header">
            <el-row>
                <el-col :span="12">
                    <roi-search :groupshow="false"  :Months="Months" :moneys="moneys" :SearchContent="SearchContent"
                                @search="search"></roi-search>
                </el-col>
                <el-col :span="12" style="text-align: right">
                    <el-button size="medium" type="warning">导出</el-button>
                </el-col>
            </el-row>
        </template>
        <d2-crud :columns="columns" :data="CodeReports" :options="options"></d2-crud>
    </d2-container>
</template>
<script>
import RoiSearch from '@/components/roi/roi_search'
import roiApi from '@/api/roi'
import Res from '@/assets/js/application'
export default {
  name: 'day_report',
  components: {
    RoiSearch
  },
  data () {
    return {
      Months: [],
      moneys: Res.moneys.slice(1),
      SearchContent: {
        MemberName: null,
        Money: '',
        Month: ''
      },
      CodeReports: [],
      columns: [
        {
          title: '所属组',
          key: 'User.User2.groupname',
          sortable: true
        },
        {
          title: '所属',
          key: 'User.nickname',
          sortable: true
        },
        {
          title: '账户名',
          key: 'Code.name',
          sortable: true
        },
        {
          title: 'FB像素',
          key: 'Code.fbcode',
          sortable: true
        },
        {
          title: '累计花费($)',
          key: 'amount',
          sortable: true
        },
        {
          title: '累计花费(￥)',
          key: 'amount_rmb',
          sortable: true
        }
      ],
      options: {
        border: true
      }
    }
  },
  mounted () {
    this.getAccountSpend()
  },
  methods: {
    async getAccountSpend () {
      let data = await roiApi.getAccountSpend(this.SearchContent)
      this.Months = data.Months
      this.SearchContent.Month = data.Month
      this.SearchContent.Money = data.Money
      this.CodeReports = data.CodeReports
      this.CodeReports.map((item) => {
        item.amount = item.amount_fix ? parseFloat(item.amount) + parseFloat(item.amount_fix) : item.amount
        item.amount = item.amount.toFixed(3)
        item.amount_rmb = item.amount_fix ? parseFloat(item.amount_rmb) + parseFloat(item.amount_fix) : item.amount_rmb
        item.amount_rmb = item.amount_rmb.toFixed(3)
      })
    },
    search () {
      this.getAccountSpend()
    }
  }
}
</script>

<style scoped>

</style>
