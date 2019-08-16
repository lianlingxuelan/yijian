
<template>
    <d2-container class="logs" >
        <m-table
            ref="table"
            :options="options"
            :searchtypes="searchtypes"
            :searchtype="searchtype"
            :tabs="tabs"
            :defaultOption="defaultOption"
            :defaultInput="defaultInput"
            :defaultTabs="defaultTabs"
            :columns="columns"
            :data="data"
            :logs="flag"
            :currentPage="currentPage"
            :totalPage="totalPage"
            @tableDataChange="tableDataChange"
            @handleTabClick ="handleTabClick"
            @handleSearch="handleSearch">
            <el-select v-model="searchtype" placeholder="请选择"  slot="orderselect">
                <el-option
                    v-for="item in searchtypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        <el-date-picker
            slot="date"
            v-model="SearchContent"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd">
        </el-date-picker>
        </m-table>
    </d2-container>
</template>
<script>
import Res from '@/assets/js/application'
import { getCode } from '@api/logs'
export default {

  data () {
    return {
      pickerOptions: Res.pickerOptions,
      flag: true,
      options: [],
      tabs: [
        [{ label: '用户登录', value: 'userlogin' },
          { label: '订单管理', value: 'order' },
          { label: '商品管理', value: 'goods' },
          { label: '网站管理', value: 'site' },
          { label: '用户管理', value: 'user' },
          { label: '系统管理', value: 'sys' }
        ]
      ],
      searchtypes: [{ name: 'orderid', value: '订单号' }, { name: 'goodsid', value: '商品ID' }, { name: 'siteid', value: '网站ID' }],
      searchtype: '订单号',
      SearchContent: '',
      defaultOption: 'all',
      defaultOption1: '商品ID',
      defaultInput: '',
      defaultTabs: [],
      columns: [
        {
          title: '时间',
          key: 'created_at'
        },
        {
          title: '用户',
          key: 'nikename'
        },
        {
          title: '动作',
          key: 'action'
        },
        {
          title: '登录结果',
          key: 'loginret'
        },
        {
          title: 'IP',
          key: 'ip'
        },
        {
          title: '地区',
          key: 'local'
        },
        {
          title: '移动端',
          key: 'isMobile'

        },
        {
          title: '平台',
          key: 'state'
        },
        {
          title: '操作系统',
          key: 'platform'
        },
        {
          title: '浏览器',
          key: 'browser'
        },
        {
          title: '语言',
          key: 'language'
        }
      ],
      data: [],
      currentPage: 1,
      totalPage: 3,
      search: {
        time: [],
        page: 1,
        maxcount: 13,
        membername: 'all',
        searchkey: '',
        logstype: 'userlogin',
        searchtype: ''
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取列表数据
    async getData () {
      let queryUrl = `/${this.search.logstype}/${this.search.page}/?`
      if (this.search.maxcount) queryUrl += `maxcount=${this.search.maxcount}`
      if (this.search.membername) queryUrl += `&membername=${this.search.membername}`
      if (this.search.stime) queryUrl += `&membername=${this.search.stime}`
      if (this.search.etime) queryUrl += `&membername=${this.search.etime}`
      if (this.search.searchkey) queryUrl += `&searchkey=${this.search.searchkey}`
      if (this.search.searchtype) queryUrl += `&searchkey=${this.search.searchtype}`
      let data = await getCode(queryUrl)
      this.data = data.LogsList.map(item => {
        item.created_at = new Date(item.created_at).FormatDefault()
        return item
      })
      let options = [{
        label: '所有账户',
        options: [{
          value: 'all',
          label: '008' }] },
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
      this.defaultTabs = [this.search.state]
      this.currentPage = this.search.page
      this.totalPage = data.TotalPage
      this.data = data.LogsList.map(item => {
        if (this.search.state === 'on') {
          item.t_type = 'danger'
          item.t_text = '禁用'
        } else {
          item.t_text = '启用'
        }
        return item
      })
      this.data.unshift({
        type: 'whatsapp',
        isshare: '组内共享',
        t_text: '新增',
        t_type: 'primary'
      })
    },
    tableDataChange (data, value) {
      if (!data.id) return
      this.editData(data, value)
    },
    // 点击切换tab
    async handleTabClick (value) {
      this.search.logstype = value.Tabs[0]
      // tab切换 判断表头改变
      switch (this.search.logstype) {
        case 'goods':
          this.columns[3].key = 'goods'
          this.columns[3].title = '商品ID'
          break
        case 'order':
          this.columns[3].key = 'order'
          this.columns[3].title = '商品ID'
          this.columns[7].key = 'before'
          this.columns[7].title = '修改前'
          this.columns[8].key = 'after'
          this.columns[8].title = '修改后'
          break
        case 'site':
          this.columns[3].key = 'site'
          this.columns[3].title = '网站ID'
          this.columns[7].key = 'before'
          this.columns[7].title = '修改前'
          this.columns[8].key = 'after'
          this.columns[8].title = '修改后'
          this.columns.splice(9, 2)
          break
        case 'user':
          this.columns[8].key = 'after'
          this.columns[8].title = '修改后'
          this.columns.splice(9, 2)
          break
        case 'sys':
          this.columns[8].key = 'after'
          this.columns[8].title = '修改后'
          this.columns.splice(9, 2)
          break
        default :
          this.columns[3].key = 'loginret'
          this.columns[3].title = '登录结果'
      }
      this.search.page = value.page || 1
      this.search.membername = value.defaultOption
      this.search.searchkey = value.input
      await this.getData()
    },
    // 搜索
    async handleSearch (value) {
      this.search.state = value.Tabs[0]
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
    .el-date-editor .el-range-separator{
    width: 20% !important;
    }
</style>
