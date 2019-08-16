<template>
  <div class="add_add" :key="menuKey">
    <el-form ref="form" :model="form" label-width="90px" :rules="rules">
      <el-form-item label="商品名称">
        <el-input
                size="medium"
                placeholder="商品名请简单明了，不作为网站名（必填）"
                v-model="form.name" />
      </el-form-item>
      <el-form-item label="商品分类" class="goods-class">
        <el-input
                size="medium"
                disabled
                placeholder="请输入内容"
                v-model="form.type1">
        </el-input>
        <el-input
                size="medium"
                disabled
                placeholder="请输入内容"
                v-model="form.type2">
        </el-input>
        <el-input
                size="medium"
                disabled
                placeholder="请输入内容"
                v-model="form.type3">
        </el-input>
        <el-button @click="showType">选择分类</el-button>
      </el-form-item>
      <el-form-item label="内部名称">
        <el-input
                size="medium"
                placeholder="发货，库存需要, 同一商品必须一样（可选）"
                v-model="form.userkey" />
      </el-form-item>
      <el-form-item label="显示名称"
                    :show-message="false"
                    :rules="[
                      { required: true},
                    ]"
      >
        <el-input
                size="medium"
                placeholder="在单页上是网站标题，在商城上是商品名称（必填）"
                v-model="form.sitename" />
      </el-form-item>
      <el-form-item label="商品简介">
        <d2-quill style="min-height: 200px; margin-bottom: 20px;" v-model="form.sitedesc" :toolbar="toolbar" :placeholder="placehloder"/>
      </el-form-item>
      <el-form-item label="语言/货币">
        <el-select v-model="form.language" class="lang">
          <el-option
            v-for="item in languages"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="form.money">
          <el-option
            v-for="item in moneys"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支持711" v-if="form.money==='NT'">
        <el-select v-model="form.receive_711" class="lang">
          <el-option :key="item.value"
                     :label="item.name"
                     :value="item.value"
                     v-for="item in [{name:'是',value:'1'},{name:'否',value:'0'}]"
                     :selected="form.receive_711+'' === item.value+''"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支持全家" v-if="form.money==='NT'">
        <el-select v-model="form.receive_fm" class="lang">
          <el-option :key="item.value"
                     :label="item.name"
                     :value="item.value"
                     v-for="item in [{name:'是',value:'1'},{name:'否',value:'0'}]"
                     :selected="form.receive_fm+'' === item.value+''"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格/销量" class="goods-class goods_sales">
        <el-col :span="6">
          <el-form-item
            prop="price"
            :show-message="false"
          >
            <el-input
              :min="1"
              auto-complete="off"
              type="number"
              size="medium"
              placeholder="现在售价"
              v-model="form.price">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            prop="oldprice"
            :show-message="false"
          >
            <el-input
              :min="1"
              auto-complete="off"
              type="number"
              size="medium"
              placeholder="原价"
              v-model="form.oldprice">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            prop="saleno"
            :show-message="false"
          >
            <el-input
              :min="0"
              auto-complete="off"
              type="number"
              size="medium"
              placeholder="累计销量"
              v-model="form.saleno">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="共享/主题">
        <el-select v-model="form.isshare" class="lang">
          <el-option  :key="item.value"
                      :label="item.name"
                      :value="item.value"
                      v-for="item of $Res.shares"></el-option>
        </el-select>
        <el-select v-model="form.color">
          <el-option  :key="item.value"
                      :label="item.name"
                      :value="item.value"
                      v-for="item of $Res.colors"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部署域名" class="goods-class">
        <el-input
                width="500"
                size="medium"
                disabled
                v-model="form.domain_name_str">
        </el-input>
        <el-button @click="showDomain">选择域名</el-button>
      </el-form-item>
      <el-form-item label="链接首页">
        <el-select v-model="form.home_id" class="lang">
          <el-option label="允许" value="1"></el-option>
          <el-option label="禁止" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择首页">
        <el-select v-model="form.home_select" class="lang">
          <el-option label="默认" value="0" :selected="form.home_select+''==='0'"></el-option>
          <el-option  :key="item.id"
                      :label="item.sitename"
                      :value="item.id"
                      :selected="item.id+'' === form.home_select+''"
                      v-for="item of addGoods.homeList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="访问链接" v-if="domainNameStrform()">
        <el-select v-model="form.is_domain" class="lang">
          <el-option  :key="item.value"
                      :label="item.name"
                      :value="item.value"
                      v-for="item of [{name:'域名访问',value:true},{name:'自定义链接访问',value:false}]"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="自定义链接" v-if="form.is_domain===false||domainNameStrform2()">
        <el-input size="medium" v-model="form.sitedir" ></el-input>
      </el-form-item>
      <el-form-item label="模板" class="goods-class">
        <el-input
                size="medium"
                disabled
                v-model="themeName">
        </el-input>
        <el-button @click="selectTheme">选择模板</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'add',
  data () {
    let checkoutPrice = (rule, value, callback) => {
      let patter = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
      if (value === '') {
        return callback(new Error('不能为空'))
      } else if (!patter.test(value) || value < 1) {
        return callback(new Error('必须为大于一的非负整数!'))
      } else {
        return callback()
      }
    }
    let checkoutOldprice = (rule, value, callback) => {
      let patter = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
      if (value === '') {
        return callback(new Error('不能为空'))
      } else if (!patter.test(value) || value < 1) {
        return callback(new Error('必须为大于一的非负数!'))
      } else {
        return callback()
      }
    }
    let checkoutSaleno = (rule, value, callback) => {
      let patter = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
      if (value === '') {
        return callback(new Error('不能为空'))
      } else if (!patter.test(value)
      ) {
        return callback(new Error('必须为大于一的非负数!'))
      } else {
        return callback()
      }
    }
    return {
      menuKey: 1,
      form: {},
      languages: [],
      moneys: [],
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
      ],
      placehloder: '简介(可选)',
      rules: {
        price: [
          { validator: checkoutPrice, trigger: 'blur', min: '1', max: '1000' }
        ],
        oldprice: [
          { validator: checkoutOldprice, trigger: 'blur', min: '1', max: '1000' }
        ],
        saleno: [
          { validator: checkoutSaleno, trigger: 'blur', min: '1', max: '1000' }
        ]
      },
      themeName: ''
    }
  },
  props: {
    addGoods: {
      type: Object
    }
  },
  created () {
    for (let lang of this.$Res.languages) {
      lang.label = lang.name
    }
    this.languages = this.$Res.languages
    for (let item of this.$Res.moneys) {
      item.label = item.name
    }
    this.moneys = this.$Res.moneys
  },
  methods: {
    domainNameStrform () {
      if (this.form.domain_name_str && this.form.domain_name_str.indexOf('/') === -1) { return true } else { return false }
    },
    domainNameStrform2 () {
      if (this.form.domain_name_str && this.form.domain_name_str.indexOf('/') > -1) { return true } else { return false }
    },
    showDomain () {
      this.$emit('showDomain')
    },
    showType () {
      this.$emit('showType')
    },
    selectTheme () {
      this.$emit('showTheme')
    }
  },
  watch: {
    'addGoods' () {
      this.form = this.addGoods.Goods ? this.addGoods.Goods : {}
      // ++this.menuKey
    },
    'addGoods.Goods.GoodsTheme.name' () {
      this.themeName = this.addGoods.Goods.GoodsTheme.name
    }
  }
}
</script>

<style lang="less" scoped>
  .add_add {
    padding: 5px;
    .mde {
      margin-bottom: -16px;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
    .goods-class{
      /*width: 500px;*/
      .el-input {
        width: 300px;
        margin-right: 5px;
      }
      button {
        width: 100px;
        height: 38px;
        background: #29bb9c;
        color: white;
      }
    }
    .lang {
      margin-right: 5px;
    }
    .goods_sales{
      /deep/.el-input__inner{
        padding: 0 0 0 15px;
      }
    }
  }
</style>
