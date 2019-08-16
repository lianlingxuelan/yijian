<template>
  <d2-container>
    <template
            slot="header">
      点击添加占位符&nbsp;
      <template
              v-for="(item,index) in placeholder">
        <el-button
                :key="`holder_${index}`"
                @click="addContent(item.text)">
          {{item.label}}
        </el-button>
      </template>
    </template>
    <d2-crud
            :columns="columns"
            :data="data"
            index-row
            ref="d2Crud"
            @cell-click="cellClick"
            @cell-data-change="handleDataChange"/>
    <template
      slot="footer">
      <el-pagination
              background
              @current-change="handleClickPage"
              :current-page.sync="page"
              :page-count="pageCount"
              layout="prev, pager, next, jumper">
      </el-pagination>
    </template>
  </d2-container>
</template>

<script>
import { placeholder } from '@/res/res'
import { getSMS, saveSMS, delSMS } from '@api/sys'
export default {
  data () {
    return {
      tabName: 'on',
      columns: [
        {
          title: '模板内容',
          key: 'content',
          headerAlign: 'center',
          minWidth: '250px',
          component: {
            name: 'el-input',
            type: 'textarea',
            size: 'small'
          }
        },
        {
          title: '标记',
          key: 'mark',
          headerAlign: 'center',
          align: 'center',
          minWidth: '60px',
          component: {
            name: 'el-select',
            options: [
              { label: '其它', value: 0 },
              { label: '第一次发送', value: 1 },
              { label: '第二次发送', value: 2 }
            ],
            size: 'small'
          }
        },
        {
          title: '操作',
          key: 'status',
          width: '150px',
          headerAlign: 'center',
          align: 'center',
          component: {
            name: 'm-table-button',
            props: {
              emit: 'sys/sms'
            }
          }
        }
      ],
      placeholder: placeholder,
      data: [],
      page: 1,
      pageCount: 1,
      editId: 0
    }
  },
  created () {
    this.refreshData()
    this.$bus.$on('sys/sms', (action, data) => {
      this.updateState(action, data)
    })
  },
  methods: {
    addContent (text) {
      this.data.some((item, index) => {
        if (item.id === this.editId) {
          item.content += text
          this.$refs.d2Crud.updateRow(index, item)
          return true
        }
      })
    },
    cellClick (row) {
      this.editId = row.id
    },
    async refreshData () {
      let queryUrl = `/${this.page}`
      let data = await getSMS(queryUrl)
      this.pageCount = data.TotalPage
      this.data = data.SMSList.map(item => {
        item.state = '默认'
        item.t_type = 'danger'
        item.t_text = '删除'
        return item
      })
      this.data.unshift({
        id: 0,
        content: '',
        mark: 0,
        t_text: '新增',
        t_type: 'primary'
      })
    },
    handleClick () {
      this.refreshData()
    },
    handleClickPage () {
      this.refreshData()
    },
    handleDataChange ({ row }) {
      if (!row.id) {
        this.data[0] = row
        return
      }
      this.editData(row)
    },
    async editData (data) {
      let res = await saveSMS(data)
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
    },
    async updateState (action, data) {
      let res = {}
      if (action === '删除') {
        res = await delSMS(`/${data.id}`)
      } else if (action === '新增') {
        if (!data.content) {
          return this.$message({
            message: '模板内容不能为空！',
            type: 'error'
          })
        }
        res = await saveSMS(data)
      }
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

<style lang="less" scoped></style>
