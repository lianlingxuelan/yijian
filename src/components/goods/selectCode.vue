<template>
    <el-dialog :visible.sync="codeShow" center width="55%" :before-close="closeCode">
        <span slot="title">共{{codeLength}}代码</span>
        <el-input v-model="searchCode" placeholder="搜索代码"></el-input>
        <el-table
            :data="list"
            height="580px"
            border
            style="width: 100%">
            <el-table-column
                align="center"
                header-align="center"
                prop="name"
                label="名称"
                width="480">
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                label="代码类型">
                <template slot-scope="scope"><span>{{getTypeStr (scope.row.type)}}</span></template>
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                label="区域">
                <template slot-scope="scope"><span>{{getAreaStr (scope.row.area)}}</span></template>
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                prop="User.nickname"
                label="优化师">
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                label="选择">
                <template slot-scope="scope">
                    <el-button
                        v-if="selectIndeof(scope.row.id)"
                        @click="unSelectCode(scope.row)"
                        size="mini"
                        type="success">已选择
                    </el-button>
                    <el-button
                        v-else
                        size="mini"
                        type="warning"
                        @click="selectCode(scope.row)">使用
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
export default {
  name: 'selectCode',
  props: {
    selectCodeShow: {
      type: Boolean
    },
    codeList: {
      type: Array
    },
    addGoods: {
      type: Object
    }
  },
  data () {
    return {
      searchCode: '',
      selectCodeList: [],
      list: []
    }
  },
  methods: {
    closeCode () {
      this.$emit('closeCode')
    },
    selectCode (row) {
      this.$emit('selectCode', row)
    },
    unSelectCode (row) {
      this.$emit('unSelectCode', row)
    },
    getTypeStr (id) {
      for (let item of this.$Res.types) {
        if (item.value === id) {
          return item.name
        }
      }
    },
    selectIndeof (id) {
      if (this.selectCodeList.indexOf(id) > -1) {
        return true
      } else {
        return false
      }
    },
    getAreaStr (id) {
      for (let item in this.$Res.areas) {
        if (item.value === id) {
          return item.name
        }
      }
    }
  },
  computed: {
    codeShow () {
      return this.selectCodeShow
    },
    codeLength () {
      // this.list = this.codeList
      return this.codeList.length
    }
  },
  watch: {
    'addGoods.adcodelist' () {
      this.selectCodeList = []
      this.addGoods.adcodelist.map(item => {
        this.selectCodeList.push(item.id)
      })
    },
    'addGoods.othercodelist' () {
      this.selectCodeList = []
      this.addGoods.othercodelist.map(item => {
        this.selectCodeList.push(item.id)
      })
    },
    'searchCode' () {
      let arr = []
      if (this.searchCode.length > 0) {
        for (let item of this.list) {
          if (item.name.indexOf(this.searchCode) >= 0) {
            arr.push(item)
          }
        }
        this.list = arr
      } else {
        this.list = this.codeList
      }
    }
  }
}
</script>

<style scoped>

</style>
