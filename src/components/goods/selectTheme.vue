<template>
  <el-dialog title="选择模板" :visible.sync="themeShow" width="80%" custom-class="typePopup" :before-close="themeClose">
    <el-table
      height="700"
      :data="themeList"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        align="center"
        header-align="center"
        prop="name"
        label="名称"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="description"
        label="简介"
        width="400">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="User.nickname"
        label="预览">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="适配PC">
        <template slot-scope="scope">
          <span>{{scope.row.iswide==='是'?'PC+手机':'手机'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="color"
        label="支持换色"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        prop="desc"
        label="选择"
        width="180">
        <template slot-scope="scope">
          <el-button
            v-if="themeName===scope.row.name"
            size="mini"
            type="success">已选择</el-button>
          <el-button
            v-else
            size="mini"
            type="warning"
            @click="selectTheme(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'selectTheme',
  props: {
    selectThemeShow: {
      type: Boolean
    },
    themeList: {
      type: Array
    },
    addGoods: {
      type: Object
    }
  },
  data () {
    return {
      Goods: {},
      themeName: ''
    }
  },
  methods: {
    themeClose () {
      this.$emit('themeClose')
    },
    selectTheme (row) {
      this.themeName = row.name
      this.$emit('selectTheme', row)
    }
  },
  computed: {
    themeShow () {
      return this.selectThemeShow
    }
  },
  watch: {
    'addGoods' () {
      this.Goods = this.addGoods.Goods ? this.addGoods.Goods : {}
      this.themeName = this.addGoods.Goods ? this.addGoods.Goods.GoodsTheme.name : ''
    }
  }
}
</script>

<style scoped>

</style>
