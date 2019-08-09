<template>
  <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide v-for="(imgs,index) in filterImgs"  :key="index">
      <div class="homenav">
        <div class="item" v-for="item in imgs" :key="item.id">
          <img :src="item.imgUrl" alt="">
          <p>{{item.desc}}</p>
        </div>
      </div>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>


</template>

<script>

    export default {
        name: "homenav",
        props: ['iconList'],
        data() {
            return {
              swiperOption:{},
            }
        },
        computed:{
          filterImgs(){
            let imgs = []
            this.iconList.forEach((item,index)=>{
              let page = ~~(index/8)//~~取整
              if(!imgs[page]){
                imgs[page] = []
              }
              imgs[page].push(item)
            })
            return imgs
          }
        }
    }
</script>

<style scoped>
  .homenav{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    height: 3.8rem;
  }
  .item{
    box-sizing: border-box;
    width: 2.055rem;
    height: 1.6rem;
    padding: 0 0.3rem;
  }
  .item img{
    margin: 0 0.15rem;
    width: 1.1rem;
    height: 1.1rem;
    line-height: 1.6rem;
  }
  .homenav p{
    text-align: center;
  }
</style>
