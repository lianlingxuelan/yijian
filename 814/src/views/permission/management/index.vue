<template>
    <d2-container class="manage">
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
                @handleSearch="handleSearch"
        />
    </d2-container>
</template>
<script>
import { getYH, editYH, addYH } from '@api/permission'
export default {
  data () {
    return {
      options: [],
      tabs: [
        [{ label: '正常账户', value: 'on' },
          { label: '停用账户', value: 'off' }]
      ],
      defaultOption: 'all',
      defaultInput: '',
      defaultTabs: [],
      columns: [
        {
          title: '用户名',
          key: 'username',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '昵称',
          key: 'nickname',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '角色',
          key: 'role',
          component: {
            name: 'el-select',
            options: [
              {
                value: '优化师',
                label: '优化师'
              },
              {
                value: '管理员',
                label: '管理员'
              },
              {
                value: '仓库',
                label: '仓库'
              },
              {
                value: '采购',
                label: '采购'
              },
              {
                value: '财务',
                label: '财务'
              }
            ],
            size: 'small'
          }
        },
        {
          title: '所属组',
          key: 'goods',
          component: {
            name: 'el-select',
            options: [
              {
                value: 'a',
                label: 'a'
              },
              {
                value: 'b',
                label: 'b'
              }],
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
              emit: 'man/yh'
            }
          }
        }
      ],
      data: [],
      currentPage: 1,
      // 总页数
      totalPage: '',
      search: {
        page: 1,
        maxcount: 13,
        membername: 'all',
        states: 'on',
        // 搜索
        searchkey: ''
      }
    }
  },
  created () {
    // 按钮状态改变触发事件
    this.$bus.$on('man/yh', (action, data) => {
      this.updateState(action, data)
    })
    this.getData()
  },
  methods: {
    async getData () {
      let queryUrl = `/all/${this.search.page}/?`
      if (this.search.maxcount) queryUrl += `maxcount=${this.search.maxcount}`
      if (this.search.membername) queryUrl += `&membername=${this.search.membername}`
      if (this.search.searchkey) queryUrl += `&searchkey=${this.search.searchkey}`
      // 切换正常用户和禁用用户
      if (this.search.states) queryUrl += `&state=${this.search.states === 'on' ? 0 : 1}`
      let data = await getYH(queryUrl)
      this.data = data.UserList
      let options = [{
        label: '不过滤',
        options: [{
          label: '不过滤' },
        { label: '所有' },
        { label: '优化师' },
        { label: '仓库' },
        { label: '行政' },
        { label: '客服' }] }
      ]
      this.options = options
      this.defaultOption = this.search.membername
      this.defaultInput = this.search.searchkey
      this.defaultTabs = [this.search.state]
      this.currentPage = this.search.page
      this.totalPage = data.TotalPage
      this.data = data.UserList.map(item => {
        if (this.search.states === 'on') {
          item.t_type = 'danger'
          item.t_text = '停用'
        } else {
          item.t_text = '启用'
        }
        return item
      })
      this.data.unshift({
        username: '',
        nickname: '',
        password: '123456',
        role: '',
        goods: '',
        t_text: '新增',
        t_type: 'primary'
      })
    },
    // 编辑
    async editData (data) {
      let res = await editYH({ userinfo: Object(
        { id: data.id,
          username: data.username,
          nickname: data.nickname,
          password: data.password,
          role: data.role,
          goods: data.goods,
          action: 'edit' }) })
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
    // 新增
    async updateState (action, data) {
      let res = {}
      if (action === '停用') {
        res = await editYH({ userinfo: Object(
          { id: data.id, state: '停用' }) })
      } else if (action === '启用') {
        res = await editYH({ userinfo: Object(
          { id: data.id, state: '启用' }) })
      } else if (this.search.states === 'on') {
        res = await addYH(
          { userinfo: Object({
            username: data.username,
            nickname: data.nickname,
            password: data.password,
            role: data.role,
            goods: data.goods,
            state: '正常',
            express: '无',
            isleader: '否',
            leadername: '否',
            order: '无',
            site: '无',
            sys: '无',
            user: '否'
          }) }
        )
      } else {
        res = await addYH(
          { userinfo: Object({
            username: data.username,
            nickname: data.nickname,
            password: data.password,
            role: data.role,
            goods: data.goods,
            state: '停用',
            express: '无',
            isleader: '否',
            leadername: '否',
            order: '无',
            site: '无',
            sys: '无',
            user: '否'
          }) }
        )
      }
      if (action === '新增') {
        const { nickname } = data
        if (!nickname) {
          return this.$message({
            message: '昵称不能为空！',
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
      this.search.states = value.Tabs[0]
      this.search.page = value.page || 1
      this.search.membername = value.defaultOption
      this.search.searchkey = value.input
      await this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
    .manage {
        background: #fff;
        height: 100%;
    }
    /deep/.d2-container-full{
        border: none!important;
    }
</style>
