<template>
  <d2-container class="rank">
    <el-tabs type="border-card">
      <el-tab-pane label="组内排名">
        <el-row type="flex"  justify="space-between" :gutter="10">
          <el-col :span=6 v-for="item in groups" :key="item.name">
            <div class="rank-border">
              <el-row type="flex"  justify="space-between">
                <el-col :span="12">{{item.name}}</el-col>
                <el-col :span="12" class="danger" style="text-align: right">[单数:{{item.count}},金额:{{item.money}}]</el-col>
              </el-row>
              <d2-crud :columns="columns" :data="item.reports" index-row :options="options"></d2-crud>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="全站排名">
        <el-row type="flex"  justify="space-between" :gutter="10">
          <el-col :span=6 v-for="item in all" :key="item.name">
            <div class="rank-border">
              <el-row type="flex"  justify="space-between">
                <el-col :span="12">{{item.name}}</el-col>
                <el-col :span="12" class="danger" style="text-align: right">[单数:{{item.count}}]</el-col>
              </el-row>
              <d2-crud :columns="columns" :data="item.reports" index-row :options="options"></d2-crud>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </d2-container>
</template>

<script>
import orderApi from '@/api/order'
export default {
  name: 'rank',
  data () {
    return {
      groups: [{ name: '组内今日', count: 0, money: 0, reports: [] },
        { name: '组内昨日', count: 0, money: 0, reports: [] },
        { name: '组内7天', count: 0, money: 0, reports: [] },
        { name: '组内30天', count: 0, money: 0, reports: [] }
      ],
      all: [{ name: '站内今日', count: 0, reports: [] },
        { name: '站内昨日', count: 0, reports: [] },
        { name: '站内7天', count: 0, reports: [] },
        { name: '站内30天', count: 0, reports: [] }
      ],
      columns: [
        {
          title: '优化师',
          key: 'User.nickname'
        },
        {
          title: '金额',
          key: 'money'
        },
        {
          title: '单数',
          key: 'count',
          component: {
            render: (h, scope) => {
              return h('el-tag', {
                attrs: {
                  size: 'mini',
                  type: 'warning',
                  effect: 'dark'
                }
              }, scope.count)
            }
          }
        }
      ],
      options: {
        rowClassName ({ rowIndex }) {
          if (rowIndex === 0) {
            return 'primary-row'
          }
          return ''
        }
      }
    }
  },
  async mounted () {
    let data = await orderApi.getRank()
    this.groups[0].reports = data.TodayReports_Group
    this.groups[1].reports = data.YesterdayReports_Group
    this.groups[2].reports = data.WeekReports_Group
    this.groups[3].reports = data.MonthReports_Group
    for (let item of this.groups) {
      item.reports.forEach((report) => {
        item.money += parseInt(report.money)
        item.count += parseInt(report.count)
      })
    }
    this.all[0].reports = data.TodayReports
    this.all[1].reports = data.YesterdayReports
    this.all[2].reports = data.WeekReports
    this.all[3].reports = data.MonthReports
    for (let item of this.all) {
      item.reports.forEach((report) => {
        item.money += parseInt(report.money)
        item.count += parseInt(report.count)
      })
    }
  }
}
</script>
<style scoped>
  .rank-border{
    border: 1px solid #e7ecf1;
    border-top:3px solid #409EFF;
    padding:10px;
  }
  .rank /deep/ .el-table__row.primary-row {
    background:rgba(80, 133, 255, .2);
  }
  .rank /deep/ .el-table__row.primary-row .el-tag--dark.el-tag--warning{
    background-color: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
  }
</style>
