<template>
    <d2-container>
        <el-row :gutter="20">
            <el-col :span="8" v-for="rule of list" :key="rule.country" style="margin-bottom:20px;">
                <el-card>
                    <div slot="header">
                        <span> {{rule.countryName}}电话规则</span>
                        <el-button style="float: right;" size="small" type="primary" @click="saveRules(rule)">保存</el-button>
                    </div>
                    <el-form  :model="rule" label-width="100px" label-position="left">
                        <el-form-item label="是否启用">
                           <el-select v-model="rule.enable">
                               <el-option v-for="item of enable" :key="item.value" :label="item.name" :value="item.value"></el-option>
                           </el-select>
                        </el-form-item>
                        <el-form-item label="最小位数">
                            <el-input v-model="rule.tel_num_min" placeholder="请设置电话最小位数"></el-input>
                        </el-form-item>
                        <el-form-item label="最大位数">
                            <el-input v-model="rule.tel_num_max" placeholder="请设置电话最大位数"></el-input>
                        </el-form-item>
                        <el-form-item label="主要规则">
                            <el-select v-model="rule.tel_rule">
                                <el-option v-for="item of rules" :key="item.value" :label="item.name" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开头限制">
                            <el-input v-model="rule.start_limit" placeholder="请设置开头关键字符"></el-input>
                        </el-form-item>
                        <el-form-item label="开头限制位数">
                            <el-input v-model="rule.start_limit_num" placeholder="设置开头限制位数"></el-input>
                        </el-form-item>
                        <el-form-item label="开头限制规则">
                            <el-select v-model="rule.start_limit_rule">
                                <el-option v-for="item of rules" :key="item.value" :label="item.name" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </d2-container>
</template>
<script>
import sysApi from '@/api/sys'
export default {
  name: 'telrules',
  data () {
    return {
      list: [],
      enable: [{ 'name': '启用', 'value': 1 }, { 'name': '禁用', 'value': 0 }],
      rules: [{ 'name': '纯数字', 'value': 1 }, { 'name': "数字加'-'", 'value': 2 }]
    }
  },
  created () {
    this.getRules()
  },
  methods: {
    async getRules () {
      let data = await sysApi.getRules()
      this.list = data.allSet
      for (let item of this.list) {
        if (item.country === 'NT') {
          item.countryName = '台湾'
        }
        if (item.country === 'HK') {
          item.countryName = '香港'
        }
        if (item.country === 'RM') {
          item.countryName = '马来'
        }
        if (item.country === 'S$') {
          item.countryName = '新加坡'
        }
        if (item.country === '฿') {
          item.countryName = '泰国'
        }
        if (item.country === 'Rp') {
          item.countryName = '印尼'
        } if (item.country === '円') {
          item.countryName = '日本'
        }
      }
    },
    async saveRules (item) {
      if (!item.enable) {
        return this.$message.error('请设置是否启用')
      }
      if (!item.tel_num_min) {
        return this.$message.error('请设置最小位数')
      }
      if (!item.tel_num_max) {
        return this.$message.error('请设置最大位数')
      }
      if (!item.tel_rule) {
        return this.$message.error('请设置主要规则')
      }
      let data = await sysApi.saveRule(item)
      if (data.Error) {
        this.$message.error(data.Info)
      } else {
        this.$message.success(data.Info)
      }
    }
  }
}
</script>
<style scoped>

</style>
