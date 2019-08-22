<template>
    <div>
        <d2-container class="sitetheme">
            <div class="shoptem"><strong>主题管理</strong></div>
            <div class="content">
                <m-table
                    ref="table"
                    v-model="tabName"
                    :tabs="tabs"
                    :defaultTabs="defaultTabs"
                    :columns="columns"
                    :data="data"
                    :currentPage="currentPage"
                    :totalPage="totalPage"
                    @tableDataChange="tableDataChange"
                    @handleSearch="handleSearch"/>
            </div>
        </d2-container>
    </div>
</template>
<!--
    剩余任务：
        添加头部消息网站模板
        检测是否有重复主题名
        添加并渲染分别处于“on”和“off”页面下的主题数量
        检查并修改将功能正确完善
        代码优化
-->
<script>
/**
     *  API:
     *
     */
import { getShopTheme, outShopTheme, inShopTheme, editShopTheme, checkTheme } from '@api/site'
import { goodsThemeClass, colors, colorsf } from '@/res/res'
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
          title: '编号',
          key: 'id',
          component: {
            size: 'small'
          }
        },
        {
          title: '名称',
          key: 'name',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '预览',
          key: 'description',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '分类',
          key: 'classtype',
          component: {
            name: 'el-select',
            options: goodsThemeClass,
            size: 'small'
          }
        },
        {
          title: '色系',
          key: 'color',
          component: {
            name: 'el-select',
            options: colorsf,
            size: 'small'
          }
        },
        {
          title: '是宽屏',
          key: 'iswide',
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
          title: '有轮播图',
          key: 'isslide',
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
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '可用',
          key: 'state',
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
          title: '操作',
          key: 'keywords',
          width: '200px',
          component: {
            name: 'm-table-button',
            props: {
              emit: 'site/theme'
            },
            size: 'small'
          }
        }
      ],
      data: [],
      lastDate: new Date(),
      repeatData: [],
      currentPage: 1,
      // 默认页数为 5
      totalPage: 5,
      // 自定义颜色替换
      colors: colors,
      switchs: true,
      pageCount: 1,
      totalcount: 15,
      // 自定义分类替换
      classtype: goodsThemeClass,
      search: {
        page: 1,
        totalcount: 13,
        state: 'on'
      }
    }
  },
  created () {
    this.$bus.$on('site/theme', (action, data) => {
      this.updateState(action, data)
    })
    this.getData()
  },
  mounted () {
  },
  methods: {
    // 获取网站数据
    async getData () {
      let queryUrl = `/${this.search.state}/${this.search.page}`
      // 获取后台数据
      let shopData = await getShopTheme(queryUrl)
      // 当前页面最高页
      this.totalPage = shopData.TotalPage
      // 当前页面最多数量
      this.totalcount = shopData.TotalCount
      // 当前页面
      this.currentPage = shopData.Page
      this.data = shopData.ThemeList
      this.defaultTabs = [this.search.state]
      // 遍历后台数组并修改成所需要的数据
      shopData.ThemeList.map(item => {
        this.shoplist = item
        this.colors.forEach((item) => {
          if (this.shoplist.color === item.value) {
            this.shoplist.color = item.name
          }
        })
        if (this.shoplist.classtype === 'a') {
          this.shoplist.classtype = '通用'
        }
        this.data.map(item => {
          if (this.search.state === 'on') {
            item.t_type = 'danger'
            item.t_text = '下架'
          } else if (this.search.state === 'off') {
            item.t_text = '上架'
            item.t_type = 'warning'
          }
        })
      })

      // 第一项添加新增功能
      this.data.unshift({
        // id: '',
        classtype: '',
        name: '',
        state: '',
        username: '',
        keywords: '',
        color: '',
        author: '',
        isslide: '',
        filename: '',
        iswide: '',
        description: '',
        t_text: '新增',
        t_type: 'primary'
      })
    },
    // 编辑数据
    async editData (data, value) {
      let dataC = Object.keys(data)
      let valueC = Object.keys(value)
      let checkRes = await checkTheme(data.name)
      if (!checkRes.exist || (checkRes.exist && valueC[0] !== dataC[1])) {
        let res = await editShopTheme(
          {
            theme: Object({
              author: data.author || '',
              id: data.id,
              keywords: data.keywords || '',
              classtype: data.classtype,
              username: data.username,
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
    // 数据更新
    async updateState (action, data) {
      let checkRes = await checkTheme(data.name)
      let dataObj = {
        theme: Object({
          classtype: data.classtype,
          name: data.name,
          state: data.state,
          filename: data.filename,
          color: data.color,
          isslide: data.isslide,
          iswide: data.iswide,
          description: data.description,
          keywords: '下架中'
        })
      }
      let arron = Object.values(dataObj)
      let abc = Object.values(arron[0])
      let result = abc.every(i => i !== '')
      let now = new Date()
      if (now - this.lastDate > 1500) {
        this.lastDate = now
        this.switchs = true
      } else {
        this.switchs = false
        return
      }
      let res = {}
      if (this.switchs) {
        if (action === '下架') {
          res = await outShopTheme(`/${data.id}`)
        } else if (action === '上架') {
          res = await inShopTheme(`/${data.id}`)
        } else if (this.search.state === 'on') {
          if (!checkRes.exist && result) {
            res = await editShopTheme(Object.assign(dataObj, {
              theme: Object({
                classtype: data.classtype,
                name: data.name,
                state: data.state,
                filename: data.filename,
                color: data.color,
                isslide: data.isslide,
                iswide: data.iswide,
                description: data.description,
                keywords: '已下架',
                author: data.author || ''
              })
            }
            ))
            await this.getData()
          } else {
            this.$message({
              message: '请检查名称是否重复并完善信息',
              type: 'error'
            })
            return
          }
        } else if (this.search.state === 'off') {
          if (!checkRes.exist && result) {
            res = await editShopTheme(Object.assign(dataObj, {
              theme: Object({
                classtype: data.classtype,
                name: data.name,
                state: data.state,
                filename: data.filename,
                color: data.color,
                isslide: data.isslide,
                iswide: data.iswide,
                description: data.description,
                keywords: '上架中',
                author: data.author || ''
              })
            }))
          } else {
            this.$message({
              message: '请检查名称是否重复并完善信息',
              type: 'error'
            })
            return
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
    .sitetheme {
        background: #fff;
        height: 100%;
    }
    /deep/.d2-container-full__body .shoptem{
        position: absolute;
        top: -1px;
    }
    /deep/.sitetheme .d2-container-full{
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
