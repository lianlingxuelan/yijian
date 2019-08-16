<template>
  <div class="add_recommend">
    <el-form label-width="128px" label-position="left" >
      <el-form-item >
        <span slot="label">
          <div class="label_title">详情商品推荐</div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="GoodsShow('TJdetail')">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="clearGoods('TJdetail')">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div class="TJdetail" v-if="detailLength>0">
          <div class="skip" v-for="(goods, index) of addGoods.ad_goods_body" @click="go_url(goods)" :key="index">
            <el-tag type="info" class="delskip" @click="delgift(goods)" @click.stop size="small" effect="dark">删除</el-tag>
            <img :src="addGoods.CdnBase + goods.head_imgs.split(';')[0]+'-221'" class="image">
            <div class="skipsName">
              <span>{{goods.name}}</span>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">下单商品推荐</div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="GoodsShow('TJorders')">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="clearGoods('TJorders')">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div class="TJdetail" v-if="ordersLength>0">
          <div class="skip" v-for="(goods, index) of addGoods.ad_goods_order" @click="go_url(goods)" :key="index">
            <el-tag type="info" class="delskip" @click="delgift(goods)" @click.stop size="small" effect="dark">删除</el-tag>
            <img :src="addGoods.CdnBase + goods.head_imgs.split(';')[0]+'-221'" class="image">
            <div class="skipsName">
              <span>{{goods.name}}</span>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'recommend',
  data () {
    return {
      Goods: {},
      detailLength: 0,
      ordersLength: 0
    }
  },
  props: {
    addGoods: {
      type: Object
    }
  },
  methods: {
    GoodsShow (type) {
      this.$emit('GoodsShow', type)
    },
    delgift (goods) {
      this.$emit('delgift', goods)
    },
    go_url (goods) {
      if (!goods) return this.$message.error('请先选择跳转商品')
      window.open('http://' + goods.Domain.name + '/' + goods.sitedir, '_blank')
    },
    clearGoods (type) {
      this.$emit('clearGoods', type)
    }
  },
  watch: {
    'addGoods' () {
      this.Goods = this.addGoods.Goods ? this.addGoods.Goods : {}
      ++this.menuKey
    },
    'addGoods.ad_goods_body' () {
      this.detailLength = this.addGoods.ad_goods_body.length
    },
    'addGoods.ad_goods_order' () {
      this.ordersLength = this.addGoods.ad_goods_order.length
    }
  }
}
</script>

<style scoped lang="less">
  .add_recommend {
    .label_title {
      text-align: center;
    }
    /deep/.el-button+.el-button{
      margin-left: 4px;
    }
    .el-form-item {
      margin-bottom: 10px;
      /*border-bottom: 1px solid #ccc;*/
      padding: 0 0 20px;
    }
    /deep/.el-col{
      text-align: center;
      height: 32px;
      line-height: 32px;
    }
    .TJdetail {
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
        }
      }
    }
  }
</style>
