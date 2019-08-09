<template>
    <div class="home">
      <Homeheader>我是home组件</Homeheader>
      <div class="contier" ref="wrapper">
        <div>
          <HomeSwiper :swiperList="swiperList">我是swiper组件</HomeSwiper>
          <HomeNav :iconList="iconList">我是nav组件</HomeNav>
          <Home-Favourite :recommendList="recommendList">我是Favourtive组件</Home-Favourite>
          <HomeWeekend :weekendList="weekendList">我是week组件</HomeWeekend>
        </div>
      </div>
    </div>
</template>

<script>
  //引入函数
  import {getHome} from '@/api'
  import Homeheader from './base/Header'
  import HomeSwiper from './base/Swiper'
  import HomeNav from './base/Nav'
  import HomeFavourite from './base/Favourite'
  import HomeWeekend from './base/Weekend'
  import BScroll from 'better-scroll'

  export default {
    name: "Home",
    components: {
      Homeheader,
      HomeSwiper,
      HomeNav,
      HomeFavourite,
      HomeWeekend,
    },
    data() {
      return {
        iconList: [],
        recommendList: [],
        swiperList: [],
        weekendList: []
      }
    },
    created() {
      getHome().then(res=>{
        let {iconList,recommendList,swiperList,weekendList} = res
        this.iconList = iconList
        this.recommendList = recommendList
        this.swiperList = swiperList
        this.weekendList = weekendList
        console.log(res,iconList);
      })
    },
    mounted() {
      console.log(1);
      this.scroll = new BScroll(this.$refs.wrapper)
    },
    methods: {
      // async getData(){
      //   console.log(1);
      //   let {iconList,recommendList,swiperList,weekendList} = await getHome()
      //   this.iconList = iconList
      //   this.recommendList = recommendList
      //   this.swiperList = swiperList
      //   this.weekendList = weekendList
      //
      // }
    },
  }
</script>

<style scoped>
  .contier{
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0.88rem;
    overflow: hidden;
  }
</style>
