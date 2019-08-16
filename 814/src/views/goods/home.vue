<template>
  <d2-container class="goods">
    <m-table
            ref="table"
            :options="options"
            :tabs="tabs"
            :defaultOption="defaultOption"
            :defaultInput="defaultInput"
            :defaultTabs="defaultTabs"
            :columns="columns"
            :data="data"
            :currentPage="currentPage"
            :totalPage="totalPage"
            :isadd="true"
            @tableDataChange="tableDataChange"
            @handleSearch="handleSearch">
    </m-table>
  </d2-container>
</template>

<script>
import { getHome, editHome, outHome, inHome } from '@api/goods'
export default {
  data () {
    return {
      options: [],
      tabs: [
        [{ label: '上架中', value: 'on' },
          { label: '已下架', value: 'off' }]
      ],
      defaultOption: 'all',
      defaultInput: '',
      defaultTabs: [],
      columns: [
        {
          title: '首页名称',
          key: 'sitename',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '语言',
          key: 'language',
          component: {
            name: 'el-select',
            options: this.$Res.languages.map(item => {
              item.label = item.name
              return item
            }),
            size: 'small'
          }
        },
        {
          title: '货币',
          key: 'money',
          component: {
            name: 'el-select',
            options: this.$Res.moneys.map(item => {
              item.label = item.name
              return item
            }),
            size: 'small'
          }
        },
        {
          title: '是否默认',
          key: 'original',
          component: {
            name: 'el-select',
            options: [
              { label: '是', value: '是' },
              { label: '否', value: '否' }
            ],
            size: 'small'
          }
        },
        {
          title: '操作',
          key: 'status',
          width: '200px',
          component: {
            name: 'm-table-button',
            props: {
              emit: 'goods/home'
            }
          }
        }
      ],
      data: [],
      currentPage: 1,
      totalPage: 3,
      search: {
        page: 1,
        maxcount: 13,
        membername: 'all',
        status: 'on',
        searchkey: ''
      }
    }
  },
  created () {
    this.getData()
    this.$bus.$on('goods/home', (action, data) => {
      this.updateState(action, data)
    })
  },
  methods: {
    async getData () {
      let queryUrl = `/${this.search.status}/${this.search.page}/?`
      if (this.search.maxcount) queryUrl += `maxcount=${this.search.maxcount}`
      if (this.search.membername) queryUrl += `&membername=${this.search.membername}`
      if (this.search.searchkey) queryUrl += `&searchkey=${this.search.searchkey}`
      let data = await getHome(queryUrl)
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
      this.defaultInput = this.search.searchkey
      this.defaultTabs = [this.search.status]
      this.currentPage = this.search.page
      this.totalPage = data.TotalPage
      this.data = data.HomeList.map(item => {
        if (this.search.status === 'on') {
          item.t_type = 'danger'
          item.t_text = '下架'
        } else {
          item.t_text = '上架'
        }
        return item
      })
      this.data.unshift({
        language: 'tw',
        money: 'NT',
        t_text: '新增',
        t_type: 'primary'
      })
    },
    async editData (data) {
      let res = await editHome({ codeinfo: data })
      if (!res.Error) {
        this.$message({
          message: res.Info,
          type: 'success'
        })
        this.getData()
      } else if (res.Info) {
        this.$message({
          message: res.Info,
          type: 'error'
        })
      }
    },
    async updateState (action, data) {
      let res = {}
      if (action === '下架') {
        res = await outHome(`/${data.id}`)
      } else if (action === '上架') {
        res = await inHome(`/${data.id}`)
      } else if (action === '新增') {
        return
      }
      if (!res.Error) {
        this.$message({
          message: res,
          type: 'success'
        })
        this.getData()
      } else if (res.Info) {
        this.$message({
          message: res.Info,
          type: 'error'
        })
      }
    },
    tableDataChange (data) {
      if (!data.id) return
      delete data.User
      this.editData(data)
    },
    async handleSearch (value) {
      this.search.status = value.Tabs[0]
      this.search.page = value.page || 1
      this.search.membername = value.defaultOption
      this.search.searchkey = value.input
      await this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    background: #fff;
    height: 100%;
  }
</style>
