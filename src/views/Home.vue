<!-- <template>
  <v-container>
    <CategoryBanner :categories />

    <h2 class="mt-6">Featured Products</h2>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="product in featuredProducts"
        :key="product.id"
        class="mt-5"
      >
        <v-card hover>
          <v-img :src="product.image" height="200"></v-img>
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-text class="font-weight-bold">${{ product.price }}</v-card-text>
          <v-card-subtitle class="font-weight-bold">rating: {{ product.rating.rate }}</v-card-subtitle>
          <v-card-text class="description-text">
        {{ product.description }}
      </v-card-text>
          <v-card-actions>
            <v-btn :to="`/product/${product.id}`" text variant="tonal">View Details</v-btn>
            <v-btn @click="addToCart(product)" color="primary" variant="flat">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template> -->

<template>
  <v-container>
    <CategoryBanner :categories />

    <h2 class="mt-6">Featured Products</h2>
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
import CategoryBanner from '@/components/CategoryBanner.vue';
import ProductCard from '@/components/ProductCard.vue';

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchData();
});

const featuredProducts = computed(() => 
  productStore.products.filter((product) => product.rating.rate >= 4.5).slice(0, 5)
);

const categories = computed(() => productStore.categories);

</script>

<style scoped>  
.description-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>