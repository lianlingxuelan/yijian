<template>
    <div class="orderInfo">
        <el-table :data="OrderList" style="width: 100%" border>
            <el-table-column label="订单详情" width="500">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="td-first">
                            <el-form-item style="float:left" >
                                <span>{{ props.row.ordertime}}</span>
                            </el-form-item>
                            <el-form-item label="订单号:" style="float:right;margin-right:0">
                                <span>{{ props.row.orderid}}</span>
                            </el-form-item>
                    </el-form>
                    <div class="clientinfo">
                        <el-row type="flex"  v-for="goods in props.row.OrderGoods" :key="goods.id" style="margin-bottom:10px;">
                            <el-col :span="4" class="goodsimg">
                                <el-tag class="gift" type="danger" v-if="goods.gift" effect="dark"  size="mini">赠品</el-tag>
                                <el-image  :src="CdnBase+goods.img+'-76'" fit="fill"></el-image>
                            </el-col>
                            <el-col :span="20">
                                <el-row>
                                    <el-col :span="24" class="info" title="点击编辑订单商品" style="cursor:pointer;">
                                        <span v-if="state==='valid'" class="primary" @click="show_goodsinfo_popup(props.row)">{{goods.goodsname}}</span>
                                        <span  v-if="state==='invalid'" class="primary">{{goods.goodsname}}</span>
                                        <el-tag  effect="dark" size="mini" @click.stop
                                                v-clipboard:copy="goods.goodsname"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError" >复制</el-tag>
                                    </el-col>
                                    <el-col :span="24">
                                        <span >{{goods.specname}}</span>
                                        <span class="success" v-text="goods.option1?'+'+goods.option1:''"></span>
                                        <span class="warning" v-text="goods.option2?'+'+goods.option2:''"></span>
                                        <span :class="{danger:goods.number>1}">x{{goods.number}}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="金额"  width="110">
                <template slot-scope="props">
                    <el-form label-position="left" inline >
                        <el-form-item class="td-first">
                            <span>{{ props.row.User.nickname}}</span>
                        </el-form-item>
                        <el-form-item>
                            <div class="text-bold danger" v-text="props.row.money+' '+props.row.orderprice"></div>
                            <div v-text="'￥'+props.row.orderpriceRMB"></div>
                            <div v-if="(props.row.payment!==0)&&props.row.OrderPayment"><el-link>已付款</el-link></div>
                            <div v-if="(props.row.payment!==0)&&!props.row.OrderPayment" class="danger">等待付款</div>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="110">
                <template slot-scope="props">
                    <div class="td-first"></div>
                    <el-button v-if="state==='valid'" :type="orderType(props.row)" size="mini" @click="state_click(props.row)">{{getStateStr(props.row.orderstate)}}</el-button>
                    <el-button v-if="state==='invalid'" :type="orderType(props.row)" size="mini">{{getStateStr(props.row.orderstate)}}</el-button>
                    <div v-if="state==='valid'"><i style="cursor: pointer;" class="el-icon-edit-outline primary" @click="show_editState(props.row)"></i></div>
                    <div v-if="state==='valid'&&props.row.orderstate!=='new'" v-text="props.row.confirmetime"></div>
                    <div v-if="state==='valid'&&props.row.isfirst">优先发货</div>
                </template>
            </el-table-column>
            <el-table-column label="物流信息" width="220" >
                <template slot-scope="props">
                    <div class="td-first"></div>
                    <el-form>
                        <el-form-item>
                            <div v-if="props.row.store_delivery" v-text="props.row.store_delivery"></div>
                            <!--<div v-if="props.row.store_delivery"><i style="cursor: pointer;" class="el-icon-edit-outline primary" @click="show_edit_twstore(props.row.orderid)"></i></div>-->
                        </el-form-item>
                        <el-form-item>
                            <div v-if="props.row.OrderPurchase&&props.row.OrderPurchase.pur_name&&props.row.orderstate==='picking'" v-text="'采购物流名称('+props.row.OrderPurchase.pur_name+')'"></div>
                            <div v-if="props.row.OrderPurchase&&props.row.OrderPurchase.pur_info&&props.row.orderstate==='picking'" v-text="'采购物流单号('+props.row.OrderPurchase.pur_info+')'"></div>
                            <div style="cursor: pointer;" @click="show_expressinfo_popup(props.row)">
                                <div v-if="props.row.OrderExpress&&props.row.OrderExpress.expresstime" v-text="'发货时间('+props.row.OrderExpress.expresstime+')'"></div>
                                <div class="primary" v-if="props.row.OrderExpress&&props.row.OrderExpress.expressname"
                                     v-text="props.row.OrderExpress.expressnumber+(props.row.OrderExpress.expressname?' ('+props.row.OrderExpress.expressname+')':'')"></div>
                                <div class="expressinfo1" v-if="props.row.OrderExpress" v-text="props.row.OrderExpress.expressinfo?props.row.OrderExpress.expressinfo[0].state + '(' + props.row.OrderExpress.expressinfo[0].time+')':''"></div>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="客户信息" width="300">
                <template slot-scope="props">
                    <el-form>
                        <el-form-item class="td-first">
                            <el-link :href="'http://ip.taobao.com/ipSearch.html?ipAddr='+props.row.clientip" target="_blank">{{props.row.clientip}}</el-link>
                        </el-form-item>
                        <el-form-item class="clientinfo">
                            <el-row>
                                <el-col :span="12">
                                    <span class="primary" style="margin-right:5px;cursor:pointer;" @click="show_clientinfo(props.row)">{{props.row.clientname}}</span>
                                </el-col>
                                <el-col :span="12">
                                    <span class="primary" style="cursor:pointer;" @click="show_message(props.row)">{{props.row.clientphone}}</span>
                                </el-col>
                                <el-col :span="24">
                                    <span>{{props.row.clientaddress}}</span>
                                </el-col>
                            </el-row>
                            <el-tag type="danger" size="mini" v-show="props.row.clientphoneinfo=== '1'">电话黑名单</el-tag>
                            <el-tag type="danger" size="mini" v-show="props.row.clientphoneinfo=== '2'">IP黑名单</el-tag>
                            <el-tag type="danger" size="mini" v-show="props.row.clientphoneinfo=== '3'">电话IP黑名单</el-tag>
                            <el-tag type="warning" size="mini" v-show="props.row.isrepeat>1&&props.row.isrepeat === 5" @click="show_repeatorder(props.row)">电话IP重复</el-tag>
                            <el-tag type="warning" size="mini" v-show="props.row.isrepeat>1&&props.row.isrepeat === 4" @click="show_repeatorder(props.row)">IP重复</el-tag>
                            <el-tag type="warning" size="mini" v-show="props.row.isrepeat>1&&props.row.isrepeat === 3" @click="show_repeatorder(props.row)">电话重复</el-tag>
                            <el-tag type="primary" size="mini" v-show="props.row.clientemail" @click="show_sendmail_popup(order)">发邮件</el-tag>
                        </el-form-item>
                        <el-form-item>
                            <div style="max-height: 90px;overflow-y: auto;" v-text="props.row.clientotherinfo"></div>
                        </el-form-item>
                        <el-form-item>
                            <div style="max-height: 90px;overflow-y: auto;" v-text="props.row.remarks"></div>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="来源" width="320" :render-header="renderBtn" v-if="state==='valid'">
                <template slot-scope="props">
                    <el-form>
                        <el-form-item class="td-first">
                            <el-link :underline="false" v-if="screen_skip===0" :href="props.row.OrderSite.siteurl" target="_blank" v-text="'网站：'+props.row.OrderSite.siteurl"></el-link>
                            <el-link :underline="false" v-if="screen_skip===1"  :href="props.row.OrderSite.siteurl1" target="_blank" v-text="'网站：'+props.row.OrderSite.siteurl"></el-link>
                            <el-link :underline="false" v-if="props.row.OrderSite.redirecturl" :title="props.row.OrderSite.redirecturl"   :href="props.row.OrderSite.redirecturl" target="_blank"></el-link>
                        </el-form-item>
                        <el-form-item  >
                            <div style="width:100%;text-align: left;">
                                <el-tag type="primary" v-if="props.row.flag&&UserInfo.role ==='管理员'" @click="updateMessage(props.row)" style="cursor:pointer;" size="mini">更新</el-tag>
                            </div>
                            <div class="local" v-for="(info,index2) in props.row.local_info" :key="index2" v-show="info&&index2!==1&&index2!==6&&index2!==7&&index2!==5" :class="{danger:index2===0}">
                                {{info}}
                            </div>
                        </el-form-item>
                    </el-form>

                </template>

            </el-table-column>
            <el-table-column label="来源" width="320" v-if="state==='invalid'">
                <template slot-scope="props">
                    <el-form>
                        <el-form-item class="td-first">
                            <el-link :underline="false"  :href="props.row.OrderSite.siteurl" target="_blank" v-text="'网站：'+props.row.OrderSite.siteurl"></el-link>
                            <el-link :underline="false" v-if="props.row.OrderSite.redirecturl" :title="props.row.OrderSite.redirecturl"   :href="props.row.OrderSite.redirecturl" target="_blank"></el-link>
                        </el-form-item>
                        <el-form-item  >
                            <div class="local" v-for="(info,index2) in props.row.local_info" :key="index2" v-show="info&&index2!==1&&index2!==6&&index2!==7&&index2!==5" :class="{danger:index2===0}">
                                {{info}}
                            </div>
                        </el-form-item>
                    </el-form>

                </template>

            </el-table-column>
            <el-table-column v-if="repeat_order!=='repeat'">
                <template slot-scope="props">
                    <div class="td-first"></div>
                    <el-row>
                        <el-col v-if="state==='valid'">
                            <el-button type="success" size="small" v-if="props.row.orderstate==='new'&&( props.row.payment===0||(( props.row.payment!==0)&& props.row.OrderPayment))" @click="confirm(props.row)">确认</el-button>
                        </el-col>
                        <el-col v-if="state==='valid'">
                            <el-button  type="warning" size="small" v-if="props.row.orderstate==='all'||props.row.orderstate==='new'|| props.row.orderstate==='waitsend' || props.row.orderstate==='picking'" @click="set_invalid(props.row)">屏蔽</el-button>
                        </el-col>
                        <el-col v-if="state==='invalid'">
                            <el-button  type="warning" size="small"  @click="set_normal(props.row)">恢复</el-button>
                        </el-col>
                        <el-col>
                            <div style="cursor:pointer" @click="add_blackinfo(props.row)">拉黑</div>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: 'orderInfo',
  props: {
    OrderList: {
      type: Array
    },
    CdnBase: {
      type: String
    },
    screen_skip: {
      type: Number
    },
    orderstates: {
      type: Array
    },
    state: {
      type: String
    },
    repeat_order: {
      type: String
    }
  },
  data () {
    return {
      UserInfo: JSON.parse(localStorage.getItem('userinfo'))
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
    // 复制成功
    onCopy () {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    // 复制失败
    onError () {
      this.$message.error('复制失败，当前浏览器不支持该功能')
    },
    // 订单状态颜色
    orderType (item) {
      if (item.orderstate === 'new') {
        return 'success'
      } else if (item.orderstate === 'return') {
        return 'danger'
      } else if (item.orderstate === 'end') {
        return 'default'
      } else if (item.orderstate === 'sending') {
        return 'primary'
      } else {
        return 'warning'
      }
    },
    state_click (order) {
      if (order.orderstate === 'new') {
        if ((order.payment !== 0) && !order.OrderPayment) {
          return this.$message.error('待付款订单不允许直接编辑')
        }
        this.$emit('state_click', order)
      }
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
    // 客户信息弹出框
    show_message (order) {
      this.$emit('show_message', order)
    },
    //  确认订单
    confirm (order) {
      this.$emit('confirm', order)
    },
    // 屏蔽订单
    set_invalid (order) {
      this.$confirm('确定要屏蔽这个订单?', '提示', {
        confirmButtonText: '屏蔽',
        cancelButtonText: '点错了',
        type: 'warning'
      }).then(() => {
        this.$emit('set_invalid', order)
      }).catch(() => {})
    },
    // 拉黑订单
    add_blackinfo (order) {
      this.$confirm('确定要拉黑这个收货人?', '提示', {
        confirmButtonText: '拉黑',
        cancelButtonText: '点错了',
        type: 'warning'
      }).then(() => {
        this.$prompt('请输入拉黑原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '拉黑原因不能为空'
        }).then(({ value }) => {
          this.$emit('add_blackinfo', { order, value })
        }).catch(() => {})
      }).catch(() => {})
    },
    // 更新订单来源
    updateMessage (order) {
      this.$emit('updateMessage', order)
    },
    // 表头渲染批量更新按钮
    renderBtn (h, { column }) {
      return h('span', [
        h('span', column.label),
        h('el-tag', {
          style: 'margin-left:5px;',
          attrs: {
            size: 'mini'
          },
          on: {
            click: () => {
              this.$emit('batchUpdateMessage')
            }
          }
        }, '批量更新')
      ])
    },
    // 显示物流信息弹出框
    show_expressinfo_popup (order) {
      this.$emit('show_expressinfo_popup', order)
    },
    // 电话ip重复弹出框
    show_repeatorder (order) {
      this.$emit('show_repeatorder', order)
    },
    // 无效订单恢复正常
    set_normal (order) {
      this.$confirm('确定要恢复这个订单?', '提示', {
        confirmButtonText: '恢复',
        cancelButtonText: '点错了',
        type: 'warning'
      }).then(() => {
        this.$emit('set_normal', order)
      }).catch(() => {})
    }
  },
  watch: {
    OrderList () {
      if (this.OrderList && this.OrderList.length > 0) {
        this.OrderList.map(order => {
          order.flag = false
          let localInfo = order.clientlocation.split(';')
          if (localInfo && localInfo.length > 8) {
            localInfo[4] = localInfo[4].replace('移动端：否', '来自：来自电脑').replace('移动端：是', '来自：来自手机')
            localInfo[5] = localInfo[5].replace('Microsoft', '')
            localInfo[8] = localInfo[8].toUpperCase().replace('ZH-CN', '简体(中国)').replace('ZH-TW', '繁体(台湾)')
              .replace('EN-US', '英语(美国)').replace('EN-GB', '英语(英国)').replace('ZH-HK', '繁体(香港)').replace('TH-TH', '泰语(泰国)')
              .replace('ZH-SG', '简体(新加坡)').replace('EN-MY', '英语(马来)').replace('ZH-MY', '简体(马来)').replace('EN-SG', '英语(马来)')
            let arr = []; let temp = []
            for (let i in localInfo) {
              var str = localInfo[i]
              let title = str.split('：')[0]
              var index = str.split('：')[1]
              arr.push(title + '：' + index)
              temp.push(index)
            }
            if (temp[0] === '' || temp[2] === '' || temp[3] === '') {
              order.flag = true
            } else {
              order.flag = false
            }
            order.local_info = arr
          }
        })
      }
    }
  }
}
</script>

<style scoped>
    .orderInfo /deep/ .el-table td:not(:first-child),.orderInfo /deep/ .el-table th {
         text-align: center;
    }
    .orderInfo /deep/ .el-table td:not(:first-child){
        position:relative;
    }
    .td-first{
        position:absolute;
        top:0;
        height:40px;
        overflow: hidden;
        left:0;
        padding: 0 10px;
        width:100%;
        background-color: #F5F7FA;
        border-bottom:1px solid #EBEEF5;
    }
    .clientinfo{
        margin-top:40px;
    }
    .clientinfo .el-tag{
        margin-right:5px;
        cursor: pointer;
    }
    .local{
        width:50%;float:left;text-align: left;font-size:12px;
    }
    .goodsimg{
        position:relative;
    }
    .gift{
        position:absolute;
        top:0;
        left:0;
        z-index: 100
    }
</style>
