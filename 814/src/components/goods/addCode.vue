<template>
  <div class="add_code">
    <el-form label-width="128px" label-position="left" >
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            广告代码
            <el-tooltip class="item" effect="dark" content="功能说明：选择广告代码。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="showCode('adcode')">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="clearCode('adcode')">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div>
          <el-table
            :show-header="false"
            v-show="ADcodeLength"
            border
            :data="addGoods.adcodelist"
            style="width: 100%">
            <el-table-column
              align="center"
              header-align="center"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              prop="name"
              label="名字">
            </el-table-column>
            <el-table-column width="50">
              <template slot-scope="scope">
                <i class="fa fa-close" aria-hidden="true" @click="handleDelete(scope.$index,'adcode')"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item >
        <span slot="label">
          <div class="label_title">
            其他代码
            <el-tooltip class="item" effect="dark" content="功能说明：选择其他代码。" placement="right">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            </el-tooltip>
          </div>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" plain size="mini" @click="showCode('othercode')">增加</el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="danger" plain size="mini" @click="clearCode('othercode')">清空</el-button>
            </el-col>
          </el-row>
        </span>
        <div>
          <el-table
            :show-header="false"
            v-show="otherCodeLength"
            border
            :data="addGoods.othercodelist"
            style="width: 100%">
            <el-table-column
              align="center"
              header-align="center"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              align="center"
              header-align="center"
              prop="name"
              label="名字">
            </el-table-column>
            <el-table-column  width="50">
              <template slot-scope="scope">
                <i class="fa fa-close" aria-hidden="true" @click="delCode(scope.$index,'othercode')"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'addCode',
  data () {
    return {
      ADCodeList: [],
      otherCodeList: [],
      ADcodeLength: 0,
      otherCodeLength: 0
    }
  },
  props: {
    addGoods: {
      type: Object
    }
  },
  methods: {
    showCode (type) {
      this.$emit('showCode', type)
    },
    delCode (index, type) {
      this.$emit('delCode', index, type)
    },
    clearCode (type) {
      this.$emit('clearCode', type)
    }
  },
  watch: {
    'addGoods.adcodelist' () {
      this.CodeList = this.addGoods.adcodelist
      this.ADcodeLength = this.CodeList.length
    },
    'addGoods.othercodelist' () {
      this.otherCodeList = this.addGoods.othercodelist
      this.otherCodeLength = this.otherCodeList.length
    }
  }
}
</script>

<style scoped lang="less">
  .add_code {
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
    /deep/.el-form-item__label {
      .fa {
        color: #EFA100;
      }
    }
    .sales-table{
      /deep/.fa{
        color: #555;
      }
    }
    /deep/.el-table td, /deep/.el-table th{
      padding: 5px 0;
    }
  }
</style>
