<template>
   <d2-container>
      <el-row :gutter="10">
         <el-col :span="3">
            <el-card class="box-card d2-card" shadow="hidden" :body-style="{ padding: '10px' }">
               <el-form label-position="top" size="mini">
                  <el-form-item>
                     <el-select v-model="model.state" @change="change">
                        <el-option value="on" label="上架中"></el-option>
                        <el-option value="off" label="已下架"></el-option>
                        <el-option value="del" label="已删除"></el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item>
                     <el-select v-model="model.range" @change="change">
                        <el-option value="my" label="我的商品"></el-option>
                        <el-option value="group" label="组内商品"></el-option>
                        <el-option value="all" label="站内商品"></el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item>
                     <el-select v-model="model.memberName" @change="change">
                        <el-option v-for="item in model.memberList" :key="item.id" :value="item.username" :label="item.nickname"></el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item>
                     <el-select v-model="model.source" @change="change">
                        <el-option value="all" label="全部商品来源"></el-option>
                        <el-option value="source" label="原始商品"></el-option>
                        <el-option value="copy" label="复制商品"></el-option>
                        <el-option value="jump" label="跳转商品"></el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item>
                     <el-select v-model="model.type1" @change="change">
                        <el-option value="all" label="全部分类"></el-option>
                        <el-option v-for="item in model.types1List" :key="item.id" :value="item.name" :label="item.name"></el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item>
                     <el-select v-model="model.share" @change="change">
                        <el-option value="all" label="全部共享方式"></el-option>
                        <el-option value="组内共享" label="组内共享"></el-option>
                        <el-option value="共享" label="站内共享"></el-option>
                        <el-option value="不共享" label="不共享"></el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item>
                     <el-select v-model="model.money" @change="change">
                        <el-option value="all" label="全部货币"></el-option>
                        <el-option value="NT" label="NT（台币）">
                           <span style="float: left">NT</span>
                           <span style="float: right; color: #8492a6; font-size: 13px">台币</span>
                        </el-option>
                        <el-option value="HK" label="HK（港币）">
                           <span style="float: left">HK</span>
                           <span style="float: right; color: #8492a6; font-size: 13px">港币</span></el-option>
                        <el-option value="RM" label="RM（马币）">
                           <span style="float: left">RM</span>
                           <span style="float: right; color: #8492a6; font-size: 13px">马币</span></el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item>
                     <el-select v-model="model.language" @change="change">
                        <el-option value="all" label="全部语言"></el-option>
                        <el-option value="tw" label="繁体台湾"></el-option>
                        <el-option value="hk" label="繁体香港"></el-option>
                        <el-option value="cn" label="简体"></el-option>
                        <el-option value="en" label="英语"></el-option>
                        <el-option value="th" label="泰语"></el-option>
                        <el-option value="jp" label="日语"></el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item>
                     <el-select v-model="model.template" @change="change">
                        <el-option value="all" label="全部模版"></el-option>
                        <el-option v-for="item in model.templateList" :key="item.id" :value="item.filename" :label="item.name"></el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item>
                     <el-select v-model="model.sortord" @change="change">
                        <el-option value="addtime" label="上架时间倒序"></el-option>
                        <el-option value="lastsoldtime" label="最后出单倒序"></el-option>
                        <el-option value="lastedittime" label="最后编辑倒序"></el-option>
                        <el-option value="copycount" label="被复制次数倒序"></el-option>
                        <el-option value="viewcount" label="浏览次数倒序"></el-option>
                        <el-option value="returnedcount" label="退货单数倒序"></el-option>
                        <el-option value="returnedmoney" label="退货金额倒序"></el-option>
                        <el-option value="purchasecount" label="销售单数倒序"></el-option>
                        <el-option value="salesmoney" label="销售金额倒序"></el-option>
                     </el-select>
                  </el-form-item>
               </el-form>
            </el-card>
            <el-card class="box-card d2-card d2-mt-10" shadow="hidden" :body-style="{ padding: '10px' }">
               <el-form label-position="top" size="mini">
                  <el-form-item>
                     <el-select v-model="model.searchtype" @change="change">
                        <el-option value="name" label="商品名"></el-option>
                        <el-option value="sitename" label="网站名"></el-option>
                        <el-option value="id" label="商品id"></el-option>
                        <el-option value="sitedir" label="网址id"></el-option>
                        <el-option value="all" label="全部"></el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item>
                     <el-input placeholder="搜索关键字" :clearable="true" v-model="model.searchkey" @input="change"></el-input>
                  </el-form-item>
               </el-form>
            </el-card>
         </el-col>
         <el-col :span="21">
            <el-row :gutter="10">
               <el-col :span="4" v-for="goods in model.goodsList" :key="goods.id" class="item">
                  <el-card shadow="hover" :body-style="{ padding: '0px' }" @click="edit(goods)">
                     <div class="goodsbox" :class="goods.isshow?'show':''">
                        <div class="subscript" v-if="!goods.source">原创</div>
                        <div class="toolbar" @mouseleave="goods.isshow=false">
                           <router-link :to="'/goods/add/'+goods.id">
                              <div style="width:100%;height:100%;"></div>
                           </router-link>
                           <div class="bottom">
                              <div class="line2">
                                 <el-button type="text" size="small" @click="Detail(goods)">信息</el-button>
                                 <el-divider direction="vertical"></el-divider>
                                 <el-button type="text" size="small" @click="comment(goods)">评论</el-button>
                                 <el-divider direction="vertical"></el-divider>
                                 <el-button type="text" size="small" @click="copy(goods)">复制</el-button>
                                 <el-divider direction="vertical"></el-divider>
                                 <el-button v-if="goods.state === '上架中'" type="text" size="small" @click="down(goods)">下架</el-button>
                                 <el-button v-if="goods.state !== '上架中'" type="text" size="small" @click="on(goods)">上架</el-button>
                                 <el-divider direction="vertical"></el-divider>
                                 <el-button type="text" size="small" @click="del(goods)">删除</el-button>
                              </div>
                           </div>
                        </div>
                           <div class="goodsimg" @mouseenter="goods.isshow=true">
                              <el-image :src="model.cdnBase + goods.head_imgs.split(';')[0]+'-350'"
                                        fit="fill"></el-image>
                           </div>
                        <div class="goodsinfo">
                           <div class="siteurl">
                              <el-link :href="goods.Domain?('http://'+goods.Domain.name + '/'+goods.sitedir):''" :underline="false" class="url"
                                       type="info" v-text="goods.Domain?('http://'+goods.Domain.name + '/'+goods.sitedir):'请先设置域名'"></el-link>
                              <el-link type="danger" :underline="false" class="d2-right copy">复制</el-link>
                           </div>
                           <div class="name text-truncate">{{goods.name}}</div>
                           <div><!--
                              <span class="price">NT 1299</span>-->
                           </div>
                           <div>
                              <el-link :underline="false" class="username" type="info">{{goods.User.nickname}}（{{goods.id}}）</el-link>
                              <el-link :underline="false" class="share d2-fr" type="info">{{goods.isshare}}</el-link>
                           </div>
                        </div>
                     </div>
                  </el-card>
               </el-col>
            </el-row>
         </el-col>
      </el-row>
      <template>
         <list-detail
             :goods="currentGoods"
            :visible.sync="detailVisible"/>
      </template>
      <template slot="footer">
         <el-pagination background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[12, 24, 36, 48]"
                        :page-size="model.pageSize"
                        :total="model.totalCount"
                        :current-page="model.Page"
                        layout="total, sizes, prev, pager, next, jumper">
         </el-pagination>
      </template>
   </d2-container>
</template>

<script>
import { getGoodsList, copyGoods, offGoods, onGoods, delGoods } from '@api/goods'
import listDetail from '_c/goods/list/listDetail'
export default {
  components: {
    listDetail
  },
  data () {
    return {
      detailVisible: false,
      currentGoods: {},
      filters: {},
      CdnBase: '',
      goodsList: [],
      model: {}
    }
  },
  created () {
    this.getGoodsList('my')
  },
  methods: {
    // 过滤商品
    change () {
      let url = `${this.model.range}/${this.model.page}`
      url += '/?state=' + this.model.state
      url += '&source=' + this.model.source
      url += '&template=' + this.model.template
      url += '&language=' + this.model.language
      url += '&type1=' + this.model.type1
      url += '&money=' + this.model.money
      url += '&share=' + this.model.share
      url += '&membername=' + this.model.memberName
      url += '&searchtype=' + this.model.searchtype
      url += '&sortord=' + this.model.sortord
      url += '&pagesize=' + this.model.pageSize
      if (this.model.searchkey) {
        url += '&searchkey=' + this.model.searchkey
      }
      this.getGoodsList(url)
    },
    // 获取商品列表
    async getGoodsList (url) {
      const ret = await getGoodsList(url)
      if (ret.Error) {
        return this.$message({
          message: ret.Info,
          type: 'error'
        })
      }
      ret.goodsList.map((item) => { item.isshow = false })
      this.model = ret
    },
    // 详情
    Detail (goods) {
      this.detailVisible = true
      this.currentGoods = goods
    },
    // 评论
    comment (goods) {
      this.$router.push('/goods/comment/' + goods.id)
    },
    // 复制
    copy (goods) {
      this.$confirm('你确定要复制' + goods.name + '?', '提示', {
        confirmButtonText: '复制',
        cancelButtonText: '点错了',
        type: 'warning'
      }).then(async () => {
        let data = await copyGoods(goods.id)
        if (!data.Error) {
          this.$message.success(data.Info)
          this.$router.push('/goods/add/' + data.id)
        }
      }).catch(() => {})
    },
    // 下架
    down (goods) {
      this.$confirm('你确定要下架' + goods.name + '?', '提示', {
        confirmButtonText: '下架',
        cancelButtonText: '点错了',
        type: 'warning'
      }).then(async () => {
        let data = await offGoods(goods.id)
        if (!data.Error) {
          this.$message.success(data.Info)
          this.change()
        }
      }).catch(() => {})
    },
    // 上架
    on (goods) {
      this.$confirm('你确定要上架' + goods.name + '?', '提示', {
        confirmButtonText: '上架',
        cancelButtonText: '点错了',
        type: 'warning'
      }).then(async () => {
        let data = await onGoods(goods.id)
        if (!data.Error) {
          this.$message.success(data.Info)
          this.change()
        }
      }).catch(() => {})
    },
    // 删除
    del (goods) {
      this.$confirm('你确定要删除' + goods.name + '?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '点错了',
        type: 'warning'
      }).then(async () => {
        let data = await delGoods(goods.id)
        if (!data.Error) {
          this.$message.success(data.Info)
          this.change()
        }
      }).catch(() => {})
    },
    // 修改每页条数
    handleSizeChange (val) {
      this.model.pageSize = val
      this.change()
    },
    // 修改当前页码
    handleCurrentChange (val) {
      this.model.page = val
      this.change()
    }
  }
}
</script>
<style lang="less" scoped>
   .item:nth-child(n+7) {
      margin-top: 10px;
   }

   .goodsbox {
      position: relative;
      cursor: pointer;

      .subscript {
         color: #fff;
         height: 40px;
         width: 100px;
         position: absolute;
         left: -40px;
         top: -8px;
         text-align: center;
         line-height: 53px;
         z-index: 1;
         font-size: 12px;
         background-color: #1b8afa;
         transform: rotate(-45deg);
      }

      .goodsimg {
         overflow: hidden;
         height: 250px;
      }

      .toolbar {
         position: absolute;
         opacity: 0;
         width: 100%;
         bottom: 0;
         top: 0;
         transition: opacity .3s ease;
         margin-bottom: 70px;

         .bottom {
            line-height: 1.6;
            background: #ebf1f6;
            border-bottom: 1px solid #e7e9ee;
            position: absolute;
            width: 100%;
            bottom: 0;
            opacity: .9;

            .line2 > .el-button {
               width: 15%;
            }
         }
      }

      .goodsinfo {
         font-size: 12px;
         line-height: 1.5;
         padding: 3px 0 2px;

         .siteurl {
            position: relative;
            border-bottom: 1px solid #ebf1f6;

            .url {
               padding-left: 5px;
               font-size: 12px;
               margin-top: -1px;
            }

            .copy {
               font-size: 12px;
               position: absolute;
               background: #fff;
               right: 0;
               top: 0;
               width: 36px;
            }
         }

         .name {
            padding: 5px 0 5px 5px;
         }

         .username {
            padding-left: 5px;
            font-size: 12px;
         }

         .price {
            padding-left: 5px;
            color: #F56C6C;
         }

         .share {
            font-size: 12px;
            padding-right: 5px;
         }
      }
   }

   .goodsbox.show {
      .goodsimg > .el-image {
         transition: opacity .3s ease;
         filter: blur(10px);
      }

      .toolbar {
         opacity: 1;
         z-index: 2;
      }
   }
</style>
