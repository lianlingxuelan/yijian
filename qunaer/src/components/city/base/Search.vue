<template>
  <div class="seach">
    <input type="text" class="header-input" placeholder="请输入你想去的城市或者拼音" v-model="keyword">
    <div class="search-content" v-show="keyword" ref="wrapper">
      <ul class="">
        <li class="seach-item border-bottom"
            v-for="city in filterCities"
            @click="hand(city.name)"
            :key="city.id">{{city.name}}
        </li>
        <li v-if="isShow">未匹配到数据</li>
      </ul>
    </div>
    <div class="hot"></div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Search",
    props: ['cities'],
    data() {
      return {
        keyword: '',
      }
    },
    computed: {
      filterCities() {
        const result = [];
        for (let key in this.cities) {
          //console.log(key, this.cities);
          this.cities[key].forEach((city) => {
            if (city.name.includes(this.keyword) || city.spell.includes(this.keyword)) {
              //console.log(city);
              result.push(city)
            }
          })
        }
        return result
      },
      isShow(){
        return !this.filterCities.length
      },
      mounted(){
        console.log(this.$refs.wrapper);
        this.scroll = new BScroll(this.$refs.wrapper,{
          click:true
        })
      }
    },
    methods:{
      hand(city){
        this.$store.commit('changeCity',city)
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .seach {
    position: relative;
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0.1rem;
    background: rgba(0, 120, 210, 0.5);
  }

  .header-input {
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 0.1rem;
  }

  .search-content {
    width: 100%;
    position: fixed;
    z-index: 20;
    overflow: hidden;
    top: 2.61rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }

  .seach-item {
    line-height: 0.4rem;
    padding: 0.2rem;
    background: #ccc;
  }
</style>
