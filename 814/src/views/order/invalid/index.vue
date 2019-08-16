<template>
  <diV>
    <d2-container class="valid">
      <template slot="header">
        <Search :state="state" :MemberList="MemberList" :pickerOptions="pickerOptions" :TotalCount="TotalCount" :TotalPrice="TotalPrice" :orderstates="orderstates" :SearchContent="SearchContent" :areaList="areaList" :searchtypes="searchtypes" @search_order="search_order"/>
      </template>
      <order-info :state="state" :OrderList="OrderList" :orderstates="orderstates" :searchtypes="searchtypes" :CdnBase="CdnBase" :screen_skip="screen_skip"
                  @state_click="state_click"   @show_clientinfo="show_clientinfo"  @set_normal="set_normal"
                  @add_blackinfo="add_blackinfo" @show_expressinfo_popup="show_expressinfo_popup"  @show_repeatorder="show_repeatorder"/>
      <template slot="footer">
        <el-pagination background layout="prev, pager, next,jumper" :page-size="pageSize" :total="TotalCount" :current-page="SearchContent.page"
                       @current-change="currentChange"></el-pagination>
      </template>
    </d2-container>
    <!--客户信息弹出框-->
    <edit-clientinfo :show_client="show_client" :editing_order="editing_order" @beforeclose="beforeclose"></edit-clientinfo>
    <!--物流信息弹出框-->
    <edit-expressinfo :show_expressinfo="show_expressinfo" :editing_order="editing_order"  @beforeclose="beforeclose" @update_expressinfo="update_expressinfo"
                      @go_express_website="go_express_website" @end_order="end_order"></edit-expressinfo>
    <el-dialog  title="官网查询" :visible.sync="showiframe" center width="650px">
      <div  id="completeDiv" >
        <iframe :src="iframe" height="530" width="600"></iframe>
      </div>
    </el-dialog>
    <!--重复订单弹出框-->
    <repeat-order :state="state" :show_repeat="show_repeat" :repeat_order="repeat_order" :RepeatInfo="RepeatInfo" @beforeclose="beforeclose" :CdnBase="CdnBase" :orderstates="orderstates"
                   @tabClick="tabClick" :screen_skip="screen_skip" @state_click="state_click"   @show_clientinfo="show_clientinfo"
                  @show_expressinfo_popup="show_expressinfo_popup"  @show_repeatorder="show_repeatorder"></repeat-order>
  </diV>
</template>
<script>
import Search from '@/components/order/search'
import orderApi from '@/api/order'
import OrderInfo from '@/components/order/orderInfo'
import Res from '@/assets/js/application'
import EditClientinfo from '@/components/order/edit_clientinfo'
import EditExpressinfo from '@/components/order/edit_expressinfo'
import RepeatOrder from '@/components/order/repeat_order'
export default {
  name: 'invalid',
  components: {
    EditClientinfo,
    EditExpressinfo,
    RepeatOrder,
    OrderInfo,
    Search
  },
  data () {
    return {
      state: 'invalid',
      MemberList: [],
      CdnBase: '',
      OrderList: [],
      screen_skip: 1,
      searchtypes: Res.searchtypes,
      areaList: Res.moneys,
      orderstates: Res.orderstates,
      pickerOptions: Res.pickerOptions,
      editing_order: {},
      show_client: false,
      show_expressinfo: false,
      iframe: '',
      showiframe: false,
      show_goodsinfo: false,
      edit_orderprice: 0,
      edit_goodslist: [],
      TotalCount: 0,
      TotalPrice: 0,
      pageSize: 10,
      // currentPage: 1,
      SearchContent: {
        MemberName: 'all',
        Searchtype: 'orderid',
        Searchkey: '',
        time: [],
        Area: 'all',
        OrderState: 'all',
        maxcount: 12,
        page: 1
      },
      RepeatInfo: { OrderList: [] },
      show_repeat: false,
      repeat_order: []
    }
  },
  mounted () {
    this.getOrder()
  },
  methods: {
    async getOrder (data) {
      let ret = await orderApi.getOrder(this.state, data)
      this.MemberList = ret.MemberList
      this.CdnBase = ret.CdnBase
      this.OrderList = ret.OrderList
      this.screen_skip = ret.screen_skip
      this.TotalCount = ret.TotalCount
      this.TotalPrice = ret.TotalPrice
      this.SearchContent.page = ret.Page
      if (this.OrderList) {
        for (let order of this.OrderList) {
          if (order.OrderExpress && order.OrderExpress.expressinfo) {
            order.OrderExpress.expressinfo = JSON.parse(order.OrderExpress.expressinfo)
          }
        }
      }
    },
    // 页码跳转
    currentChange (val) {
      this.SearchContent.page = val
      this.getOrder(this.SearchContent)
    },
    search_order () {
      this.getOrder(this.SearchContent)
    },
    state_click (order) {
      this.confirm(order)
    },
    async confirm (order) {
      let data = await orderApi.confirm(order.orderid)
      if (!data.Error) {
        order.orderstate = 'waitsend'
        order.confirmetime = data.confirmetime
      }
    },
    // 弹框关闭前回调
    beforeclose () {
      this.show_client = false
      this.show_expressinfo = false
      this.show_goodsinfo = false
      this.show_repeat = false
    },
    show_clientinfo (order) {
      this.editing_order = order
      this.show_client = true
    },
    async set_normal (order) {
      let data = await orderApi.set_normal(order.orderid)
      if (!data.Error) {
        this.$message.success(data.Info)
        this.getOrder()
      }
    },
    async add_blackinfo (data) {
      let params = {
        black_reason: data.value,
        phone: data.order.clientphone,
        ip: data.order.clientip
      }
      let ret = await orderApi.add_blackinfo(params)
      this.$message(ret.Info)
      if (!ret.Error) {
        this.getOrder()
      }
    },
    async updateMessage (order) {
      let data = await orderApi.updateMessage(order)
      if (!data.Error) {
        this.getOrder()
      }
    },
    async batchUpdateMessage () {
      let orderlist = []
      for (let order of this.OrderList) {
        orderlist.push(order.orderid)
      }
      let data = await orderApi.batchUpdateMessage(orderlist)
      this.$message.success(data.Info)
      if (!data.Error) {
        this.getOrder()
      }
    },
    show_expressinfo_popup (order) {
      this.editing_order = order
      this.show_expressinfo = true
    },
    async update_expressinfo () {
      let data = await orderApi.update_expressinfo(this.editing_order.orderid)
      if (!data.Error) {
        this.$message.success(data.Info)
        this.editing_order.OrderExpress.expressinfo = data.ExpressInfo
      }
    },
    go_express_website () {
      let that = this
      setTimeout(function () {
        if (that.editing_order.OrderExpress.expressname.indexOf('XZ') >= 0) {
          that.iframe = 'https://www.hct.com.tw/Search/SearchGoods_n.aspx'
        }
        if (that.editing_order.OrderExpress.expressname.indexOf('SF') >= 0 || that.editing_order.OrderExpress.expressname === 'XHKF') {
          that.iframe = 'http://www.sf-express.com/mobile/cn/sc/dynamic_function/waybill/waybill_query_by_billno.html'
        }
        if (that.editing_order.OrderExpress.expressname.indexOf('HM') >= 0) {
          that.iframe = 'https://www.trackingmore.com/t-cat-tracking/cn.html?number=' + that.editing_order.OrderExpress.expressnumber
        }
        if (that.editing_order.OrderExpress.expressname.indexOf('TMDHL') >= 0) {
          that.iframe = 'https://www.trackingmore.com/dhlglobalmail-tracking/cn.html?number=' + that.editing_order.OrderExpress.expressnumber
        }
        if (that.editing_order.OrderExpress.expressname.indexOf('JL') >= 0) {
          that.iframe = 'https://www.trackingmore.com/kerry-logistics-tracking/cn.html?number=' + that.editing_order.OrderExpress.expressnumber
        }
        if (that.editing_order.OrderExpress.expressname.indexOf('ninjavan') >= 0) {
          that.iframe = 'https://www.trackingmore.com/' + that.editing_order.OrderExpress.expressname + '-tracking/cn.html?number=' + that.editing_order.OrderExpress.expressnumber
        }
        that.showiframe = true
      }, 500)
    },
    async end_order () {
      let data = await orderApi.edit_orderState(this.editing_order.orderid, { orderstate: 'end' })
      this.$message(data.Info)
      if (!data.Error) {
        this.editing_order.orderstate = 'end'
      }
    },
    async show_repeatorder (order) {
      this.editing_order = order
      this.repeat_order = []
      this.repeat_order.push(order)
      this.tabClick()
      this.show_repeat = true
    },
    async tabClick (params) {
      if (!params) params = { repeattype: 1, page: 1 }
      let info = {
        repeatid: this.editing_order.isrepeat,
        orderid: this.editing_order.orderid,
        clientname: this.editing_order.clientname,
        clientphone: this.editing_order.clientphone,
        clientip: this.editing_order.clientip,
        page: params.page
      }
      let data = await orderApi.get_repeatorderlist(params.repeattype, info)
      if (data.Error) return this.$message.error(data.Info)
      this.RepeatInfo = data
    }
  }
}
</script>
<style scoped>
  .valid /deep/ .el-date-editor .el-range-separator {
    width: 6%;
  }
</style>
