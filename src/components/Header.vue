<template>
  <v-app-bar :elevation="2" app>
    <v-avatar size="70">
      <v-img src="src\assests\logo.png" class="ml-3"></v-img>
    </v-avatar>
    
    <v-toolbar-title>E-Shop</v-toolbar-title>
  
    <v-spacer></v-spacer>

    <SearchBar @search="handleSearch" class="mr-2" style="max-width: 300px; max-height: 53px;" />

    <v-btn to="/" text size="large">Home</v-btn>
    <v-btn to="/shop" text size="large">Shop</v-btn>
    <v-btn icon to="/wishlist" text size="large">
      <v-badge :content="wishlistCount" :vlaue="wishlistCount" color="red" overlap>
        <v-icon size="x-large">mdi-heart</v-icon>
      </v-badge>
    </v-btn>

    <v-btn icon to="/cart" size="large" class="mr-3">
      <v-badge :content="totalItems" color="red">
        <v-icon icon="mdi-cart" size="x-large"></v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useCartStore } from '@/store/cartStore';
import { useSearchStore } from '@/store/searchStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import SearchBar from '@/components/SearchBar.vue';
import { useWishlistStore } from '@/store/wishlistStore';

const cartStore = useCartStore();
const searchStore = useSearchStore();
const router = useRouter();
const totalItems = computed(() => cartStore.totalItems);

const wishlistStore = useWishlistStore();
const wishlistCount = computed(() => wishlistStore.items.length);

const handleSearch = (query) => {
  searchStore.setQuery(query);
  router.push({ path: '/shop', query: { q: query } });
};
</script>