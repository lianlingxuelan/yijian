<template>
    <div class="header">
      <div>
        <div class="select">
          <router-link tag="i" to="/" class="iconfont icon-fanhui header-back"></router-link>
          <h4 class="cityselect">城市选择</h4>
        </div>
        <div class="area">
          <span class="churchyard">境内</span>
          <span class="overseas">境外</span>
        </div>
      </div>
      </div>

</template>

<script>
    export default {
        name: "Header",
        data() {
            return {}
        }
    }
</script>

<style scoped>
  .header{
    width: 8.22rem;
    height: 1.76rem;
    background: #00BCD4;
    color: #fff;
  }
  .select{
    width: 100%;
    height: 0.88rem;
  }
  .select .icon-fanhui{
    position: absolute;
    margin:0 0.2rem;
    line-height: 0.88rem;
    font-size:0.36rem;
  }
  .cityselect {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 0.32rem;
    line-height: 0.88rem;
  }
  .area{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 0.2rem 1rem;
    font-size: 0.28rem;
  }
  span{
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .churchyard{
    text-align: center;
    background: #fff;
    color: #00BCD4;
    width: 3.11rem;
  }
  .overseas{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #fff;
    width: 3.11rem;
  }
</style>
