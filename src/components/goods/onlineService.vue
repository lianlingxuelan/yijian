<template>
  <div class="onlineService" :key="menuKey">
    <el-form label-width="128px" label-position="left" >
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            在线客服开关
          </div>
        </span>
        <div>
          <el-select class="lang" v-model="Goods.chaport_switch">
            <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item of [{'name':'开','id':'1'},{'name':'关','id':'0'}]"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            在线客服ID
            <el-tooltip class="item" effect="dark" popper-class="onepiece" content="功能说明：这里填写了会覆盖个人设置里面的客服。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
        </span>
        <div>
          <el-row>
            <el-col :span="20">
              <el-input placeholder="例如：5be2422c50e63711e9b557cb" v-model="Goods.chaport_name" />
            </el-col>
            <el-col :span="4"> <el-button type="success" size="small" @click="showOnline">选择</el-button>
              <el-button type="primary" plain size="small">默认</el-button>
              <el-button type="danger" plain size="small">清空</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'onlineService',
  data () {
    return {
      menuKey: 1,
      Goods: {}
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
      ++this.menuKey
    }
  },
  methods: {
    showOnline () {
      this.$emit('showOnline')
    }
  }
}
</script>

<style scoped lang="less">
  .onlineService{
    .el-button--small{
      padding: 13px 15px;
      border-radius: 0;
    }
    .el-button+.el-button{
      margin-left: 0px;
    }
    /deep/.el-form-item__content{
      line-height: 38px;
    }
    .label_title {
      text-align: center;
    }
    .fa{
      color: #EFA100;
    }
  }
</style>
