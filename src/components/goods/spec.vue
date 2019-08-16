<template>
  <div class="spec" :key="menuKey">
    <el-form ref="spec_form_link" :model="spec_form_link" label-width="100px">
      <el-form-item label="规格链接">
        <el-input
          size="medium"
          placeholder="只能抓取https://gz.17zwd.com网站,例如:https://gz.17zwd.com/item.htm?GID=110079266%26spm=0.42.137.15423.110079266.0"
          v-model="spec_form_link.link">
          <template slot="append"><el-button type="success" size="small" @click="add_linkspec('spec')">抓取规格</el-button></template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-form ref="spec_form_spec" :model="spec_form_spec" label-width="100px">
      <el-form-item>
        <span slot="label" class="label_title">
          主规格
          <el-tooltip class="item" effect="dark" content="功能说明：商品的主规格。" placement="right" popper-class="onepiece">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          </el-tooltip>
        </span>
        <el-input-tag v-model="spec_form_spec.specname" size="medium"></el-input-tag>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="label_title">规格属性1
          <el-tooltip class="item" effect="dark" content="功能说明：商品第一属性。" placement="right" popper-class="onepiece">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          </el-tooltip>
        </span>
        <el-input-tag v-model="spec_form_spec.option1" size="medium"></el-input-tag>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="label_title">
          规格属性2
          <el-tooltip class="item" effect="dark" content="功能说明：商品第二属性。" placement="right" popper-class="onepiece">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          </el-tooltip>
        </span>
        <el-input-tag v-model="spec_form_spec.option2" size="medium"></el-input-tag>
      </el-form-item>
      <el-form-item>
        <span slot="label" class="label_title">
          价格
          <el-tooltip class="item" effect="dark" content="功能说明：商品对应属性的单价。" placement="right" popper-class="onepiece">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          </el-tooltip>
        </span>
        <el-input
          size="medium"
          v-model="spec_form_spec.price">
          <template slot="append"> <el-button type="success" size="small" @click="creatSpecs">生成规格</el-button></template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table :data="GoodsSpecs" style="width: 100%">
      <el-table-column header-align="center" width="350">
        <template slot="header">
          <el-input
            v-model="Goods.option1_name"
            size="mini"
            placeholder="主规格名，例：颜色"/>
        </template>
        <template slot-scope="props">
          <img @click="showImg('spec', props.$index)" class="specImg" :src="props.row.img?CdnBase+props.row.img+'-101':''">
          <span @click="showImg('spec', props.$index)"  v-if="!props.row.img" class="spec_img"><i class="primary el-icon-circle-plus"></i></span>
          <el-input v-model="props.row.name" :placeholder="Goods.option1_name+'显示名称'"></el-input>
          <el-checkbox v-model="props.row.isdefault">默认选中</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        width="350">
        <template slot="header">
          <el-input
            v-model="Goods.option2_name"
            size="mini"
            placeholder="规格1名，例：尺码"/>
        </template>
        <template slot-scope="props">
          <el-input v-model="props.row.option1"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        width="350">
        <template slot="header">
          <el-input
            v-model="Goods.option3_name"
            size="mini"
            placeholder="规格2名，例：套餐"/>
        </template>
        <template slot-scope="props">
          <el-input v-model="props.row.option2"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        label="价格">
        <template slot-scope="props">
          <el-input type="number" v-model="props.row.price"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        label="库存量">
        <template slot-scope="props">
          <el-input type="number" v-model="props.row.inventory"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        label="SKU">
        <template slot-scope="props">
          <el-input type="text" v-model="props.row.sku"></el-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" width="50" label="删除">
        <template slot-scope="props">
          <i style="cursor:pointer" class="danger el-icon-delete" @click="delete_spec(props.$index)"></i>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center">
      <el-button type="primary" size="medium" @click="add_spec">
        增加一个颜色
      </el-button>
    </div>
  </div>
</template>

<script>
import ElInputTag from '_c/ElInputTag/ElInputTag.vue'
import { addApi } from '../../api/add'

export default {
  name: 'spec',
  data () {
    return {
      menuKey: 1,
      spec_form_link: {
        link: ''
      },
      spec_form_spec: {},
      GoodsSpecs: [],
      Goods: {},
      pords: []
    }
  },
  props: {
    addGoods: {
      type: Object
    },
    CdnBase: {
      type: String
    }
  },
  components: { ElInputTag },
  methods: {
    async add_linkspec (type) {
      let data = await addApi.add_linkspec(this.spec_form_link.link, type)
      this.GoodsSpecs = data
    },
    add_spec () {
      let len = this.GoodsSpecs.length
      this.GoodsSpecs.push({
        name: '',
        option1: '',
        option2: '',
        price: '',
        sku: '',
        inventory: 1000,
        img: '',
        price_info: '',
        isdefault: len === 0 ? 1 : 0
      })
    },
    delete_spec (index) {
      this.GoodsSpecs.splice(index, 1)
    },
    creatSpecs () {
      if (!this.spec_form_spec.specname) return this.$message('请先填写主规格')
      this.$confirm('确定生成规格列表，将覆盖现有列表？', '提示', {
        confirmButtonText: '生成',
        cancelButtonText: '点错了',
        type: 'warning'
      }).then(() => {
        this.GoodsSpecs = []
        let specnameArr = this.spec_form_spec.specname
        let option1Arr = this.spec_form_spec.option1
        let option2Arr = this.spec_form_spec.option2
        for (let j in specnameArr) {
          if (option1Arr.length > 0) {
            for (let k in option1Arr) {
              if (option2Arr.length > 0) {
                for (let l in option2Arr) {
                  if (option1Arr[k] !== '' && option2Arr[l] !== '') {
                    this.GoodsSpecs.push({
                      name: specnameArr[j],
                      option1: option1Arr[k],
                      option2: option2Arr[l],
                      option3: '',
                      price: parseInt(this.spec_form_spec.price),
                      sku: '',
                      inventory: 1000
                    })
                  }
                }
              } else {
                if (option1Arr[k] !== '') {
                  this.GoodsSpecs.push({
                    name: specnameArr[j],
                    option1: option1Arr[k],
                    option2: '',
                    option3: '',
                    price: parseInt(this.spec_form_spec.price),
                    sku: '',
                    inventory: 1000
                  })
                }
              }
            }
          } else {
            if (specnameArr[j] !== '') {
              this.GoodsSpecs.push({
                name: specnameArr[j],
                option1: '',
                option2: '',
                option3: '',
                price: parseInt(this.spec_form_spec.price),
                sku: '',
                inventory: 1000
              })
            }
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    showImg (spec, value) {
      this.$emit('showImg', { type: spec, value: value })
    }
  },
  watch: {
    'addGoods' () {
      this.Goods = this.addGoods.Goods ? this.addGoods.Goods : {}
      this.GoodsSpecs = this.addGoods.Goods ? this.addGoods.Goods.GoodsSpecs : []
      ++this.menuKey
    }
  }
}
</script>

<style lang="less" scoped>
  .spec {
    /deep/.el-input-group__append{
      background: #29bb9c;
      color: white;
    }
    .label_title {
      .fa {
        color: #EFA100;
      }
    }
  }
  .spec /deep/ .el-table--enable-row-transition .el-table__body td {
    text-align: center;
  }
  .spec_img{
    font-size: 40px;
    display: inline-block;
  }
</style>
