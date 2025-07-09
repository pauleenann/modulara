import { createWebHistory, createRouter } from 'vue-router'
import LoginView from '../pages/LoginView.vue'
import HomeView from '../pages/HomeView.vue'
import DashboardView from '../pages/DashboardView.vue'
import InventoryView from '@/pages/InventoryView.vue'
import { authStore } from '@/store/authStore'
import { userStore } from '@/store/userStore'

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

router.beforeEach(async (to, from) => {
  const auth = authStore();
  const user = userStore();

  // Wait for Firebase to resolve
  if (!auth.isAuthResolved) {
    await auth.initAuth();
  }

  // redirect authenticated users away from Login
  if (auth.isAuthenticated && to.name === 'Login') {
    if (user.user?.role === 'admin') {
      return { name: 'Dashboard' };
    } else {
      return { name: 'Home' };
    }
  }

  // redirect unauthenticated users away from protected routes
  if (!auth.isAuthenticated && to.name !== 'Login') {
    return { name: 'Login' };
  }

  // block customers from admin-only routes
  if (to.meta.requiresAdmin && user.user?.role !== 'admin') {
    return { name: 'Login' };
  }
});



export default router;