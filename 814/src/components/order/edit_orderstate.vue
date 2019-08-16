<!--suppress ALL -->
<template>
    <el-dialog
            title="订单状态"
            :visible.sync="isshow"
            width="340px"
            center close-on-click-modal :before-close="beforeclose">
        <el-form ref="new_order" :model="new_order" label-width="70px">
            <el-form-item label="原状态">
                <el-input v-model="new_order.old_orderstate" readonly></el-input>
            </el-form-item>
            <el-form-item label="新状态">
                <el-select v-model="new_order.new_state" @change="orderstate_change">
                    <el-option value="new" label="待确认"></el-option>
                    <el-option value="waitsend" label="待发货"></el-option>
                    <el-option value="picking" label="配货中"></el-option>
                    <el-option value="sending" label="待收货"></el-option>
                    <el-option value="end" label="已完成"></el-option>
                    <el-option value="return" label="已退货"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="优先发货">
                <el-switch v-model="new_order.new_isfirst"></el-switch>
            </el-form-item>
            <el-form-item label="物流单号">
                <el-input v-model="new_order.new_expressnumber" :readonly="show_readonly"></el-input>
            </el-form-item>
            <el-form-item label="物流公司">
                <el-input v-model="new_order.new_expressname" :readonly="show_readonly"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button type="primary" @click="save_orderState">修改</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'edit_orderstate',
  props: {
    show_orderstate: {
      type: Boolean
    },
    editing_order: {
      type: Object
    },
    orderstates: {
      type: Array
    }
  },
  data () {
    return {
      new_order: {},
      show_readonly: true
    }
  },
  computed: {
    isshow () {
      return this.show_orderstate
    }
  },
  watch: {
    editing_order () {
      this.new_order = {
        old_orderstate: this.getStateStr(this.editing_order.orderstate),
        new_state: 'new',
        new_expressnumber: this.editing_order.OrderExpress ? this.editing_order.OrderExpress.expressnumber : '',
        new_expressname: this.editing_order.OrderExpress ? this.editing_order.OrderExpress.expressname : '',
        new_isfirst: this.editing_order.isfirst
      }
    }
  },
  methods: {
    getStateStr (state) {
      if (state) {
        for (var k in this.orderstates) {
          if (this.orderstates[k].value === state) {
            return this.orderstates[k].name
          }
        }
      }
    },
    save_orderState () {
      if (this.editing_order.payment !== 0 && !this.editing_order.OrderPayment) return this.$message.error('待付款订单不允许直接编辑！')
      if (this.editing_order.state === 0) return this.$message.error('无效订单不允许直接编辑！')
      this.$emit('save_orderState', this.new_order)
    },
    orderstate_change () {
      if ((this.new_order.new_state === 'sending') || (this.new_order.new_state === 'return')) {
        this.show_readonly = false
      } else {
        this.show_readonly = false
      }
    },
    beforeclose () {
      this.$emit('beforeclose')
    }
  }
}
</script>

<style scoped>

</style>
