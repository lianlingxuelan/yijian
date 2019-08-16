<template>
    <el-dialog title="编辑汇率" :visible.sync="show_auth" width="280px" center :before-close="before_close">
        <el-form label-position="top"  label-width="80px" :model="auth">
            <el-form-item label="优化师">
                <el-select v-model="auth.username" >
                    <el-option-group label="正常账户">
                        <el-option
                                v-for="item in memberList1"
                                :key="item.username"
                                :label="item.nickname"
                                :value="item.username">
                        </el-option>
                    </el-option-group>
                    <el-option-group label="停用账户">
                        <el-option
                                v-for="item in memberList2"
                                :key="item.username"
                                :label="item.nickname"
                                :value="item.username">
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="允许编辑日期">
                <el-date-picker
                        v-model="auth.date"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save_auth">生成授权</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'auth_edit',
  props: {
    show_auth: {
      type: Boolean
    },
    MemberList: {
      type: Array
    },
    auth: {
      type: Object
    }
  },
  computed: {
    memberList1 () {
      return this.MemberList.filter((item) => {
        return item.state === '正常'
      })
    },
    memberList2 () {
      return this.MemberList.filter((item) => {
        return item.state === '停用'
      })
    }
  },
  methods: {
    before_close () {
      this.$emit('before_close')
    },
    save_auth () {
      if (!this.auth.date) return this.$message('授权日期必须填写！')
      this.$emit('save_auth')
    }
  }
}
</script>

<style scoped>

</style>
