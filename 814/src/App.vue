<template>
    <div id="app">
        <router-view></router-view>
        <iframe v-if="iframe_src" :src="iframe_src"></iframe>
    </div>
</template>

<script>
import http from '@/api/login'

export default {
  name: 'app',
  data () {
    return {
      iframe_src: ''
    }
  },
  async created () {
    const ptconfig = await http.ptconfig()
    if (ptconfig) {
      localStorage.setItem('ptconfig', JSON.stringify(ptconfig.PTConfig))
    }
    let userinfo = await http.get_userinfo()
    if (userinfo) {
      localStorage.setItem('userinfo', JSON.stringify(userinfo.UserInfo))
    }
  },
  async mounted () {
    this.$options.sockets.onmessage = (msg) => {
      if (!msg.data) return
      const message = JSON.parse(msg.data)
      if (message.type === 1) {
        if (message.data) {
          localStorage.setItem('ptconfig', message.data)
        }
      }
      if (message.type === 2) {
        if (message.data) {
          localStorage.setItem('userinfo', message.data)
        }
      }
      if (message.type === 4) {
        if (message.filename) {
          this.$confirm('导出完成，是否立即下载?', '提示', {
            confirmButtonText: '下载',
            cancelButtonText: '不要了',
            type: 'warning'
          }).then(() => {
            this.iframe_src = message.filename
          }).catch(() => {
          })
        } else {
          this.$message.error(message.Info)
        }
      }
    }
    this.$options.sockets.onopen = () => {
      this.$socket.sendObj({ type: 0, data: 'Are U OK!' })
      setInterval(() => {
        this.$socket.sendObj({ data: 'Are U OK!' })
      }, 60000)
    }
  }
}
</script>

<style lang="scss">
    @import '~@/assets/style/public-class.scss';

    .success {
        color: #67C23A;
    }

    .primary {
        color: #409EFF;
    }

    .warning {
        color: #E6A23C;
    }

    .danger {
        color: #F56C6C;
    }

    .el-pagination {
        text-align: center;
    }

    * {
        box-sizing: border-box;
    }

    /*.el-tooltip__popper.is-dark{background: #EFA100 !important;}*/
    .onepiece {
        width: 300px;
    }

    .service_select {
        .el-select-group__title {
            color: red;
        }
    }

    input.el-input__inner {
        user-select: none;
    }

    .text-truncate {
        word-wrap: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
