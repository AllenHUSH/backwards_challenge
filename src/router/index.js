import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import How from '../views/How.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  { path: '/home', redirect: '/' },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/how',
    name: 'how',
    component: How
  }
]

const router = new VueRouter({
  routes
})

export default router
