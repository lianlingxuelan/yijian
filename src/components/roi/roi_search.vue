<template>
    <el-form :inline="true" :model="SearchContent" class="demo-form-inline">
        <el-form-item v-if="membershow">
            <el-select v-model="SearchContent.MemberName" @change="filter_user">
                <el-option-group label="正常账户">
                    <el-option
                            v-for="item in memberList1"
                            :key="item.username"
                            :label="item.nickname"
                            :value="item.username">
                    </el-option>
                </el-option-group>
                <el-option-group label="停用账户">
                    <el-option
                            v-for="item in memberList2"
                            :key="item.username"
                            :label="item.nickname"
                            :value="item.username">
                    </el-option>
                </el-option-group>
            </el-select>
        </el-form-item>
        <el-form-item v-if="groupshow">
            <el-select v-model="SearchContent.MemberName" @change="filter_group">
                    <el-option
                            v-for="item in GroupnameList"
                            :key="item.groupname"
                            :label="item.groupname"
                            :value="item.groupname">
                    </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-select v-model="SearchContent.Money" @change="filter_user">
                <el-option
                        v-for="item in moneys"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-select v-model="SearchContent.Month" @change="filter_user">
                <el-option
                        v-for="item in Months"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
  name: 'roi_search',
  props: {
    MemberList: {
      type: Array
    },
    Months: {
      type: Array
    },
    moneys: {
      type: Array
    },
    SearchContent: {
      type: Object
    },
    GroupnameList: {
      type: Array
    },
    membershow: {
      type: Boolean
    },
    groupshow: {
      type: Boolean
    }
  },
  computed: {
    memberList1 () {
      return this.MemberList.filter((item) => {
        return item.state === '正常'
      })
    },
    memberList2 () {
      return this.MemberList.filter((item) => {
        return item.state === '停用'
      })
    }
  },
  methods: {
    filter_user () {
      this.$emit('search')
    },
    filter_group () {
      this.$emit('filter_group')
    }
  }
}
</script>

<style scoped>

</style>
