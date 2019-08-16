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
            :isadd="true"
            @tableDataChange="tableDataChange"
            @handleSearch="handleSearch">
    </m-table>
  </d2-container>
</template>

<script>
import { getCode, editCode, outCode, inCode, checkCodeName } from '@api/my'
export default {
  data () {
    return {
      options: [],
      tabs: [
        [{ label: '广告代码', value: 'ad' },
          { label: '客服代码', value: 'kf' },
          { label: '统计代码', value: 'tj' }],
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
          width: '500px',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '代码类型',
          key: 'type',
          width: '200px',
          component: {
            name: 'el-select',
            options: [
              {
                value: 'ad',
                label: '广告代码'
              },
              {
                value: 'kf',
                label: '客服代码'
              },
              {
                value: 'tj',
                label: '统计代码'
              }
            ],
            size: 'small'
          }
        },
        {
          title: 'Facebook',
          key: 'fbcode',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: 'Google',
          key: 'googlecode',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: 'Yahool',
          key: 'yahoocode',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '区域',
          key: 'area',
          width: '200px',
          component: {
            name: 'el-select',
            options: this.$Res.areas.map(item => {
              item.label = item.name
              return item
            }),
            size: 'small'
          }
        },
        {
          title: '创建者',
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
        code: 'kf',
        page: 1,
        maxcount: 13,
        membername: 'all',
        state: 'on',
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
      if (this.search.state) queryUrl += `&state=${this.search.state}`
      if (this.search.searchkey) queryUrl += `&searchkey=${this.search.searchkey}`
      let data = await getCode(queryUrl)
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
      this.defaultTabs = [this.search.code, this.search.state]
      this.currentPage = this.search.page
      this.totalPage = data.TotalPage
      this.data = data.CodeList.map(item => {
        if (this.search.state === 'on') {
          item.t_type = 'danger'
          item.t_text = '禁用'
        } else {
          item.t_text = '启用'
        }
        item.nickname = item.User.nickname
        return item
      })
      this.data.unshift({
        area: 'tw',
        type: this.search.code,
        state: '有效',
        t_text: '新增',
        t_type: 'primary'
      })
    },
    async editData (data) {
      let res = await editCode({ codeinfo: data })
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
        res = await outCode(`/${data.id}`)
      } else if (action === '启用') {
        res = await inCode(`/${data.id}`)
      } else if (action === '新增') {
        const { area, code, fbcode, googlecode, yahoocode, name, state, subtype, type } = data
        if (!name) {
          return this.$message({
            message: '代码名称不能为空！',
            type: 'error'
          })
        }
        let { exist } = await checkCodeName(`/${name}`)
        if (exist) {
          return this.$message({
            message: '代码名称已存在，请更换名称',
            type: 'error'
          })
        }
        if (type === 'ad' && !fbcode && !googlecode && !yahoocode) {
          return this.$message({
            message: '请至少填写一个代码id',
            type: 'error'
          })
        }
        res = await editCode({ codeinfo: { area, code, fbcode, googlecode, yahoocode, name, state, subtype, type } })
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
    tableDataChange (data) {
      if (!data.id) return
      delete data.User
      this.editData(data)
    },
    async handleSearch (value) {
      this.search.code = value.Tabs[0]
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
