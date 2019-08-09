<template>
    <div class="swiper">
      <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in swiperList" :key="index">
          <img class="swiper-img" :src="item.imgUrl" alt="">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
    export default {
        name: "HomeSwiper",
        props: ['swiperList'],
        data() {
          return {
            swiperOption: {
              pagination:{
                el: '.swiper-pagination'
              },
              loop: true,
              autoplay: true
            },
          }
        }
    }
</script>

<style  scoped>
  .swiper{
    height:2.19rem
  }
  .swiper-container{
    height:100%
  }
  .swiper-img{
    width:100%
  }
  .swiper-pagination {
    background-color:transparent;
  }
</style>
