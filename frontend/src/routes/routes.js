import { createWebHistory, createRouter } from 'vue-router'
import LoginView from '../pages/LoginView.vue'
import HomeView from '../pages/HomeView.vue'
import DashboardView from '../pages/DashboardView.vue'
import InventoryView from '@/pages/InventoryView.vue'
import { authStore } from '@/store/authStore'

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

router.beforeEach(async (to, from) => {
  const store = authStore()
  if (
    !store.isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})

export default router;