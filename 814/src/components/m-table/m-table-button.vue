<template>
  <div style="cursor: pointer">
    <el-button
            :type="type"
            @click="handleClick"
            v-if="!scope.row.isDefault"
            size="medium">
      {{ text }}
    </el-button>
    <el-button
            type="danger"
            @click="handleClickDel"
            v-if="scope.row.isShowDel"
            size="medium">
      删除
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    emit: {
      type: String,
      require: true
    },
    value: {
      type: String,
      require: true
    },
    scope: {
      default: null
    },
    myProps: {
      default: null
    }
  },
  computed: {
    type () {
      return this.scope.row.t_type ? this.scope.row.t_type : 'success'
    },
    text () {
      return this.scope.row.t_text ? this.scope.row.t_text : '按钮'
    }
  },
  mounted () {
  },
  methods: {
    handleClick () {
      this.$bus.$emit(this.emit, this.text, this.scope.row)
    },
    handleClickDel () {
      this.$bus.$emit(this.emit, '删除', this.scope.row)
    }
  }
}
</script>
