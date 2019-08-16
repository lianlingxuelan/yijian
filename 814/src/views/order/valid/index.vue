<template>
  <diV>
    <d2-container class="valid">
      <template slot="header">
        <Search :state="state" :MemberList="MemberList" :pickerOptions="pickerOptions" :TotalCount="TotalCount" :TotalPrice="TotalPrice" :orderstates="orderstates"
                :SearchContent="SearchContent" :areaList="areaList" :searchtypes="searchtypes" @search_order="search_order" @exportOrder="exportOrder" @batchUpdateState="batchUpdateState"/>
      </template>
      <order-info :state="state" :OrderList="OrderList" :orderstates="orderstates" :searchtypes="searchtypes" :CdnBase="CdnBase" :screen_skip="screen_skip"
                  @state_click="state_click"  @show_editState="show_editState" @show_clientinfo="show_clientinfo" @show_message="show_message" @confirm="confirm" @set_invalid="set_invalid"
                  @add_blackinfo="add_blackinfo" @updateMessage="updateMessage" @batchUpdateMessage="batchUpdateMessage"
                  @show_expressinfo_popup="show_expressinfo_popup" @show_goodsinfo_popup="show_goodsinfo_popup" @show_repeatorder="show_repeatorder"/>
      <template slot="footer">
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :page-size="pageSize"  :total="TotalCount" :current-page="SearchContent.page"
                       @current-change="currentChange" @size-change="handleSizeChange"></el-pagination>
      </template>
    </d2-container>
    <!--订单状态修改弹出框-->
    <edit-order-state :show_orderstate="show_orderstate" :editing_order="editing_order" :orderstates="orderstates" @beforeclose="beforeclose" @save_orderState="save_orderState"/>
    <!--客户信息弹出框-->
    <edit-clientinfo :show_client="show_client" :editing_order="editing_order" @beforeclose="beforeclose" @save_clientinfo="save_clientinfo"></edit-clientinfo>
    <!--短信发送弹出框-->
    <edit-sendmessage :show_msg="show_msg" :order="order"  @beforeclose="beforeclose"></edit-sendmessage>
    <!--物流信息弹出框-->
    <edit-expressinfo :show_expressinfo="show_expressinfo" :editing_order="editing_order"  @beforeclose="beforeclose" @update_expressinfo="update_expressinfo"
                      @go_express_website="go_express_website" @end_order="end_order" @save_expressinfo="save_expressinfo"></edit-expressinfo>
    <el-dialog  title="官网查询" :visible.sync="showiframe" center width="650px">
      <div  id="completeDiv" >
        <iframe :src="iframe" height="530" width="600"></iframe>
      </div>
    </el-dialog>
    <!--订单商品编辑弹出框-->
    <edit-goodsinfo :show_goodsinfo="show_goodsinfo" :edit_goodslist="edit_goodslist" :edit_orderprice="edit_orderprice" :CdnBase="CdnBase" @beforeclose="beforeclose"
                    @select_spec="select_spec" @select_option1="select_option1"
                    @select_option2="select_option2" @calc_price="calc_price"
                    @del_spec="del_spec" @add_spec="add_spec" @edit_price="edit_price" @save_goodsinfo="save_goodsinfo"></edit-goodsinfo>
    <!--重复订单弹出框-->
    <repeat-order :state="state" :show_repeat="show_repeat" :repeat_order="repeat_order" :RepeatInfo="RepeatInfo" @beforeclose="beforeclose" :CdnBase="CdnBase" :orderstates="orderstates"
                  @tabClick="tabClick" :screen_skip="screen_skip" @state_click="state_click"  @show_editState="show_editState" @show_clientinfo="show_clientinfo"
                  @show_expressinfo_popup="show_expressinfo_popup" @show_goodsinfo_popup="show_goodsinfo_popup" @show_repeatorder="show_repeatorder"></repeat-order>
    <!--批量更改订单状态弹出框-->
    <el-dialog title="导入订单状态" :visible.sync="showBatchDialog" width="450px"  >
      <el-form  :model="importOrder" label-position="top">
        <el-form-item label="订单状态">
         <el-select v-model="importOrder.state" placeholder="请选择目的订单状态">
           <el-option value="new" label="待确认"></el-option>
           <el-option value="waitsend" label="待发货"></el-option>
           <el-option value="picking" label="配货中"></el-option>
           <el-option value="sending" label="待收货"></el-option>
           <el-option value="end" label="已完成"></el-option>
           <el-option value="return" label="已退货"></el-option>
         </el-select>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input type="textarea" v-model="importOrder.orderid" placeholder="请粘贴表格中的订单号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showBatchDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveBatchUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </diV>
</template>
<script>
import Search from '@/components/order/search'
import orderApi from '@/api/order'
import OrderInfo from '@/components/order/orderInfo'
import Res from '@/assets/js/application'
import EditOrderState from '@/components/order/edit_orderstate'
import EditClientinfo from '@/components/order/edit_clientinfo'
import EditExpressinfo from '@/components/order/edit_expressinfo'
import EditGoodsinfo from '@/components/order/edit_goodsinfo'
import EditSendmessage from '@/components/order/edit_sendmessage'
import RepeatOrder from '@/components/order/repeat_order'
export default {
  name: 'valid',
  components: {
    EditSendmessage,
    EditOrderState,
    EditClientinfo,
    EditExpressinfo,
    EditGoodsinfo,
    RepeatOrder,
    OrderInfo,
    Search
  },
  data () {
    return {
      order: {},
      state: 'valid',
      MemberList: [],
      CdnBase: '',
      OrderList: [],
      screen_skip: 1,
      searchtypes: Res.searchtypes,
      areaList: Res.moneys,
      orderstates: Res.orderstates,
      show_orderstate: false,
      pickerOptions: Res.pickerOptions,
      editing_order: {},
      show_client: false,
      show_msg: false,
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
        maxcount: 10,
        page: 1
      },
      RepeatInfo: { OrderList: [] },
      show_repeat: false,
      repeat_order: [],
      showBatchDialog: false,
      importOrder: {
        state: '',
        orderid: ''
      }
    }
  },
  mounted () {
    if (this.$route.query.orderstate) {
      this.SearchContent.OrderState = this.$route.query.orderstate
    }
    if (this.$route.query.membername) {
      this.SearchContent.MemberName = this.$route.query.membername
    }
    if (this.$route.query.stime && this.$route.query.etime) {
      this.SearchContent.time = [this.$route.query.stime, this.$route.query.etime]
    }
    this.getOrder()
  },
  methods: {
    async getOrder () {
      let ret = await orderApi.getOrder(this.state, this.SearchContent)
      this.MemberList = ret.MemberList
      this.CdnBase = ret.CdnBase
      this.OrderList = ret.OrderList
      this.screen_skip = ret.screen_skip
      this.TotalCount = ret.TotalCount
      this.TotalPrice = ret.TotalPrice
      this.SearchContent.page = ret.Page
      this.SearchContent.time = [ret.Stime, ret.Etime]
      this.SearchContent.Searchtype = ret.Searchtype
      this.SearchContent.Searchkey = ret.Searchkey
      if (this.OrderList) {
        for (let order of this.OrderList) {
          if (order.OrderExpress && order.OrderExpress.expressinfo) {
            order.OrderExpress.expressinfo = JSON.parse(order.OrderExpress.expressinfo)
          }
          if (order.OrderSite && order.OrderSite.siteurl) {
            let siteurl = order.OrderSite.siteurl
            let time = new Date().getTime()
            order.OrderSite.siteurl1 = this.get_noskip_siteurl(siteurl, time)
          }
        }
      }
    },
    // 页码跳转
    currentChange (val) {
      this.SearchContent.page = val
      this.getOrder()
    },
    // 设置每页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.SearchContent.maxcount = val
      this.getOrder()
    },
    search_order () {
      this.getOrder()
    },
    get_noskip_siteurl (siteurl, time) {
      if (!siteurl) return siteurl
      const queryStart = siteurl.indexOf('?')
      if (queryStart === -1) return siteurl + '?t=' + time
      const baseurl = siteurl.substring(0, queryStart + 1)
      let input = siteurl.slice(queryStart + 1).trim().replace(/^[?#&]/, '')
      let querys = {}
      for (const param of input.split('&')) {
        let [key, value] = param.replace(/\+/g, ' ').split('=')
        value = value === undefined ? null : value
        querys[key] = value
      }
      querys['t'] = time
      const keys = Object.keys(querys)
      const queryParams = keys.map(key => {
        const value = querys[key]
        if (value === undefined || value === null) {
          return ''
        }
        return key + '=' + value
      }).filter(x => x.length > 0).join('&')
      return baseurl + queryParams
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
    show_editState (order) {
      this.editing_order = order
      this.show_orderstate = true
    },
    // 弹框关闭前回调
    beforeclose () {
      this.show_orderstate = false
      this.show_msg = false
      this.show_client = false
      this.show_expressinfo = false
      this.show_goodsinfo = false
      this.show_repeat = false
    },
    async save_orderState (newOrder) {
      let body = {
        orderstate: newOrder.new_state,
        expressnumber: newOrder.new_expressnumber,
        expressname: newOrder.new_expressname,
        isfirst: newOrder.new_isfirst
      }
      let data = await orderApi.edit_orderState(this.editing_order.orderid, body)
      if (!data.Error) {
        this.editing_order.orderstate = newOrder.new_state
        if (this.editing_order.OrderExpress) {
          this.editing_order.OrderExpress.expressnumber = newOrder.new_expressnumber
          this.editing_order.OrderExpress.expressname = newOrder.new_expressname
        }
        this.editing_order.isfirst = newOrder.new_isfirst
        this.show_orderstate = false
      }
    },
    show_clientinfo (order) {
      this.editing_order = order
      this.show_client = true
    },
    show_message (order) {
      this.order = order
      this.show_msg = true
    },
    async save_clientinfo (client) {
      let data = await orderApi.save_clientinfo(this.editing_order.orderid, client)
      if (!data.Error) {
        this.editing_order.clientname = client.clientname
        this.editing_order.clientemail = client.clientemail
        this.editing_order.clientphone = client.clientphone
        this.editing_order.clientaddress = client.clientaddress
        this.editing_order.clientdispatchtime = client.clientdispatchtime
        this.editing_order.clientotherinfo = client.clientotherinfo
        this.editing_order.clientzipcode = client.clientzipcode
        this.editing_order.remarks = client.remarks
        this.show_client = false
      }
    },
    async set_invalid (order) {
      let data = await orderApi.set_invalid(order.orderid)
      this.$message(data.Info)
      if (!data.Error) {
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
    async save_expressinfo (express) {
      let data = await orderApi.edit_expressinfo(this.editing_order.orderid, {
        expressnumber: express.expressnumber,
        expressname: express.expressname
      })
      this.$message(data.Info)
      if (!data.Error) {
        this.editing_order.OrderExpress.expressnumber = express.expressnumber
        this.editing_order.OrderExpress.expressname = express.expressname
        this.editing_order.OrderExpress.expressinfo = express.expressinfo
        this.show_expressinfo = false
        this.getOrder()
      }
    },
    async show_goodsinfo_popup (order) {
      let data = await orderApi.get_goodsspec(order.orderid)
      this.edit_goodslist = []
      this.editing_order = order
      for (let i in order.OrderGoods) {
        let g1 = order.OrderGoods[i]
        this.edit_goodslist.push({
          id: g1.id,
          orderid: g1.orderid,
          goodsid: g1.goodsid,
          sourceid: g1.sourceid,
          specid: g1.specid,
          sku: g1.sku,
          goodsname: g1.goodsname,
          specname: g1.specname,
          img: g1.img,
          option1: g1.option1,
          option2: g1.option2,
          option3: g1.option3,
          price: parseInt(g1.price),
          number: parseInt(g1.number),
          username: g1.username
        })
      }
      for (let k in this.edit_goodslist) {
        let oldgoods = this.edit_goodslist[k]
        for (let j in data.GoodsList) {
          let newgoods = data.GoodsList[j]
          if (oldgoods.goodsid === newgoods.id) {
            oldgoods.domain = newgoods.Domain.name
            oldgoods.sitedir = newgoods.sitedir
            for (let i = 0; i < newgoods.GoodsSpecs.length; i++) {
              let spec = newgoods.GoodsSpecs[i]
              if (!oldgoods.name_list) oldgoods.name_list = []
              if (!oldgoods.img_list) oldgoods.img_list = []
              if (oldgoods.name_list.indexOf(spec.name) >= 0) continue
              oldgoods.name_list.push(spec.name)
              oldgoods.img_list.push(spec.img)
            }
            for (let i = 0; i < newgoods.GoodsSpecs.length; i++) {
              let spec = newgoods.GoodsSpecs[i]
              if (!spec.option1) continue
              if (!oldgoods.option1_list) oldgoods.option1_list = []
              if (oldgoods.option1_list.indexOf(spec.option1) >= 0) continue
              oldgoods.option1_list.push(spec.option1)
            }
            for (let i = 0; i < newgoods.GoodsSpecs.length; i++) {
              let spec = newgoods.GoodsSpecs[i]
              if (!spec.option2) continue
              if (!oldgoods.option2_list) oldgoods.option2_list = []
              if (oldgoods.option2_list.indexOf(spec.option2) >= 0) continue
              oldgoods.option2_list.push(spec.option2)
            }
          }
          oldgoods.Specs = newgoods.GoodsSpecs
        }
      }
      this.edit_orderprice = parseInt(order.orderprice)
      this.show_goodsinfo = true
    },
    select_spec (item) {
      item.option1_list = []
      item.option2_list = []
      for (let spec of item.Specs) {
        if (item.specname === spec.name) {
          if (spec.option1) {
            item.option1_list.push(spec.option1)
          }
          if (spec.option2) {
            item.option2_list.push(spec.option2)
          }
        }
      }
      if (!item.option1_list.length) {
        for (let spec of item.Specs) {
          if (item.specname === spec.name) {
            item.sku = spec.sku
            item.price = spec.price
            this.calc_price()
            return false
          }
        }
      }
    },
    select_option1 (item) {
      item.option2_list = []
      for (let spec of item.Specs) {
        if (item.specname === spec.name && item.option1 === spec.option1) {
          if (spec.option2) {
            item.option2_list.push(spec.option2)
          }
        }
      }
      if (!item.option2_list.length) {
        for (let spec of item.Specs) {
          if (item.specname === spec.name && item.option1 === spec.option1) {
            item.sku = spec.sku
            item.price = spec.price
            this.calc_price()
            return false
          }
        }
      }
    },
    select_option2 (item) {
      for (let spec of item.Specs) {
        if (item.specname === spec.name && item.option1 === spec.option1 && item.option2 === spec.option2) {
          item.sku = spec.sku
          item.price = spec.price
          this.calc_price()
          return false
        }
      }
    },
    calc_price () {
      this.edit_orderprice = 0
      this.edit_goodslist.map((goods) => {
        this.edit_orderprice += parseInt(goods.price) * parseInt(goods.number)
      })
    },
    del_spec (index) {
      this.edit_goodslist.splice(index, 1)
      this.calc_price()
    },
    add_spec (g1) {
      this.edit_goodslist.push({
        id: g1.id,
        orderid: g1.orderid,
        goodsid: g1.goodsid,
        sourceid: g1.sourceid,
        specid: g1.specid,
        sku: g1.sku,
        goodsname: g1.goodsname,
        specname: g1.specname,
        img: g1.img,
        option1: g1.option1,
        option2: g1.option2,
        option3: g1.option3,
        price: parseInt(g1.price),
        number: parseInt(g1.number),
        username: g1.username,
        name_list: g1.name_list,
        img_list: g1.img_list,
        option1_list: g1.option1_list,
        option2_list: g1.option2_list,
        Specs: g1.Specs
      })
      this.calc_price()
    },
    edit_price (price) {
      this.edit_orderprice = parseInt(price)
    },
    async save_goodsinfo () {
      if (!this.edit_orderprice) return this.$message.error('总价不能没有')
      if (this.edit_goodslist.length === 0) return this.$message.error('最少需要一个商品')
      for (let oldgoods of this.edit_goodslist) {
        oldgoods.name_list = []
        oldgoods.img_list = []
        oldgoods.option1_list = []
        oldgoods.option2_list = []
        oldgoods.Specs = []
      }
      let data = await orderApi.edit_goodsinfo(this.editing_order.orderid, this.edit_orderprice, this.edit_goodslist)
      if (!data.Error) {
        this.editing_order.orderprice = data.orderprice
        this.editing_order.orderpriceRMB = data.orderpriceRMB
        this.editing_order.OrderGoods = data.OrderGoods
        this.show_goodsinfo = false
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
    },
    exportOrder () {
      this.$prompt('请填写导出密码', '导出验证', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '密码不能为空'
      }).then(({ value }) => {
        this.checkExportPass(value)
      }).catch(() => {})
    },
    async checkExportPass (value) {
      let data = await orderApi.checkExportPass(value)
      if (!data.Error) {
        this.$message.success(data.Info)
        let ret = await orderApi.exportAllOrder(this.SearchContent)
        this.$message.success(ret.Info)
      } else {
        this.$message.error(data.Info)
      }
    },
    batchUpdateState () {
      this.showBatchDialog = true
    },
    async saveBatchUpdate () {
      if (!this.importOrder.state) {
        return this.$message.error('请先选择目的订单状态')
      }
      let pasteData = this.importOrder.orderid.trim()
      let rows = []
      pasteData = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g))
      pasteData.map((item) => {
        if (item && item.replace('\t', '')) {
          rows.push(item.split('\t'))
        }
      })
      if (rows) {
        let temp = []
        let count
        for (let i = 0; i < rows.length; i++) {
          temp = rows[i]
          for (let k = 0; k < rows.length; k++) {
            if (k !== i && rows[k].length === temp.length) {
              count = 0
              for (let j = 0; j < rows[k].length; j++) {
                if (rows[k][j] === temp[j]) {
                  count++
                }
              }
              if (count === temp.length) {
                rows.splice(k, 1)
                k--
              }
            }
          }
        }
      }
      let data = await orderApi.importOrderidState(rows, this.importOrder.state)
      if (!data.error) {
        this.$message.success(data.Info)
        this.showBatchDialog = false
        this.getOrder()
      } else {
        this.$message.error(data.Info)
      }
    }
  }
}
</script>
<style scoped>
  .valid /deep/ .el-date-editor .el-range-separator {
    width: 6%;
  }
</style>
