import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/views/ProductList.vue';
import ProductDetails from '@/views/ProductDetails.vue';
import Cart from '@/views/Cart.vue';
import Home from '@/views/Home.vue';
import Wishlist from '@/views/Wishlist.vue';

const routes = [
  
  {path: '/', component: Home},
  { path: '/shop', name:'Shop', component: ProductList },
  { path: '/product/:id', component: ProductDetails, 
    component: () => import('@/views/ProductDetails.vue') },
  { path: '/cart', component: Cart },
  { path: '/shop/:category', name: 'ShopCategory', component: ProductList },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;