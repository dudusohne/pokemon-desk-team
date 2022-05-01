import { createRouter, createWebHistory} from 'vue-router'

import Home from '../pages/Home/Home.vue'
import Login from '../pages/Login/Login.vue'

const routes: Array<any> = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export { router }