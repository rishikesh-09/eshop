<template>
  <div class="head py-2 flex" :elevation="1" app>
    <v-avatar size="90">
      <router-link to="/">
        <v-img src="src\assests\logo.png" height="63px" width="100px" class="ml-3"></v-img>
      </router-link>
    </v-avatar>

    <v-toolbar-title class="text-center mr-3" style="max-width: 100px;">E-Shop</v-toolbar-title>

    <SearchBar @search="handleSearch" class="mr-12 mb-1" style="max-width: 800px; max-height: 50px;" />
    
    <v-btn variant="plain"class="mr-5" to="/" text size="large">Home</v-btn>
    <v-btn variant="plain" class="custom-btn mr-5 h-full"to="/shop" text size="large">Shop</v-btn>
    <v-btn variant="plain" class="mr-4" icon to="/wishlist" text size="large">
      <v-badge :content="wishlistCount" :value="wishlistCount" color="red" overlap>
        <v-icon  size="x-large">mdi-heart-outline</v-icon>
      </v-badge>
    </v-btn>
  
    <v-btn variant="plain" icon @click="toggleCartDrawer"   size="large" class="mr-4">
      <v-badge :content="totalItems" color="red" overlap>
        <v-icon icon="mdi-shopping-outline" size="x-large"></v-icon>
      </v-badge>
    </v-btn>
  </div>

  <CartDrawer :isOpen="isCartDrawerOpen" @update:isOpen="isCartDrawerOpen = $event" />
</template>

<script setup>
import { useCartStore } from '@/store/cartStore';
import { useSearchStore } from '@/store/searchStore';
import { computed, ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import { useWishlistStore } from '@/store/wishlistStore';
import CartDrawer from '@/components/CartDrawer.vue';

const cartStore = useCartStore();
const searchStore = useSearchStore();

const totalItems = computed(() => cartStore.totalItems);

const wishlistStore = useWishlistStore();
const wishlistCount = computed(() => wishlistStore.getWishlistItemCount);

const handleSearch = (query) => {
  searchStore.setQuery(query);
};

const isCartDrawerOpen = ref(false);

const toggleCartDrawer = () => {
  isCartDrawerOpen.value = !isCartDrawerOpen.value;
};
</script>
<style scoped>
.head {
  background-color: #ffffff;
  justify-content: space-between;
  align-items: center;
  max-height: 80px;
  top: 0;
  box-shadow: 0 1px;

}
.custon-btn{
  min-height: 100%;
}

</style>
