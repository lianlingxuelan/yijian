<template>
    <div>
        <d2-container better-scroll>
            <template slot="header">
                <el-row>
                    <el-col :span="12">
                        <roi-search :membershow="true" :MemberList="MemberList" :Months="Months" :moneys="moneys" :SearchContent="SearchContent"
                                    @search="search"></roi-search>
                    </el-col>
                    <el-col :span="6" style="text-align: center">
                        <el-button size="medium" type="warning" @click="edit_params">修改参数</el-button>
                    </el-col>
                    <el-col :span="6" style="text-align: right">
                        <el-button size="medium" type="danger" @click="auth_edit">组员授权</el-button>
                    </el-col>
                </el-row>
            </template>
            <el-table :data="RoiInfoList" border style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="ordercount"
                        label="单数"
                        width="95">
                </el-table-column>
                <el-table-column prop="orderamount" label="销售额" width="95">
                </el-table-column>
                <el-table-column label="广告账户">
                    <template slot-scope="props">
                        <el-table v-if="props.row.RoiSpends.length" :data="props.row.RoiSpends" style="width: 100%">
                            <el-table-column label="账户" width="500">
                                <template slot-scope="scope">
                                    <div class="el-input el-input--default" v-if="!scope.row.temp||!scope.row.temp.length">
                                    <span class="codename el-input__inner" v-if="scope.row.Code"
                                          v-text="'【'+scope.row.Code.User.nickname + '】'+scope.row.Code.name"
                                          @click="amount_advaccount(scope.row)"></span>
                                        <span class="codename el-input__inner" v-if="!scope.row.Code" @click="amount_advaccount(scope.row)"></span>
                                    </div>
                                    <el-select v-if="scope.row.temp&&scope.row.temp.length" v-model="scope.row.code_id"
                                               @visible-change="change_value($event,scope.row)">
                                        <el-option v-for="spend in scope.row.temp"
                                                   :key="spend.id" :value="spend.id"
                                                   :label="'【'+spend.User.nickname + '】'+spend.name">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="费用($)">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.value"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="费用(￥)">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.value_rmb"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="备注">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.remark"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <i class="el-icon-delete" @click="del_account(props.row,scope.row)"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row>
                            <el-col :span="24" style="text-align: center">
                                <el-button size="medium" type="primary" icon="el-icon-plus" @click="add_account(props.row)">
                                    添加账户
                                </el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="spend"
                        label="广告费合计($)"
                        width="110">
                </el-table-column>
                <el-table-column
                        prop="spendRmb"
                        label="广告费合计(￥)"
                        width="115">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="客单价"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="roi"
                        label="ROI"
                        width="70">
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="props">
                        <el-button size="small" type="success" @click="get_orderamount(props.row)">更新</el-button>
                        <el-button size="small" type="warning" @click="saveData(props.row)">保存</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </d2-container>
        <roi-params :show_params="show_params" :RoiParams="RoiParams" @before_close="before_close" @save_params="save_params"></roi-params>
        <auth-edit :show_auth="show_auth" :auth="auth" :MemberList="MemberList" @before_close="before_close" @save_auth="save_auth"></auth-edit>
    </div>
</template>

<script>
import RoiSearch from '@/components/roi/roi_search'
import roiApi from '@/api/roi'
import Res from '@/assets/js/application'
import RoiParams from '@/components/roi/roi_params'
import AuthEdit from '@/components/roi/auth_edit'
export default {
  name: 'edit',
  components: {
    RoiSearch,
    AuthEdit,
    RoiParams
  },
  data () {
    return {
      MemberList: [],
      Months: [],
      moneys: Res.moneys.slice(1),
      RoiInfoList: [],
      CodeList: [],
      SearchContent: {
        MemberName: 'admin',
        Money: 'NT',
        Month: '0'
      },
      RoiParams: {},
      show_params: false,
      show_auth: false,
      auth: {
        username: null,
        date: null
      },
      HL: null,
      QSL: null,
      ADHL: null
    }
  },
  mounted () {
    this.getRoi()
  },
  methods: {
    search () {
      this.getRoi()
    },
    async getRoi () {
      let data = await roiApi.getRoi(this.SearchContent)
      this.MemberList = data.MemberList
      this.Months = data.Months
      this.RoiInfoList = data.RoiInfoList
      this.CodeList = data.CodeList
      this.RoiParams = data.RoiParams
      this.SearchContent.Money = data.Money
      this.SearchContent.MemberName = data.MemberName
      this.SearchContent.Month = data.Month
      let spendreg = ''
      for (let i in this.RoiInfoList) {
        for (let j in this.RoiInfoList[i].RoiSpends) {
          let item = this.RoiInfoList[i].RoiSpends[j]
          if (item.value > 0) {
            spendreg = item.value.toString().indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
            item.value = item.value.toString().replace(spendreg, '$1,')
          } else {
            item.value = 0
          }
          if (item.value_rmb > 0) {
            spendreg = item.value_rmb.toString().indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
            item.value_rmb = item.value_rmb.toString().replace(spendreg, '$1,')
          } else {
            item.value_rmb = 0
          }
        }
      }
      if (this.RoiParams) {
        if (this.SearchContent.Money === '฿') {
          if (!this.RoiParams.TH || !this.RoiParams.$ || !this.RoiParams[this.SearchContent.Money + 'QSL']) {
            this.$message('请先联系管理员设置本区域计算参数！')
          } else {
            this.HL = this.RoiParams.TH
            this.QSL = this.RoiParams[this.SearchContent.Money + 'QSL']
            this.ADHL = this.RoiParams.$
          }
        } else {
          if (!this.RoiParams[this.SearchContent.Money] || !this.RoiParams.$ || !this.RoiParams[this.SearchContent.Money + 'QSL']) {
            this.$message('请先联系管理员设置本区域计算参数！')
          } else {
            this.HL = this.RoiParams[this.SearchContent.Money]
            this.QSL = this.RoiParams[this.SearchContent.Money + 'QSL']
            this.ADHL = this.RoiParams.$
          }
        }
      }
    },
    // 添加账户
    add_account (roi) {
      roi.RoiSpends.push({ code_id: undefined, name: 'ad', value: '', remark: '' })
    },
    // 传入账户列表
    amount_advaccount (spend) {
      this.$set(spend, 'temp', this.CodeList)
    },
    // 即时清除账户列表
    change_value (e, spend) {
      if (!e) {
        let code = spend.temp.filter((x) => x.id === spend.code_id)[0]
        spend.Code = {
          User: code.User,
          name: code.name
        }
        spend.temp = []
      }
    },
    // 删除账户
    del_account (item, spend) {
      item.RoiSpends.forEach((roispend, index) => {
        if (roispend.code_id === spend.code_id) {
          item.RoiSpends.splice(index, 1)
        }
      })
      this.amount_ad(item)
      this.amount_rmb_ad(item)
    },
    amount_ad (item) {
      item.spend = 0
      let spend = 0
      for (let roispend of item.RoiSpends) {
        if (roispend.value) {
          if (roispend.value.indexOf(',') !== -1) {
            spend = roispend.value.replace(/,/g, '')
          } else {
            spend = roispend.value
          }
          item.spend += parseFloat(spend)
        }
      }
      if (item.spend !== 0) this.calc_roi(item)
    },
    amount_rmb_ad (item) {
      item.spendRmb = 0
      let spendRmb = 0
      for (let spend of item.RoiSpends) {
        if (spend.value_rmb) {
          if (spend.value_rmb.indexOf(',') !== -1) {
            spendRmb = spend.value_rmb.replace(/,/g, '')
          } else {
            spendRmb = spend.value_rmb
          }
          item.spendRmb += parseFloat(spendRmb)
        }
      }
      if (item.spendRmb !== 0) this.calc_roi(item)
    },
    calc_roi (item) {
      if (this.HL) item.orderamountRMB = parseFloat(eval(item.orderamount + '' + this.HL).toFixed(3))
      if (this.ADHL) item.spendRmb = parseFloat(eval(item.spend + '' + this.ADHL + (item.spendRmb ? '+' + item.spendRmb : '')).toFixed(3))
      if (item.spendRmb !== 0 && item.orderamountRMB !== 0) {
        item.price = (item.orderamountRMB / (item.ordercount === 0 ? 1 : item.ordercount) * this.QSL).toFixed(2)
        item.roi = (item.orderamountRMB / (item.spendRmb === 0 ? 1 : item.spendRmb) * this.QSL).toFixed(3)
      }
    },
    // 更新
    async get_orderamount (item) {
      let data = await roiApi.get_orderamount(this.SearchContent.MemberName, item.date, item.money)
      if (!data.Error) {
        let _ordercount = item.OrderCount
        let _orderamount = item.OrderAmount
        item.ordercount = data.OrderCount
        item.orderamount = data.OrderAmount
        if (_ordercount !== data.OrderCount || _orderamount !== data.OrderAmount) {
          this.calc_roi(item)
          if (item.roi !== 'NaN' && item.roi !== 'Infinity') {
            this.saveData(item)
          } else {
            return this.$message('不能更新ROI，广告费或汇率填写不正确，请重填写')
          }
        }
      } else {
        return this.$message(data.Info)
      }
    },
    async saveData (item) {
      for (let spend of item.RoiSpends) {
        if ((!spend.value_rmb && !spend.value) || !spend.code_id) {
          return this.$message('广告账户必须选择，费用必须填写')
        }
        if (!spend.value_rmb) {
          spend.value_rmb = 0
        } else {
          if (spend.value_rmb.indexOf(',') !== -1) {
            spend.value_rmb = Number(spend.value_rmb.replace(/,/g, ''))
          } else {
            spend.value_rmb = Number(spend.value_rmb)
          }
        }
        if (!spend.value) {
          spend.value = 0
        } else {
          if (spend.value.indexOf(',') !== -1) {
            spend.value = Number(spend.value.replace(/,/g, ''))
          } else {
            spend.value = Number(spend.value)
          }
        }
      }
      if (item.roi === '' || item.price === '') return this.$message('计算未完成，不能保存')
      item.username = this.SearchContent.MemberName
      item.money = this.SearchContent.Money
      let data = await roiApi.save_roiinfo(item)
      this.$message(data.Info)
      if (!data.Error) {
        this.getRoi()
      }
    },
    // 修改参数
    edit_params () {
      this.show_params = true
    },
    before_close () {
      this.show_params = false
      this.show_auth = false
    },
    // 保存参数
    async save_params () {
      let data = await roiApi.save_params(this.RoiParams)
      this.$message(data.Info)
      if (!data.Error) {
        this.before_close()
      }
    },
    // 组员授权
    auth_edit () {
      this.show_auth = true
    },
    //  保存授权
    async save_auth () {
      let data = await roiApi.save_auth(this.auth)
      this.$message(data.Info)
      if (!data.Error) {
        this.before_close()
      }
    }
  }
}
</script>

<style scoped>
    .el-button + .el-button {
        margin-left: 0
    }

    .codename.el-input__inner {
        overflow: hidden;
    }

    .el-select.el-select--default {
        width: 100%;
    }
</style>
