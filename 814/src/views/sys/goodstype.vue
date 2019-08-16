<template>
    <div>
        <d2-container>
            <el-row :gutter="15">
                <el-col span="8">
                    <Type :type_list="type_list['1']" type_index="1" @show_add_type="show_add_type"
                          @show_edit_type="show_edit_type" @del_type="del_type" @get_child_type="get_child_type"
                          :current_id="current_type_id['1']"></Type>
                </el-col>
                <el-col span="8">
                    <Type :type_list="type_list['2']" type_index="2" @show_add_type="show_add_type"
                          @show_edit_type="show_edit_type" @del_type="del_type" @get_child_type="get_child_type"
                          :current_id="current_type_id['2']"></Type>
                </el-col>
                <el-col span="8">
                    <Type :type_list="type_list['3']" type_index="3" @show_add_type="show_add_type"
                          @show_edit_type="show_edit_type" @del_type="del_type" @get_child_type="get_child_type"
                          :current_id="current_type_id['3']"></Type>
                </el-col>
            </el-row>
        </d2-container>
        <el-dialog :title="modal_title"
                   :visible.sync="modal_isshow"
                   width="25%"
                   center>
            <el-form ref="type_item" :model="type_item" label-width="80px" label-position="top">
                <el-form-item label="上级">
                    <el-input v-model="type_item.father" readonly></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="type_item.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancel_click">取 消</el-button>
                <el-button type="primary" @click="ok_click">确定</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
import sysApi from '@/api/sys'
import Type from '@/components/sys/type'

export default {
  components: {
    Type
  },
  data () {
    return {
      modal_title: '添加分类',
      modal_isshow: false,
      type_item: {},
      old_type_item: {},
      current_type_index: {},
      current_type_id: {
        '1': 0,
        '2': 0,
        '3': 0
      },
      type_list: {
        '1': [],
        '2': [],
        '3': []
      }
    }
  },
  created () {
    this.getTypeList('1')
  },
  methods: {
    show_add_type (typeIndex) {
      this.current_type_index = typeIndex
      this.modal_title = '添加分类'
      if (parseInt(typeIndex) > 1) {
        if (!this.type_item.father) {
          return this.$message.info('请选择上级')
        }
      } else { this.type_item = {} }
      this.modal_isshow = true
    },
    show_edit_type (item, typeIndex) {
      this.current_type_index = typeIndex
      this.modal_title = '编辑分类'
      Object.assign(this.old_type_item, item)
      this.type_item = item
      this.modal_isshow = true
    },
    get_child_type (item, typeIndex) {
      this.current_type_id[typeIndex] = item.id
      let classtype
      if (typeIndex + '' === '0') {
        classtype = '主分类'
      } else if (typeIndex + '' === '1') {
        classtype = '二级分类'
      } else if (typeIndex + '' === '2') {
        classtype = '三级分类'
      }
      this.type_item = {
        father: item.name,
        fatherid: item.id,
        classtype: classtype
      }
      if (typeIndex === '1') {
        this.type_list['3'] = []
        this.current_type_id['2'] = 0
        this.current_type_id['3'] = 0
      }
      this.getTypeList(parseInt(typeIndex) + 1, item.id)
    },
    ok_click () {
      if (this.modal_title.indexOf('编辑') >= 0) {
        this.edit_type()
      } else {
        this.add_type()
      }
    },
    cancel_click () {
      if (this.type_item) {
        Object.assign(this.type_item, this.old_type_item)
      }
      this.modal_isshow = false
    },
    async add_type () {
      let ret
      if (parseInt(this.current_type_index) > 1) {
        if (!this.type_item.father && !this.type_item.fatherid) return
        if (this.current_type_index + '' === '2') {
          this.type_item.classtype = '二级分类'
        } else {
          this.type_item.classtype = '三级分类'
        }
        ret = await sysApi.addType(this.type_item)
      } else {
        this.type_item.classtype = '主分类'
        ret = await sysApi.addType(this.type_item)
      }
      if (ret.Error) {
        this.$message.error(ret.Info)
      } else {
        this.$message.success(ret.Info)
        this.modal_isshow = false
        this.getTypeList(this.current_type_index, this.type_item.fatherid)
      }
    },
    async edit_type () {
      let ret
      if (parseInt(this.current_type_index) > 1) {
        if (!this.type_item.father && !this.type_item.fatherid) return
        if (parseInt(this.current_type_index) === 2) {
          this.type_item.classtype = '二级分类'
        } else {
          this.type_item.classtype = '三级分类'
        }
        ret = await sysApi.editType(this.type_item)
      } else {
        this.type_item.classtype = '主分类'
        ret = await sysApi.editType(this.type_item)
      }
      if (!ret.Error) {
        this.$message.success(ret.Info)
        this.modal_isshow = false
        this.getTypeList(this.current_type_index, this.type_item.fatherid)
      } else {
        this.type_item = this.old_type_item
        this.$message.error(ret.Info)
      }
    },
    del_type (item, typeIndex) {
      this.$confirm('你确定要删除' + item.name + '(包含下级分类)?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (typeIndex + '' === '1') {
          item.classtype = '主分类'
        } else if (typeIndex + '' === '2') {
          item.classtype = '二级分类'
        } else if (typeIndex + '' === '3') {
          item.classtype = '三级分类'
        }
        let data = await sysApi.delType(item)
        if (!data.Error) {
          this.$message.success(data.Info)
          this.getTypeList(typeIndex, item.fatherid)
        } else {
          this.$message.error(data.Info)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取数据
    async getTypeList (index, id) {
      let classtype
      if (index + '' === '1') {
        classtype = '主分类'
      } else if (index + '' === '2') {
        classtype = '二级分类'
      } else if (index + '' === '3') {
        classtype = '三级分类'
      }
      let config = {
        id: id,
        classtype: classtype
      }
      let data = await sysApi.getTypeList(config)
      if (!data.error) {
        this.type_list[index] = data.list
      } else { this.$message.error(data.msg) }
    }
  }
}
</script>
