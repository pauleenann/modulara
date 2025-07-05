import { createWebHistory, createRouter } from 'vue-router'

import LoginView from '../pages/LoginView.vue'
import HomeView from '../pages/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;