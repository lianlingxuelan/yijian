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
            :isShowSearch="false"
            @tableDataChange="tableDataChange"
            @handleSearch="handleSearch"/>
    <m-edit-dialog
      :visible.sync="dialog.visible"
      @addBody="addBody"/>
  </d2-container>
</template>

<script>
import { getPage, editPage, delPage } from '@api/my'
export default {
  data () {
    return {
      options: [],
      tabs: [
        this.$Res.languages.map(item => {
          item.label = item.name
          return item
        }),
        this.$Res.classtypes.map(item => {
          item.label = item.name
          return item
        })
      ],
      defaultOption: 'all',
      defaultInput: '',
      defaultTabs: [],
      columns: [
        {
          title: '链接名',
          key: 'linkname',
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
          title: '默认',
          key: 'isdefault',
          component: {
            name: 'el-select',
            options: [
              {
                value: '是',
                label: '是'
              },
              {
                value: '否',
                label: '否'
              }
            ],
            size: 'small'
          }
        },
        {
          title: '页面分类',
          key: 'classtype',
          component: {
            name: 'el-select',
            options: this.$Res.classtypes.map(item => {
              item.label = item.name
              return item
            }),
            size: 'small'
          }
        },
        {
          title: '标题',
          key: 'title',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '最后编辑时间',
          key: 'lastEditTime'
        },
        {
          title: '优化师',
          key: 'nickname'
        },
        {
          title: '操作',
          key: 'state',
          width: '100px',
          component: {
            name: 'm-table-button',
            props: {
              emit: 'my/page'
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
        language: 'tw',
        type: '1',
        searchkey: ''
      },
      dialog: {
        visible: false
      }
    }
  },
  created () {
    this.$bus.$on('my/page', (action, data) => {
      this.updateState(action, data)
    })
    this.getData()
  },
  methods: {
    async getData () {
      let queryUrl = `/${this.search.type}/${this.search.page}/?`
      if (this.search.maxcount) queryUrl += `maxcount=${this.search.maxcount}`
      if (this.search.membername) queryUrl += `&membername=${this.search.membername}`
      if (this.search.language) queryUrl += `&language=${this.search.language}`
      let data = await getPage(queryUrl)
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
      this.defaultTabs = [this.search.language, this.search.type]
      this.currentPage = this.search.page
      this.totalPage = data.TotalPage
      this.data = data.PageList.map(item => {
        item.t_type = 'danger'
        item.t_text = '删除'
        item.showRemoveButton = true
        item.nickname = item.User.nickname
        item.lastEditTime = new Date(item.updated_at).NatureTime()
        return item
      })
      this.data.unshift({
        classtype: this.search.type,
        isdefault: '是',
        language: this.search.language,
        linkname: '',
        title: '',
        t_text: '新增',
        t_type: 'primary'
      })
    },
    async editData (data, value) {
      let res = await editPage({ pageinfo: Object.assign({ id: data.id, action: 'edit' }, value) })
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
      if (action === '删除') {
        res = await delPage(`/${data.id}`)
      } else if (action === '新增') {
        const { linkname, title } = data
        if (!linkname) {
          return this.$message({
            message: '链接名不能为空！',
            type: 'error'
          })
        }
        if (!title) {
          return this.$message({
            message: '页面标题不能为空！',
            type: 'error'
          })
        }
        this.dialog.visible = true
        return
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
      if (!data.id) {
        this.data[0] = data
        return
      }
      this.editData(data, value)
    },
    async handleSearch (value) {
      this.search.state = value.Tabs[0]
      this.search.page = value.page || 1
      this.search.membername = value.defaultOption
      this.search.language = value.Tabs[0]
      this.search.type = value.Tabs[1]
      await this.getData()
    },
    async addBody (body) {
      let { classtype, isdefault, language, linkname, title } = this.data[0]
      let res = await editPage({ pageinfo: { body, classtype, isdefault, language, linkname, title } })
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
  }
}
</script>

<style lang="less" scoped>
  .my {
    background: #fff;
    height: 100%;
  }
</style>
