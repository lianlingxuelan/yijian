<template>
  <div id="m-table">
    <d2-container>
      <template slot="header">
        <div class="search">
          <el-select
                  v-if="(Object.keys(options).length !== 0)"
                  class="m-table-select"
                  v-model="option"
                  placeholder="请选择">
            <el-option-group
                    v-for="group in options"
                    :key="group.label"
                    :label="group.label">
              <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
          <slot name="orderselect"></slot>
          <el-input
                  class="m-table-input"
                  v-if="isShowSearch"
                  v-model="input"
                  placeholder="请输入内容"
                  @keyup.enter.native="handleSearch"
                  clearable>
          </el-input>
          <slot name="date"></slot>
          <el-button
                  class="m-table-button"
                  type="primary"
                  icon="el-icon-search"
                  @click="handleSearch">
            搜索
          </el-button>
        </div>
      </template>
      <div class="tabs">
        <template
                v-for="(subTab, index) in tabs">
          <el-tabs
                  :key="`subTab_${index}`"
                  v-model="Tabs[index]"
                  type="card"
                  @tab-click="handleTabClick">
            <template
                    v-for="(tabItem, index2) in subTab">
              <el-tab-pane
                      :key="`tabItem${index2}`"
                      :label="tabItem.label"
                      :name="tabItem.value">
              </el-tab-pane>
            </template>
          </el-tabs>
        </template>
      </div>
      <div class="table">
        <d2-crud
                :columns="columns"
                :data="data"
                @cell-data-change="handleCellDataChange">
        </d2-crud>
      </div>
      <template slot="footer" v-if="isShowPage">
        <el-pagination
                v-if="isShowPage"
                background
                layout="prev, pager, next"
                :current-page="page"
                :page-count="totalPage"
                @current-change="handleCurrentChange">
        </el-pagination>
      </template>

    </d2-container>
  </div>
</template>

<script>
export default {
  name: 'm-table',
  data () {
    return {
      option: this.defaultOption ? this.defaultOption : '',
      input: '',
      page: this.currentPage ? this.currentPage : 1
    }
  },
  computed: {
    Tabs () {
      return this.tabs.map((item, index) => {
        if (!this.defaultTabs[index]) return item[0].value
        return this.defaultTabs[index]
      })
    }
  },
  props: {
    isShowSearch: {
      type: Boolean,
      default: true
    },
    isShowPage: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
    },
    tabs: {
      type: Array,
      require: true
    },
    defaultOption: {
      type: String,
      default: () => ''
    },
    defaultInput: {
      type: String,
      default: () => ''
    },
    defaultTabs: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      require: true
    },
    data: {
      type: Array,
      require: true
    },
    currentPage: {
      type: Number,
      default: 0
    },
    totalPage: {
      type: Number,
      require: true
    }
  },
  created () {
  },
  methods: {
    getSearchKey () {
      return {
        defaultOption: this.option,
        input: this.input,
        Tabs: this.Tabs
      }
    },
    handleSearch () {
      this.$emit('handleSearch', this.getSearchKey())
    },
    handleTabClick () {
      this.$emit('handleSearch', this.getSearchKey())
    },
    handleCellDataChange ({ key, value, row }) {
      this.$emit('tableDataChange', row, { [key]: value })
    },
    handleCurrentChange (page) {
      this.page = page
      this.$emit('handleSearch', Object.assign(this.getSearchKey(), { page }))
    }
  }
}
</script>

<style lang="less" scoped>
  #m-table {
    .search {
      .el-input {
        width: 400px;
      }
    }
  }
  .tabs /deep/ .el-tabs__header {
    margin: 0;
  }
  .table /deep/ .cell {
    text-align: center;
  }
  .table /deep/ .el-table td, .el-table th {
    padding: 1px 0;
  }
  .m-table-select  /deep/ .el-input__inner {
    border-top-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 5px;
  }
  .m-table-input  /deep/ .el-input__inner {
    border-radius: 0;
  }
  .m-table-button {
    border-top-left-radius: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 0;
  }
  .m-table-input {
    margin: 0 -2px;
  }
</style>
