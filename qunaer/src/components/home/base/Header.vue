<template>
    <div class="header">
      <i class="iconfont icon-fanhui header-back"></i>
      <div class="header-input">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="输入城市/景点/游玩主题">
      </div>
      <router-link tag="div" to="/city" class="header-right">
        <span>{{$store.state.city}}</span>
        <i class="iconfont icon-jiantouxiangxia"></i>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "Homeheader",
        data() {
            return {

            }
        }
    }
</script>

<style lang="stylus" scoped>
  .header
    position:relative
    display:flex
    height: 0.88rem
    line-height:0.88rem
    background-color: #00bcd4
    color: #fff
    .header-back
      width:.88rem
      text-align: center
    .header-input
      flex:1
      background:#fff
      height: .64rem
      margin-top: 0.12rem
      line-height: 0.64rem
      border-radius: 0.1rem
      .icon-sousuo
        vertical-align: middle
        color: #ccc
      input
        vertical-align: middle
    .header-right
      padding: 0 .15rem
      .icon-jiantouxiangxia
        font-size: 0.24rem
        vertical-align: top
</style>
