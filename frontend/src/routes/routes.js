import { createWebHistory, createRouter } from 'vue-router'
import LoginView from '../pages/LoginView.vue'
import HomeView from '../pages/HomeView.vue'
import DashboardView from '../pages/DashboardView.vue'
import InventoryView from '@/pages/InventoryView.vue'
import { authStore } from '@/store/authStore'
import ProductsView from '@/pages/ProductsView.vue'

const routes = [
  { 
    path: '/', 
    component: HomeView,
    name: 'Home'
  },
  { 
    path: '/products', 
    component: ProductsView,
    name: 'Products'
  },
  { 
    path: '/login', 
    component: LoginView,
    name: 'Login'
  },
  { 
    path: '/admin/dashboard', 
    component: DashboardView,
    name: 'Dashboard',
    meta: { requiresAuth: true } 
  },
  { 
    path: '/admin/inventory', 
    component: InventoryView,
    name: 'Inventory',
    meta: { requiresAuth: true } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const auth = authStore();

  console.log('isAuthenticated: ', auth.isAuthenticated)

  // this runs when page loads because pinia resets
  if (!auth.isAuthenticated) {
    console.log('Not authenticated — trying to refresh token...');
    await auth.refreshAccessToken();
  }

  const role = auth.role;

  if (to.meta.requiresAuth && role !== 'admin' && auth.isAuthenticated) {
    return { name: 'Home' };
  }

  if (to.name === 'Login' && auth.isAuthenticated) {
    return role === 'customer'
      ? { name: 'Home' }
      : { name: 'Dashboard' };
  }

  return true;
});



export default router;