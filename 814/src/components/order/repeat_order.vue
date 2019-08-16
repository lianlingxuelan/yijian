<template>
    <el-dialog title="重复订单" :visible.sync="isshow" width="1256px" center close-on-click-modal :before-close="beforeclose" class="repeat_order">
        <div class="main_order">
            <order-info repeat_order="repeat" :state="state" :CdnBase="CdnBase" :OrderList="repeat_order" :orderstates="orderstates"  @state_click="state_click"  @show_editState="show_editState"
                        @show_clientinfo="show_clientinfo" @show_expressinfo_popup="show_expressinfo_popup"
                        @show_goodsinfo_popup="show_goodsinfo_popup" @show_repeatorder="show_repeatorder"></order-info>
        </div>
        <el-tabs type="border-card" v-model="repeatType" @tab-click="tabClick">
            <el-tab-pane :label="'有效订单('+RepeatInfo.ValidCount+')'" name="valid">
                <order-info repeat_order="repeat" :state="state" :CdnBase="CdnBase" :OrderList="RepeatInfo.OrderList" :orderstates="orderstates" @state_click="state_click"  @show_editState="show_editState" @show_clientinfo="show_clientinfo"
                            @show_expressinfo_popup="show_expressinfo_popup" @show_goodsinfo_popup="show_goodsinfo_popup" @show_repeatorder="show_repeatorder"></order-info>
            </el-tab-pane>
            <el-tab-pane :label="'无效订单('+RepeatInfo.InvalidCount+')'" name="invalid">
                <order-info repeat_order="repeat" :state="state" :CdnBase="CdnBase" :OrderList="RepeatInfo.OrderList" :orderstates="orderstates" @state_click="state_click"  @show_editState="show_editState" @show_clientinfo="show_clientinfo"
                            @show_expressinfo_popup="show_expressinfo_popup" @show_goodsinfo_popup="show_goodsinfo_popup" @show_repeatorder="show_repeatorder"></order-info>
            </el-tab-pane>
        </el-tabs>
        <template slot="footer">
            <el-pagination v-if="repeatType==='invalid'" background layout="prev, pager, next,jumper" :page-size="pageSize" :total="RepeatInfo.InvalidCount" :current-page="RepeatInfo.Page"
                           @current-change="pageChange"></el-pagination>
            <el-pagination v-if="repeatType==='valid'" background layout="prev, pager, next,jumper" :page-size="pageSize" :total="RepeatInfo.ValidCount" :current-page="RepeatInfo.Page"
                           @current-change="pageChange"></el-pagination>
        </template>
    </el-dialog>
</template>

<script>
import OrderInfo from '@/components/order/orderInfo'
export default {
  name: 'repeat_order',
  components: {
    OrderInfo
  },
  props: {
    show_repeat: {
      type: Boolean
    },
    repeat_order: {
      type: Array
    },
    RepeatInfo: {
      type: Object
    },
    CdnBase: {
      type: String
    },
    orderstates: {
      type: Array
    },
    state: {
      type: String
    }
  },
  data () {
    return {
      repeatType: 'valid',
      pageSize: 15
    }
  },
  computed: {
    isshow () {
      return this.show_repeat
    }
  },
  methods: {
    beforeclose () {
      this.$emit('beforeclose')
    },
    tabClick () {
      if (this.repeatType === 'valid') {
        this.$emit('tabClick', {
          page: 1,
          repeattype: 1
        })
      } else {
        this.$emit('tabClick', {
          page: 1,
          repeattype: 0
        })
      }
    },
    pageChange (val) {
      if (this.repeatType === 'valid') {
        this.$emit('tabClick', {
          page: val,
          repeattype: 1
        })
      } else {
        this.$emit('tabClick', {
          page: val,
          repeattype: 0
        })
      }
    },
    state_click (order) {
      this.$emit('state_click', order)
    },
    //  编辑订单商品
    show_goodsinfo_popup (order) {
      this.$emit('show_goodsinfo_popup', order)
    },
    // 修改订单状态
    show_editState (order) {
      this.$emit('show_editState', order)
    },
    // 客户信息弹出框
    show_clientinfo (order) {
      this.$emit('show_clientinfo', order)
    },
    // 显示物流信息弹出框
    show_expressinfo_popup (order) {
      this.$emit('show_expressinfo_popup', order)
    },
    // 电话ip重复弹出框
    show_repeatorder (order) {
      this.$emit('show_repeatorder', order)
    }
  }
}
</script>

<style scoped>
    .main_order{
        max-height:300px;
        overflow: auto;
    }
    .repeat_order >>> .el-tabs__content{
        max-height:300px;
        overflow: auto;
    }
</style>
