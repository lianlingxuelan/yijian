<template>
  <diV>
    <d2-container class="roles">
      <el-table :data="BizGroupList"
                style="width: 100%;text-align: center">
        <el-table-column label="ID"
                         type="index"
                         @change="editdata(scope.row)"
        >
        </el-table-column>
        <el-table-column label="名称" >
          <template slot-scope="props">
            <el-input  placeholder="审批人"   v-model="props.row.name"  @keyup.enter.native="save(props.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
                label="商品组内共享">
          <template slot-scope="props">
            <el-switch v-model="props.row.goods_group"
                       @change='editdata(props.row)'
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label=" 站内共享">
          <template slot-scope="props">
            <el-switch v-model="props.row.goods_site" @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label="网站组内站内共享 ">
          <template slot-scope="props">
            <el-switch v-model="props.row.site_group" @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="域名组内站内共享" prop="domain_group">
          <template slot-scope="props">
            <el-switch v-model="props.row.domain_group" @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label=" 订单组内站内共享">
          <template slot-scope="props">
            <el-switch v-model="props.row.order_group"  @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label="状态修改">
          <template slot-scope="props">
            <el-switch v-model="props.row.order_state" @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label="物流">
          <template slot-scope="props">
            <el-switch v-model="props.row.order_express" @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label="导入">
          <template slot-scope="props">
            <el-switch v-model="props.row.order_import" @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label="导出">
          <template slot-scope="props">
            <el-switch v-model="props.row.order_export" @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label="更新来源">
          <template slot-scope="props">
            <el-switch v-model="props.row.order_refreshSource" @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label="平台权限">
          <template slot-scope="props">
            <el-switch v-model="props.row.sys" @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label="用户权限">
          <template slot-scope="props">
            <el-switch v-model="props.row.user" @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label="状态">
          <template slot-scope="props">
            <el-switch v-model="props.row.state" @change="editdata(props.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
                label="操作">
          <template  slot-scope="scope">
            <el-button  class="el-button el-button--success el-button--mini"  @click="addRow()" style="cursor: pointer"   v-if="scope.$index == ''?true:false">添加</el-button>
            <el-button  class="el-button el-button--danger el-button--mini" @click="removeRow(scope.row,scope.$index)" style="cursor: pointer" v-if="scope.$index != ''?true:false" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template slot="footer">
        <div class="block">
          <el-pagination
              :total="TotalCount"
              :page-count="TotalPage"
              :current-page="currentPage"
              @current-change="handleCurrentChange"
              layout="total,prev,pager, next">
          </el-pagination>
        </div>
      </template>
    </d2-container>
  </diV>
</template>
<script>
import userApi from '@api/user'
export default {
  name: 'roles',
  components: {},
  data () {
    return { list: {
      id: '',
      goods_group: false,
      goods_site: false,
      site_group: false,
      domain_group: false,
      order_group: false,
      order_state: false,
      order_express: false,
      order_import: false,
      order_export: false,
      order_refreshSource: false,
      sys: false,
      user: ' '
    },
    currentPage: '', // 当前页
    TotalCount: '', // 总数据
    TotalPage: '', // 总页码
    BizGroupList: []
    }
  },
  async mounted () {
    this.getData(this.currentPage)
  },
  methods: {
    async getData (page) {
      let data = await userApi.getLData(page)
      this.currentPage = data.Page // 当前页
      this.BizGroupList = data.BizGroupList// 总数据
      this.BizGroupList.unshift(this.list)
      this.TotalCount = data.TotalCount
      this.TotalPage = data.TotalPage // 总页码
    },
    // 分页
    handleCurrentChange (val) {
      this.getData(val)
    },
    // 添加
    async addRow () {
      let keep = this.BizGroupList[0]
      let fr = {
        name: keep.name,
        goods_group: keep.goods_group,
        goods_site: keep.goods_site,
        site_group: keep.site_group,
        domain_group: keep.domain_group,
        order_group: keep.order_group,
        order_state: keep.order_state,
        order_express: keep.order_express,
        order_import: keep.order_import,
        order_export: keep.order_export,
        order_refreshSource: keep.order_refreshSource,
        sys: keep.sys,
        user: keep.user
      }
      if (!fr.name && !fr.goods_group && !fr.goods_site && !fr.domain_group && !fr.order_group && !fr.order_state && !fr.order_express && !fr.order_import && !fr.order_export && !fr.order_refreshSource && !fr.sys && !fr.user) {
        this.$message.warning('禁止保存空值')
        this.BizGroupList.data.unshift(fr)
      } else {
        JSON.stringify(fr)
        await userApi.addData({ RoleList: fr })
        this.$message.warning('保存成功')
        this.getData(this.currentPage)
        this.BizGroupList.pop()
        this.list = [] // 清空第一条数据添加的值
      }
    },
    // 回车事件
    save (row) {
      if (!row.name) {
        this.$message.warning('禁止保存空值')
      } else {
        this.editdata(row)
        this.$message.warning('保存成功')
        this.list = []
        this.getData(this.currentPage)
      }
    },
    // 编辑
    async editdata (row) {
      let obj = {
        id: row.id,
        goods_group: row.goods_group,
        name: row.name,
        goods_site: row.goods_site,
        site_group: row.site_group,
        domain_group: row.domain_group,
        order_group: row.order_group,
        order_state: row.order_state,
        order_express: row.order_express,
        order_import: row.order_import,
        order_export: row.order_export,
        order_refreshSource: row.order_refreshSource,
        sys: row.goods_site,
        user: row.user
      }
      await userApi.addData({ RoleList: obj })
      this.$message.warning('保存成功')
    },
    // 删除
    async removeRow (row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        let arr = row.id
        this.BizGroupList.splice(index, 1)
        userApi.removeData(arr)
        this.getData(this.currentPage)
        this.$message({
          message: res.Info,
          type: 'success'
        })
      }).catch((res) => {
        this.$message({
          message: res.Info,
          type: 'error'
        })
      })
    }
  }
}
</script>
<style scoped>
</style>
