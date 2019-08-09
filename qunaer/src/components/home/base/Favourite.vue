<template>
    <div class="homefavourite">
      <h3 class="like">猜你喜欢</h3>
      <ul class="content">
        <router-link tag="li" to="/detail" class="fav-item" v-for="(item,index) in recommendList" :key="index">
          <img class="fav-img" :src="item.imgUrl" alt="">
          <div class="fav-info">
            <h4 class="title">{{item.title}}</h4>
            <div class="review">
              <p class="favtext">
                <span class="fav-star" :style="item.score|star">
                  <i v-for="i in 5" class="star iconfont icon-star"></i>
                </span>
                <span class="pinglun">{{item.comment}}条评论</span>
              </p>
            </div>
            <div class="footer">
              <p class="price">{{item.price|price}}</p>
              <span class="site">{{item.title}}</span>
            </div>
          </div>
        </router-link>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "Favourite",
        props: ['recommendList'],
        data() {
            return {

            }
        },
      filters:{
          star(score){
            console.log(score)
            return{
              width:score*100/5+'%'
            }
          },
          price(value){
              return '￥'+ value + '元'
          }
      }
    }
</script>

<style  scoped>
  .like{
    margin: 0.24rem;
  }
  .fav-item{
    margin: 0 0.24rem;
    padding: 0.2rem 0;
    width: 7.98rem;
    height: 2.0rem;
  }
  .fav-img{
    float: left;
    width: 2rem;
    height: 2rem;
  }
  .fav-info{
    float: left;
    width: 5.2rem;
    padding: 0.22rem;
  }
  .review{
    margin: 0.2rem 0;
  }
  .title{
    color: #212121;
    font-size: 0.32rem;
  }
  .fav-info .star{
    margin: 0.3rem 0;
    line-height: 0.3rem;
    color: #FFB436;
  }
  .footer{
    position: relative;
  }
  .price{
    margin: 0.22rem 0;
    color: #FF8300;
    font-size: 0.4rem;
  }
  .site{
    position: absolute;
    top: -0.01rem;
    right: -0.1rem;
  }
</style>
