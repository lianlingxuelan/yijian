<template>
    <d2-container class="my">
        <m-table
                ref="table"
                :tabs="tabs"
                :columns="columns"
                :data="data"
                :currentPage="currentPage"
                :totalPage="totalPage"
                @tableDataChange="tableDataChange"
                @handleSearch="handleSearch"/>
    </d2-container>
</template>

<script>
import { getlanguagedata, dellanguagedata, addlanguagedata, editlanguagedata } from '@api/sys'
export default {
  data () {
    return {
      options: [],
      tabs: [
      ],
      defaultOption: 'all',
      defaultInput: '',
      defaultTabs: [],
      columns: [
        {
          title: '简体',
          key: 'src',
          component: {
            name: 'el-input',
            size: 'small'
          }
        }, {
          title: '繁体(台湾)',
          key: 'tw',
          component: {
            name: 'el-input',
            size: 'small'
          }
        }, {
          title: '繁体(香港)',
          key: 'hk',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '简体(马来)',
          key: 'my',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '简体(新加坡)',
          key: 'sg',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '英语',
          key: 'en',
          component: {
            name: 'el-input',
            size: 'small'
          }
        }, {
          title: '泰语(泰国)',
          key: 'th',
          component: {
            name: 'el-input',
            size: 'small'
          }
        }, {
          title: '日语(日本)',
          key: 'jpn',
          component: {
            name: 'el-input',
            size: 'small'
          }
        }, {
          title: '操作',
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
        maxcount: 13
      }
    }
  },
  created () {
    this.$bus.$on('my/kf', (action, data) => {
      this.updateState(action, data)
    })
    this.getlanguageData()
  },
  methods: {
    async getlanguageData () {
      let queryUrl = `/${this.search.page}/?`
      let data = await getlanguagedata(queryUrl)
      this.currentPage = this.search.page
      this.totalPage = data.TotalPage
      this.data = data.LangList.map(item => {
        if (this.totalPage) {
          item.t_type = 'danger'
          item.t_text = '刪除'
        }
        return item
      })
      this.data.unshift({
        'my': '',
        'tw': '',
        'hk': '',
        'src': '',
        'sg': '',
        'en': '',
        'th': '',
        'jpn': '',
        t_text: '新增',
        t_type: 'primary'
      })
    },
    async editData (data, value) {
      let res = await editlanguagedata(Object.assign({ id: data.id, action: 'edit' }, value))
      if (!res.Error) {
        this.$message({
          message: res.Info,
          type: 'success'
        })
        this.getlanguageData()
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
        res = await dellanguagedata(`/${data.id}`)
        if (!res.Error) {
          this.$message({
            message: res.Info,
            type: 'success'
          })
          this.getlanguageData()
        }
      } else if (action === '新增') {
        const { src, tw, hk, my, sg, en, th, jpn } = data
        if (!src || !tw || !hk || !my || !sg || !en || !th || !jpn) {
          return this.$message({
            message: '请输入全部内容',
            type: 'error'
          })
        }
        res = await addlanguagedata({ lang: { src, tw, hk, my, sg, en, th, jpn } })
        await this.getlanguageData()
      }
    },
    tableDataChange (data, value) {
      if (!data.id) return
      this.editData(data, value)
    },
    async handleSearch (value) {
      this.search.page = value.page || 1
      await this.getlanguageData()
    }
  }
}
</script>

<style lang="less" scoped>
    .my {
        background: #fff;
        height: 100%;
    }
    /deep/.d2-container-full__header{
        display: none;
    }
    /deep/.d2-container-full{
        border: none!important;
    }
</style>
