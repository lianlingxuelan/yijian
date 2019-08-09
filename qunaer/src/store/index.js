import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    letter: '',
    city:localStorage.getItem('City')||'西安'
  },
  mutations:{
    changeLetter(state,letter){
      state.letter = letter
    },
    changeCity(state,city){
      state.city = city
      localStorage.setItem('City',city)
    }
  }
})

