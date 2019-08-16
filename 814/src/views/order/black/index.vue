<template>
  <d2-container class="order-black">
    <template slot="header">
      <div :style="{'margin-top': '15px', width: '50%', 'min-width': '400px'}">
        <el-input
          @keyup.enter.native="handleSearch"
          placeholder="请输入内容"
          v-model="input" clearable>
          <el-button
            slot="append"
            class="m-table-button"
            type="primary"
            icon="el-icon-search"
            @click="handleSearch">
            搜索
          </el-button>
        </el-input>
      </div>
    </template>
    <d2-crud
      :columns="columns"
      :data="data"
      @cell-data-change="handleCellDataChange"></d2-crud>
    <template slot="footer">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-count="pageCount"
        layout="prev, pager, next, jumper">
      </el-pagination>
    </template>
  </d2-container>
</template>

<script>
import orderApi from '@/api/order'
export default {
  data () {
    return {
      input: '',
      columns: [
        {
          title: '#',
          key: 'id'
        },
        {
          title: '电话',
          key: 'phone',
          component: {
            name: 'el-input',
            size: 'medium'
          }
        },
        {
          title: 'IP',
          key: 'ip',
          component: {
            name: 'el-input',
            size: 'medium'
          }
        },
        {
          title: 'E-Mail',
          key: 'email'
        },
        {
          title: '原因',
          key: 'blackReason',
          component: {
            name: 'el-input',
            size: 'medium'
          }
        },
        {
          title: '添加者',
          key: 'nickname'
        },
        {
          title: '添加时间',
          key: 'addTime'
        },
        {
          title: '操作',
          key: 'addTime',
          component: {
            render: (h, scope) => {
              return h('el-button', {
                attrs: {
                  icon: scope.id ? 'el-icon-close' : 'el-icon-plus'
                },
                nativeOn: {
                  click: () => {
                    scope.id ? this.handleDel(scope.id) : this.handleAdd(scope)
                  }
                }
              })
            }
          }
        }
      ],
      data: [],
      page: 1,
      pageCount: 1
    }
  },
  created () {
    this.refreshData()
  },
  methods: {
    async refreshData () {
      let queryUrl = `/${this.page}/`
      if (this.input) queryUrl += `?searchkey=${this.input}`
      let data = await orderApi.get_blackList(queryUrl)
      this.pageCount = data.TotalPage
      this.data = data.BlackInfoList.map(item => {
        item.addTime = new Date(item.created_at).FormatDefault()
        item.nickname = item.User.nickname
        return item
      })
      this.data.unshift({})
    },
    async handleCellDataChange ({ key, value, row }) {
      if (!row.id) return
      let res = await orderApi.edit_blackList({
        action: 'edit',
        id: row.id,
        [key]: value
      })
      this.handleRes(res)
    },
    handleSearch () {
      this.refreshData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.refreshData()
    },
    async handleDel (id) {
      let queryUrl = `/${id}/`
      let res = await orderApi.del_blackList(queryUrl)
      this.handleRes(res)
    },
    async handleAdd (value) {
      const { phone, ip, blackReason } = value
      if (!phone && !ip) {
        return this.$message({
          message: '电话和Ip至少填一个！',
          type: 'error'
        })
      }
      if (!blackReason) {
        return this.$message({
          message: '请填写原因！',
          type: 'error'
        })
      }
      let res = await orderApi.add_blackList({ phone, ip, blackReason })
      this.handleRes(res)
    },
    handleRes (res) {
      if (!res.Error) {
        this.$message({
          message: res.Info,
          type: 'success'
        })
        this.refreshData()
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
  /deep/ .cell {
    text-align: center;
  }
</style>
