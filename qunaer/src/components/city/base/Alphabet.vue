<template>
    <div class="alphabet">
      <ul>
        <Li v-for="(city,key) in cities"
            :key="city.id"
            @click="hand(key)"
        >{{key}}</Li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "Alphabet",
        props: ['cities'],
        data() {
            return {}
        },
        methods:{
          hand(letter){
            this.$store.commit('changeLetter',letter)
          }
        }
    }
</script>

<style scoped>
  .alphabet{
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    right: 0;
    top: 1.58rem;
    bottom: 0;
    bottom: 0;
    width: 0.4rem;
  }
  li{
    line-height: 0.5rem;
    text-align: center;
    color: red;
    font-weight: 600;
  }
</style>
