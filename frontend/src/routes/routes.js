import { createWebHistory, createRouter } from 'vue-router'
import LoginView from '../pages/LoginView.vue'
import HomeView from '../pages/HomeView.vue'
import DashboardView from '../pages/DashboardView.vue'
import InventoryView from '@/pages/InventoryView.vue'
import { authStore } from '@/store/authStore'
import ProductsView from '@/pages/ProductsView.vue'
import ProductView from '@/pages/ProductView.vue'
import FavoritesView from '@/pages/FavoritesView.vue'
import SignupView from '@/pages/SignupView.vue'
import ProfileView from '@/pages/ProfileView.vue'
import { cartStore } from '@/store/cartStore'

const routes = [
  { 
    path: '/', 
    component: HomeView,
    name: 'Home'
  },
  { 
    path: '/shop', 
    component: ProductsView,
    name: 'shop'
  },
  { 
    path: '/shop/product/:id', 
    component: ProductView,
    name: 'Product'
  },
  { 
    path: '/favorites', 
    component: FavoritesView,
    name: 'Favorites'
  },
  { 
    path: '/profile', 
    component: ProfileView,
    name: 'Profile',
    meta: { requiresCustomer: true } 
  },
  { 
    path: '/login', 
    component: LoginView,
    name: 'Login'
  },
  { 
    path: '/signup', 
    component: SignupView,
    name: 'Signup'
  },
  { 
    path: '/admin/dashboard', 
    component: DashboardView,
    name: 'Dashboard',
    meta: { requiresAdmin: true } 
  },
  { 
    path: '/admin/inventory', 
    component: InventoryView,
    name: 'Inventory',
    meta: { requiresAdmin: true } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
})

router.beforeEach(async (to, from) => {
  const auth = authStore();
  const store = cartStore();
 
  auth.error = ''; //reset error

  console.log('isAuthenticated: ', auth.isAuthenticated)

  // this runs when page loads because pinia resets
  if (!auth.isAuthenticated) {
    console.log('Not authenticated — trying to refresh token...');
    await auth.refreshAccessToken();
  }

  await store.getCart(); //initialize cart
  console.log('cart: ', store.cart)

  const role = auth.role;

  if (to.meta.requiresAdmin && role !== 'admin') {
    return { name: 'Home' };
  }

  if (to.meta.requiresCustomer && role !== 'customer') {
    return { name: 'Home' };
  }

  if ((to.name === 'Login' || to.name === 'Signup') && auth.isAuthenticated) {
    return role === 'customer'
      ? { name: 'Profile' }
      : { name: 'Dashboard' };
  }

  return true;
});



export default router;