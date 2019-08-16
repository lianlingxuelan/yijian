<template>
  <div class="add_jump" :key="menuKey">
    <el-form label-width="128px" label-position="left">
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            跳转开关
          </div>
        </span>
        <div>
          <el-select class="lang" v-model="Goods.skip_switch">
            <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item of clock"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">跳转商品</div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="GoodsShow('jump')">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="delskip()">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div class="jumpGoods">
          <div class="skip" v-if="Goods.skip_id" @click="go_url(addGoods.skips)">
            <el-tag type="info" class="delskip" @click="delskip" size="small" effect="dark" @click.stop>删除</el-tag>
            <img :src="addGoods.CdnBase + addGoods.skips.head_imgs.split(';')[0]+'-150'" class="image">
            <div class="skipsName">
              <span>{{addGoods.skips.name}}</span>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'jump',
  data () {
    return {
      menuKey: 1,
      Goods: {},
      clock: [{ 'name': '开', 'id': '1' }, { 'name': '关', 'id': '0' }]
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
    delskip () {
      this.Goods.skip_id = ''
      this.addGoods.skips = {}
    },
    go_url (goods) {
      if (!goods) return this.$message.error('请先选择跳转商品')
      window.open('http://' + goods.Domain.name + '/' + goods.sitedir, '_blank')
    }
  },
  watch: {
    'addGoods' () {
      this.Goods = this.addGoods.Goods ? this.addGoods.Goods : {}
      ++this.menuKey
    }
  }
}
</script>

<style scoped lang="less">
  .add_jump {
    .label_title {
      text-align: center;
    }
    .el-col {
      text-align: center;
      height: 32px;
      line-height: 32px;
    }
    .jumpGoods{
      width: 140px;
      .skip{
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
