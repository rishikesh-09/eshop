<template>
  <v-container >
    <h2>Featured Products</h2>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="product in featuredProducts"
        :key="product.id"
        class="mt-5"
      >
        <v-card>
          <v-img :src="product.image" height="200"></v-img>
          <v-card-title>{{ truncate(product.title, 25) }}</v-card-title>
          <v-card-text>{{ truncate(product.description, 60) }}</v-card-text>
          <v-card-actions>
            <v-btn :to="`/product/${product.id}`" text variant="tonal">View Details</v-btn>
            <v-btn @click="addToCart(product)" color="primary" variant="flat">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';

export default {
  setup() {
    const productStore = useProductStore();
    const cartStore = useCartStore();

    onMounted(async () => {
      await productStore.fetchProducts();
    });

    const featuredProducts = computed(() => { 
      return productStore.products.filter((product) => product.rating.rate >= 4.5).slice(0, 5) 
    });

    const truncate = (text, length) => {
      return text.length > length ? text.substring(0, length) + '...' : text;
    };

    const addToCart = (product) => {
      cartStore.addToCart(product);
    };

    return {
      featuredProducts,
      truncate,
      addToCart,
    };
  },
};
</script>