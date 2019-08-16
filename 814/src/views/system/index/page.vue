<template>
    <d2-container class="home">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <router-link :to="{name:'valid',query:{orderstate:'all',membername:issys?'all':'my',stime:today,etime:today}}">
                        <div class="dashboard-stat blue">
                            <div class="visual">
                                <i class="fa fa-comments" aria-hidden="true"></i>
                            </div>
                            <div class="details">
                                <div class="number" v-text="CountInfo.count"></div>
                            </div>
                            <a class="more">今日出单</a>
                        </div>
                    </router-link>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <router-link :to="{name:'valid',query:{orderstate:'new'}}">
                        <div class="dashboard-stat green">
                            <div class="visual">
                                <i class="fa fa-hand-pointer-o" aria-hidden="true"></i>
                            </div>
                            <div class="details">
                                <div class="number" v-text="CountInfo.new"></div>
                            </div>
                            <a class="more">待确认的订单</a>
                        </div>
                    </router-link>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <router-link :to="{name:'valid',query:{orderstate:'return'}}">
                        <div class="dashboard-stat red">
                            <div class="visual">
                                <i class="fa fa-recycle" aria-hidden="true"></i>
                            </div>
                            <div class="details">
                                <div class="number" v-text="CountInfo.return"></div>
                            </div>
                            <a class="more">退货拒收的订单</a>
                        </div>
                    </router-link>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <router-link :to="{name:'invalid'}">
                        <div class="dashboard-stat black">
                            <div class="visual">
                                <i class="fa fa-bar-chart-o" aria-hidden="true"></i>
                            </div>
                            <div class="details">
                                <div class="number" v-text="CountInfo.invalid"></div>
                            </div>
                            <a class="more">累计无效订单</a>
                        </div>
                    </router-link>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="margin:20px 0;">
            <el-col :span="24">
                <el-card>
                    <el-row>
                        <el-col :span="12">
                            每日有效出单对比
                        </el-col>
                        <el-col :span="12" style="text-align:right">
                            <el-radio-group v-model="tabName" @change="tab_click" size="small" >
                                <el-radio-button label="my">个人</el-radio-button>
                                <el-radio-button v-if="!issys&&isleader" label="group">小组</el-radio-button>
                                <el-radio-button v-if="issys" label="all">全站</el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-row>
<!--                    <ve-histogram :data="chartData" height="300px"  :mark-point="markPoint"></ve-histogram>-->
                    <div id="home-order-stats" :style="{width: '100%', height: '250px', display: 'block'}"></div>
                </el-card>
           </el-col>
        </el-row>
        <el-row :gutter="20" >
            <el-col :span="8" >
                <el-card style="height:320px">
                    <el-row>
                        <el-col :span="12">
                            今日销量最好商品
                        </el-col>
                        <el-col :span="12" style="text-align:right">
                            <el-radio-group v-model="salesType" size="mini" @change="selectGoodsRange">
                                <el-radio-button label="my">个人</el-radio-button>
                                <el-radio-button label="group">小组</el-radio-button>
                                <el-radio-button label="all">全站</el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-table  :data="TodayGoodsRank.List" style="width: 100%" max-height="250px">
                        <el-table-column  width="40" label="#">
                            <template slot-scope="props">
                                <span :class="props.row.index===1?'icon_no1':props.row.index===2?'icon_no2':props.row.index===3?'icon_no3': ''">
                                    <span v-if="props.row.index>3" v-text="props.row.index"></span>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="商品" width="250">
                            <template slot-scope="props">
                                <el-row>
                                    <el-col :span="5">
                                        <img :src="CdnBase+props.row.img+'-40'" alt="">
                                    </el-col>
                                    <el-col :span="19">
                                        <div class="goodsname" v-text="props.row.goodsname"></div>
                                        <div v-text="props.row.specname"></div>
                                        <span v-text="props.row.option1"></span>
                                        <span v-text="props.row.option2"></span>
                                    </el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column
                                property="OrderBasic.ordercount"
                                label="单数"
                        >
                        </el-table-column>
                        <el-table-column
                                property="OrderBasic.money"
                                label="金额" >
                        </el-table-column>
                        <el-table-column
                                property="goodscount"
                                label="销量" width="60">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card style="height:320px">
                    <el-row>
                        <el-col :span="12">
                            今日出单排行
                        </el-col>
                        <el-col :span="12" style="text-align:right">
                            <el-radio-group v-model="orderRank" size="mini" @change="selectOrderRange">
                                <el-radio-button label="group">组员</el-radio-button>
                                <el-radio-button label="groupList" v-if="isleader && !LeaderName">小组</el-radio-button>
                                <el-radio-button label="all">全站</el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-table :data="TodayOrderRank.List" style="width: 100%" max-height="250px">
                        <el-table-column  label="名次">
                            <template slot-scope="props">
                                <span :class="props.row.gap===1?'icon_no1':props.row.gap===2?'icon_no2':props.row.gap===3?'icon_no3': ''">
                                    <span v-if="props.row.gap>3" v-text="props.row.gap"></span>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="优化师" v-if="orderRank==='all'">
                            <template slot-scope="props" >
                                {{props.row.User.nickname}}
                            </template>
                        </el-table-column>
                        <el-table-column  label="优化师" v-if="orderRank==='group'">
                            <template slot-scope="props" >
                                <div v-if="issys || (isleader && !LeaderName && props.row.User2 && props.row.User2.leadername)">
                                    {{props.row.User2 ? props.row.User2.groupname : '-'}}
                                </div>
                                <div v-else>
                                    {{props.row.User.nickname}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column  label="优化师" v-if="orderRank==='groupList'">
                            <template slot-scope="props" >
                                {{props.row.User2 ? props.row.User2.groupname : '-'}}
                            </template>
                        </el-table-column>
                        <el-table-column property="count" label="单数">
                        </el-table-column>
                        <el-table-column property="money" label="金额">
                        </el-table-column>
                        <el-table-column  label="差距" v-if="!issys">
                            <template slot-scope="props">
                                <span v-text="props.row.rank < 0 ? '差'+Math.abs(props.row.rank)+'单' : props.row.rank===0 ? Math.abs(props.row.rank) : '-'"></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card style="height:320px">
                    <el-row>
                        <el-col :span="24">
                            平台信息
                        </el-col>
                    </el-row>
                    <el-table :data="ServerInfo" style="width: 100%" >
                        <el-table-column property="name" label="项目"></el-table-column>
                        <el-table-column property="info" label="信息"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </d2-container>
</template>

<script>
import homeApi from '@/api/home'
export default {
  name: 'index',
  data () {
    this.markPoint = {
      data: [
        {
          name: '最大值',
          type: 'max'
        }
      ]
    }
    return {
      CdnBase: '',
      CountInfo: {},
      TodayGoodsRank: {},
      TodayOrderCount: {},
      TodayOrderRank: {},
      extend: {
        series: {
          label: { show: true, position: 'top' }
        }
      },
      chartData: {
        columns: ['时间', '今天', '昨天', '前天'],
        rows: []
      },
      issys: false,
      isleader: false,
      tabName: 'my',
      salesType: 'my',
      orderRank: 'group',
      LeaderName: '',
      ServerInfo: [],
      today: this.$moment().format('YYYY/MM/DD'),
      echarts: {
        dom: null,
        options: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              axis: 'x'
            },
            formatter: function (params) {
              let str = ''
              for (let k in params) {
                str += params[k].seriesName + params[k].name + '，出 <b>' + params[k].value + '</b> 单<br>'
              }
              return str
            }
          },
          grid: {
            top: '35px',
            left: '5px',
            right: '15px',
            bottom: '5px',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          color: ['#e75c5b', '#1E9FFF', '#748091'],
          legend: {
            data: ['今天', '昨天', '前天'],
            top: '0',
            bottom: '20px'
          },
          xAxis: {
            type: 'category',
            splitLine: {
              lineStyle: {
                color: '#c5c5c5'
              }
            }
          },
          yAxis: [{
            type: 'value',
            name: '出单数',
            boundaryGap: ['0', '10%'],
            splitLine: {
              lineStyle: {
                color: '#e5e5e5'
              }
            }
          }],
          series: [{
            name: '今天',
            type: 'bar',
            smooth: true,
            barWidth: '30%',
            markLine: {
              data: [
                {
                  type: 'average',
                  name: '平均单数'
                }
              ],
              label: {
                color: '#000',
                backgroundColor: '#fff',
                textShadowColor: '#fff',
                textShadowBlur: 2,
                textShadowOffsetX: 4,
                textShadowOffsetY: 2,
                formatter: '平均每小时{c}单',
                position: 'middle'
              }
            },
            lineStyle: { normal: { width: 3 } },
            markPoint: {
              symbolSize: 40,
              data: [
                { type: 'max', name: '最大值' }
              ]
            }
          }, {
            name: '昨天',
            type: 'bar',
            smooth: true,
            barWidth: '15%',
            markPoint: {
              symbolSize: 40,
              data: [
                { type: 'max', name: '最大值' }
              ]
            }
          }, {
            name: '前天',
            type: 'bar',
            barWidth: '15%',
            smooth: true,
            markPoint: {
              symbolSize: 40,
              data: [
                { type: 'max', name: '最大值' }
              ]
            }
          }]
        }
      }
    }
  },
  async mounted () {
    let data = await homeApi.getHomeData()
    this.CdnBase = data.CdnBase
    this.CountInfo = data.CountInfo
    this.TodayGoodsRank = data.TodayGoodsRank
    this.TodayGoodsRank.List.forEach((item, index) => {
      item.index = index + 1
    })
    this.salesType = data.TodayGoodsRank.Type
    this.TodayOrderCount = data.TodayOrderCount
    this.tabName = data.TodayOrderCount.Type
    this.TodayOrderRank = data.TodayOrderRank
    this.orderRank = data.TodayOrderRank.Type
    this.LeaderName = data.LeaderName
    this.issys = data.issys
    this.isleader = data.isleader
    this.ServerInfo = [{ name: '空闲内存', info: (data.ServerInfo.freemem / 1024 / 1024).toFixed(0) + ' MB' },
      { name: '占用内存', info: ((data.ServerInfo.usemem.heapTotal + data.ServerInfo.usemem.heapUsed + data.ServerInfo.usemem.external) / 1024 / 1024).toFixed(0) + ' MB' },
      { name: '环境版本', info: data.ServerInfo.version }]
    if (data.userrole === '管理员' || data.userrole === '财务' || data.userrole === '优化师') {
      this.orderRank = 'group'
      this.selectOrderRange()
    }
    this.initChart()
  },
  methods: {
    draw () {
      if (!this.echarts.dom) this.echarts.dom = this.$echarts.init(document.getElementById('home-order-stats'))
      this.echarts.dom.setOption(this.echarts.options)
    },
    initChart () {
      let todayCountlist = []; let yestodayCountlist = []; let beforeyestodayCountlist = []; let datelist = []
      for (let i = 0; i <= 2; i++) {
        let k = 0
        while (k < 24) {
          if (datelist.indexOf(k + '点') === -1) datelist.push(k + '点')
          var sdate = this.$moment().subtract(i, 'days').format('YYYY/MM/DD ' + (k < 10 ? '0' + k : k) + ':00:00')
          var countInfo = this.find_countinfo(sdate)
          if (i === 2) {
            beforeyestodayCountlist.push(0)
            if (countInfo) beforeyestodayCountlist[k] = countInfo.count
          } else if (i === 1) {
            yestodayCountlist.push(0)
            if (countInfo) yestodayCountlist[k] = countInfo.count
          } else {
            todayCountlist.push(0)
            if (countInfo)todayCountlist[k] = countInfo.count
          }
          k++
        }
      }
      this.echarts.options.xAxis.data = datelist
      this.echarts.options.series[0].data = todayCountlist
      this.echarts.options.series[1].data = yestodayCountlist
      this.echarts.options.series[2].data = beforeyestodayCountlist
      this.draw()
    },
    find_countinfo (date) {
      for (let item of this.TodayOrderCount.List) {
        if (item.date === date) return item
      }
    },
    async tab_click () {
      let data = await homeApi.get_ordercount(this.tabName)
      this.TodayOrderCount.List = data.OrderCount
      this.tabName = data.type
      this.initChart()
    },
    async selectGoodsRange () {
      let data = await homeApi.get_goodsrank(this.salesType)
      this.TodayGoodsRank.List = data.GoodsRank
      this.TodayGoodsRank.List.forEach((item, index) => {
        item.index = index + 1
      })
      this.salesType = data.type
    },
    async selectOrderRange () {
      let data = await homeApi.get_orderrank(this.orderRank)
      if (data.OrderRank) {
        this.TodayOrderRank.List = data.OrderRank
      } else if (data.GroupOrderRank) {
        this.TodayOrderRank.List = data.GroupOrderRank
      }
      this.orderRank = data.type
    }
  }
}
</script>

<style scoped>
    .dashboard-stat {
        display: block;
        overflow: hidden;
        border-radius: 2px;
    }

    .dashboard-stat.blue {
        background-color: #479ef5;
    }

    .dashboard-stat.green {
        background-color: #32c5d2;
    }

    .dashboard-stat.red {
        background-color: #e7505a;
    }

    .dashboard-stat.black {
        background-color: #48444a;
    }

    .dashboard-stat .visual {
        width: 80px;
        display: block;
        float: left;
        padding-top: 10px;
        padding-left: 15px;
        margin-bottom: 15px;
        font-size: 35px;
        line-height: 35px;
    }

    .dashboard-stat .visual > i {
        margin-left: -10px;
        font-size: 85px;
        line-height: 85px;
        color: #fff;
        opacity: 0.1;
    }

    .dashboard-stat .details {
        padding-right: 15px;
    }

    .dashboard-stat .details .number {
        padding-top: 35px;
        text-align: right;
        font-size: 36px;
        line-height: 36px;
        letter-spacing: -1px;
        margin-bottom: 0;
        font-weight: 300;
        color: #fff;
    }

    .dashboard-stat .more {
        clear: both;
        display: block;
        padding: 6px 10px;
        position: relative;
        text-transform: uppercase;
        font-weight: 300;
        font-size: 14px;
        opacity: .7;
        text-align: right;
        filter: alpha(opacity=70);
    }

    .dashboard-stat.green .more {
        color: #FFF;
        background-color: #2bb8c4;
    }

    .dashboard-stat.blue .more {
        color: #FFF;
        background-color: #3d99f5;
    }

    .dashboard-stat.red .more {
        color: #FFF;
        background-color: #e53e49;
    }

    .dashboard-stat.black .more {
        color: #FFF;
        background-color: #3d3d3e;
    }
    .el-col-19{
        font-size:12px;
    }
    .el-col-19 div{
        line-height:14px;
    }
    .el-col-19 span{
        margin-right:5px;
    }
    .goodsname{
        width:100%;
        overflow: hidden;
        white-space: nowrap;text-overflow:ellipsis;
    }
    .icon_no1{
        background: url("data:image/png;base64,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/6L/mjIFgchClhNNVJOwHMu//951exqTxtjxr2j3IXsJMK3FeIzfuxc7sBVbne/pT7fic3zepg1mowpV+/Y1/jPhSMKRqCjpd0NCYkJiwqBBtgRPwmkqTS0vdw2vyajJUJ53n3anW+iWrCxb5dg4GkSDpJnA8qYbD5PtZPt339Eb9A36xsyZThe8NN7tiEa0cndb2Qrg0TM1IDXg9m0yj5iJefRorIE3vJsg9mcIohHdogWTRdJJuk5Xf2zhlYVXAgLIbgBISLBZ/wrjwrisXk2YTZs3bVb+Jy9cEXOaOa3T4QLykf+I6LypeAEvjB59b8y8MfPG+PszL/PJfPLhw9Yses6G8E+SR/K2b1daX7Ehoa7n3J5ze7Zq5eKujlXHRkcDdD/d37kz2UkzaSbH4WXmt8xv9XrqQl2oi16PKvIyeZlSbBJWCauGD8erRCBCdLS1NfYBjiILWRcu2GIoeRtzMKeqSv2eprWmdadO4l7C8VwghsOJhxMPf/klBuAojkZHW+2/Pz7CR9eu0ROYiqkdOsju4CyGYZjRiF7Yh30yUkFIp5BiFKP4/fc1kWmRaZFz5yrNGt5sfxplaJU0JWnKxIm4Tn2p75YtjrZH7tCpdGpysqZteuf0zu+842h7Eow3kyqSKkaNor50LV37j384TGcQ2Ua2ffMNKaXxND4pycWltLS0NC8PVKvT6tzdTWZjkjEpKAi96Fl6NiiIDiS+xLdDB6wnn5PPjUaiJVqizc5Wn19+bvk5JQnnH6LHWYxSzOA+ieMSx334IT2OtmhrTwqa+/gC3dG9vt600rTCtOL55z1yV+Wuyq2qchZ94rHT1dWYYmg0NFZU2DR9W8MV7MTOr77SBGvKNGUjRojHPbO5SZkrA82e8UN9SvN3zd9nz8Zm+jZ9W4GfcD7ykf/BB84WvARxKTEYoMZWbN20ye76ydiDPSdOaEKM24zbYmOfFMFLaHYFeMDgdoKP4DNqFJmGXOTK8Hi5f87XpJmvm6/bPoc7CslOgQOIROT58zYrJAPA2bPqNOPfjH8bPpyQNS+teenJu5ds9iXgYTT+c1HZorJOnUgWv5Rfmp6OTnQ9XT94MKkhE8lEkwn16Id+e/ZwP5gyTZlJSU315lsDpbP/Pfvfvr7GTHWNuiYpCXq8glcGDUI1qlAlCOR1UkfqvvxSHaQJ14SvWuWszWhT4f8BmxK6X8Aky9oAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDktMDhUMDI6MzI6NDQrMDg6MDD6CmJsAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA5LTA4VDAyOjMyOjQ0KzA4OjAwi1fa0AAAAEp0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fbDl5bTJ5cGlzMjdmMW9yL05PMS5zdmfqN+rRAAAAAElFTkSuQmCC") no-repeat center;
        background-size: 24px 24px;
        padding: 10px;
    }
    .icon_no2{
        background: url("data:image/png;base64,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") no-repeat center;
        background-size: 24px 24px;
        padding: 10px;
    }
    .icon_no3{
        background: url("data:image/png;base64,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") no-repeat center;
        background-size: 24px 24px;
        padding: 10px;
    }
    .home >>> .el-table .cell {
        line-height: 24px;
    }
</style>
