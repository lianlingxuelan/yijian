<template>
  <el-dialog :visible.sync="goodsShow" center  width="1022px" :before-close="closeGoods">
    <span slot="title">共{{GoodsLength}}商品</span>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-select v-model="addGoodsList.type1" placeholder="请选择" @change="selectGoodsType()">
          <el-option
            v-for="item in addGoodsList.Types1"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="18">
        <el-input v-model="searchGoods" placeholder="搜索商品名称"></el-input>
      </el-col>
    </el-row>
    <div class="GoodsImgCont">
      <el-row :gutter="20" v-show="list.length === 0">
        <el-col :span="12" :offset="6"><div class="grid-content bg-purple">暂无数据</div></el-col>
      </el-row>
      <el-row :gutter="5" v-show="list.length>0">
        <el-col v-for="(goods, index) in list" :key="index" :span="3">
          <div class="block" @click="selectingGoods(goods)">
            <div class="shade" v-show="shoeShade(goods)">已选择</div>
            <div class="topDate">创建于{{goodsDate(goods.created_at)}}</div>
            <el-image
              style="width: 100%; height: 123px"
              :src="addGoodsList.CdnBase+goods.head_imgs.split(';')[0]+'-150'"
              fit="fill">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div class="bottomName">{{goods.name}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'selectGoods',
  data () {
    return {
      Goods: {},
      list: [],
      searchGoods: '',
      GoodsList: ''
    }
  },
  props: {
    selectAddGoodsShow: {
      type: Boolean
    },
    addGoods: {
      type: Object
    },
    addGoodsList: {
      type: Object
    },
    openGoodsType: {
      type: String
    }
  },
  methods: {
    closeGoods () {
      this.$emit('closeGoods')
    },
    goodsDate (date) {
      return new Date(date).NatureTime()
    },
    selectGoodsType () {
      this.$emit('selectGoodsType')
    },
    selectingGoods (item) {
      this.$emit('selectingGoods', item)
    },
    shoeShade (goods) {
      if (this.openGoodsType === 'jump') {
        if (goods.id + '' === this.Goods.skip_id + '') {
          return true
        }
      } else if (this.openGoodsType === 'XSgift') {
        for (let j in this.addGoods.gifts) {
          if (this.addGoods.gifts[j].id + '' === goods.id + '') {
            return true
          }
        }
      } else if (this.openGoodsType === 'TJdetail') {
        for (let j in this.addGoods.ad_goods_body) {
          if (this.addGoods.ad_goods_body[j].id + '' === goods.id + '') {
            return true
          }
        }
      } else if (this.openGoodsType === 'TJorders') {
        for (let j in this.addGoods.ad_goods_order) {
          if (this.addGoods.ad_goods_order[j].id + '' === goods.id + '') {
            return true
          }
        }
      }
      return false
    }
  },
  computed: {
    goodsShow () {
      return this.selectAddGoodsShow
    },
    GoodsLength () {
      return this.GoodsList.length
    }
  },
  watch: {
    'addGoods' () {
      this.Goods = this.addGoods.Goods ? this.addGoods.Goods : {}
    },
    'addGoodsList' () {
      this.GoodsList = this.addGoodsList.GoodsList
      this.list = this.GoodsList
    },
    'searchGoods' () {
      let arr = []
      if (this.searchGoods.length > 0) {
        for (let item of this.list) {
          if (item.name.indexOf(this.searchGoods) >= 0) {
            arr.push(item)
          }
        }
        this.list = arr
      } else {
        this.list = this.GoodsList
      }
    }
  }
}
</script>

<style scoped lang="less">
.GoodsImgCont{
  margin-top: 15px;
  .block{
    border: 1px solid #b9b9b9;
    position: relative;
    height: 125px;
  }
  .bottomName{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    text-align: center;
    color: #fff;
    font-size: 12px;
    padding: 5px;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .topDate {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    text-align: center;
    color: #fff;
    font-size: 12px;
    padding: 5px;
    z-index: 15;
    display: none;
  }
  .block:hover .topDate{
    display: block;
  }
  .bg-purple {
    text-align: center;
  }
  .shade {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 20;
    background: rgba(44, 108, 255, 0.5);
    color: #fff;
    line-height: 123px;
    text-align: center;
  }
}
</style>
