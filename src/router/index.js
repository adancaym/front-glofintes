import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/phones',
    name: 'Phones',
    component: () => import(/* webpackChunkName: "about" */ '../views/Phones.vue')
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import(/* webpackChunkName: "about" */ '../views/Clients.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "about" */ '../views/Address.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
