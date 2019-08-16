<template>
  <el-dialog title="选择域名" :visible.sync="domainShow" :before-close="closeDomain">
    <el-table
      height="550"
      :data="DomainList"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      @row-click="selectDomain"
    >
      <el-table-column
        align="center"
        header-align="center"
        prop="name"
        label="域名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="desc"
        label="备注"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="User.nickname"
        sortable
        label="归属">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="sitecount"
        label="使用数">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'selectDomain',
  data () {
    return {}
  },
  props: {
    selectDomainShow: {
      type: Boolean
    },
    DomainList: {
      type: Array
    }
  },
  computed: {
    domainShow () {
      return this.selectDomainShow
    }
  },
  methods: {
    selectDomain (row) {
      this.$emit('selectDomain', row)
    },
    closeDomain () {
      this.$emit('closeDomain')
    }
  }
}
</script>

<style scoped>

</style>
