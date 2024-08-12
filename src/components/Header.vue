<template>
  <v-app-bar :elevation="3" app>
    <v-avatar size="70">
      <v-img src="src\assests\logo.png" class="ml-3" ></v-img>
    </v-avatar>
    
    <v-toolbar-title>E-Shop</v-toolbar-title>
  
    <v-btn to="/" text size="large">Home</v-btn>
    <v-btn to="/shop" text size="large">Shop</v-btn>

    <v-btn icon to="/cart" size="large" class="mr-3">
      <v-badge :content="totalItems" color="red" >
        <v-icon icon="mdi-cart" size="x-large" ></v-icon>
      </v-badge>

    </v-btn>
  </v-app-bar>
</template>

<script>
import { useCartStore } from '@/store/cartStore';
import { computed } from 'vue';

export default {
  setup() {
    const cartStore = useCartStore();
    const totalItems = computed(() => cartStore.totalItems);

    return { totalItems };
  },
};
</script>


