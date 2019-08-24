<template>
  <div>
    <!--    <el-dialog-->
    <!--      :visible.sync="visible">-->
    <!--      <d2-quill-->
    <!--        style="min-height: 400px; margin-bottom: 20px;"-->
    <!--        v-model="body" />-->
    <!--      <div style="text-align:center" @click="handleClick"><el-button >确定</el-button></div>-->
    <!--    </el-dialog>-->
    <el-dialog title="编辑页面" :visible.sync="visible">
      <el-radio-group v-model="labelPosition" size="small">
        <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="链接显示名称*">
          <el-input v-model="linkname"></el-input>
        </el-form-item>
        <el-form-item label="页面分类*">
          <el-input v-model="classtype"></el-input>
        </el-form-item>
        <el-form-item label="语言*">
          <el-input v-model="language"></el-input>
        </el-form-item>
        <el-form-item label="默认*">
          <el-input v-model="isdefault"></el-input>
        </el-form-item>
        <el-form-item label="页面标题Title">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="页面内容">
          <d2-quill style="min-height: 200px; margin-bottom: 20px;" v-model="body" :toolbar="toolbar" :placeholder="placehloder"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      title: '',
      language: '',
      linkname: '',
      isdefault: '',
      classtype: '',
      body: '',
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onSubmit () {
      // if (this.body === '<p></p>') {
      //   return this.$message({
      //     message: '页面内容不能为空！',
      //     type: 'error'
      //   })
      // }
      console.log(this)
      this.$emit('addBody', this.message)
      this.$emit('update:visible', false)
      //this.body = '<p></p>'
    }
  }
}
</script>
