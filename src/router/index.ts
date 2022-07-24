import { createRouter, createWebHistory} from 'vue-router'

import Home from '../pages/Home/Home.vue'
import Login from '../pages/Login/Login.vue'
import Stats from '../pages/Stats/Stats.vue'
import MyTeam from '../pages/MyTeam/MyTeam.vue'

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
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/my-team',
      name: 'My Team',
      component: MyTeam
    }
  ]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export { router }