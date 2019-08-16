<template>
    <d2-container class="my">
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
            @tableDataChange="tableDataChange"
            @handleSearch="handleSearch"/>
    </d2-container>
</template>

<script>
import { getpay, editpay, outpay, inpay } from '@api/paypal'
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
          title: '用户名',
          key: 'username',
          component: {
            size: 'small'
          }
        },
        {
          title: '名称',
          key: 'name',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '共享',
          key: 'isshare',
          component: {
            name: 'el-select',
            options: [
              {
                value: '组内共享',
                label: '组内共享'
              },
              {
                value: '共享',
                label: '共享'
              },
              {
                value: '不共享',
                label: '不共享'
              }
            ],
            size: 'small'
          }
        },
        {
          title: '商家账户',
          key: 'paycode',
          width: '600px',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '状态',
          key: 'state',
          width: '200px',
          component: {
            name: 'm-table-button',
            props: {
              emit: 'paypal/xm'
            }
          }
        }
      ],
      data: [],
      currentPage: 1,
      totalPage: 3,
      search: {
        page: 1,
        totalcount: 13,
        membername: 'all',
        state: 'on',
        searchkey: ''
      }
    }
  },
  created () {
    this.$bus.$on('paypal/xm', (action, data) => {
      this.updateState(action, data)
    })
    this.getData()
  },
  methods: {
    async getData () {
      let queryUrl = `/${this.search.state}/${this.search.page}/?`
      if (this.search.totalcount) queryUrl += `maxcount=${this.search.totalcount}`
      if (this.search.membername) queryUrl += `&membername=${this.search.membername}`
      if (this.search.searchkey) queryUrl += `&searchkey=${this.search.searchkey}`
      let data = await getpay(queryUrl)
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
            value: item.nickname
          })
        } else if (item.state === '停用') {
          options[2].options.push({
            label: item.nickname,
            value: item.nickname
          })
        }
      })
      this.options = options
      this.columns = this.columns.map(item => {
        if (item.key === 'username') {
          item.component.options = [...options[1].options, ...options[2].options]
        }
        return item
      })
      this.defaultOption = this.search.membername
      this.defaultInput = this.search.searchkey
      this.defaultTabs = [this.search.state]
      this.currentPage = this.search.page
      this.totalPage = data.TotalPage
      this.data = data.PaypalList.map(item => {
        if (this.search.state === 'on') {
          item.t_type = 'danger'
          item.t_text = '关闭'
        } else {
          item.t_text = '开启'
        }
        return item
      })
      this.data.unshift({
        username: '',
        name: '',
        paycode: '',
        isshare: '共享',
        t_text: '新增',
        t_type: 'primary'
      })
    },
    // 编辑
    async editData (data) {
      let res = await editpay(
        { paypalinfo: Object({
          id: data.id,
          name: data.name,
          isshare: data.isshare,
          paycode: data.paycode
        }) }
      )
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
      if (action === '关闭') {
        res = await outpay(`/${data.id}`)
      } else if (action === '开启') {
        res = await inpay(`/${data.id}`)
      } else if (this.search.state === 'on') {
        res = await editpay(
          { paypalinfo: Object({
            username: data.username,
            name: data.name,
            isshare: data.isshare,
            paycode: data.paycode,
            state: '上架中'
          }) }
        )
      } else {
        res = await editpay(
          { paypalinfo: Object({
            username: data.username,
            name: data.name,
            isshare: data.isshare,
            paycode: data.paycode,
            state: '已下架'
          }) }
        )
      }
      if (action === '新增') {
        const { name } = data

        if (!name) {
          return this.$message({
            message: '名称不能为空！',
            type: 'error'
          })
        }
      }
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
    tableDataChange (data, value) {
      if (!data.id) return
      this.editData(data, value)
    },
    async handleSearch (value) {
      this.search.state = value.Tabs[0]
      this.search.page = value.page || 1
      this.search.membername = value.defaultOption
      this.search.searchkey = value.input
      await this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
    .my {
        background: #fff;
        height: 100%;
    }
</style>
