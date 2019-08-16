<template>
  <el-dialog :visible.sync="onlineShow" title="选择在线客服"  width="35%" :before-close="closeOnline">
    <el-table
      size="small"
      :data="onlineList"
      height="380px"
      @row-click="selectOnline"
      :row-class-name="tableRowClassName"
      style="width: 100%">
      <el-table-column
        align="center"
        header-align="center"
        prop="name"
        label="在线客服名称">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="chaport_id"
        label="在线客服ID">
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
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'selectOnlineService',
  props: {
    selectOnlineShow: {
      type: Boolean
    },
    onlineList: {
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
    closeOnline () {
      this.$emit('closeOnline')
    },
    selectOnline (row) {
      this.$emit('selectOnline', row)
    },
    tableRowClassName ({ row }) {
      if (row.name === this.addGoods.Goods.chaport_name) {
        return 'select_row'
      }
      return ''
    }
  },
  computed: {
    onlineShow () {
      return this.selectOnlineShow
    }
  },
  watch: {}
}
</script>

<style scoped>

</style>
