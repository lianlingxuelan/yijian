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
import { getDomain, editDomain, outDomain, inDomain, addDomain, checkDomainName } from '@api/my'
export default {
  data () {
    return {
      options: [],
      tabs: [
        [{ label: '单页域名', value: 'spa' },
          { label: '商城域名', value: 'shop' }],
        [{ label: '启用中', value: 'on' },
          { label: '已禁用', value: 'off' }]
      ],
      defaultOption: 'all',
      defaultInput: '',
      defaultTabs: [],
      columns: [
        {
          title: '#',
          key: 'id',
          width: '100px'
        },
        {
          title: '域名',
          key: 'name',
          width: '300px',
          component: {
            name: 'el-input',
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
          title: '分类',
          key: 'domaintype',
          component: {
            name: 'el-select',
            options: [
              {
                value: '单页域名',
                label: '单页域名'
              },
              {
                value: '商城域名',
                label: '商城域名'
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
          title: '使用数',
          key: 'sitecount',
          width: '150px'
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
          title: '操作',
          key: 'state',
          width: '200px',
          component: {
            name: 'm-table-button',
            props: {
              emit: 'my/domain'
            }
          }
        }
      ],
      data: [],
      currentPage: 1,
      totalPage: 3,
      search: {
        domaintype: 'spa',
        page: 1,
        maxcount: 13,
        membername: 'all',
        state: 'on',
        searchkey: ''
      }
    }
  },
  created () {
    this.$bus.$on('my/domain', (action, data) => {
      this.updateState(action, data)
    })
    this.getData()
  },
  methods: {
    async getData () {
      let queryUrl = `/${this.search.domaintype}/${this.search.page}/?`
      if (this.search.maxcount) queryUrl += `maxcount=${this.search.maxcount}`
      if (this.search.membername) queryUrl += `&membername=${this.search.membername}`
      if (this.search.state) queryUrl += `&state=${this.search.state}`
      if (this.search.searchkey) queryUrl += `&searchkey=${this.search.searchkey}`
      let data = await getDomain(queryUrl)
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
      this.columns[2].component.options = [...options[1].options, ...options[2].options]
      this.defaultOption = this.search.membername
      this.defaultInput = this.search.searchkey
      this.defaultTabs = [this.search.domaintype, this.search.state]
      this.currentPage = this.search.page
      this.totalPage = data.TotalPage
      this.data = data.DomainList.map(item => {
        if (this.search.state === 'on') {
          item.t_type = 'danger'
          item.t_text = '禁用'
        } else {
          item.t_text = '启用'
        }
        return item
      })
      this.data.unshift({
        domaintype: this.search.domaintype === 'spa' ? '单页域名' : '商城域名',
        isshare: this.columns[4].component.options[0].value,
        t_text: '新增',
        t_type: 'primary'
      })
    },
    async editData (data, value) {
      let res = await editDomain(Object.assign({ id: data.id, action: 'edit' }, value))
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
        res = await outDomain(`/${data.id}`)
      } else if (action === '启用') {
        res = await inDomain(`/${data.id}`)
      } else if (action === '新增') {
        const { desc, domaintype, isshare, name } = data
        if (!name) {
          return this.$message({
            message: '代码名称不能为空！',
            type: 'error'
          })
        }
        let { exist } = await checkDomainName(`/${name}`)
        if (exist) {
          return this.$message({
            message: '域名名称已存在，请更换名称',
            type: 'error'
          })
        }
        res = await addDomain({ desc, domaintype, isshare, name })
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
      this.search.domaintype = value.Tabs[0]
      this.search.state = value.Tabs[1]
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
