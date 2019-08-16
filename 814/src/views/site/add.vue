<template>
    <d2-container>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="basic">基本信息</el-tab-pane>
            <el-tab-pane label="首页" name="home">首页</el-tab-pane>
            <el-tab-pane label="分类" name="class">分类</el-tab-pane>
            <el-tab-pane label="页头" name="head">
                <site-header></site-header>
            </el-tab-pane>
            <el-tab-pane label="页尾" name="footer">
                <site-footer></site-footer>
            </el-tab-pane>
        </el-tabs>
    </d2-container>
</template>

<script>
import SiteHeader from '_c/site/header'
import SiteFooter from '_c/site/footer'
export default {
  components: {
    SiteHeader,
    SiteFooter
  },
  data () {
    return {
      activeName: 'basic'
    }
  },
  methods: {
    handleClick () {
    }
  }
}
</script>

<style scoped>

</style>
