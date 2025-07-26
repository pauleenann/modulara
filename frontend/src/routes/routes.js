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
    name: 'Dashboard',
    meta: { requiresAdmin: true } 
  },
  { 
    path: '/inventory', 
    component: InventoryView,
    name: 'Inventory',
    meta: { requiresAdmin: true } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const auth = authStore();
  const accessToken = auth.accessToken;
  const role = auth.role;

  console.log(accessToken)

  if (!accessToken) {
    return { name: 'Login' };
  }

  if (to.meta.requiresAdmin && role !== 'admin') {
    return { name: 'Home' };
  }

  if (to.name === 'Login' && accessToken) {
    return role === 'customer'
      ? { name: 'Home' }
      : { name: 'Dashboard' };
  }
});

export default router;