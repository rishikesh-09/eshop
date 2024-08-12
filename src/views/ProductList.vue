<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="product in paginatedProducts" :key="product.id">
        <v-card variant="outlined">
          <v-img :src="product.image" height="200"></v-img>
          <v-card-title>{{ truncate(product.title, 25) }}</v-card-title>
          <v-card-text>{{ truncate(product.description, 50) }}</v-card-text>
          <v-card-actions>
            <v-btn :to="`/product/${product.id}`" text variant="tonal">View Details</v-btn>
            <v-btn @click="addToCart(product)" color="primary" variant="outlined">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-divider></v-divider>
  <v-pagination v-model="currentPage" :length="pageCount"></v-pagination>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/store/cartStore';

export default {
  setup() {
    const products = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 9;

    const cartStore = useCartStore();

    onMounted(async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      products.value = await response.json();
    });

    const pageCount = computed(() => Math.ceil(products.value.length / itemsPerPage));

    const paginatedProducts = computed(() =>
      products.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
    );

    const truncate = (text, length) => {
      return text.length > length ? text.substring(0, length) + '...' : text;
    };

    const addToCart = (product) => {
      cartStore.addToCart(product);
    };

    return { products, currentPage, pageCount, paginatedProducts, truncate, addToCart };
  },
};
</script>
