<template>
    <el-dialog title="物流信息" :visible.sync="isshow" width="680px" center close-on-click-modal :before-close="beforeclose">
        <el-form ref="express" :model="express" label-width="80px" label-position="left" inline>
            <el-form-item label="物流单号">
                <el-input v-model="express.expressnumber"></el-input>
            </el-form-item>
            <el-form-item label="物流公司">
                <el-input v-model="express.expressname"></el-input>
            </el-form-item>
            <el-form-item label="发货时间">
                <el-input v-model="express.expresstime"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" size="medium" @click="update_expressinfo">查询</el-button>
                <el-button type="warning" size="medium" @click="go_express_website" @click.stop
                           v-clipboard:copy="express.expressnumber"
                           v-clipboard:success="onCopy"
                           v-clipboard:error="onError" >官网查询</el-button>
                <el-button type="danger" size="medium" v-show="editing_order.orderstate!=='end'" @click="end_order">完成订单</el-button>
            </el-form-item>
            <el-form-item label="物流信息">
                <el-timeline :reverse="reverse">
                    <el-timeline-item
                            v-for="(activity, index) in express.expressinfo"
                            :key="index"
                            :timestamp="activity.time">
                        <span class="danger" style="margin-right:5px;">{{activity.state}}</span>
                        <span>{{activity.point}}</span>
                    </el-timeline-item>
                </el-timeline>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button type="primary" @click="save_expressinfo">修改</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'edit_expressinfo',
  props: {
    show_expressinfo: {
      type: Boolean
    },
    editing_order: {
      type: Object
    }
  },
  data () {
    return {
      express: {},
      reverse: true
    }
  },
  computed: {
    isshow () {
      return this.show_expressinfo
    }
  },
  watch: {
    editing_order () {
      this.express = {
        expressnumber: this.editing_order.OrderExpress ? this.editing_order.OrderExpress.expressnumber : '',
        expressname: this.editing_order.OrderExpress ? this.editing_order.OrderExpress.expressname : '',
        expresstime: this.editing_order.OrderExpress ? this.editing_order.OrderExpress.expresstime : '',
        expressinfo: this.editing_order.OrderExpress ? this.editing_order.OrderExpress.expressinfo : ''
      }
    }
  },
  methods: {
    beforeclose () {
      this.$emit('beforeclose')
    },
    // 复制成功
    onCopy () {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    // 复制失败
    onError () {
      this.$message.error('复制失败，当前浏览器不支持该功能')
    },
    // 查询物流信息
    update_expressinfo () {
      this.$emit('update_expressinfo')
    },
    // 官网查询
    go_express_website () {
      this.$emit('go_express_website')
    },
    // 完成订单
    end_order () {
      this.$confirm('确定要修改订单状态到已完成?', '提示', {
        confirmButtonText: '修改',
        cancelButtonText: '点错了',
        type: 'warning'
      }).then(() => {
        this.$emit('end_order')
      }).catch(() => {})
    },
    // 保存修改
    save_expressinfo () {
      if (this.editing_order.state === 0) return this.$message.error('无效订单不允许直接编辑！')
      this.$emit('save_expressinfo', this.express)
    }
  }
}
</script>

<style scoped>
    .el-timeline {
        max-height: 300px;
        overflow-y: auto;
    }
</style>
