<template>
    <d2-container class="my">
        <m-table
            ref="table"
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
import { limitdata, editlimit, dellimit, addlimit } from '@api/limit'
export default {
  data () {
    return {
      options: [],
      tabs: [
        [{ label: 'IP限制', value: 'ip' },
          { label: '电话限制', value: 'phone' },
          { label: '姓名限制', value: 'name' }]
      ],
      defaultOption: 'all',
      defaultInput: '',
      defaultTabs: [],
      columns: [
        {
          title: '#',
          key: 'id',
          width: '200px'
        },
        {
          title: '添加时间',
          width: '400px',
          key: 'created_at'
        },
        {
          title: 'IP',
          key: 'clientip',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '添加者',
          key: 'nickname'
        },
        {
          title: '操作',
          key: 'state',
          width: '200px',
          component: {
            name: 'm-table-button',
            props: {
              emit: 'my/code'
            }
          }
        }
      ],
      data: [],
      currentPage: 1,
      totalPage: 3,
      search: {
        code: 'ip',
        page: 1,
        maxcount: 12,
        membername: '',
        searchkey: ''
      }
    }
  },
  created () {
    this.getData()
    this.$bus.$on('my/code', (action, data) => {
      this.updateState(action, data)
    })
  },
  methods: {
    async getData () {
      let queryUrl = `/${this.search.code}/${this.search.page}/?`
      if (this.search.maxcount) queryUrl += `maxcount=${this.search.maxcount}`
      if (this.search.membername) queryUrl += `&membername=${this.search.membername}`
      if (this.search.searchkey) queryUrl += `&searchkey=${this.search.searchkey}`
      let data = await limitdata(queryUrl)
      this.defaultOption = this.search.membername
      this.defaultInput = this.search.searchkey
      this.defaultTabs = [this.search.code]
      this.currentPage = this.search.page
      this.totalPage = data.TotalPage
      this.data = data.LimitList.map(item => {
        item.created_at = new Date(item.created_at).FormatDefault()
        if (this.totalPage) {
          item.t_type = 'danger'
          item.t_text = '刪除'
        }
        item.nickname = item.User.nickname
        return item
      })
      switch (this.search.code) {
        case 'ip':
          this.columns[2].key = 'clientip'
          this.columns[2].title = 'IP'
          break
        case 'phone':
          this.columns[2].key = 'clientphone'
          this.columns[2].title = '电话'
          break
        default:
          this.columns[2].key = 'clientname'
          this.columns[2].title = '姓名'
      }
      this.data.unshift({
        value: '',
        type: this.search.code,
        t_text: '新增',
        t_type: 'primary'
      })
    },
    async editData (data) {
      let res = await editlimit({ id: data.id,
        clientphone: data.clientphone,
        clientip: data.clientip,
        clientname: data.clientname,
        action: 'edit' })
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
      if (action === '刪除') {
        res = await dellimit(`/${this.search.code}/${data.id}`)
        this.$message({
          message: res.Info,
          type: 'success'
        })
        this.getData()
      }
      if (action === '新增') {
        switch (this.search.code) {
          case 'ip':
            res = await addlimit({
              limit: {
                type: data.type,
                value: data.clientip
              }
            })
            break
          case 'phone':
            res = await addlimit({
              limit: {
                type: data.type,
                value: data.clientphone
              }
            })
            break
          default:
            res = await addlimit({
              limit: {
                type: data.type,
                value: data.clientname
              }
            })
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
      }
    },
    tableDataChange (data) {
      if (!data.id) return
      delete data.User
      this.editData(data)
    },
    async handleSearch (value) {
      this.search.code = value.Tabs[0]
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
