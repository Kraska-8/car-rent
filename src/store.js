import Vue from 'vue'
import Vuex from 'vuex'
import Products from './store/modules/products'
import User from './store/modules/user'
import Common from './store/modules/common'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Products,
    User,
    Common
  }
})
