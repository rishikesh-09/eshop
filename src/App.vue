<template>
  <v-app>
    <Header v-if="!isSignupPage && !isLoginPage" />
    <v-main>
      <router-view />
    </v-main>
    <Footer v-if="!isSignupPage && !isLoginPage"  />
  </v-app>
</template>

<script setup >
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { computed } from 'vue';

import { useRoute } from 'vue-router';
const route = useRoute();

const isSignupPage = computed(() => route.path === '/signup');
const isLoginPage = computed(() => route.path === '/login');
</script>

<style> 
 .v-main{
  background-color: whitesmoke;
 }
</style>