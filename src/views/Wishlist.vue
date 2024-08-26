<template>
    <v-container>
      <h1 class="wishlist-title">My Wishlist</h1>
      <v-row v-if="wishlistItems.length === 0">
        <v-col class="text-center">
          <p>Your wishlist is empty.</p>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="product in wishlistItems" :key="product.id" cols="12" sm="6" md="4">
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script setup>
  import { computed } from 'vue';
  import { useWishlistStore } from '@/store/wishlistStore';
  import ProductCard from '@/components/ProductCard.vue';
  
  const wishlistStore = useWishlistStore();
  const wishlistItems = computed(() => wishlistStore.items);
  </script>
  
<style scoped>
  .wishlist-title {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin: 2rem 0;
  }
  .v-container{
  max-width: fit-content;
}
</style>