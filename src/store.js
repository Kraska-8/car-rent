import Vue from 'vue'
import Vuex from 'vuex'
import Products from './store/modules/products'
import User from './store/modules/user'
import Common from './store/modules/common'
import Orders from './store/modules/orders'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Products,
    User,
    Common,
    Orders
  }
})
