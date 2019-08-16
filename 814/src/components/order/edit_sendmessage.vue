<template>
    <el-dialog title="短信发送" :visible.sync="isshow" width="850px" center close-on-click-modal :before-close="beforeclose">
        <el-input placeholder="请输入手机号码" v-model="phone">
            <template slot="prepend">手机号码</template>
        </el-input>
        <el-select
                :style="{width: '100%', 'margin-top': '10px'}"
                @change="change"
                v-model="defaultMessage">
            <el-option-group
                    v-for="group in selectList"
                    :key="group.label"
                    :label="group.label">
                <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-option-group>
        </el-select>
        <el-input
                readonly
                :style="{'margin-top': '10px'}"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                @click="sendMessage"
                v-model="message"/>
        <div slot="footer">
            <el-button type="primary" @click="sendMessage">发送</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Api from '@api/order'
export default {
  data () {
    return {
      defaultSMSList: [],
      selectList: [],
      defaultMessage: 0,
      message: '',
      phone: '',
      orderid: ''
    }
  },
  props: {
    show_msg: {
      type: Boolean
    },
    order: {
      type: Object,
      required: true
    }
  },
  watch: {
    order (val) {
      this.phone = val.clientphone
      this.orderid = val.orderid
    }
  },
  computed: {
    isshow () {
      return this.show_msg
    }
  },
  created () {
    this.getTemplate()
  },
  mounted () {
    this.phone = this.order.clientphone
    this.orderid = this.order.orderid
  },
  methods: {
    async getTemplate () {
      let res = await Api.getSMSTemplate()
      let SMSList = [
        {
          label: '其它',
          options: []
        },
        {
          label: '第一次发送',
          options: []
        },
        {
          label: '第二次发送',
          options: []
        }
      ]
      res.SMSList.forEach((item, index) => {
        SMSList[item.mark].options.push({
          label: item.content,
          value: index
        })
      })
      this.defaultSMSList = res.SMSList
      this.message = this.defaultSMSList[this.defaultMessage].content
      this.selectList = SMSList
    },
    beforeclose () {
      this.$emit('beforeclose')
    },
    async sendMessage () {
      let res = await Api.sendSMS({
        smsList: {
          phone: this.phone,
          template: this.message,
          orderid: this.orderid
        }
      })
      if (!res.Error) {
        this.$message({
          message: res.Info,
          type: 'success'
        })
      } else if (res.Info) {
        this.$message({
          message: res.Info,
          type: 'error'
        })
      }
    },
    change (value) {
      this.message = this.defaultSMSList[value].content
    }
  }
}
</script>

<style scoped>

</style>
