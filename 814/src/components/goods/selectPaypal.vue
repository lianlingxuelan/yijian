<template>
  <el-dialog :visible.sync="paypalShow" title="选择Paypal"  width="35%" :before-close="closePaypal">
    <el-table
      :data="paypalList"
      height="380px"
      @row-click="selectPaypal"
      :row-class-name="tableRowClassName"
      style="width: 100%">
      <el-table-column
        align="center"
        header-align="center"
        prop="name"
        label="paypal名称">
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
        prop="paycode"
        label="paypal代码">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'selectPaypal',
  props: {
    selectPaypalShow: {
      type: Boolean
    },
    paypalList: {
      type: Array
    },
    addGoods: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  methods: {
    closePaypal () {
      this.$emit('closePaypal')
    },
    selectPaypal (row) {
      this.$emit('selectPaypal', row)
    },
    tableRowClassName ({ row }) {
      if (row.value === this.addGoods.Goods.Paypal.name) {
        return 'select_row'
      }
      return ''
    }
  },
  computed: {
    paypalShow () {
      return this.selectPaypalShow
    }
  },
  watch: {}
}
</script>

<style scoped>

</style>
