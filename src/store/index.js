import Vue from 'vue'
import Vuex from 'vuex'

import goods from './goods'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    goods
  }
})

export default store
