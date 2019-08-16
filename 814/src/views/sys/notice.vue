<template>
   <d2-container>
       <div class="added">
           <h1 class="a-title">公告管理</h1>
           <el-table
               :data="tableData"
               style="width: 100%"
               border="2px solid blue"
               :align="center"
           >
               <el-table-column
                   prop="User.nickname"
                   label="发布人"
                   min-width="15%"
                   align="center">
               </el-table-column>
               <el-table-column
                   prop="created_at"
                   label="发布时间"
                   min-width="20%"
                   align="center"
                   :formatter="timeCount"
               >
               </el-table-column>
               <el-table-column
                   prop="title"
                   label="标题"
                   min-width="15%"
                   align="center">
               </el-table-column>
               <el-table-column
                   prop="type"
                   label="类型"
                   min-width="15%"
                   align="center">
               </el-table-column>
               <el-table-column
                   prop="endtime"
                   label="截止时间"
                   min-width="15%"
                   align="center"
                   :formatter="timeFliter"
               >
               </el-table-column>
               <el-table-column
                   label="操作"
                   min-width="15%"
                   align="center">
                   <template slot-scope="scope">
                       <el-button
                           size="mini"
                           @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                       <el-button
                           size="mini"
                           type="danger"
                           @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                   </template>
               </el-table-column>
           </el-table>
       </div>
       <div class="add-new">
           <h1 class="a-n-title">添加公告
               <button class="sub-button saveData" @click="saveData">保存</button>
               <button class="sub-button" @click="addData">添加</button>
           </h1>
           <el-form ref="form" :model="form" label-width="80px">
               <el-form-item label="公告标题">
                   <el-input v-model="form.title" placeholder="例如：2018.3.4平台功能升级"></el-input>
               </el-form-item>
               <el-form-item label="公告内容">
                   <d2-quill style="min-height: 200px; margin-bottom: 20px; " v-model="form.body" :toolbar="toolbar" :placeholder="placehloder"/>
               </el-form-item>
               <el-form-item label="公告类型">
                   <el-input v-model="form.type" placeholder="例如：系统升级，业务流程变更，紧急公告等"></el-input>
               </el-form-item>
               <el-form-item label="显示天数">
                   <el-input type="number" v-model="form.endtime" placeholder="例如：30天"></el-input>
               </el-form-item>
           </el-form>
       </div>
   </d2-container>
</template>

<script>
import { getNotice, saveNotice, delNotice } from '@api/sys'
export default {
  name: 'notice',
  data () {
    return {
      tableData: [],
      form: {
        title: '',
        body: '',
        type: '',
        endtime: ''
      },
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
      ],
      placehloder: '公告内容'
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    timeCount (row, col) {
      return new Date(row[col.property]).NatureTime()
    },
    timeFliter (row, col) {
      return new Date(row[col.property]).FormatDefault()
    },
    async getData () {
      let data = await getNotice()
      if (data.Error) {
        this.$message({
          type: 'info ',
          message: data.Info
        })
      } else {
        this.tableData = data.NoticeList
      }
    },
    handleEdit (index, row) {
      this.form.title = row.title
      this.form.body = row.body
      this.form.type = row.type
      this.form.endtime = row.endtime
      this.form.id = row.id
    },
    async saveData () {
      let noticeinfo = this.form
      if (this.form.endtime) { noticeinfo.endtime = Number(this.form.endtime) }
      let res = await saveNotice({ noticeinfo })
      if (res.Error) {
        this.$message({
          type: 'info',
          message: res.Info
        })
      } else {
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
        this.getData()
      }
    },
    handleDelete (index, row) {
      this.$confirm('确定删除此条内容?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定'
      }).then(async () => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        let data = await delNotice(row.id)
        if (data.Error) {
          this.$message({
            type: 'info',
            message: data.Info
          })
        } else {
          this.getData()
        }
      }).catch(() => {})
    },
    addData () {
      if (!this.form.title || !this.form.body) {
        return this.$message({
          type: 'warning ',
          message: '不能留空哦！'
        })
      }
      let { title, body, type, endtime } = this.form
      this.updateData({ noticeinfo: { title, body, type, endtime } })
    },
    async updateData (data) {
      let res = await saveNotice(data)
      if (res.Error) {
        this.$message({
          type: 'info',
          message: res.Info
        })
      } else {
        this.$message({
          type: 'success',
          message: '添加成功！'
        })
        this.getData()
      }
    }
  }
}
</script>

<style scoped>
    .added{
        margin-bottom: 55px;
    }
    .a-title{
        font-size: 22px;
        font-weight: normal;
    }
    .el-table--border{
        border-top: 2px solid #409EFF;
    }
    .add-new{
        width: 100%;
        border-top: 2px solid #409EFF;
        padding: 0 10px 0 10px;
    }
    .a-n-title{
        font-size: 16px;
        font-weight: normal;
        text-indent: 14px;
    }
    .sub-button{
        width: 58px;
        height: 32px;
        font-size: 14px;
        float: right;
        margin-right: 10px;
        background: #409EFF;
        color: #fff;
        outline: none;
        border: none;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .sub-button:hover{
        cursor: pointer;
        background: #fff;
        color: #409EFF;
        border: 1px solid #000;
        outline: none;
        transition: all .3s;
    }
    .el-form{
        border-top: 1px solid grey;
        margin-top: 20px;
        padding-top: 20px;
    }
    .el-input__inner::-webkit-inner-spin-button,.el-input__inner::-webkit-outer-spin-button{
        padding: 0 0 0 15px;
    }
</style>
