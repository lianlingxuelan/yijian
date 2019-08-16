<template>
    <m-permission :search="search" :UserList="UserList"
                  :LeaderList="LeaderList" :pageSize="pageSize" :TotalCount="TotalCount"
    @currentChange="currentChange" @handleClick="handleClick" @save="save">
    </m-permission>
</template>

<script>
import { getKfList, saveKf } from '../../api/permission'
export default {
  name: 'customer',
  data () {
    return {
      LeaderList: [],
      UserList: [],
      search: {
        State: '0',
        Page: 1,
        MaxCount: 12
      },
      TotalCount: 0,
      pageSize: 10
    }
  },
  created () {
    this.getKfList()
  },
  methods: {
    async getKfList () {
      let data = await getKfList(this.search)
      if (!data.Error) {
        data.UserList.forEach((item) => {
          item.group = item.groupname.split(',')
        })
        this.UserList = data.UserList
        this.search.State = data.State === '正常' ? '0' : '1'
        this.LeaderList = data.LeaderList
        this.TotalCount = data.TotalCount
      }
    },
    handleClick () {
      this.getKfList()
    },
    currentChange (val) {
      this.search.Page = val
      this.getKfList()
    },
    async save (item) {
      let data = await saveKf(item)
      if (!data.Error) {
        this.$message.success(data.Info)
      } else {
        this.$message.error(data.Info)
      }
    }
  }
}
</script>
