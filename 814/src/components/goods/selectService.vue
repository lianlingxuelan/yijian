<template>
  <el-dialog :visible.sync="serviceShow"  width="35%" :before-close="closeService" title="选择客服">
    <el-table
      size="small"
      ref="singleTable"
      highlight-current-row
      :data="serviceList"
      @row-click="selectServices"
      :row-class-name="tableRowClassName"
      height="380px"
      style="width: 100%">
      <el-table-column
        align="center"
        header-align="center"
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="desc"
        label="备注">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="User.nickname"
        label="归属">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="value"
        width="150"
        label="链接">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'selectService',
  props: {
    selectServiceShow: {
      type: Boolean
    },
    serviceList: {
      type: Array
    },
    addGoods: {
      type: Object
    },
    serviceType: {
      type: String
    }
  },
  data () {
    return {
      searchCode: '',
      selectCodeList: []
    }
  },
  methods: {
    closeService () {
      this.$emit('closeService')
    },
    selectServices (row) {
      this.$emit('selectServices', row)
    },
    tableRowClassName (row) {
      if (this.serviceType === 'facebook') {
        if (row.value === this.addGoods.Goods.fblink) {
          return 'select_row'
        }
      } else if (this.serviceType === 'line') {
        if (row.value === this.addGoods.Goods.linelink) {
          return 'select_row'
        }
      } else if (this.serviceType === 'whatsapp') {
        if (row.value === this.addGoods.Goods.whatsapplink) {
          return 'select_row'
        }
      }
      return ''
    }
  },
  computed: {
    serviceShow () {
      return this.selectServiceShow
    }
  }
}
</script>

<style>

</style>
