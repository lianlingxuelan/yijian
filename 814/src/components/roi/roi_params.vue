<template>
    <el-dialog title="编辑汇率" :visible.sync="show_params" width="475px" center :before-close="before_close">
        <el-form label-position="top" :inline="true" label-width="80px" :model="RoiParams">
            <el-form-item label="月份" style="width:100%">
                <el-input v-model="RoiParams.date" disabled></el-input>
            </el-form-item>
            <el-form-item label="台湾汇率">
                <el-input v-model="RoiParams.NT"></el-input>
            </el-form-item>
            <el-form-item label="台湾签收率">
                <el-input v-model="RoiParams.NTQSL"></el-input>
            </el-form-item>
            <el-form-item label="马来汇率">
                <el-input v-model="RoiParams.RM"></el-input>
            </el-form-item>
            <el-form-item label="马来签收率">
                <el-input v-model="RoiParams.RMQSL"></el-input>
            </el-form-item>
            <el-form-item label="香港汇率">
                <el-input v-model="RoiParams.HK"></el-input>
            </el-form-item>
            <el-form-item label="香港签收率">
                <el-input v-model="RoiParams.HKQSL"></el-input>
            </el-form-item>
            <el-form-item label="泰国汇率">
                <el-input v-model="RoiParams.TH"></el-input>
            </el-form-item>
            <el-form-item label="泰国签收率">
                <el-input v-model="RoiParams.THQSL"></el-input>
            </el-form-item>
            <el-form-item label="新加坡汇率">
                <el-input v-model="RoiParams.S$"></el-input>
            </el-form-item>
            <el-form-item label="新加坡签收率">
                <el-input v-model="RoiParams.S$QSL"></el-input>
            </el-form-item>
            <el-form-item label="印尼汇率">
                <el-input v-model="RoiParams.Rp"></el-input>
            </el-form-item>
            <el-form-item label="印尼签收率">
                <el-input v-model="RoiParams.RpQSL"></el-input>
            </el-form-item>
            <el-form-item label="美元汇率">
                <el-input v-model="RoiParams.$"></el-input>
            </el-form-item>
            <el-form-item label="美元签收率">
                <el-input v-model="RoiParams.$QSL"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save_params">修改</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'roi_params',
  props: {
    show_params: {
      type: Boolean
    },
    RoiParams: {
      type: Object
    }
  },
  methods: {
    before_close () {
      this.$emit('before_close')
    },
    save_params () {
      if (!this.RoiParams.NT ||
          !this.RoiParams.RM ||
          !this.RoiParams.S$ ||
          !this.RoiParams.TH ||
          !this.RoiParams.HK ||
          !this.RoiParams.Rp ||
          !this.RoiParams.NTQSL ||
          !this.RoiParams.RMQSL ||
          !this.RoiParams.S$QSL ||
          !this.RoiParams.THQSL ||
          !this.RoiParams.HKQSL ||
          !this.RoiParams.RpQSL) { return this.$message('汇率签收率必须要有！') }
      this.$emit('save_params')
    }
  }
}
</script>

<style scoped>

</style>
