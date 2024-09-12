import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/views/ProductList.vue';
import ProductDetails from '@/views/ProductDetails.vue';
import Cart from '@/views/Cart.vue';
import Home from '@/views/Home.vue';
import Wishlist from '@/views/Wishlist.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import { useAuthStore } from '@/store/authStore';
 
const routes = [
 
  {path: '/', component: Home,  meta: { requiresAuth: true }},
  {path: '/home', component: Home,  meta: { requiresAuth: true }},
  { path: '/shop', name:'Shop', component: ProductList,  meta: { requiresAuth: true } },
  { path: '/product/:id', component: ProductDetails,  meta: { requiresAuth: true } },
  { path: '/cart', component: Cart,  meta: { requiresAuth: true } },
  { path: '/shop/:category', name: 'ShopCategory', component: ProductList,  meta: { requiresAuth: true } },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist,  meta: { requiresAuth: true } },
  { path: '/login' , name: 'Login', component: Login },
  {path:'/signup', name:'Signup', component: Signup},
 
];
 
const router = createRouter({
  history: createWebHistory(),
  routes,
});
 
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});
 
export default router;