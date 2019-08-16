<template>
    <el-dialog title="客户信息" :visible.sync="isshow" width="340px" center close-on-click-modal :before-close="beforeclose">
        <el-form ref="client" :model="client" label-width="80px" label-position="left">
            <el-form-item label="收货人">
                <el-input v-model="client.clientname"></el-input>
            </el-form-item>
            <el-form-item label="E-mail">
                <el-input v-model="client.clientemail"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="client.clientphone"></el-input>
            </el-form-item>
            <el-form-item label="收货地址">
                <el-input v-model="client.clientaddress"></el-input>
            </el-form-item>
            <el-form-item label="邮编">
                <el-input v-model="client.clientzipcode"></el-input>
            </el-form-item>
            <el-form-item label="送货时间">
                <el-select v-model="client.clientdispatchtime">
                    <el-option value="任何时间">任何时间</el-option>
                    <el-option value="工作日">工作日</el-option>
                    <el-option value="休息日">休息日</el-option>
                    <el-option value="其他时间">其他时间（请备注）</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户备注">
                <el-input v-model="client.clientotherinfo"></el-input>
            </el-form-item>
            <el-form-item label="订单备注">
                <el-input v-model="client.remarks"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button type="primary" @click="save_clientinfo">修改</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'edit_clientinfo',
  props: {
    show_client: {
      type: Boolean
    },
    editing_order: {
      type: Object
    }
  },
  data () {
    return {
      client: {}
    }
  },
  computed: {
    isshow () {
      return this.show_client
    }
  },
  watch: {
    editing_order () {
      this.client = {
        clientname: this.editing_order.clientname,
        clientemail: this.editing_order.clientemail,
        clientphone: this.editing_order.clientphone,
        clientaddress: this.editing_order.clientaddress,
        clientdispatchtime: this.editing_order.clientdispatchtime,
        clientotherinfo: this.editing_order.clientotherinfo,
        clientzipcode: this.editing_order.clientzipcode,
        remarks: this.editing_order.remarks
      }
    }
  },
  methods: {
    beforeclose () {
      this.$emit('beforeclose')
    },
    save_clientinfo () {
      if (this.editing_order.state === 0) return this.$message.error('无效订单不允许直接编辑！')
      if (!this.client.clientotherinfo) this.client.clientotherinfo = ''
      if (!this.client.remarks) this.client.remarks = ''
      if (!this.client.clientzipcode) this.client.clientzipcode = ''
      this.$emit('save_clientinfo', this.client)
    }
  }
}
</script>

<style scoped>

</style>
