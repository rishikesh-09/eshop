<template>
  <v-app>
    <Header v-if="!isSignupPage && !isLoginPage" />
    <v-main>
      <router-view />
    </v-main>
    <Footer v-if="!isSignupPage && !isLoginPage"  />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Signup from './views/Signup.vue';

export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    isSignupPage() {
      return this.$route.path === '/signup';
    },
    isLoginPage() {
      return this.$route.path === '/login';
    }}
};
</script>

<style> 
 .v-main{
  background-color: whitesmoke;
 }
</style>