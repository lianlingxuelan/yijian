<template>
    <div class="weekend">
      <h3 class="gowhere">周末去哪儿</h3>
      <div class="content" v-for="(item,index) in weekendList" :key="index">
        <img class="img" :src="item.imgUrl" alt="">
        <div class="product">
          <p class="site">{{item.title}}</p>
          <p class="describe">{{item.desc}}</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "weekend",
        props: ['weekendList'],
        data() {
            return {
              msg: '1'
            }
        }
    }
</script>

<style scoped>
  .gowhere{
    padding: 0 0 0 0.26rem;
  }
  .img{
    width: 100%;
    height: 3.04rem;
  }
  .product{
    padding: 0.14rem 0.2rem 0.2rem ;
  }
  .site{
    font-size: 0.28rem;
    line-height: 0.48rem;
  }
  .product{
    line-height: 0.42rem;
  }
</style>
