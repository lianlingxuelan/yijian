<template>
  <div id="add_swiper" :key="menuKey">
    <el-form label-width="128px" label-position="left" >
      <el-form-item >
        <span slot="label">
          <div class="label_title">轮播图</div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="showImg('head')">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="clearimg()">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div class="swiperImg" v-if="Goods.head_imgs">
          <div class="skip" v-for="(itme, index) of imgList" :key="index">
            <img :src="addGoods.CdnBase + itme+'-221'" class="image">
            <div class="skipsName" @click="delimg(index)">
              <i class="el-icon-error"></i>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">轮播视频</div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="showVideo">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="clearVideo">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div>
          <div v-html="Goods.head_video"  style="max-width:640px;"></div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'swiper',
  data () {
    return {
      Goods: {},
      menuKey: 1,
      video: '',
      imgList: []
    }
  },
  props: {
    addGoods: {
      type: Object
    }
  },
  methods: {
    showVideo () {
      this.$emit('showVideo')
    },
    clearVideo () {
      this.addGoods.Goods.head_video = ''
    },
    showImg (type) {
      this.$emit('showImg', { type: type })
    },
    delimg (index) {
      this.addGoods.Goods.head_imgs.splice(index, 1)
    },
    clearimg () {
      this.$emit('clearimg')
    }
  },
  watch: {
    'addGoods' () {
      this.Goods = this.addGoods.Goods ? this.addGoods.Goods : {}
      ++this.menuKey
    },
    'addGoods.Goods.head_video' () {
      this.video = this.addGoods.Goods.head_video
    },
    'addGoods.Goods.head_imgs' () {
      this.imgList = this.addGoods.Goods.head_imgs
    }
  }
}
</script>

<style lang="less" scoped>
  #add_swiper {
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
    .skip{
      display: inline-block;
      position: relative;
      height: 160px;
      img{
        width: 160px;
        height: 160px;
      }
      .skipsName{
        position: absolute;
        bottom: 0;
        height: 30px;
        background: rgba(102, 102, 102, 0.45);
        left: 0;
        right: 0;
        i{
          float: right;
          line-height: 30px;
          color: white;
          font-size: 20px;
          padding-right: 7px;
        }
      }
    }
  }
</style>
