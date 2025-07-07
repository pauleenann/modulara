import { createWebHistory, createRouter } from 'vue-router'

import LoginView from '../pages/LoginView.vue'
import HomeView from '../pages/HomeView.vue'
import DashboardView from '../pages/DashboardView.vue'
import InventoryView from '@/pages/InventoryView.vue'

const routes = [
  { 
    path: '/', 
    component: HomeView,
    name: 'Home'
  },
  { 
    path: '/login', 
    component: LoginView,
    name: 'Login'
  },
  { 
    path: '/dashboard', 
    component: DashboardView,
    name: 'Dashboard'
  },
  { 
    path: '/inventory', 
    component: InventoryView,
    name: 'Inventory'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;