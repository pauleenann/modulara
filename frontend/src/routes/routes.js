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

  // if user is logged in and it tries to access the login page, they will be redirected to a page depending on their roles
  if (auth.isAuthenticated && to.name === 'Login') {
    if (user.user?.role == 'admin') {
      return { name: 'Dashboard' };
    } else {
      return { name: 'Home' };
    }
  }

  // Prevent unauthenticated access to admin routes
  if (to.meta.requiresAdmin) {
    if (!auth.isAuthenticated || user.user?.role !== 'admin') {
      return { name: 'Login' };
    }
  }
});



export default router;