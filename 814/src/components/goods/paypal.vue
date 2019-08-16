<template>
  <div class="add_paypal" :key="menuKey">
    <el-form label-width="100px">
      <el-form-item label="选择paypal">
        <el-input
          size="medium"
          :disabled="true"
          v-model="paypal.name"
         >
          <template slot="append"><el-button type="success" size="small" @click="showPaypal()">选择paypal</el-button></template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'paypal',
  data () {
    return {
      Goods: {},
      menuKey: 1,
      paypal: {}
    }
  },
  props: {
    addGoods: {
      type: Object
    }
  },
  methods: {
    showPaypal () {
      this.$emit('showPaypal')
    }
  },
  watch: {
    'addGoods' () {
      this.Goods = this.addGoods.Goods ? this.addGoods.Goods : {}
      this.paypal.name = this.Goods.Paypal ? this.Goods.Paypal.name : ''
      ++this.menuKey
    }
  }
}
</script>

<style scoped lang="less">
  .add_paypal {
    /deep/.el-input-group__append{
      color: #FFF;
      background-color: #67C23A;
      border-color: #67C23A;
    }
  }
</style>
