<template>
  <div class="add_service" :key="menuKey">
    <el-form label-width="128px" label-position="left" >
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            FB客服
            <el-tooltip class="item" effect="dark" popper-class="onepiece" content="功能说明：这里填写了会覆盖个人设置里面的客服。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <div>
          <el-row>
            <el-col :span="20">
              <el-input placeholder="例如：http://m.me/11256431334134" v-model="Goods.fblink"/>
            </el-col>
            <el-col :span="4">
              <el-button type="success" size="small" @click="showService('facebook')">选择</el-button>
              <el-button type="primary" plain size="small" @click="getDefaultService('facebook')">默认</el-button>
              <el-button type="danger" plain size="small" @click="clearService('facebook')">清空</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            LINE客服
            <el-tooltip class="item" effect="dark" content="功能说明：这里填写了会覆盖个人设置里面的客服。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <div>
          <el-row>
            <el-col :span="20">
              <el-input placeholder="例如：http://line.me/ti/p/fsdRTREbb15fds" v-model="Goods.linelink"/>
            </el-col>
            <el-col :span="4">
              <el-button type="success" size="small" @click="showService('line')">选择</el-button>
              <el-button type="primary" plain size="small" @click="getDefaultService('line')">默认</el-button>
              <el-button type="danger" plain size="small" @click="clearService('line')">清空</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">
           WhatsApp客服
            <el-tooltip class="item" effect="dark" content="功能说明：这里填写了会覆盖个人设置里面的客服。 " placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <div>
          <el-row>
            <el-col :span="20">
              <el-input placeholder="例如：http://line.me/ti/p/fsdRTREbb15fds" v-model="Goods.whatsapplink"/>
            </el-col>
            <el-col :span="4">
              <el-button type="success" size="small" @click="showService('whatsapp')">选择</el-button>
              <el-button type="primary" plain size="small" @click="getDefaultService('whatsapp')">默认</el-button>
              <el-button type="danger" plain size="small" @click="clearService('whatsapp')">清空</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            页尾是否显示
            <el-tooltip class="item" effect="dark" content="功能说明：选择是否显示关于我们，联系我们等页尾部分。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <div class="serveSelect">
          <el-select class="lang" v-model="Goods.show_footer">
            <el-option :label="item.name" :value="item.value" :key="item.value" v-for="item of [{name:'是',value:true},{name:'否',value:false}]"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            关于我们
            <el-tooltip class="item" effect="dark" content="功能说明：选择默认或指定使用哪条关于我们的页面。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <div class="serveSelect">
          <el-select placeholder="请选择" popper-class="service_select" v-model="Goods.about_id">
            <el-option-group>
              <el-option value="0" label="默认"></el-option>
              <el-option :value="item.id" :label="item.linkname+'('+getLanguageStr(item.language)+'|'+ item.title+')'" :key="item.id" v-for="item of pagelist" v-show="item.classtype === '1'"></el-option>
            </el-option-group>
            <el-option-group label="必选"></el-option-group>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            联系我们
            <el-tooltip class="item" effect="dark" content="功能说明：选择默认或指定使用哪条联系我们的页面。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <div class="serveSelect">
          <el-select placeholder="请选择" popper-class="service_select" v-model="Goods.contact_id">
            <el-option-group>
              <el-option value="0" label="默认"></el-option>
              <el-option :value="item.id" :label="item.linkname+'('+getLanguageStr(item.language)+'|'+ item.title+')'" :key="item.id" v-for="item of pagelist" v-show="item.classtype === '2'"></el-option>
            </el-option-group>
            <el-option-group label="必选"></el-option-group>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">
           隐私保护
            <el-tooltip class="item" effect="dark" content="功能说明：选择默认或指定使用哪条隐私保护的页面。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <div class="serveSelect">
          <el-select placeholder="请选择" popper-class="service_select" v-model="Goods.privacy_id">
            <el-option-group>
              <el-option value="0" label="默认"></el-option>
              <el-option :value="item.id" :label="item.linkname+'('+getLanguageStr(item.language)+'|'+ item.title+')'" :key="item.id" v-for="item of pagelist" v-show="item.classtype === '3'"></el-option>
            </el-option-group>
            <el-option-group label="必选"></el-option-group>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            服务条款
            <el-tooltip class="item" effect="dark" content="功能说明：选择默认或指定使用哪条服务条款的页面。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <div class="serveSelect">
          <el-select placeholder="请选择" popper-class="service_select" v-model="Goods.terms_id">
            <el-option-group>
              <el-option value="0" label="默认"></el-option>
              <el-option :value="item.id" :label="item.linkname+'('+getLanguageStr(item.language)+'|'+ item.title+')'" :key="item.id" v-for="item of pagelist" v-show="item.classtype === '4'"></el-option>
            </el-option-group>
            <el-option-group label="必选"></el-option-group>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            配送政策
            <el-tooltip class="item" effect="dark" content="功能说明：选择默认或指定使用哪条配送政策的页面。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <div class="serveSelect">
          <el-select placeholder="请选择" popper-class="service_select" v-model="Goods.service_id">
            <el-option-group>
              <el-option value="0" label="默认"></el-option>
              <el-option :value="item.id" :label="item.linkname+'('+getLanguageStr(item.language)+'|'+ item.title+')'" :key="item.id" v-for="item of pagelist" v-show="item.classtype === '5'"></el-option>
            </el-option-group>
            <el-option-group label="必选"></el-option-group>
          </el-select>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'service',
  data () {
    return {
      menuKey: 1,
      Goods: {},
      pagelist: []
    }
  },
  props: {
    addGoods: {
      type: Object
    }
  },
  watch: {
    'addGoods' () {
      this.Goods = this.addGoods.Goods ? this.addGoods.Goods : {}
      this.pagelist = this.addGoods.pagelist ? this.addGoods.pagelist : []
      ++this.menuKey
    }
  },
  methods: {
    getLanguageStr (lang) {
      for (let item of this.$Res.languages) {
        if (item.value === lang) {
          return item.name
        }
      }
    },
    showService (type) {
      this.$emit('showService', type)
    },
    getDefaultService (type) {
      this.$emit('getDefaultService', type)
    },
    clearService (type) {
      this.$emit('clearService', type)
    }
  }
}
</script>

<style scoped lang="less">
.add_service{
  .el-button--small{
    padding: 13px 15px;
    border-radius: 0;
  }
  .el-button+.el-button{
    margin-left: 0px;
  }
  .el-form-item__content{
    line-height: 38px;
  }
  .label_title {
    text-align: center;
  }
  .fa{
    color: #EFA100;
  }
  .serveSelect{
    .el-select{
      width: 100%;
    }
  }
}
</style>
