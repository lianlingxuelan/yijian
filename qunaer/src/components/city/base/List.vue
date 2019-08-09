<template>
    <div class="list" ref="wrapper">
      <div>
        <div class="list-current">
          <div class="title">
            <h3 class='list-title border-topbottom'>当前城市</h3>
          </div>
          <div class="city">
            <h4 class="site">{{$store.state.city}}</h4>
          </div>
          <div class="title">
            <h3 class='list-title border-topbottom'>热门城市</h3>
          </div>
          <ul class="hotCity">
            <li class="hotList" v-for="(item,index) in hotCities"
                @click="hand(item.name)"
                :key="item.id">
              {{item.name}}
            </li>
          </ul>
          <div class="list-item" v-for='(city,key) in cities'>
            <h3 class='list-title border-topbottom' :ref="key">{{key}}</h3>
            <ul>
              <li class='city-item border-bottom'
                  v-for='item in city'
                  @click='hand(item.name)'>{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "List",
        props: ['hotCities','cities'],
        computed:{
            letter(){
              return this.$store.state.letter
            }
        },
        methods:{
            hand(city){
              console.log(1);
              this.$store.commit('changeCity',city)
              this.$router.push('/')
            }
        },
        mounted(){
          console.log(this.$refs.wrapper);
          this.scroll = new BScroll(this.$refs.wrapper,{
            click: true
          })
        },
        watch:{
          letter(value){
            //调到指定dom节点
            console.log(this.$refs[value]);
            this.scroll.scrollToElement(this.$refs[value][0])
          }
        }
    }
</script>

<style scoped>
  .list{
    height: 12rem;
  }
  .title{
    background: rgb(245,245,245);
    padding: 0.24rem 0.3rem;
    width: 100%;
  }
  .city{
    width: 100%;
    height: 0.76rem;
    background: #fff;
    text-align: center;
  }
  .site{
    margin: 0.1rem 0.15rem;
    width: 2rem;
    height: 0.5rem;
    border: 1px solid #000;
    line-height: 0.5rem;
    border-radius: 0.1rem;
  }
  .hotCity{
    height: 3.6rem;
    position: relative;
    overflow: hidden;
    z-index: 0;
    background-color: #fff;
  }
  .hotList{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 33.33%;
    height: .9rem;
    line-height: .9rem;
    font-size: .28rem;
    text-align: center;
    border-color: #ddd;
    border-style: solid;
    border-width: 0 .02rem 0.02rem 0;
    margin-bottom: -1px;
    float: left;
    position: relative;
    z-index: 10;
    color: #212121;
  }
  .city-item{
    line-height:.8rem;
    padding-left:.2rem;
  }

</style>
