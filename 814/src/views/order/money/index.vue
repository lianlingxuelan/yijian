<template>
  <d2-container class="order-black">
    <template slot="header">
      <el-select
        v-model="value.costState">
        <el-option
          v-for="item in options.costState"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select
              v-model="value.orderState">
        <el-option
                v-for="item in options.orderState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
      <el-select
              v-model="value.expName">
        <el-option
                v-for="item in options.expName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
      <el-select
              v-model="value.sortState">
        <el-option
                v-for="item in options.sortState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
      <el-select
              v-model="value.moneys">
        <el-option
                v-for="item in options.moneys"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
      <el-select
              v-show="search.tabName === 'manager'"
              v-model="value.months">
        <el-option
                v-for="item in options.months"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
              v-show="search.tabName === 'record'"
              slot="date"
              v-model="value.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-button
              type="primary"
              @click="handleSearch">
        搜索
      </el-button>
      <el-dialog
              title="请选择导入方式"
              width="30%"
              height="200px"
              :style="{'text-align': 'center'}"
              :visible.sync="dialogTableVisible">
        <el-upload
                :before-upload="uploadOrder"
                :http-request="request"
                action="#"
                :style="{'margin-bottom': '20px'}">
          <el-button type="success">
            <d2-icon name="file-o"/>
            订单号方式导入
          </el-button>
        </el-upload>
        <el-upload
                :before-upload="uploadExpress"
                :http-request="request"
                action="#">
          <el-button type="success">
            <d2-icon name="file-o"/>
            物流号方式导入
          </el-button>
        </el-upload>
      </el-dialog>
      <el-button
              type="success"
              :style="{'margin-left':'10px'}"
              @click="dialogTableVisible = true">
        <d2-icon name="file-o"/>
        导入返款记录
      </el-button>
      <el-button
              v-show="search.tabName === 'record'"
              type="primary"
              @click="handleExport">
        <d2-icon name="download"/>
        导出返款记录
      </el-button>
    </template>
    <el-tabs
            type="border-card"
            v-model="search.tabName"
            @tab-click="handleClick">
      <el-tab-pane label="返款统计" name="manager">
        <money-cost-stat
          :data="crudData"/>
      </el-tab-pane>
      <el-tab-pane label="返款管理" name="record">
        <money-cost-record
           ref="record"
          :data="record_data"/>
      </el-tab-pane>
    </el-tabs>
    <template slot="footer">
      <el-pagination
              background
              @current-change="handleClickPage"
              :current-page.sync="search.page"
              :page-count="pageCount"
              layout="prev, pager, next, jumper">
      </el-pagination>
    </template>
  </d2-container>
</template>

<script>
import Res from '@/assets/js/application'
import { orderOptions, orderMoneyExportDemo } from '@/res/res'
import orderApi from '@/api/order'
import moneyCostStat from '_c/order/money_cost_stat'
import moneyCostRecord from '_c/order/money_cost_record'
export default {
  components: {
    'money-cost-stat': moneyCostStat,
    'money-cost-record': moneyCostRecord
  },
  data () {
    return {
      dialogTableVisible: false,
      options: {
        ...orderOptions,
        moneys: [
          {
            label: '不过滤货币',
            value: ''
          },
          ...this.$Res.moneys.map(item => {
            item.label = item.name
            return item
          })],
        months: []
      },
      crudData: {},
      record_data: {},
      pickerOptions: Res.pickerOptions,
      value: {
        costState: '0',
        orderState: '0',
        expName: '0',
        sortState: '1',
        moneys: '',
        months: '3',
        time: []
      },
      search: {
        page: 1,
        maxcount: 12,
        tabName: 'manager'
      },
      pageCount: 1
    }
  },
  created () {
    this.refreshData()
  },
  methods: {
    async refreshData () {
      let queryUrl = `/${this.search.tabName}/${this.search.page}/?maxcount=${this.search.maxcount}`
      if (this.value.costState) queryUrl += `&CostState=${this.value.costState}`
      if (this.value.orderState) queryUrl += `&OrderState=${this.value.orderState}`
      if (this.value.expName) queryUrl += `&searchkey=${this.value.expName}`
      if (this.value.sortState) queryUrl += `&SortState=${this.value.sortState}`
      if (this.value.moneys) queryUrl += `&money=${this.value.moneys}`
      if (this.search.tabName === 'manager' && this.value.months) queryUrl += `&month=${this.value.months}`
      if (this.search.tabName === 'record' && this.value.time.length !== 0) {
        queryUrl += `&stime=${this.value.time[0]}`
        queryUrl += `&etime=${this.value.time[1]}`
      }
      let data = await orderApi.get_moneyList(queryUrl)
      this.pageCount = data.TotalPage
      if (this.search.tabName === 'manager') {
        this.options.months = data.months.map(item => {
          item.label = item.name
          return item
        })
        this.crudData = data
      } else {
        this.record_data = data
      }
    },
    handleSearch () {
      this.refreshData()
    },
    handleClick () {
      this.refreshData()
    },
    handleClickPage (val) {
      this.search.page = val
      this.refreshData()
    },
    handleExport () {
      this.$refs.record.exportExcel()
    },
    uploadOrder (file) {
      this.handleUpload(file, 'order')
    },
    uploadExpress (file) {
      this.handleUpload(file, 'express')
    },
    handleUpload (file, type) {
      const uploadDemo = orderMoneyExportDemo[type]
      let state = 2
      if (type === 'order') state = 1
      this.dialogTableVisible = false
      this.$import.xlsx(file)
        .then(async ({ results }) => {
          let costList = []
          results.forEach(item => {
            let temData = {}
            Object.keys(item).forEach(key => {
              if (uploadDemo[key]) temData[uploadDemo[key]] = item[key]
            })
            costList.push(temData)
          })
          await orderApi.upload_orderMoney({ costList, state })
        })
      return false
    },
    request () {
      // console.log('开始上传')
    }
  }
}
</script>
