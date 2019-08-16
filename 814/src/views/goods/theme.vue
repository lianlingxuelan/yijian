<template>
   <d2-container>
      <el-tabs
          type="card"
          v-model="tabName"
          @tab-click="handleClick">
         <el-tab-pane label="上架中" name="on">
         </el-tab-pane>
         <el-tab-pane label="已下架" name="off">
         </el-tab-pane>
      </el-tabs>
      <d2-crud :columns="columns" :data="data"></d2-crud>
      <el-pagination
          background
          @current-change="handleClickPage"
          :current-page.sync="page"
          :page-count="pageCount"
          layout="prev, pager, next, jumper">
      </el-pagination>
   </d2-container>
</template>

<script>
import { getTheme } from '@api/goods'
import { goodsThemeClass } from '@/res/res'

export default {
  data () {
    return {
      tabName: 'on',
      columns: [
        {
          title: '名称',
          key: 'name',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '简介',
          key: 'description',
          component: {
            name: 'el-input',
            size: 'small'
          }
        },
        {
          title: '预览地址',
          key: 'img',
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
          title: '支持换色',
          key: 'color',
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
          component: {
            name: 'el-select',
            options: [
              { label: '否', value: '否' },
              { label: '是', value: '是' }
            ],
            size: 'small'
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
      let queryUrl = `/${this.tabName}/${this.page}`
      let data = await getTheme(queryUrl)
      this.pageCount = data.TotalPage
      this.data = data.ThemeList
    },
    handleClick () {
      this.refreshData()
    },
    handleClickPage () {
      this.refreshData()
    }
  }
}
</script>

<style lang="less" scoped></style>
