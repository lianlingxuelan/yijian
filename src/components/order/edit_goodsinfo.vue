<template>
    <el-dialog title="编辑订单商品" :visible.sync="isshow" width="540px" center close-on-click-modal :before-close="beforeclose">
        <div class="ordergoods">
            <div v-for="(item,index) in edit_goodslist" :key="index">
                <el-row type="flex" :gutter="20" justify="space-between" style="margin:10px -10px 5px;">
                    <el-col :span="10" class="goodsname"><span>{{item.goodsname}}</span></el-col>
                    <el-col :span="14" class="goodsurl"><a  v-if="item.domain" :href="'http://'+item.domain+'/'+item.sitedir" v-text="'http://'+item.domain+'/'+item.sitedir"></a></el-col>
                </el-row>
                <el-row class="input_group">
                    <el-col :span="5" class="goodsimg"><img style="width:100%;" :src="CdnBase+item.img+'-101'" alt=""></el-col>
                    <el-col :span="14" class="table">
                        <el-select class="select" v-model="item.specname" @change="select_spec(item)">
                            <el-option v-for="name in item.name_list" :value="name" :key="name"
                                    :data-img="item.img">{{name}}</el-option>
                        </el-select>
                        <el-select class="select" v-model="item.option1" @change="select_option1(item)">
                            <el-option v-for="option in item.option1_list" :key="option" :value="option" >{{option}}</el-option>
                        </el-select>
                        <el-select class="select" v-model="item.option2" @change="select_option2(item)">
                            <el-option v-for="option in item.option2_list" :key="option" :value="option" >{{option}}</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="goodsimg">
                        <el-input type="number" v-model="item.number" @change="calc_price(item)"/>
                        <el-input type="number" v-model="item.price" @change="calc_price(item)"/>
                        <el-button size="mini" plain type="danger" style="width:100%;height:32px" @click="del_spec(index)">删除</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-row type="flex"  justify="space-between" style="margin-top:10px;">
                <el-col :span="6"><el-button   plain size="small" type="primary" @click="add_spec(edit_goodslist[0])" style="width:100%;">新增规格</el-button></el-col>
                <el-col :span="6"><el-input v-model="edit_orderprice" type="number"  @change="edit_price"/></el-col>
            </el-row>
        </div>
        <span slot="footer">
            <el-button type="primary" @click="save_goodsinfo">保存修改</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  name: 'edit_goodsinfo',
  props: {
    show_goodsinfo: {
      type: Boolean
    },
    edit_goodslist: {
      type: Array
    },
    edit_orderprice: {
      type: Number
    },
    CdnBase: {
      type: String
    }
  },
  computed: {
    // orderprice () {
    //   return this.edit_orderprice
    // },
    isshow () {
      return this.show_goodsinfo
    }
  },
  watch: {
    edit_orderprice () {
      return this.edit_orderprice
    }
  },
  methods: {
    beforeclose () {
      this.$emit('beforeclose')
    },
    select_spec (item) {
      this.$emit('select_spec', item)
    },
    select_option1 (item) {
      this.$emit('select_option1', item)
    },
    select_option2 (item) {
      this.$emit('select_option2', item)
    },
    calc_price () {
      this.$emit('calc_price')
    },
    del_spec (index) {
      this.$emit('del_spec', index)
    },
    add_spec (item) {
      this.$emit('add_spec', item)
    },
    edit_price () {
      this.$emit('edit_price', this.edit_orderprice)
    },
    save_goodsinfo () {
      this.$emit('save_goodsinfo', this.edit_orderprice)
    }
  }
}
</script>

<style scoped>
    .goodsimg{
        border:1px solid #d7dce1;
        display: table-cell;
        height: 100px;
        overflow: hidden;
    }
    .goodsname span,.goodsurl a{
        display:block;overflow:hidden;word-break:keep-all;white-space:nowrap;text-overflow:ellipsis;
    }
    .goodsurl a{
        text-align: right;
    }
    .table{
        border-top:1px solid #d7dce1;
        display:table;
    }
    .el-select {
        width: 100%;
    }
    .ordergoods >>> .el-input__inner{
        height:33.33px;
        line-height:33.33px;
        border-radius:0;
    }
</style>
