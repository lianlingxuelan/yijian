<template>
    <d2-container class="order-white">
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
          title: 'IP',
          key: 'ip',
          component: {
            name: 'el-input',
            size: 'medium'
          }
        },
        {
          title: '城市',
          key: 'city',
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
      let data = await orderApi.get_whiteList(queryUrl)
      this.pageCount = data.TotalPage
      this.data = data.WhiteInfoList.map(item => {
        item.addTime = new Date(item.created_at).FormatDefault()
        item.nickname = item.User.nickname
        return item
      })
      this.data.unshift({})
    },
    async handleCellDataChange ({ key, value, row }) {
      if (!row.id) return
      let res = await orderApi.edit_whiteList({
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
      let res = await orderApi.del_whiteList(queryUrl)
      this.handleRes(res)
    },
    async handleAdd (value) {
      const { city, ip } = value
      if (!city && !ip) {
        return this.$message({
          message: '城市和Ip至少需要填一个！',
          type: 'error'
        })
      }
      let res = await orderApi.add_whiteList({ city, ip })
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
