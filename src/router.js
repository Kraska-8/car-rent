import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
// import Home from './views/Home.vue'
// import About from './views/About.vue'
// import Checkout from './views/User/Checkout.vue'
// import Login from './views/Auth/Login.vue'
// import Registration from './views/Auth/Registration.vue'
// import Cars from './views/Cars.vue'
// import Contact from './views/Contact.vue'
// import Discount from './views/Discount.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/cars',
      name: 'cars',
      component: () => import('./views/Cars.vue')
    },
    {
      path: '/cars/car/:id',
      props: true,
      name: 'car',
      component: () => import('./views/Car.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contact.vue')
    },
    {
      path: '/new-car',
      name: 'addCar',
      beforeEnter(to, from, next) {
        store.getters.isUserLoggedIn ? next() : next('/login?loginError=true')
      },
      component: () => import('./components/Products/NewProduct.vue')
    },
    {
      path: '/product-list',
      name: 'ProductList',
      component: () => import('./components/Products/ProductList.vue')
    },
    {
      path: '/discount',
      name: 'discount',
      component: () => import('./views/Discount.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      beforeEnter(to, from, next) {
        store.getters.isUserLoggedIn ? next() : next('/login?loginError=true')
      },
      component: () => import('./views/User/Checkout.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      beforeEnter(to, from, next) {
        store.getters.isUserLoggedIn == null ? next() : next('/')
      },
      component: () => import('./views/Auth/Registration.vue')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter(to, from, next) {
        store.getters.isUserLoggedIn == null ? next() : next('/')
      },
      component: () => import('./views/Auth/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
  ]
})
