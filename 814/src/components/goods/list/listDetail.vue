<template>
    <div>
        <el-dialog
            :title="goods.name"
            :visible.sync="visible"
            width="30%"
            :before-close="handleClose">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="信息" name="info">
                    <d2-crud
                        :options="{showHeader:false}"
                        :columns="info.columns"
                        :data="info.data"/>
                </el-tab-pane>
                <el-tab-pane label="签收率" name="report">
                    <el-date-picker
                        :style="{'margin-bottom':'10px'}"
                        v-model="report.time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="report.pickerOptions"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-button
                        @click="handleClick">
                        刷新
                    </el-button>
                    <div id="goods_report_echart" :style="{width: '600px', height: '500px'}"></div>
                </el-tab-pane>
                <el-tab-pane label="使用者" name="user">
                    <d2-crud
                        :options="{showHeader:false}"
                        :columns="user.columns"
                        :data="user.data"/>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import { getReport } from '@api/goods'
import Res from '@/assets/js/application'
export default {
  data () {
    return {
      activeName: 'info',
      info: {
        columns: [
          {
            // title: '名称',
            key: 'title',
            width: '150px'
          },
          {
            // title: '值',
            key: 'value'
          }
        ],
        data: []
      },
      user: {
        columns: [
          {
            // title: '名称',
            key: 'title',
            width: '100px'
          },
          {
            // title: '值',
            key: 'value'
          }
        ],
        data: []
      },
      report: {
        pickerOptions: Res.pickerOptions,
        time: [],
        options: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              axis: 'x'
            }
          },
          title: {
            text: '',
            subtext: '',
            x: 'center',
            top: 0
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: [{
            top: 80,
            left: 20,
            right: 15,
            height: '40%',
            containLabel: true
          }, {
            top: '68%',
            left: 10,
            right: 15,
            height: '30%',
            containLabel: true
          }],
          color: ['#6be6c1', '#0098d9', '#c12e34', '#626c91',
            '#5a2024', '#dc69aa'],
          legend: {
            top: 50,
            data: ['签收', '配送', '退货', '无效']
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#e7e7e7'
              }
            }
          }, {
            gridIndex: 1,
            type: 'category',
            boundaryGap: false,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#e7e7e7'
              }
            }
          }],
          yAxis: [{
            name: '单数',
            type: 'value',
            boundaryGap: ['0', '5%'],
            splitLine: {
              lineStyle: {
                color: '#e7e7e7'
              }
            }
          }, {
            gridIndex: 1,
            name: '签收率',
            type: 'value',
            boundaryGap: false,
            splitLine: {
              lineStyle: {
                color: '#e7e7e7'
              }
            },
            axisLabel: {
              formatter: '{value} %'
            }
          }],
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0, 1],
              filterMode: 'filter'
            }
          ],
          series: [{
            name: '签收',
            type: 'line',
            itemStyle: { opacity: 0 },
            areaStyle: { normal: {} },
            stack: '合计'
          }, {
            name: '配送',
            type: 'line',
            itemStyle: { opacity: 0 },
            areaStyle: { normal: {} },
            stack: '合计'
          }, {
            name: '退货',
            type: 'line',
            itemStyle: { opacity: 0 },
            areaStyle: { normal: {} },
            stack: '合计'
          }, {
            name: '无效',
            type: 'line',
            itemStyle: { opacity: 0 },
            areaStyle: { normal: {} },
            stack: '合计'
          }, {
            name: '有效',
            type: 'line',
            itemStyle: { opacity: 0 },
            lineStyle: { opacity: 0 },
            markPoint: {
              data: [
                {
                  name: '最大值',
                  type: 'max'
                }
              ]
            }
          }, {
            xAxisIndex: 1,
            yAxisIndex: 1,
            name: '签收率',
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                {
                  name: '最高签收率',
                  type: 'max'
                }
              ]
            }
          }]
        }
      },
      dom: null
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    goods () {
      if (this.goods) {
        this.initInfo()
        this.initUser()
      }
    }
  },
  methods: {
    draw () {
      if (!this.dom) this.dom = this.$echarts.init(document.getElementById('goods_report_echart'))
      this.refreshReportInfo().then(() => {
        this.dom.setOption(this.report.options)
      })
    },
    async refreshReportInfo () {
      let queryUrl = `/${this.goods.id}/`
      if (this.report.time.length !== 0) {
        queryUrl += `?stime=${this.report.time[0]}`
        queryUrl += `&etime=${this.report.time[1]}`
      }
      let res = await getReport(queryUrl)
      if (res.Error) {
        return this.$message({
          message: res.Info,
          type: 'error'
        })
      }
      this.report.options.title.subtext = '数据范围 ' + res.Stime + ' 至 ' + res.Etime
      let xdata = []; let ydata = []; let ydata1 = []; let ydata2 = []; let ydata3 = []; let ydata4 = []; let ydata5 = []; let ydata6 = []
      const stime = new Date(res.Stime + ' 00:00:00')
      const etime = new Date(res.Etime + ' 23:59:59')
      const sub = (etime - stime) / 1000 / 3600 / 24
      let i = 0
      while (i < sub) {
        xdata.push(new Date(stime.getTime() + i * 24 * 3600 * 1000).Format('yyyy/MM/dd'))
        ydata.push(0)
        ydata1.push(0)
        ydata2.push(0)
        ydata3.push(0)
        ydata4.push(0)
        ydata5.push(0)
        ydata6.push(0)
        i++
      }
      let allCount = 0
      let endCount = 0
      for (let k in res.StatsList) {
        let stats = res.StatsList[k]
        let index = xdata.indexOf(stats.date)
        if (index >= -1) {
          allCount += stats.validcount
          endCount += stats.endcount
          ydata[index] = stats.endcount
          // ydata[index]=(stats.endcount / (stats.salecount === 0 ? 1 : stats.salecount) * 100).toFixed(1);
          ydata1[index] = stats.sendcount
          // ydata1[index]=(stats.returncount / (stats.salecount === 0 ? 1 : stats.salecount) * 100).toFixed(1);
          ydata2[index] = stats.returncount
          ydata3[index] = stats.invalidcount
          ydata4[index] = stats.validcount
          ydata6[index] = (stats.endcount / (stats.validcount === 0 ? 1 : stats.validcount) * 100).toFixed(0)
        }
      }
      this.report.options.title.text = '(' + this.goods.name.substring(0, 10) + ') 合计：' + allCount + ';签收：' + endCount + ';合计签收率：' + (endCount / (allCount === 0 ? 1 : allCount) * 100).toFixed(0) + '%'
      this.report.options.xAxis[0].data = xdata
      this.report.options.series[0].data = ydata
      this.report.options.series[1].data = ydata1
      this.report.options.series[2].data = ydata2
      this.report.options.series[3].data = ydata3
      this.report.options.series[4].data = ydata4
      this.report.options.xAxis[1].data = xdata
      this.report.options.series[5].data = ydata6
    },
    handleClick () {
      if (this.activeName === 'report') this.draw()
    },
    initInfo () {
      this.info.data = [
        {
          title: '上架时间',
          value: new Date(this.goods.created_at).NatureTime()
        },
        {
          title: '最后编辑时间',
          value: new Date(this.goods.updated_at).NatureTime()
        },
        {
          title: '来源',
          value: `${this.goods.source}(${this.goods.father})`
        },
        {
          title: '累计浏览',
          value: this.goods.GoodsStatus.viewcount
        },
        {
          title: '累计出单',
          value: this.goods.GoodsStatus.purchasecount
        },
        {
          title: '累计销售额',
          value: this.goods.GoodsStatus.salesmoney
        },
        {
          title: '累计退单',
          value: this.goods.GoodsStatus.returnedcount
        },
        {
          title: '累计退货额',
          value: this.goods.GoodsStatus.returnedmoney
        },
        {
          title: '累计被复制',
          value: this.goods.GoodsStatus.copycount
        }
      ]
    },
    initUser () {
      this.user.data = [
        {
          title: '优化师',
          value: this.goods.User.nickname
        },
        {
          title: '网站',
          value: `http://${this.goods.Domain.name}/${this.goods.sitedir}`
        },
        {
          title: '复制时间',
          value: new Date(this.goods.created_at).NatureTime()
        }
      ]
    },
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>

</style>
