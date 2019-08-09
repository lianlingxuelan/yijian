<template>
    <div class="detail">
      <detailBanner
        :sightName='sightName'
        :bannerImg='bannerImg'
        :gallaryImgs='gallaryImgs'>
      </detailBanner>
      <detailHeader></detailHeader>
    </div>
</template>

<script>
  import {getDetails} from '@/api'
  import detailBanner from './base/banner'
  import detailHeader from './base/Header'
    export default {
      name: "Detail",
      components:{
        detailBanner,
        detailHeader
      },
      data(){
        return{
          sightName:'',
          bannerImg:'',
          gallaryImgs:[],
          cardInfo:{},
          recommendInfo:[],
          calendarInfo:[]
        }
      },
      created(){
        this.getData()

      },
      methods: {
        async getData() {
          let {sightName,
            bannerImg,
            gallaryImgs,
            cardInfo,
            recommendInfo,
            calendarInfo} = await getDetails(1)
          this.sightName = sightName
          this.bannerImg = bannerImg
          this.gallaryImgs = gallaryImgs
          this.cardInfo = cardInfo
          this.recommendInfo = recommendInfo
          this.calendarInfo = calendarInfo
        }
      }
    }
</script>

<style scoped>
.detail{
  height: 200rem;
}
</style>
