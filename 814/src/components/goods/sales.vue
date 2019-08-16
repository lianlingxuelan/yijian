<template>
  <div class="add_sales" :key="menuKey">
    <el-form label-width="160px">
      <el-form-item>
        <span slot="label">
          <div class="label_title">
            多件总价套餐
             <el-tooltip class="item" effect="dark" content="功能说明：设置多件套餐及价格，赠品数量。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="addManyoff()">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="clearManyoff()">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div class="sales-table">
          <el-table
            border
            :data="Goods.manyoff"
            style="width: 100%">
            <el-table-column
              align="center"
              header-align="center"
              label="介绍"
              width="500">
              <template slot-scope="scope">
                <el-input controls-position="right" v-model="scope.row.name" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              label="件数"
              width="300">
              <template slot-scope="scope">
                <el-input controls-position="right" v-model="scope.row.salecount" size="mini" :disabled="true"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              label="价格"
              width="300">
              <template slot-scope="scope">
                <el-input-number controls-position="right" :min="0" v-model="scope.row.price" size="mini"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              label="赠品件数"
              width="200">
              <template slot-scope="scope">
                <el-input controls-position="right" v-model="scope.row.giftcount" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <i class="fa fa-close" aria-hidden="true" @click="handleDelete(scope.$index, 'manyoff')"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <div class="label_title">
            单件优惠
            <el-tooltip class="item" effect="dark" popper-class="onepiece" content="功能说明：设置总价格减价套餐，购买价格达到设置价格时,则在合计价格的基础上减价，超过最大设置价格会按照你设置的最大金额套餐数减价。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="addManyoffNew">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="clearManyoffNew">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div class="sales-table">
          <el-table
            border
            :show-header="false"
            :data="Goods.manyoff_new"
            style="width: 100%">
            <el-table-column
              label="日期"
              align="center"
              header-align="center"
              width="200">
              <template>
               <span>第</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              width="300">
              <template slot-scope="scope">
                <el-input-number controls-position="right" :min="0" v-model="scope.row.salecount" size="mini"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              width="300">
              <template>
                <span>件，单价减</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              width="300">
              <template slot-scope="scope">
                <el-input-number controls-position="right" :min="0" v-model="scope.row.price" size="mini"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column width="150"  align="center">
              <template slot-scope="scope">
                <i class="fa fa-close" aria-hidden="true" @click="handleDelete(scope.$index, 'manyoff_new')"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <div class="label_title">
            多件优惠
             <el-tooltip class="item" effect="dark" popper-class="onepiece" content="功能说明：设置总件数减价套餐，购买件数达到设置件数，则在合计价格的基础上减价，超过最大设置件数会按照你设置的最大件套餐数减价。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="addSaleoff">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="clearSaleoff">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div class="sales-table">
          <el-table
            border
            :show-header="false"
            :data="Goods.saleoff"
            style="width: 100%">
            <el-table-column
              label="日期"
              align="center"
              header-align="center"
              width="200">
              <template>
                <span>第</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              width="300">
              <template slot-scope="scope">
                <el-input-number controls-position="right" :min="1" v-model="scope.row.salecount" size="mini"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              width="300">
              <template>
                <span>件，总价减</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              width="300">
              <template slot-scope="scope">
                <el-input-number controls-position="right" :min="0" v-model="scope.row.offprice" size="mini"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column width="150"  align="center">
              <template slot-scope="scope">
                <i class="fa fa-close" aria-hidden="true" @click="handleDelete(scope.$index, 'saleoff')"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <div class="label_title">
            价格满减
             <el-tooltip class="item" effect="dark" popper-class="onepiece" content="功能说明：设置总价格减价套餐，购买价格达到设置价格时，则在合计价格的基础上减价，超过最大设置价格会按照你设置的最大金额套餐数减价。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="addPriceoff">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="clearPriceoff">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div class="sales-table">
          <el-table
            border
            :show-header="false"
            :data="Goods.priceoff"
            style="width: 100%">
            <el-table-column
              label="日期"
              align="center"
              header-align="center"
              width="200">
              <template>
                <span>第</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              width="300">
              <template slot-scope="scope">
                <el-input-number controls-position="right" :min="0" v-model="scope.row.totalmoney" size="mini"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              width="300">
              <template>
                <span>总价减</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              width="300">
              <template slot-scope="scope">
                <el-input-number controls-position="right" :min="0" v-model="scope.row.saleprice" size="mini"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column width="150"  align="center">
              <template slot-scope="scope">
                <i class="fa fa-close" aria-hidden="true" @click="handleDelete(scope.$index, 'priceoff')"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
          <span slot="label">
            <div class="label_title">
              赠品
               <el-tooltip class="item" effect="dark" popper-class="onepiece" content="功能说明：根据活动内容和促销计划，赠送相应商品，赠品不计算价格。" placement="right">
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
              </el-tooltip>
            </div>
            <el-row>
              <el-col :span="24">
                <el-button type="primary" plain size="mini" @click="giftShow('XSgift')">增加</el-button>
              </el-col>
              <el-col :span="24">
                <el-button type="danger" plain size="mini" @click="clearGift()">清空</el-button>
              </el-col>
            </el-row>
          </span>
        <div class="XSgift">
          <div class="skip" v-for="(gift, index) of addGoods.gifts" @click="go_url(gift)" :key="index">
            <el-tag type="info" class="delskip" @click="delgift(gift)" @click.stop size="small" effect="dark">删除</el-tag>
            <img :src="addGoods.CdnBase + gift.head_imgs.split(';')[0]+'-221'" class="image">
            <div class="skipsName">
              <span>{{gift.name}}</span>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <div class="label_title">
            增加一件提示
             <el-tooltip class="item" effect="dark" popper-class="onepiece" content="功能说明：再选一件（+）按钮提示信息，输入内容将替换原来的再选一件。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <el-input size="medium" v-model="Goods.add_info"></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <div class="label_title">
            规格信息说明
             <el-tooltip class="item" effect="dark" popper-class="onepiece"
                         content="功能说明：编辑对应第几件商品的促销信息或者说明，显示在对应件数信息第一列。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="addCountInfo">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="clearCountInfo">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div class="sales-table">
          <el-table
            border
            :data="Goods.count_info"
            style="width: 100%">
            <el-table-column
              align="center"
              header-align="center"
              label="件数"
              width="600">
              <template slot-scope="scope">
                <el-input controls-position="right" v-model="scope.row.count" size="mini" :disabled="true"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              label="介绍"
              width="600">
              <template slot-scope="scope">
                <el-input controls-position="right" v-model="scope.row.name" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <i class="fa fa-close" aria-hidden="true" @click="handleDelete(scope.$index, 'count_info')"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <div class="label_title">
            倒计时截止时间设置
             <el-tooltip class="item" effect="dark" popper-class="onepiece" content="功能说明：设置产品倒计时截至时间，适用于有倒计时功能的模板。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <el-date-picker
          v-model="Goods.countdown"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <div class="label_title">
            提示信息
           <el-tooltip class="item" effect="dark" popper-class="onepiece" content="功能说明：客户购买帮助提示信息，显示在客户（地址）信息栏上方。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <el-input size="medium" v-model="Goods.order_prompt_info"></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          <div class="label_title">虚拟促销(库存)信息</div>
        </span>
        <el-col :span="6">
          <el-input size="medium" placeholder="促销信息" v-model="Goods.sale_num"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'sales',
  data () {
    return {
      menuKey: 1,
      Goods: {},
      giftLength: 0
    }
  },
  methods: {
    addManyoff () {
      this.Goods.manyoff.push({
        name: '', salecount: this.Goods.manyoff.length + 1, price: 0, giftcount: ''
      })
    },
    clearManyoff () {
      this.Goods.manyoff = []
    },
    addManyoffNew () {
      this.Goods.manyoff_new.push({ salecount: this.Goods.manyoff_new.length + 1, price: 0 })
    },
    clearManyoffNew () {
      this.Goods.manyoff_new = []
    },
    addSaleoff () {
      this.Goods.saleoff.push({ salecount: this.Goods.saleoff.length + 1, offprice: 0 })
    },
    clearSaleoff () {
      this.Goods.manyoff = []
    },
    addPriceoff () {
      this.Goods.priceoff.push({ totalmoney: '', saleprice: 0 })
    },
    clearPriceoff () {
      this.Goods.priceoff = []
    },
    addCountInfo () {
      this.Goods.count_info.push({ name: '', count: this.Goods.count_info.length })
    },
    clearCountInfo () {
      this.Goods.count_info = []
    },
    handleDelete (index, type) {
      this.Goods[type].splice(index, 1)
    },
    GoodsShow (type) {
      this.$emit('GoodsShow', type)
    },
    delgift (gift) {
      this.$emit('delgift', gift)
    },
    go_url (goods) {
      if (!goods) return this.$message.error('请先选择跳转商品')
      if (goods.Domain) {
        window.open('http://' + goods.Domain.name + '/' + goods.sitedir, '_blank')
      } else {
        return this.$message.error('请先配置跳转商品域名')
      }
    },
    giftShow (type) {
      this.$emit('GoodsShow', type)
    },
    clearGift () {
      this.addGoods.gifts = []
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
      this.GoodsSpecs = this.addGoods.Goods ? this.addGoods.Goods.GoodsSpecs : []
      ++this.menuKey
    }
  }
}
</script>

<style scoped lang="less">
  .add_sales {
    .label_title {
      text-align: center;
    }

    /deep/ .el-button + .el-button {
      margin-left: 4px;
    }

    .el-form-item {
      margin-bottom: 10px;
      /*border-bottom: 1px solid #ccc;*/
    }

    /deep/ .el-col {
      text-align: center;
      height: 32px;
      line-height: 32px;
    }
    /deep/.fa{
      color: #EFA100;
    }
    .sales-table{
      /deep/.fa{
        color: #555;
      }
    }
    /deep/.el-table td, /deep/.el-table th{
      padding: 5px 0;
    }
    .el-input--mini{
      /deep/.el-input__inner{
        text-align: center;
      }
    }
    .XSgift {
      .skip{
        display: inline-block;
        width: 140px;
        position: relative;
        padding-bottom: 30px;
        line-height: 10px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        img{
          width: 100%;
          height: 140px;
        }
        .skipsName {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30px;
          text-align: center;
          padding: 10px ;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          white-space: nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
        }
        .delskip {
          position: absolute;
          right: 0;
          border-radius: 0;
          cursor:pointer;
        }
      }
    }
  }
</style>
