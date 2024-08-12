import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/views/ProductList.vue';
import ProductDetails from '@/views/ProductDetails.vue';
import Cart from '@/views/Cart.vue';
import Home from '@/views/Home.vue';

const routes = [
  {path: '/', component: Home},
  { path: '/shop', component: ProductList },
  { path: '/product/:id', component: ProductDetails },
  { path: '/cart', component: Cart },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;