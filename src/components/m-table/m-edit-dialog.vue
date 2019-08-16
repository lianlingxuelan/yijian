<template>
  <div>
    <el-dialog
      :visible.sync="visible">
      <d2-quill
        style="min-height: 400px; margin-bottom: 20px;"
        v-model="body" />
      <div style="text-align:center" @click="handleClick"><el-button >确定</el-button></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      body: '<p></p>'
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick () {
      if (this.body === '<p></p>') {
        return this.$message({
          message: '页面内容不能为空！',
          type: 'error'
        })
      }
      this.$emit('addBody', this.body)
      this.$emit('update:visible', false)
      this.body = '<p></p>'
    }
  }
}
</script>
