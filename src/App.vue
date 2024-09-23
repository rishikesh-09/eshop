<template>
  <v-app >
    <Header v-if="!isSignupPage && !isLoginPage" @toggle-cart-drawer="toggleCartDrawer" />
    <v-main>
      <router-view />
    </v-main>
    <Footer v-if="!isSignupPage && !isLoginPage" />
    <CartDrawer :isOpen="isCartDrawerOpen" @update:isOpen="updateCartDrawerState" />
    <div v-if="isCartDrawerOpen" class="overlay" @click="closeCartDrawer"></div>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import CartDrawer from '@/components/CartDrawer.vue';

const route = useRoute();
const isCartDrawerOpen = ref(false);

const isSignupPage = computed(() => route.path === '/signup');
const isLoginPage = computed(() => route.path === '/login');

const toggleCartDrawer = () => {
  isCartDrawerOpen.value = !isCartDrawerOpen.value;
};

const updateCartDrawerState = (newState) => {
  isCartDrawerOpen.value = newState;
};

const closeCartDrawer = () => {
  isCartDrawerOpen.value = false;
};
</script>

<style> 
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}
</style>