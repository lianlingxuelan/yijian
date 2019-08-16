<template>
  <el-dialog :visible.sync="imgShow" center  width="1022px" :before-close="closeImg" class="imgPanel">
    <span slot="title">图库</span>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="item.imagetype+'('+item.count+')'" :name="item.imagetype" :key="index" v-for="(item, index) of imgTabsList">
        <el-row :gutter="5" v-show="imageList.length>0">
          <el-col v-for="(img, index) in imageList" :key="index" :span="3">
            <div class="block" @click="selectingImg(img)">
              <el-image
                style="width: 100%; height: 123px"
                :src="ImgList.CdnBase+img.filename"
                fit="contain">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div class="topDate">创建于{{goodsDate(img.created_at)}}</div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="上传图片" >
        <el-row class="uploadBtn">
          <el-button type="warning"  @click="submitUpload" size="small">开始上传</el-button>
        </el-row>
        <el-upload
           ref="upload"
          :multiple="true"
          :auto-upload="false"
           :headers="{token:token}"
          :on-change="onAfterAddingFile"
          :action="'/goods/upload/'+openImgtype"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
           :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer">
      <el-pagination v-if="activeName" background layout="total,prev, pager, next,jumper" :page-size="pageSize"  :total="ImgList.TotalCount" :current-page="ImgList.Page?ImgList.Page:1"
                     @current-change="currentChange" @size-change="handleSizeChange"></el-pagination>
    </div>
  </el-dialog>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'selectImageHelp',
  data () {
    return {
      activeName: '上传图片',
      fileList: [],
      dialogVisible: false,
      tabs: '',
      dialogImageUrl: '',
      imageList: [],
      pageSize: 40,
      token: util.cookies.get('token')
    }
  },
  props: {
    selectImgShow: {
      type: Boolean
    },
    imgTabsList: {
      type: Array
    },
    ImgList: {
      type: Object
    },
    openImgtype: {
      type: String
    }
  },
  computed: {
    imgShow () {
      return this.selectImgShow
    }
  },
  methods: {
    closeImg () {
      this.$emit('closeImg')
    },
    handleClick () {
      this.$emit('getImgList', this.activeName, '1')
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    onAfterAddingFile (file, fileList) {
      if (fileList.length > 0) {
        const res = new Map()
        let that = this
        fileList = fileList.filter(function (a) {
          if (res.has(a.name)) {
            that.$message.error('此图片已经存在上传列表')
          } else {
            return res.set(a.name, 1)
          }
        })
      }
      this.fileList = fileList
    },
    // 页码跳转
    currentChange (val) {
      this.$emit('getImgListPage', this.activeName, val)
    },
    // 设置每页条数
    handleSizeChange (val) {
      this.$emit('getImgListPage', this.activeName, val)
    },
    goodsDate (date) {
      return new Date(date).NatureTime()
    },
    selectingImg (img) {
      this.$emit('selectingImg', img)
    }
  },
  watch: {
    'ImgList' () {
      this.imageList = this.ImgList.ImageList
    }
  }
}
</script>

<style scoped>
.uploadBtn {
  padding-bottom: 10px;
}
.block{
  border: 1px solid #b9b9b9;
  position: relative;
  height: 125px;
}
.topDate{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  text-align: center;
  color: #fff;
  font-size: 12px;
  padding: 5px;
}
</style>
<style>
 .ql-snow .ql-editor img {
    width: 100%;
    max-width:100%;
  }
</style>
