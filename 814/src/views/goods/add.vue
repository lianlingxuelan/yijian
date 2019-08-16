<template>
  <div class="add">
    <d2-container class="goods">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基本信息" name="basic">
          <goods-add :addGoods="addGoods" @showDomain="showDomain"  @showType="showType" @showTheme="showTheme"></goods-add>
        </el-tab-pane>
        <el-tab-pane label="产品规格" name="spec">
          <goods-spec :CdnBase="CdnBase" :addGoods="addGoods" @showImg="showImg"></goods-spec>
        </el-tab-pane>
        <el-tab-pane label="轮播图" name="swiper">
          <goods-swiper @showVideo="showVideo" @showImg="showImg" :addGoods="addGoods" @clearimg="clearimg"></goods-swiper>
        </el-tab-pane>
        <el-tab-pane label="图文详情" name="details">
          <goods-details @showImg="showImg" :addGoods="addGoods"></goods-details>
        </el-tab-pane>
        <el-tab-pane label="推荐商品" name="recommend">
          <goods-recommend :addGoods="addGoods" @GoodsShow="GoodsShow" @delgift="delgift" @clearGoods="clearGoods"></goods-recommend>
        </el-tab-pane>
        <el-tab-pane label="销售策略" name="sales">
          <goods-sales :addGoods="addGoods" @GoodsShow="GoodsShow" @delgift="delgift"></goods-sales>
        </el-tab-pane>
        <el-tab-pane label="代码" name="code">
          <goods-code :addGoods="addGoods" @showCode="showCode" @delCode="delCode" @clearCode="clearCode"></goods-code>
        </el-tab-pane>
        <el-tab-pane label="客服/页尾" name="service">
          <goods-service :addGoods="addGoods" @showService="showService" @getDefaultService="getDefaultService" @clearService="clearService"></goods-service>
        </el-tab-pane>
        <el-tab-pane label="paypal列表" name="paypallist">
          <goods-paypal :addGoods="addGoods" @showPaypal="showPaypal"></goods-paypal>
        </el-tab-pane>
        <el-tab-pane label="跳转开关" name="jump">
          <goods-jump :addGoods="addGoods" @GoodsShow="GoodsShow"></goods-jump>
        </el-tab-pane>
        <el-tab-pane label="在线客服" name="onlineService">
          <goods-online-service :addGoods="addGoods" @showOnline="showOnline"></goods-online-service>
        </el-tab-pane>
      </el-tabs>
      <template slot="footer">
        <el-row>
          <el-button type="warning" size="medium" @click="back_list">返回列表</el-button>
          <el-button type="primary" size="medium" @click="add_goods" v-text="pageTitle"></el-button>
        </el-row>
      </template>
    </d2-container>
    <!--域名选择框-->
    <select-domain :selectDomainShow="selectDomainShow" :DomainList="DomainList" @selectDomain="selectDomain" @closeDomain="closeDomain"></select-domain>
    <select-type :selectTypeShow="selectTypeShow" :addGoods="addGoods"
                 :types2="types2" :types3="types3"
                 @classtype1="classtype1" @classtype2="classtype2"
                 @closeType="closeType" @selectCloseType="selectCloseType"></select-type>
    <select-theme :selectThemeShow="selectThemeShow" :themeList="themeList"
                  @themeClose="themeClose" :addGoods="addGoods" @selectTheme="selectTheme"></select-theme>
    <select-video :selectVideoShow="selectVideoShow" :addGoods="addGoods" @addVideo="addVideo" @closeVideo="closeVideo"></select-video>
    <select-code :selectCodeShow="selectCodeShow" :codeList="codeList"
                 :addGoods="addGoods" @selectCode="selectCode"
                 @unSelectCode="unSelectCode" @closeCode="closeCode"></select-code>
    <select-service :selectServiceShow="selectServiceShow" :serviceList="serviceList"
                    :addGoods="addGoods" @closeService="closeService"
                    @selectServices="selectServices" :serviceType="serviceType"></select-service>
    <select-paypal :selectPaypalShow="selectPaypalShow" :paypalList="paypalList" :addGoods="addGoods" @closePaypal="closePaypal" @selectPaypal="selectPaypal"></select-paypal>
    <select-online-service :selectOnlineShow="selectOnlineShow" :onlineList="onlineList" :addGoods="addGoods" @closeOnline="closeOnline" @selectOnline="selectOnline"></select-online-service>
    <select-goods :selectAddGoodsShow="selectAddGoodsShow" :addGoods="addGoods"
                  :openGoodsType="openGoodsType" :addGoodsList="addGoodsList"
                  @closeGoods="closeGoods" @selectGoodsType="selectGoodsType"
                  @selectingGoods="selectingGoods"></select-goods>
    <select-img :selectImgShow="selectImgShow" :imgTabsList="imgTabsList" :openImgtype="openImgtype"
                @closeImg="closeImg" @getImgList="getImgList" @getImgListPage="getImgList"
                :ImgList="ImgList" @selectingImg="selectingImg"></select-img>
  </div>
</template>

<script>
import goodsAdd from '_c/goods/addDetail.vue'
import goodsSpec from '_c/goods/spec.vue'
import goodsSwiper from '_c/goods/headImgs.vue'
import goodsDetails from '_c/goods/goodsContent.vue'
import goodsRecommend from '_c/goods/recommend.vue'
import goodsSales from '_c/goods/sales.vue'
import goodsCode from '_c/goods/addCode.vue'
import goodsService from '_c/goods/service.vue'
import goodsPaypal from '_c/goods/paypal.vue'
import goodsJump from '_c/goods/jump.vue'
import goodsOnlineService from '_c/goods/onlineService.vue'
import selectDomain from '_c/goods/selectDomain.vue'
import selectType from '_c/goods/selectType.vue'
import selectTheme from '_c/goods/selectTheme.vue'
import selectVideo from '_c/goods/selectAddVideo'
import selectCode from '_c/goods/selectCode.vue'
import selectService from '_c/goods/selectService.vue'
import selectGoods from '_c/goods/selectGoods.vue'
import selectImg from '_c/goods/selectImageHelp.vue'
import selectPaypal from '_c/goods/selectPaypal.vue'
import selectOnlineService from '_c/goods/selectOnlineService.vue'
import { addApi } from '@/api/add'
import { mapActions } from 'vuex'
export default {
  name: 'goods_add',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      activeName: 'basic',
      addGoods: {},
      CdnBase: '',
      selectDomainShow: false, // 控制域名选择弹框
      DomainList: [], // 域名列表
      selectTypeShow: false, // 控制分类选择弹框
      types2: [], // 二级分类列表
      types3: [], // 三级分类列表
      type1: '', // 一级分类
      type2: '', // 二级分类
      type3: '', // 三级分类
      selectThemeShow: false, // 控制模板选择弹框
      themeList: [], // 模板列表
      selectCodeShow: false, // 控制广告代码弹框
      codeList: [], // 广告代码列表
      selectServiceShow: false, // 控制客服/尾页弹框，
      serviceList: [], // 客服列表
      serviceType: '', // 弹框客服类型（BF，link，WP）
      selectPaypalShow: false, // 控制paypal弹框
      paypalList: [], // paypal 列表
      selectOnlineShow: false, // 控制在线客服弹框
      onlineList: [], // 在线客服列表
      selectVideoShow: false, // 控制轮播视频弹框
      selectAddGoodsShow: false, // 控制添加商品的弹框
      openGoodsType: '', // 当前打开的商品弹框属于谁（推荐/详情（TJdetail）,推荐/下单（TJorders）,销售策略/赠品（XSgift）,跳转/商品（jump））
      addGoodsList: {}, // 获取到的商品列表,
      selectImgShow: false,
      openImgtype: '',
      imgTabsList: [],
      ImgList: {},
      GoodsSpecsIndex: 0,
      pageTitle: '添加商品',
      keyNameList: [],
      goodsid: 'new'
    }
  },
  components: {
    goodsAdd,
    goodsSpec,
    goodsSwiper,
    goodsDetails,
    goodsRecommend,
    goodsSales,
    goodsCode,
    goodsService,
    goodsPaypal,
    goodsJump,
    goodsOnlineService,
    selectDomain,
    selectType,
    selectTheme,
    selectVideo,
    selectCode,
    selectService,
    selectPaypal,
    selectOnlineService,
    selectGoods,
    selectImg
  },
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter (to, from, next) {
    let id = to.params.id
    if (!id) id = 'new'
    next(instance => instance.load(id))
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate (to, from, next) {
    let id = to.params.id
    if (!id) id = 'new'
    this.save(id)
    next()
  },
  created () {
  //  定式存储
    this.goodsid = this.$route.params.id
    let that = this
    setInterval(function () {
      that.save(that.goodsid)
    }, 10 * 1000)
  },
  methods: {
    ...mapActions('d2admin/db', [
      'databasePage',
      'databasePageClear'
    ]),
    async save (id) {
      const db = await this.databasePage({
        user: true
      })
      db
        .set('goodsInfo', this.addGoods)
        .write()
      this.load(id)
    },
    async load (id) {
      const db = await this.databasePage({
        user: true
      })
      let goodsInfo = db
        .get('goodsInfo')
        .value()
      if (goodsInfo && Object.keys(goodsInfo).length !== 0) {
        this.addGoods = goodsInfo
      } else {
        this.getAdd(id)
      }
    },
    async getAdd (id) {
      this.addGoods = await addApi.getAddList(id)
      this.CdnBase = this.addGoods.CdnBase
      if (!this.addGoods.Goods) {
        let Goods = {
          name: '',
          GoodsTheme: { name: '' },
          Paypal: { name: '' },
          skip_switch: '0',
          type1: '默认分类',
          type2: '无',
          type3: '无',
          userkey: '',
          sitename: '',
          sitedesc: '',
          color: 'purple',
          template: 'jd',
          language: 'tw',
          isshare: '不共享',
          money: 'NT',
          option1_name: '颜色',
          option2_name: '尺码',
          option3_name: '套餐',
          fblink: '',
          linelink: '',
          whatsapplink: '',
          about_id: '0',
          contact_id: '0',
          privacy_id: '0',
          terms_id: '0',
          service_id: '0',
          home_id: '1',
          oldprice: '',
          head_imgs: [],
          body_ads: '',
          order_ads: '',
          saleoff: [],
          priceoff: [],
          manyoff: [],
          count_info: [],
          manyoff_new: [],
          countdown: Date(),
          gifts: '',
          skip_id: '',
          domain_id: '',
          GoodsContent: { content: '' },
          GoodsSpecs: [],
          paypal_id: '',
          home_select: '0',
          chaport_switch: '0',
          is_domain: false,
          GoodsPromotions: [],
          promotion_sort: [],
          receive_fm: '0',
          receive_711: '0',
          show_footer: true,
          domain_name_str: '',
          chaport_name: '',
          head_video: ''
        }
        this.$set(this.addGoods, 'Goods', Goods)
      } else {
        this.addGoods.Goods.manyoff = this.addGoods.Goods.manyoff ? JSON.parse(this.addGoods.Goods.manyoff) : []
        this.addGoods.Goods.manyoff_new = this.addGoods.Goods.manyoff_new ? JSON.parse(this.addGoods.Goods.manyoff_new) : []
        this.addGoods.Goods.saleoff = this.addGoods.Goods.saleoff ? JSON.parse(this.addGoods.Goods.saleoff) : []
        this.addGoods.Goods.priceoff = this.addGoods.Goods.priceoff ? JSON.parse(this.addGoods.Goods.priceoff) : []
        this.addGoods.Goods.count_info = this.addGoods.Goods.count_info ? JSON.parse(this.addGoods.Goods.count_info) : []
        this.addGoods.Goods.about_id = this.addGoods.Goods.about_id + ''
        this.addGoods.Goods.contact_id = this.addGoods.Goods.contact_id + ''
        this.addGoods.Goods.privacy_id = this.addGoods.Goods.privacy_id + ''
        this.addGoods.Goods.terms_id = this.addGoods.Goods.terms_id + ''
        this.addGoods.Goods.service_id = this.addGoods.Goods.service_id + ''
        this.addGoods.Goods.skip_switch = this.addGoods.Goods.skip_switch + ''
        this.addGoods.Goods.chaport_switch = this.addGoods.Goods.chaport_switch + ''
        this.addGoods.Goods.receive_fm = this.addGoods.Goods.receive_fm + ''
        this.addGoods.Goods.receive_711 = this.addGoods.Goods.receive_711 + ''
        this.addGoods.Goods.home_select = this.addGoods.Goods.home_select + ''
        this.addGoods.Goods.home_id = this.addGoods.Goods.home_id + ''
        this.addGoods.Goods.head_imgs = this.addGoods.Goods.head_imgs.split(';')
        this.addGoods.Goods.domain_name_str = this.addGoods.Goods.Domain ? this.addGoods.Goods.Domain.name + (this.addGoods.Goods.Domain.desc ? ' [' + this.addGoods.Goods.Domain.desc + ']' : '') : ''
      }
    },
    async getDomainList () {
      let data = await addApi.getDomainList()
      if (data.Error) return this.$message.error(data.Info)
      this.DomainList = data.DomainList
    },
    showDomain () {
      this.selectDomainShow = true
      this.getDomainList()
    },
    closeDomain () {
      this.selectDomainShow = false
    },
    showType () { // 显示分类选择弹框
      this.selectTypeShow = true
      let typeId = ''
      for (let item of this.addGoods.types1) {
        if (item.name === this.addGoods.Goods.type1) {
          typeId = item.id
        }
      }
      let data = {
        classtype: '二级分类',
        id: typeId
      }
      this.getReclassify('2', data)
    },
    closeType () { // 关闭分类选择弹框
      this.selectTypeShow = false
    },
    selectCloseType (type1, type2, type3) {
      this.addGoods.Goods.type1 = type1
      this.addGoods.Goods.type2 = type2
      this.addGoods.Goods.type3 = type3
      this.selectTypeShow = false
    },
    selectDomain (row) { //  选择域名
      this.selectDomainShow = false
      this.addGoods.Goods.domain_name_str = (row.name ? row.name : '') + (row.User.nickname ? ' (' + row.User.nickname + ') ' : '') + (row.desc ? ' [' + row.desc + ']' : '')
      this.addGoods.Goods.domain_id = row.id
    },
    async getReclassify (type, data) { // 获取二三级分类列表
      let types = await addApi.getReclassify(data)
      if (!types.Error) { this['types' + type] = types.Childs }
    },
    classtype1 (type) { // 选择一级分类
      let typeId = ''
      for (let item of this.addGoods.types1) {
        if (item.name === type) {
          typeId = item.id
        }
      }
      let data = {
        classtype: '二级分类',
        id: typeId
      }
      this.getReclassify('2', data)
      this.type2 = '无'
      this.type3 = '无'
    },
    classtype2 (type) { // 选择二级分类
      let typeId = ''
      for (let item of this.types2) {
        if (item.name === type) {
          typeId = item.id
        }
      }
      let data = {
        classtype: '三级分类',
        id: typeId
      }
      this.getReclassify('3', data)
      this.type3 = '无'
    },
    showTheme () { // 显示选择模板页面
      this.selectThemeShow = true
      this.getThemeList()
    },
    themeClose () {
      this.selectThemeShow = false
    },
    async getThemeList () {
      let data = await addApi.getThemeList()
      if (!data.Error) { this.themeList = data.ThemeList }
    },
    selectTheme (row) {
      this.addGoods.Goods.GoodsTheme.name = row.name
      this.selectThemeShow = false
    },
    showVideo () {
      this.selectVideoShow = true
    },
    closeVideo () {
      this.selectVideoShow = false
    },
    showCode (type) { // 显示选择模板页面
      this.selectCodeShow = true
      this.codeType = type
      this.getCodeList(type)
    },
    closeCode () { // 关闭分类选择弹框
      this.selectCodeShow = false
      this.codeList = []
    },
    async getCodeList (type) {
      let data = await addApi.getADcode(type)
      if (!data.Error) { this.codeList = data.CodeList }
    },
    selectCode (row) {
      if (this.codeType === 'adcode') {
        this.addGoods.adcodelist.push({ id: row.id, name: row.name })
      } else if (this.codeType === 'othercode') {
        this.addGoods.othercodelist.push({ id: row.id, name: row.name })
      }
    },
    unSelectCode (row) {
      if (this.codeType === 'adcode') {
        for (let k in this.addGoods.adcodelist) {
          if (this.addGoods.adcodelist[k].id === row.id) {
            this.addGoods.adcodelist.splice(k, 1)
          }
        }
      } else if (this.codeType === 'othercode') {
        for (let k in this.addGoods.othercodelist) {
          if (this.addGoods.othercodelist[k].id === row.id) {
            this.addGoods.othercodelist.splice(k, 1)
          }
        }
      }
    },
    delCode (index, type) {
      if (type === 'adcode') {
        this.addGoods.adcodelist.splice(index, 1)
      } else if (type === 'othercode') {
        this.addGoods.othercodelist.splice(index, 1)
      }
    },
    clearCode (type) {
      if (type === 'adcode') {
        this.addGoods.adcodelist = []
      } else if (type === 'othercode') {
        this.addGoods.othercodelist = []
      }
    },
    showService (type) { // 显示选择模板页面
      this.selectServiceShow = true
      this.serviceType = type
      this.getServiceList(type)
    },
    closeService () { // 关闭分类选择弹框
      this.selectServiceShow = false
      this.serviceList = []
    },
    async getServiceList (type) {
      let data = await addApi.getServiceList(type)
      if (!data.Error) { this.serviceList = data.KFList }
    },
    selectServices (row) {
      if (this.serviceType === 'facebook') {
        this.addGoods.Goods.fblink = row.value
      } else if (this.serviceType === 'line') {
        this.addGoods.Goods.linelink = row.value
      } else if (this.serviceType === 'whatsapp') {
        this.addGoods.Goods.whatsapplink = row.value
      }
      this.closeService()
    },
    async getDefaultService (type) {
      let data = await addApi.getDefaultService(type)
      if (!data.Error) {
        if (type === 'facebook') {
          this.addGoods.Goods.fblink = data.fblink
        } else if (type === 'line') {
          this.addGoods.Goods.linelink = data.linelink
        } else if (type === 'whatsapp') {
          this.addGoods.Goods.whatsapplink = data.whatsapplink
        }
      }
    },
    clearService (type) {
      if (type === 'facebook') {
        this.addGoods.Goods.fblink = ''
      } else if (type === 'line') {
        this.addGoods.Goods.linelink = ''
      } else if (type === 'whatsapp') {
        this.addGoods.Goods.whatsapplink = ''
      }
    },
    showPaypal () {
      this.selectPaypalShow = true
      this.getPalpayList()
    },
    closePaypal () {
      this.selectPaypalShow = false
    },
    async getPalpayList () {
      let data = await addApi.getPalpayList()
      if (!data.Error) { this.paypalList = data.PaypalList }
    },
    selectPaypal (row) {
      this.addGoods.Goods.Paypal.name = row.name
      this.closePaypal()
    },
    showOnline () {
      this.selectOnlineShow = true
      this.getOnlineList()
    },
    closeOnline () {
      this.selectOnlineShow = false
    },
    async getOnlineList () {
      let data = await addApi.getOnlineList()
      if (!data.Error) { this.onlineList = data.ZXKFList }
    },
    selectOnline (row) {
      this.addGoods.Goods.chaport_name = row.name
      this.closeOnline()
    },
    addVideo (video) {
      let ytRegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
      let ytMatch = video.match(ytRegExp)
      if (ytMatch && ytMatch[1].length === 11) {
        let youtubeId = ytMatch[1]
        this.addGoods.Goods.head_video = '<iframe src="//www.youtube.com/embed/' + youtubeId + '" frameborder="0" width="100%" height="413" ></iframe>'
      }
      this.selectVideoShow = false
    },
    GoodsShow (type) { // 显示添加商品弹框
      this.selectAddGoodsShow = true
      this.openGoodsType = type
      let arr = Object.keys(this.addGoodsList)
      if (arr.length === 0) {
        this.getGoodsList()
      }
    },
    closeGoods () {
      this.selectAddGoodsShow = false
    },
    async getGoodsList (type) {
      let data = await addApi.getGoodsList(type)
      if (data.Error) { return this.$message.error(data.Info) }
      this.addGoodsList = data
    },
    selectGoodsType () {
      this.getGoodsList(this.addGoodsList.type1)
    },
    selectingGoods (goods) {
      if (this.openGoodsType === 'jump') {
        if (this.addGoods.Goods.skip_id + '' !== goods.id + '') {
          this.addGoods.Goods.skip_id = goods.id
          this.addGoods.skips = goods
        } else {
          this.addGoods.Goods.skip_id = ''
          this.addGoods.skips = {}
        }
      } else if (this.openGoodsType === 'XSgift') {
        if (this.addGoods.gifts.length > 0) {
          for (let j in this.addGoods.gifts) {
            if (this.addGoods.gifts[j].id + '' === goods.id + '') {
              this.addGoods.gifts.splice(j, 1)
              break
            } else {
              if (j === this.addGoods.gifts.length - 1 + '') {
                this.addGoods.gifts.push(goods)
                break
              }
            }
          }
        } else {
          this.addGoods.gifts.push(goods)
        }
      } else if (this.openGoodsType === 'TJdetail') {
        if (this.addGoods.ad_goods_body.length > 0) {
          for (let j in this.addGoods.ad_goods_body) {
            if (this.addGoods.ad_goods_body[j].id + '' === goods.id + '') {
              this.addGoods.ad_goods_body.splice(j, 1)
              break
            } else {
              if (j === this.addGoods.ad_goods_body.length - 1 + '') {
                this.addGoods.ad_goods_body.push(goods)
                break
              }
            }
          }
        } else {
          this.addGoods.ad_goods_body.push(goods)
        }
      } else if (this.openGoodsType === 'TJorders') {
        if (this.addGoods.ad_goods_order.length > 0) {
          for (let j in this.addGoods.ad_goods_order) {
            if (this.addGoods.ad_goods_order[j].id + '' === goods.id + '') {
              this.addGoods.ad_goods_order.splice(j, 1)
              break
            } else {
              if (j === this.addGoods.ad_goods_order.length - 1 + '') {
                this.addGoods.ad_goods_order.push(goods)
                break
              }
            }
          }
        } else {
          this.addGoods.ad_goods_order.push(goods)
        }
      }
    },
    delgift (gift) {
      if (this.openGoodsType === 'XSgift') {
        for (let j in this.addGoods.gifts) {
          if (this.addGoods.gifts[j].id + '' === gift.id + '') {
            this.addGoods.gifts.splice(j, 1)
            break
          }
        }
      } else if (this.openGoodsType === 'TJdetail') {
        for (let j in this.addGoods.ad_goods_body) {
          if (this.addGoods.ad_goods_body[j].id + '' === gift.id + '') {
            this.addGoods.ad_goods_body.splice(j, 1)
            break
          }
        }
      } else if (this.openGoodsType === 'TJorders') {
        for (let j in this.addGoods.ad_goods_order) {
          if (this.addGoods.ad_goods_order[j].id + '' === gift.id + '') {
            this.addGoods.ad_goods_order.splice(j, 1)
            break
          }
        }
      }
    },
    clearGoods (type) {
      if (type === 'TJdetail') {
        this.addGoods.ad_goods_body = []
      } else if (type === 'TJorders') {
        this.addGoods.ad_goods_order = []
      }
    },
    showImg (params) {
      if (params.type === 'spec') {
        this.GoodsSpecsIndex = params.value
      }
      if (params.type === 'detail') {
        this.GoodsSpecsIndex = params.value
      }
      this.openImgtype = params.type
      this.selectImgShow = true
      this.getImgTabs()
    },
    closeImg () {
      this.selectImgShow = false
    },
    async getImgTabs () {
      let data = await addApi.getImgTabs()
      if (data.Error) { return this.$message.error(data.Info) }
      this.imgTabsList = data
    },
    async getImgList (tab, page) {
      let data = await addApi.getImgList(tab, page)
      if (data.Error) { return this.$message.error(data.Info) }
      this.ImgList = data
    },
    selectingImg (img) {
      if (this.openImgtype === 'spec') {
        this.addGoods.Goods.GoodsSpecs[this.GoodsSpecsIndex].img = img.filename
      } else if (this.openImgtype === 'head') {
        this.addGoods.Goods.head_imgs.push(img.filename)
      } else if (this.openImgtype === 'detail') {
        let obj = this.GoodsSpecsIndex.getSelection()
        let length = obj ? this.GoodsSpecsIndex.getSelection().index : 0
        this.GoodsSpecsIndex.insertEmbed(length, 'image', this.CdnBase + img.filename)
        this.GoodsSpecsIndex.setSelection(length + 1)
      }
    },
    clearimg () {
      this.addGoods.Goods.head_imgs = []
    },
    back_list () {
      this.$router.push('/goods/list')
    },
    async add_goods () {
      if (!this.addGoods.Goods.name) return this.$message.error('商品名称不能没有')
      if (!this.addGoods.Goods.sitename) return this.$message.error('网站名称不能没有')
      if (!this.addGoods.Goods.price) return this.$message.error('宣传价格不能没有')
      if (!this.addGoods.Goods.oldprice) return this.$message.error('宣传价格不能没有')
      if (!this.addGoods.Goods.saleno) return this.$message.error('销售量不能没有')
      if (!this.addGoods.Goods.domain_id) return this.$message.error('请选择部署域名')
      if (this.addGoods.Goods.sitedir.split('').length > 20) return this.$message.error('自定义链接地址不能超出20位')
      if (!this.addGoods.Goods.paypal_id) {
        this.addGoods.Goods.paypal_id = null
      }
      if (this.addGoods.Goods.GoodsSpecs.length === 0) return this.$message.error('商品规格不能没有（最少一个）')
      for (let item of this.addGoods.Goods.GoodsSpecs) {
        if (!item.name) {
          return this.$message.error('规格名称不能没有')
        }
        if (item.option2 && item.option2 !== ' ') {
          if (!item.option1 || item.option1 === ' ') {
            return this.$message.error('必须先使用规格1，在使用规格2(' + item.option2 + ')')
          }
        }
        if (!item.price) {
          return this.$message.error('规格价格不能没有')
        }
        if (!item.sku) {
          return this.$message.error('规格sku不能没有')
        }
        // 新增规格无img判断
        if (!item.img) {
          return this.$message.error('规格图片不能没有')
        }
      }
      if (this.addGoods.Goods.head_imgs.length === 0) return this.$message.error('轮播图不能没有（最少一张）')
      if (!this.addGoods.Goods.GoodsContent.content) return this.$message.error('商品详情不能没有')
      let data
      if (this.pageTitle === '保存修改') {
        data = await addApi.edit_Goods(this.addGoods.Goods)
      } else {
        data = await addApi.add_Goods(this.addGoods.Goods)
      }
      if (!data.Error) {
        this.$message.success(data.Info)
        const db = await this.databasePage({
          user: true
        })
        db
          .unset('goodsInfo')
          .write()
        this.$router.push('/goods/list')
      } else {
        this.$message.error(data.Info)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .goods {
    background: #fff;
    /deep/.d2-container-full__footer{
      text-align: center;
    }
  }
  .goods /deep/ .ql-snow .ql-picker{
     height: auto;
  }
</style>
<style>
  .el-table .select_row {
    background: rgba(41, 187, 156, .2);
    color: #29BB9C;
  }
</style>
