import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyDHwOnuUbv2B5mCtoyFFKgTxrlEHewzIGo",
      authDomain: "car-rent-c3a49.firebaseapp.com",
      databaseURL: "https://car-rent-c3a49.firebaseio.com",
      projectId: "car-rent-c3a49",
      storageBucket: "car-rent-c3a49.appspot.com",
      messagingSenderId: "887173597144",
      appId: "1:887173597144:web:db71732c43440c80"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchProducts')
  },

  render: h => h(App)
}).$mount('#app')
