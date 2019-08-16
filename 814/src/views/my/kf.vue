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
import { getKF, editKF, addKF, outKF, inKF } from '@api/my'
export default {
  data () {
    return {
      options: [],
      tabs: [
        [{ label: '启用中', value: 'on' },
          { label: '已禁用', value: 'off' }]
      ],
      defaultOption: 'all',
      defaultInput: '',
      defaultTabs: [],
      columns: [
        {
          title: '名称',
          key: 'name',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '类型',
          key: 'type',
          component: {
            name: 'el-select',
            options: [
              {
                value: 'whatsapp',
                label: 'whatsapp'
              },
              {
                value: 'facebook',
                label: 'facebook'
              },
              {
                value: 'line',
                label: 'line'
              }
            ],
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
          title: '链接',
          key: 'value',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '备注',
          key: 'desc',
          component: {
            name: 'el-input',
            type: 'textarea',
            size: 'small'
          }
        },
        {
          title: '归属',
          key: 'username',
          component: {
            name: 'el-select',
            options: this.options,
            size: 'small'
          }
        },
        {
          title: '操作',
          key: 'state',
          width: '200px',
          component: {
            name: 'm-table-button',
            props: {
              emit: 'my/kf'
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
        state: 'on',
        searchkey: ''
      }
    }
  },
  created () {
    this.$bus.$on('my/kf', (action, data) => {
      this.updateState(action, data)
    })
    this.getData()
  },
  methods: {
    async getData () {
      let queryUrl = `/${this.search.state}/${this.search.page}/?`
      if (this.search.maxcount) queryUrl += `maxcount=${this.search.maxcount}`
      if (this.search.membername) queryUrl += `&membername=${this.search.membername}`
      if (this.search.searchkey) queryUrl += `&searchkey=${this.search.searchkey}`
      let data = await getKF(queryUrl)
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
      this.data = data.KFList.map(item => {
        if (this.search.state === 'on') {
          item.t_type = 'danger'
          item.t_text = '禁用'
        } else {
          item.t_text = '启用'
        }
        return item
      })
      this.data.unshift({
        type: 'whatsapp',
        isshare: '组内共享',
        t_text: '新增',
        t_type: 'primary'
      })
    },
    async editData (data, value) {
      let res = await editKF(Object.assign({ id: data.id, action: 'edit' }, value))
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
      if (action === '禁用') {
        res = await outKF(`/${data.id}`)
      } else if (action === '启用') {
        res = await inKF(`/${data.id}`)
      } else if (action === '新增') {
        const { value, desc, type, isshare, name } = data
        if (!name) {
          return this.$message({
            message: '客服名称不能为空！',
            type: 'error'
          })
        }
        if (!value) {
          return this.$message({
            message: '链接不能为空！',
            type: 'error'
          })
        }
        res = await addKF({ value, desc, type, isshare, name })
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
