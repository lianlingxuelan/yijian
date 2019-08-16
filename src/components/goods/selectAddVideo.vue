<template>
  <el-dialog title="添加视频" :visible.sync="videoShow" :before-close="closeVideo" width="20%">
    <div class="videoTitie">Youtube视频地址</div>
    <el-input
      type="textarea"
      :rows="4"
      v-model="textareaVideo">
    </el-input>
    <div class="addBtn">
      <el-button type="primary" size="medium" @click="addVideo()">增加视频</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'selectAddVideo',
  data () {
    return {
      textareaVideo: '',
      Goods: {}
    }
  },
  props: {
    selectVideoShow: {
      type: Boolean
    },
    addGoods: {
      type: Object
    }
  },
  computed: {
    videoShow () {
      return this.selectVideoShow
    }
  },
  methods: {
    addVideo () {
      this.$emit('addVideo', this.textareaVideo)
      this.textareaVideo = ''
    },
    closeVideo () {
      this.$emit('closeVideo')
    }
  },
  watch: {
    'addGoods' () {
      this.Goods = this.addGoods.Goods ? this.addGoods.Goods : {}
    }
  }
}
</script>

<style scoped lang="less">
.videoTitie{
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 16px;
}
  .addBtn{
    text-align: center;
    margin-top: 10px;
  }
</style>
