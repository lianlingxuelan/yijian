<template>
    <div id="search">
        <el-form :inline="true" :model="SearchContent" class="demo-form-inline">
            <el-form-item>
                <el-select v-model="SearchContent.MemberName" placeholder="请选择" @change="filter_membername">
                    <el-option-group label="所有账户">
                        <el-option value="all" label="不过滤"></el-option>
                        <el-option value="my" label="我自己"></el-option>
                    </el-option-group>
                    <el-option-group label="正常账户">
                        <el-option
                                v-for="item in memberList1"
                                :key="item.username"
                                :label="item.nickname"
                                :value="item.username">
                        </el-option>
                    </el-option-group>
                    <el-option-group label="停用账户">
                        <el-option
                                v-for="item in memberList2"
                                :key="item.username"
                                :label="item.nickname"
                                :value="item.username">
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请填写搜索关键字" v-model="SearchContent.Searchkey" class="input-with-select" clearable>
                    <el-select v-model="SearchContent.Searchtype" slot="prepend" class="select">
                        <el-option-group v-for="group in searchtypes" :key="group.name" :label="group.name">
                            <el-option v-for="item in group.options"
                                       :key="item.name"
                                       :label="item.name"
                                       :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                        v-model="SearchContent.time"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search_order">搜索订单</el-button>
                <el-button type="warning" v-if="state!=='invalid'" @click="exportOrder">订单导出</el-button>
                <el-button type="success" v-if="state!=='invalid'&&(UserInfo.role ==='管理员'|| UserInfo.role==='客服' ||  UserInfo.role==='采购'|| UserInfo.role==='财务')" @click="batchUpdateState">批量更改订单状态</el-button>
            </el-form-item>
        </el-form>
        <el-tabs type="border-card" v-model="SearchContent.Area" @tab-click="handleClick" class="areas">
            <el-tab-pane v-for="item in areaList"  :key="item.value" :label="item.name" :name="item.value"></el-tab-pane>
        </el-tabs>
        <el-tabs type="border-card" v-model="SearchContent.OrderState" @tab-click="handleClick">
            <el-tab-pane v-for="item in orderstates"  :key="item.value" :label="item.name" :name="item.value">
                共 {{TotalCount}} 个订单，金额 {{TotalPrice}}
            </el-tab-pane>
        </el-tabs>
    </div>

</template>
<script>
export default {
  name: 'search',
  props: {
    state: {
      type: String
    },
    MemberList: {
      type: Array
    },
    searchtypes: {
      type: Array
    },
    areaList: {
      type: Array
    },
    orderstates: {
      type: Array
    },
    SearchContent: {
      type: Object
    },
    pickerOptions: {
      type: Object
    },
    TotalCount: {
      type: Number
    },
    TotalPrice: {
      type: Number
    }
  },
  data () {
    return {
      UserInfo: JSON.parse(localStorage.getItem('userinfo'))
    }
  },
  computed: {
    memberList1 () {
      return this.MemberList.filter((item) => {
        return item.state === '正常'
      })
    },
    memberList2 () {
      return this.MemberList.filter((item) => {
        return item.state === '停用'
      })
    }
  },
  methods: {
    search_order () {
      this.$emit('search_order')
    },
    filter_membername () {
      this.$emit('search_order')
    },
    handleClick () {
      this.$emit('search_order')
    },
    exportOrder () {
      this.$emit('exportOrder')
    },
    batchUpdateState () {
      this.$emit('batchUpdateState')
    }
  }
}
</script>

<style scoped>
    #search /deep/ .areas.el-tabs--border-card>.el-tabs__content {
        padding: 0;
    }
    #search /deep/ .areas.el-tabs--border-card>.el-tabs__header {
        border-bottom: 0;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    #search /deep/ .select  {
        width: 130px;
    }
</style>
