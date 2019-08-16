<template>
  <el-dialog title="选择分类" :visible.sync="typeShow" width="340px" custom-class="typePopup" :before-close="closeType">
    <el-form label-position="top" label-width="80px">
      <el-form-item label="一级分类">
        <el-select v-model="seleType1" placeholder="请选择"  @change="classtype1">
          <el-option
            v-for="item in types1"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="seleType2" placeholder="请选择"  @change="classtype2">
          <el-option
            v-for="item in types2"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
          <el-option
            key="无"
            label="无"
            value="无">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="seleType3" placeholder="请选择">
          <el-option
            v-for="item in types3"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
          <el-option
            key="无"
            label="无"
            value="无">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="selectCloseType">选 择</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'selectTypePopup',
  data () {
    return {
      Goods: {},
      types1: [],
      seleType1: '',
      seleType2: '',
      seleType3: ''
    }
  },
  props: {
    selectTypeShow: {
      type: Boolean
    },
    addGoods: {
      type: Object
    },
    types2: {
      type: Array
    },
    types3: {
      type: Array
    }
  },
  computed: {
    typeShow () {
      return this.selectTypeShow
    }
  },
  methods: {
    selectDomain (row) {
      this.$emit('selectDomain', row)
    },
    classtype1 () {
      this.$emit('classtype1', this.seleType1)
    },
    classtype2 () {
      this.$emit('classtype2', this.seleType2)
    },
    closeType () {
      this.seleType1 = this.addGoods.Goods.type1
      this.seleType2 = this.addGoods.Goods.type2
      this.seleType3 = this.addGoods.Goods.type3
      this.$emit('closeType')
    },
    selectCloseType () {
      this.$emit('selectCloseType', this.seleType1, this.seleType2, this.seleType3)
    }
  },
  watch: {
    'addGoods' () {
      this.Goods = this.addGoods.Goods ? this.addGoods.Goods : {}
      this.types1 = this.addGoods.types1
      this.seleType1 = this.addGoods.Goods ? this.addGoods.Goods.type1 : ''
      this.seleType2 = this.addGoods.Goods ? this.addGoods.Goods.type2 : ''
      this.seleType3 = this.addGoods.Goods ? this.addGoods.Goods.type3 : ''
    }
  }
}
</script>

<style scoped lang="less">
/deep/.typePopup{
  margin-top: 30vh !important;
  .el-dialog__body{
    padding-top: 5px;
  }
  .el-form-item__label{
    padding: 0;
  }
  .el-select{
    width: 100%;
  }
  .el-form-item{
    margin-bottom: 5px;
  }
}
</style>
