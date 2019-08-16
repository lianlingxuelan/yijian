<template>
  <d2-container id="goods-report">
    <m-table
            ref="table"
            :options="options"
            :tabs="tabs"
            :defaultOption="defaultOption"
            :defaultTabs="defaultTabs"
            :columns="columns"
            :data="data"
            :isShowSearch="false"
            :isShowPage="false"
            @handleSearch="handleSearch">
      <el-date-picker
              slot="date"
              v-model="search.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd">
      </el-date-picker>
    </m-table>
  </d2-container>
</template>

<script>
import { getReport } from '@api/goods'
import Res from '@/assets/js/application'
export default {
  data () {
    return {
      pickerOptions: Res.pickerOptions,
      options: [],
      tabs: [
        [
          { label: '全部', value: 'all' },
          ...this.$Res.moneys.map(item => {
            item.label = item.name
            return item
          })
        ]
      ],
      defaultOption: 'all',
      defaultTabs: [],
      columns: [
        {
          title: '#',
          key: 'index'
        },
        {
          title: '所属',
          key: 'nickname'
        },
        {
          title: 'SKU',
          key: 'sku'
        },
        {
          title: '商品内部名',
          key: 'spu'
        },
        {
          title: '商品销售名',
          key: 'goodsname',
          width: '400px',
          component: {
            render: (h, scope) => {
              return h('div', {
                style: {
                  width: '400px'
                }
              }, [
                h('img', {
                  attrs: {
                    src: `${scope.CdnBase}${scope.img}`,
                    height: '42',
                    width: '42'
                  }
                }),
                h('p', {
                  attrs: {
                    class: 'goods-report-goodsname'
                  },
                  style: {
                    'font-size': '12px',
                    display: 'inline-block',
                    width: '300px'
                  }
                }, scope.goodsname)
              ])
            }
          }
        },
        {
          title: '规格1',
          key: 'specname'
        },
        {
          title: '规格2',
          key: 'option1'
        },
        {
          title: '规格3',
          key: 'option2'
        },
        {
          title: '件数',
          key: 'goodscount'
        },
        {
          title: '单数/销售额',
          key: 'money',
          width: '200px',
          component: {
            render: (h, scope) => {
              return h('div', {
                style: {
                  width: '200px'
                }
              }, [
                h('p', {
                  style: {
                    'font-size': '10px',
                    width: '200px'
                  }
                }, scope.ordercount),
                h('p', {
                  style: {
                    'font-size': '10px',
                    width: '200px'
                  }
                }, `¥${scope.money}`)
              ])
            }
          }
        },
        {
          title: '上架时间',
          key: 'onTime'
        }
      ],
      data: [],
      search: {
        page: '1',
        membername: 'all',
        time: [],
        money: 'all',
        maxcount: 12
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      let queryUrl = `/all/${this.search.page}/?`
      if (this.search.maxcount) queryUrl += `maxcount=${this.search.maxcount}`
      if (this.search.membername) queryUrl += `&membername=${this.search.membername}`
      if (this.search.money) queryUrl += `&money=${this.search.money}`
      if (this.search.time.length !== 0) {
        queryUrl += `&stime=${this.search.time[0]}`
        queryUrl += `&etime=${this.search.time[1]}`
      }
      let data = await getReport(queryUrl)
      let options = [{
        label: '所有账户',
        options: [{
          value: 'all',
          label: '不过滤' }] },
      { label: '正常账户', options: [] },
      { label: '停用账户', options: [] }]
      data.MemberList.forEach(item => {
        if (item.state === '正常') {
          options[1].options.push({
            label: item.nickname,
            value: item.username
          })
        } else if (item.state === '停用') {
          options[2].options.push({
            label: item.nickname,
            value: item.username
          })
        }
      })
      this.options = options
      this.defaultOption = this.search.membername
      this.defaultTabs = [this.search.money]
      this.data = data.Reports.map((item, index) => {
        item.CdnBase = data.CdnBase
        item.index = index + 1
        item.nickname = item.User.nickname
        item.money = item.OrderBasic.money
        item.ordercount = item.OrderBasic.ordercount
        item.onTime = new Date(item.Good.created_at).NatureTime()
        return item
      })
    },
    async handleSearch (value) {
      this.search.money = value.Tabs[0]
      this.search.membername = value.defaultOption
      await this.getData()
    }
  }
}
</script>
