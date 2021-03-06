import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import BuyDialogComponent from './components/UI/BuyDialog/BuyDialog'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
Vue.config.productionTip = false
Vue.component('app-buy-dialog', BuyDialogComponent)


var firebaseConfig = {
  apiKey: "",
  authDomain: "car-rent-c3a49.firebaseapp.com",
  databaseURL: "https://car-rent-c3a49.firebaseio.com",
  projectId: "car-rent-c3a49",
  storageBucket: "car-rent-c3a49.appspot.com",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      created() {
        this.$store.dispatch("fetchOrders");
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.$store.dispatch('autoLoginUser', user)
          }
          this.$store.dispatch('fetchProducts')
        })

      },

      render: h => h(App)
    }).$mount('#app')
  }
})
