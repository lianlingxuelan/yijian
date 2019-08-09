<template>
    <div class="city">
      <CityHeader></CityHeader>
      <CitySearch :cities="cities,hotCities"></CitySearch>
      <CityList :hotCities="hotCities" :cities="cities"></CityList>
      <CityAlphabet :cities="cities"></CityAlphabet>
    </div>
</template>

<script>
  import {getCities} from '@/api'
  import CityHeader from './base/header'
  import CitySearch from './base/Search'
  import CityList from './base/List'
  import CityAlphabet from './base/Alphabet'
    export default {
      name: "City",
      data() {
            return {
              cities:[],
              hotCities: [],
            }
      },
      components:{
        CityHeader,
        CitySearch,
        CityList,
        CityAlphabet
      },
      created() {
        this.getData()
        // getCities().then(res=>{
        //   console.log(res);
        // })
      },
      methods:{
        async getData(){
          let {cities,hotCities} = await getCities()
          this.cities = cities
          this.hotCities = hotCities
          console.log(this.cities,1);
        }
      }
    }
</script>

<style scoped>

</style>
