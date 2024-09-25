<template >
  <CartDrawer :isOpen="isCartDrawerOpen" @update:isOpen="isCartDrawerOpen = $event" />
  <div v-if="carouselLoading" class="loader-container">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </div>
  <!-- <v-progress-circular class="loader-container" color="primary" indeterminate size="64" v-if="carouselLoading"  height="400px" /> -->
  <v-container v-else>
    <!-- <CategoryBanner :categories /> -->
      
      <Carousel class="mt-3"/>
    
    <h2 class="mt-6 text-center">Best Rated Products</h2>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="product in featuredProducts"
        :key="product.id"
        class="mt-5"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useProductStore } from '@/store/productStore';
import CategoryBanner from '@/components/CategorySlider.vue';
import ProductCard from '@/components/ProductCard.vue';
import Carousel from '@/components/Carousel.vue';
import { ref } from 'vue';
const productStore = useProductStore();
const carouselLoading = ref(true)
onMounted(async () => {
  await productStore.fetchData();
   carouselLoading.value = false;
});

const featuredProducts = computed(() => 
 productStore.products.filter((product) => product.rating >= 4.5).slice(0, 5)
);

const categories = computed(() => productStore.categories);

</script>

<style scoped>  
.description-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .v-container{
  max-width: fit-content;
}
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw; /* This will take the full height of the viewport */
}
</style>