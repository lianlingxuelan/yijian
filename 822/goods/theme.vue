<template>
    <div>
        <d2-container class="goodtheme">
            <div class="shoptem"><strong>单页模板</strong></div>
            <m-table
                ref="table"
                v-model="tabName"
                fit="true"
                :tabs="tabs"
                :defaultTabs="defaultTabs"
                :columns="columns"
                :data="data"
                :currentPage="currentPage"
                :totalPage="totalPage"
                @tableDataChange="tableDataChange"
                @handleSearch="handleSearch"/>
        </d2-container>
    </div>
</template>
<script>
import { getTheme, offTheme, onTheme, editTheme, checkTheme } from '@api/goods'
import { goodsThemeClass } from '@/res/res'

export default {
  data () {
    return {
      tabName: 'on',
      tabs: [
        [
          { label: '上架中', value: 'on' },
          { label: '已下架', value: 'off' }
        ]
      ],
      defaultTabs: [],
      columns: [
        {
          title: '名称',
          key: 'name',
          minWidth: '180px',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '简介',
          key: 'description',
          minWidth: '800px',
          component: {
            name: 'el-input',
            size: 'small',
            fit: true
          }
        },
        {
          title: '预览',
          key: 'img',
          minWidth: '200px',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '分类',
          key: 'classtype',
          width: '100px',
          component: {
            name: 'el-select',
            options: goodsThemeClass,
            size: 'small'
          }
        },
        {
          title: '支持换色',
          key: 'color',
          width: '100px',
          component: {
            name: 'el-select',
            options: [
              { label: '否', value: '否' },
              { label: '是', value: '是' }
            ],
            size: 'small'
          }
        },
        {
          title: '适配PC',
          key: 'iswide',
          width: '100px',
          component: {
            name: 'el-select',
            options: [
              { label: '否', value: '否' },
              { label: '是', value: '是' }
            ],
            size: 'small'
          }
        },
        {
          title: '支持轮播图',
          key: 'isslide',
          width: '100px',
          component: {
            name: 'el-select',
            options: [
              { label: '否', value: '否' },
              { label: '是', value: '是' }
            ],
            size: 'small'
          }
        },
        {
          title: '代号',
          key: 'filename',
          width: '100px',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '操作',
          key: 'state',
          width: '100px',
          component: {
            name: 'm-table-button',
            props: {
              emit: 'goods/theme'
            },
            size: 'small'
          }
        }
      ],
      data: [],
      lastDate: new Date(),
      repeatData: [],
      currentPage: 1,
      totalPage: 5,
      switchs: true,
      pageCount: 1,
      totalcount: 15,
      classtype: goodsThemeClass,
      search: {
        page: 1,
        totalcount: 13,
        state: 'on'
      }
    }
  },
  created () {
    this.$bus.$on('goods/theme', (action, data) => {
      this.updateState(action, data)
    })
    this.getData()
  },
  mounted () {
  },
  methods: {
    async getData () {
      let queryUrl = `/${this.search.state}/${this.search.page}`
      let shopData = await getTheme(queryUrl)
      this.totalPage = shopData.TotalPage
      this.totalcount = shopData.TotalCount
      this.currentPage = shopData.Page
      this.data = shopData.ThemeList
      this.defaultTabs = [this.search.state]
      console.log(this, shopData)
      this.data.map(item => {
        if (this.search.state === 'on') {
          item.t_type = 'danger'
          item.t_text = '下架'
        } else if (this.search.state === 'off') {
          item.t_text = '上架'
          item.t_type = 'warning'
        }
      })
      this.data.unshift({
        classtype: '',
        name: '',
        state: '',
        username: '',
        keywords: '',
        color: '',
        img: '',
        author: '',
        isslide: '',
        filename: '',
        iswide: '',
        description: '',
        t_text: '新增',
        t_type: 'primary'
      })
    },
    async editData (data, value) {
      let dataC = Object.keys(data)
      let valueC = Object.keys(value)
      let checkRes = await checkTheme(data.name)
      if (!checkRes.exist || (checkRes.exist && valueC[0] !== dataC[1])) {
        let res = await editTheme(
          {
            theme: Object({
              author: data.author || '',
              id: data.id,
              keywords: data.keywords || '',
              classtype: data.classtype,
              username: data.username,
              img: data.img,
              name: data.name,
              state: data.state,
              filename: data.filename,
              color: data.color,
              isslide: data.isslide,
              iswide: data.iswide,
              description: data.description
            })
          }
        )
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
      } else if (checkRes.exist) {
        this.$message({
          message: '该名称已存在',
          type: 'error'
        })
      }
    },
    async updateState (action, data) {
      let checkRes = await checkTheme(data.name)
      let dataObj = {
        theme: Object({
          classtype: data.classtype,
          name: data.name,
          filename: data.filename,
          color: data.color,
          isslide: data.isslide,
          iswide: data.iswide,
          img: data.img,
          description: data.description,
          state: '是'
        })
      }
      let result = (Object.values(Object.values(dataObj)[0])).every(i => i !== '')
      let now = new Date()
      if (now - this.lastDate > 1000) {
        this.lastDate = now
        this.switchs = true
      } else {
        this.switchs = false
        console.log(this.switchs, '请等待1.5s')
        return
      }
      let res = {}
      if (this.switchs) {
        if (action === '下架') {
          res = await offTheme(`/${data.id}`)
        } else if (action === '上架') {
          res = await onTheme(`/${data.id}`)
        } else if (this.search.state === 'on') {
          if (!checkRes.exist && result) {
            res = await editTheme(Object.assign(dataObj, {
              theme: Object({
                classtype: data.classtype,
                name: data.name,
                filename: data.filename,
                color: data.color,
                isslide: data.isslide,
                iswide: data.iswide,
                img: data.img,
                description: data.description,
                keywords: data.keywords || '',
                state: '是',
                author: data.author || ''
              })
            }
            ))
            await this.getData()
          } else {
            return this.$message({
              message: '请检查名称是否重复并完善信息',
              type: 'error'
            })
          }
        } else if (this.search.state === 'off') {
          if (!checkRes.exist && result) {
            res = await editTheme(Object.assign(dataObj, {
              theme: Object({
                classtype: data.classtype,
                name: data.name,
                filename: data.filename,
                color: data.color,
                isslide: data.isslide,
                iswide: data.iswide,
                img: data.img,
                description: data.description,
                keywords: data.keywords || '',
                state: '否',
                author: data.author || ''
              })
            }
            ))
            await this.getData()
          } else {
            return this.$message({
              message: '请检查名称是否重复并完善信息',
              type: 'error'
            })
          }
        }
        this.switchs = !this.switchs
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
    tableDataChange (data, value) {
      if (!data.id) return
      this.editData(data, value)
    },
    async handleSearch (value) {
      this.search.state = value.Tabs[0]
      this.search.page = value.page || 1
      await this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
    .goodtheme {
        background: #fff;
        height: 100%;
    }
    /deep/.d2-container-full__body .shoptem{
        position: absolute;
        top: -1px;
    }
    /deep/.goodtheme .d2-container-full{
        position: absolute;
        right: 0;
    }
    /deep/.d2-container-full__body{
        margin-top: 20px;
        padding-top: 10px;
    }
    /deep/.d2-container-full__header{
        display: none;
    }
    /deep/.d2-container-full__body .el-table__body .el-input__inner{
        border: 1px solid transparent;
    }
    /deep/.d2-container-full__body .el-table__body .el-input__inner:hover{
        border: 1px solid #03f;
    }
    /deep/.table[data-v-14bc5cde] .el-table td, .el-table th[data-v-14bc5cde]{
        border: 1px solid transparent;
    }
    /deep/#m-table[data-v-14bc5cde] .el-input__inner{
        padding: 0;
        text-align: center;
    }
    /deep/.table[data-v-14bc5cde] .cell{
        text-align: center;
        background: #fff;
        height: 40px;
        line-height: 40px;
    }
</style>
