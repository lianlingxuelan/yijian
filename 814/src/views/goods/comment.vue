<template>
  <div>
    <d2-container>
        <el-table :data="CommentList" style="width: 100%">
          <el-table-column
              prop="User.nickname"
              label="广告手"
              width="180">
          </el-table-column>
          <el-table-column label="评论人" width="180">
            <template slot-scope="props">
              <el-select v-model="props.row.name" @change="editComment(props.row)">
                <el-option v-for="item of names" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="评论内容">
            <template slot-scope="props">
              <el-input v-model="props.row.body" type="textarea" autosize @blur.prevent="editComment(props.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否显示">
            <template slot-scope="props">
              <el-select v-model="props.row.isshow" @change="editComment(props.row)">
                <el-option v-for="item of enable" :key="item.name" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="晒单图">
            <template slot-scope="props">
              <el-image :src="CdnBase+url+'-30'" fit="contain" v-for="(url,index) of props.row.imgs"
                        :key="index"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="删除">
            <template slot-scope="props">
              <i class="el-icon-delete danger" @click="delComment(props.row)" style="font-size:20px;cursor: pointer"></i>
            </template>
          </el-table-column>
        </el-table>
      <el-card style="margin-top:20px;">
        <div slot="header">
          <span>添加评论</span>
          <el-button style="float: right;" size="small" type="primary" @click="addComm">添加</el-button>
        </div>
          <el-form :label-position="left" label-width="80px" :model="addComment">
            <el-form-item label="商品">
              <el-input v-model="Goods.name"  :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="评论人">
              <el-input v-model="addComment.name">
                <el-button slot="append" @click="changeName">更换一个</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="评论内容">
              <el-input type="textarea" autosize v-model="addComment.body"></el-input>
            </el-form-item>
            <el-form-item>
               <span slot="label">
                  <div class="label_title">晒单图片</div>
                  <el-row>
                    <el-col :span="24">
                      <el-button type="primary" plain size="mini" @click="imgPanelShow('comm')">增加</el-button>
                    </el-col>
                    <el-col :span="24">
                      <el-button type="danger" plain size="mini" @click="clearimg()">清空</el-button>
                    </el-col>
                  </el-row>
                </span>
                <div class="swiperImg" v-if="addComment.imgsArr">
                  <div class="skip" v-for="(item, index) of addComment.imgsArr" :key="index">
                    <img :src="CdnBase + item+'-221'" class="image">
                    <div class="skipsName" @click="delimg(index)">
                      <i class="el-icon-error"></i>
                    </div>
                  </div>
                </div>
            </el-form-item>
          </el-form>
      </el-card>
    </d2-container>
    <select-img :selectImgShow="selectImgShow" :imgTabsList="imgTabsList" :openImgtype="openImgtype"
                @closeImg="closeImg" @getImgList="getImgList" @getImgListPage="getImgList"
                :ImgList="ImgList" @selectingImg="selectingImg"></select-img>
  </div>
</template>

<script>
import selectImg from '_c/goods/selectImageHelp.vue'
import { getComment, addComment, delComment, editComment } from '@api/goods'
import { addApi } from '@/api/add'
export default {
  name: 'comment',
  components: {
    selectImg
  },
  data: function () {
    return {
      names: ['孫富*', '將浩*', '曾柏*', '徐聖*', '馮松*', '林憶*', '林晉*', '趙小*',
        '陳淑*', '梁雨*', '賴義*', '夏光*', '吳佑*', '彭毓*', '陳國*', '黃傑*',
        '林晉*', '林芳*', '莊密*', '馬力*', '張靈*', '陳強*', '張志*', '張洋*',
        '張吉*', '徐雄*', '李祐*', '楊勝*', '曾琪*', '朱厚*', '張文*', '天童*',
        '鄭修*', '黃寶*', '龔翔*', '吳苡*', '陳淑*', '潘金*', '宋華*', '鄭小*',
        '陳冠*', '許佑*', '梁玉*', '黃昭*', '鄧志*', '陳昱*', '蘇稟*', '陳山*',
        '鍾佳*', '蔡慶*', '廉薇*', '余善*', '黃雅*', '陳美*', '陳俊*', '靳富*',
        '吳沛*', '黃任*', '趙建*', '莊孟*', '洪于*', '張玉*', '林妍*', '洪曉*',
        '潘惠*', '林宜*', '蕭伯*', '黃寶*', '楊宇*', '曾琪*', '徐筱*', '林肜*',
        '鐘淑*', '劉譯*', '謝孟*', '謝璽*', '江筱*', '洪晶*', '林欣*', '江政*',
        '陳文*', '林宜*', '林欣*', '王薇*', '陳卿*', '陳慧*', '陳飛*', '范韶*',
        '林晏*', '林俊*', '盧彥*', '高源*', '賴亦*', '江筱*', '朱怡*', '龔彥*',
        '林姿*', '蘇建*', '許彩*', '葉錦*', '楊定*', '段紀*', '吳玉*', '林志*',
        '簡麗*', '翁郁*', '洪莉*', '潘敬*', '林喬*', '李文*', '劉先*', '韓雨*',
        '沈孝*', '李文*', '黃裕*', '李致*', '陳秋*', '森田*', '黃雲*', '褚咏*',
        '邱啟*', '林品*', '林昆*', '洪裕*', '蔡佳*', '詹筱*', '張芯*', '張卲*',
        '張芸*', '吳孟*', '宋鴻*', '黃勝*', '陳姿*', '洪金*', '鍾念*', '丁氏*',
        '王子*', '羅際*', '劉澤*', '黃清*', '蔡岳*', '薛榆*', '劉貴*', '陳聖*'],
      enable: [{ name: '是', value: 1 }, { name: '否', value: 0 }],
      CdnBase: '',
      CommentList: [],
      Gooods: {},
      selectImgShow: false,
      imgTabsList: [],
      openImgtype: '',
      ImgList: [],
      editComm: {},
      addComment: {
        name: '',
        body: '',
        imgsArr: [],
        imgs: ''
      }
    }
  },
  // created () {
  //   let id = this.$route.params.id
  //   this.getComments(id)
  // },
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter (to, from, next) {
    const id = to.params.id
    if (id) {
      next(instance => instance.getComments(id))
    } else {
      next(new Error('未指定ID'))
    }
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate (to, from, next) {
    const id = to.params.id
    if (id) {
      this.getComments(id)
      next()
    } else {
      next(new Error('未指定ID'))
    }
  },
  methods: {
    async getComments (id) {
      let data = await getComment(id)
      this.CdnBase = data.CdnBase
      this.CommentList = data.CommentList
      this.CommentList.forEach((item) => {
        item.imgs = item.imgs.split(';')
      })
      this.Goods = data.Goods
      this.addComment = { name: this.names[this.GetRandomNum(0, this.names.length)], body: '', imgsArr: [], imgs: '' }
    },
    delComment (item) {
      this.$confirm('确定要删除评论' + item.body + '?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '点错了',
        type: 'warning'
      }).then(async () => {
        let data = await delComment(item.id)
        if (!data.Error) {
          this.$message.success(data.Info)
          this.getComments(this.Goods.id)
        } else {
          return this.$message.error(data.Info)
        }
      }).catch(() => {})
    },
    imgPanelShow (type) {
      this.openImgtype = type
      this.selectImgShow = true
      this.getImgTabs()
    },
    async getImgTabs () {
      let data = await addApi.getImgTabs()
      if (data.Error) { return this.$message.error(data.Info) }
      this.imgTabsList = data
    },
    closeImg () {
      this.selectImgShow = false
    },
    async getImgList (tab, page) {
      let data = await addApi.getImgList(tab, page)
      if (data.Error) { return this.$message.error(data.Info) }
      this.ImgList = data
    },
    selectingImg (img) {
      if (this.openImgtype === 'comm') {
        this.addComment.imgsArr.push(img.filename)
      }
    },
    clearimg () {
      this.addComment.imgsArr = []
    },
    delimg (index) {
      this.addComment.imgsArr.splice(index, 1)
    },
    GetRandomNum (Min, Max) {
      let Range = Max - Min
      let Rand = Math.random()
      return (Min + Math.round(Rand * Range))
    },
    changeName () {
      this.addComment.name = this.names[this.GetRandomNum(0, this.names.length)]
    },
    async addComm () {
      if (!this.Goods) {
        return this.$message.error('请先选择一个商品')
      }
      if (!this.addComment.name) {
        return this.$message.error('用户名是必须的')
      }
      if (!this.addComment.body) {
        return this.$message.error('评论内容是必须的')
      }
      this.addComment.imgs = this.addComment.imgsArr ? this.addComment.imgsArr.join(';') : ''
      this.addComment.goods_id = this.Goods.id
      let data = await addComment(this.addComment)
      if (!data.Error) {
        this.$message.success(data.Info)
        this.getComments(this.Goods.id)
        this.addComment = { name: '', body: '', imgsArr: [], imgs: '' }
      } else {
        return this.$message.error(data.Info)
      }
    },
    async editComment (item) {
      let data = await editComment(item)
      if (!data.Error) {
        this.$message.success(data.Info)
        this.getComments(this.Goods.id)
      } else {
        return this.$message.error(data.Info)
      }
    }
  }
}
</script>

<style scoped>
  .skip{
    display: inline-block;
    position: relative;
    height: 160px;
  }
  .skip img{
    width: 160px;
    height: 160px;
  }
  .skipsName{
    position: absolute;
    bottom: 0;
    height: 30px;
    background: rgba(102, 102, 102, 0.45);
    left: 0;
    right: 0;
  }
  .skipsName i{
    float: right;
    line-height: 30px;
    color: white;
    font-size: 20px;
    padding-right: 7px;
  }
</style>
