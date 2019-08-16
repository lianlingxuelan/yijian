<template>
  <div class="add_details">
    <el-form ref="detail_form_link" :model="detail_form_link" label-width="100px">
      <el-form-item label="详情链接">
        <el-input
          size="medium"
          placeholder="只能抓取https://gz.17zwd.com网站,例如:https://gz.17zwd.com/item.htm?GID=110079266%26spm=0.42.137.15423.110079266.0"
          v-model="detail_form_link.spec_link">
          <template slot="append"><el-button type="success" size="small" @click="add_linkspec('detail')">抓取详情</el-button></template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品详情">
        <d2-quill style="min-height: 800px;" v-if="detail_form_link.GoodsContent" v-model="detail_form_link.GoodsContent.content" @showImagePanel="showImagePanel" :toolbar="toolbar" :placeholder="placeholder"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addApi } from '../../api/add'
export default {
  name: 'img_details',

  data () {
    return {
      detail_form_link: {},
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image', 'video']
      ],
      placeholder: '编辑商品详情'
    }
  },
  props: {
    addGoods: {
      type: Object
    }
  },
  watch: {
    'addGoods' () {
      this.detail_form_link = this.addGoods.Goods ? this.addGoods.Goods : {}
      // ++this.menuKey
    }
  },
  methods: {
    async add_linkspec (type) {
      let data = await addApi.add_linkspec(this.detail_form_link.link, type)
      this.detail_form_link.GoodsContent.content = data
    },
    showImagePanel (editor) {
      this.$emit('showImg', { type: 'detail', value: editor })
    }
  }
}
</script>

<style scoped lang="less">
.add_details {
  /deep/.el-input-group__append{
    background: #29bb9c;
    color: white;
  }
}
</style>
