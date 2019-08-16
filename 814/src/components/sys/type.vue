<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="12">{{typeIndex}}分类</el-col>
                <el-col :span="12" style="text-align: right">
                    <el-button type="primary" @click="show_add_type(type_index)" size="small">添加分类</el-button>
                </el-col>
            </el-row>
            <ul class="type_ul">
                <li v-for="item in type_list" :class="{active:current_id+'' === item.id+''}" :key="item.name">
                    <i class="el-icon-edit edit"  @click="show_edit_type(item,type_index)"></i>
                    <div style="cursor:pointer;" class="title" @click="get_child_type(item,type_index)">
                        {{item.name}}
                    </div>
                    <i class="el-icon-delete del"  @click="del_type(item,type_index)"></i>
                </li>
            </ul>
        </el-card>
    </div>
</template>
<script>
export default {
  name: 'type',
  props: {
    current_id: {
      type: Number,
      default: 0
    },
    type_index: {
      type: String
    },
    type_list: Array
  },
  computed: {
    typeIndex () {
      if (this.type_index + '' === '1') {
        return '主'
      } else if (this.type_index + '' === '2') {
        return '二级'
      } else {
        return '三级'
      }
    }
  },
  methods: {
    show_add_type (typeIndex) {
      this.$emit('show_add_type', typeIndex)
    },
    get_child_type (item, typeIndex) {
      if (typeIndex !== '3') {
        this.$emit('get_child_type', item, typeIndex)
      }
    },
    show_edit_type (item, typeIndex) {
      this.$emit('show_edit_type', item, typeIndex)
    },
    del_type (item, typeIndex) {
      this.$emit('del_type', item, typeIndex)
    }

  }
}
</script>
<style lang="less" scoped>
    .type_ul {
        list-style: none;
        max-height: 670px;
        overflow-y: auto;
    }

    .type_ul > li {
        display: table;
        width: 100%;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
    }

    .type_ul > li:hover {
        background-color: #f8f8f9;
        color: #333333;
    }

    .type_ul > li > div {
        display: table-cell;
        line-height: 40px;
        text-align: center;
        width: 60%;
    }

    .type_ul > li > i.edit, .type_ul > li > i.del {
        text-align: center;
        width: 15%;
        font-size: 20px;
        display: block;
        margin: auto;
    }

    .type_ul > li > i.edit {
        color: #2b85e4;
    }

    .type_ul > li > i.del {
        color: #ed4014;
    }

    .active {
        background: #a1cfff;
        color: #fff;
    }
</style>
