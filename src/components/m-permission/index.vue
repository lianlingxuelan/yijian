<template>
    <d2-container>
        <el-tabs type="border-card" v-model="search.State" @tab-click="handleClick">
            <el-tab-pane label="正常用户" name="0">
                <el-table :data="UserList"
                          style="width: 100%">
                    <el-table-column prop="username" label="用户名" width="180">
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称" width="180">
                    </el-table-column>
                    <el-table-column label="状态" width="180">
                        <template>
                            <i class="el-icon-success success" style="font-size:20px;"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="管辖组" >
                        <template slot-scope="props">
                            <el-select multiple  v-model="props.row.group">
                                <el-option v-for="item of LeaderList" :key="item.username"
                                           :label="item.nickname"
                                           :value="item.username"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column  width="180">
                        <template slot-scope="props">
                            <el-button type="primary" size="medium" @click="save(props.row)">保存</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="停用用户" name="1">
                <el-table :data="UserList"
                          style="width: 100%">
                    <el-table-column prop="username" label="用户名" width="180">
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称" width="180">
                    </el-table-column>
                    <el-table-column label="状态" width="180">
                        <template>
                            <i class="el-icon-error danger" style="font-size:20px;"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="管辖组" >
                        <template slot-scope="props">
                            <el-select multiple  v-model="props.row.group">
                                <el-option v-for="item of LeaderList" :key="item.username"
                                           :label="item.nickname"
                                           :value="item.username"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column  width="180">
                        <template slot-scope="props">
                            <el-button type="primary" size="medium" @click="save(props.row)">保存</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <template slot="footer">
            <el-pagination v-show="search.Page>1" background layout="prev, pager, next,jumper" :page-size="pageSize"  :total="TotalCount" :current-page="search.Page"
                           @current-change="currentChange"></el-pagination>
        </template>
    </d2-container>
</template>

<script>
export default {
  name: 'm-permission',
  props: {
    search: {
      type: Object
    },
    UserList: {
      type: Array
    },
    LeaderList: {
      type: Array
    },
    pageSize: {
      type: Number
    },
    TotalCount: {
      type: Number
    }
  },
  methods: {
    handleClick () {
      this.$emit('handleClick')
    },
    currentChange () {
      this.$emit('currentChange')
    },
    save (item) {
      this.$emit('save', item)
    }
  }
}
</script>
<style scoped>
    .el-select.el-select--default{
        width:90%;
    }
</style>
