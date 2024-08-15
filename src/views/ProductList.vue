<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <SearchBar v-model:searchQuery="searchQuery" />
      </v-col>
      <v-col cols="12" sm="4">
        <CategoryFilter v-model:selectedCategory="selectedCategory" :categories="categories" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4">
    
        <v-card class="d-flex flex-column" height="100%">
          <v-img :src="product.image" height="200" contain />
          <v-card-title class="text-truncate">{{ product.title }}</v-card-title>
          <v-card-text class="description-text">
            {{ product.description }}
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn :to="`/product/${product.id}`" text variant="tonal">View Details</v-btn>
            <v-btn @click="addToCart(product)" color="primary" variant="flat">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
  
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="pageCount" class="mt-4" />
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import SearchBar from '../components/SearchBar.vue';
import CategoryFilter from '../components/CategoryFilter.vue';

const productStore = useProductStore();
const cartStore = useCartStore();

const currentPage = ref(1);
const itemsPerPage = 9;

const searchQuery = ref('');
const selectedCategory = ref('All');

onMounted(async () => {
  await productStore.fetchProducts();
});

const categories = computed(() => [
  'All',
  ...new Set(productStore.products.map(product => product.category))
]);

const filteredProducts = computed(() => {
  console.log('Filtering products. Search:', searchQuery.value, 'Category:', selectedCategory.value);
  return productStore.products
    .filter(product => {
      const matchesSearchQuery = searchQuery.value
        ? product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        : true;
      const matchesCategory = selectedCategory.value !== 'All'
        ? product.category === selectedCategory.value
        : true;
      return matchesSearchQuery && matchesCategory;
    })
    .slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage);
});

const pageCount = computed(() =>
  Math.ceil(
    productStore.products.filter(product => {
      const matchesSearchQuery = searchQuery.value
        ? product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        : true;
      const matchesCategory = selectedCategory.value !== 'All'
        ? product.category === selectedCategory.value
        : true;
      return matchesSearchQuery && matchesCategory;
    }).length / itemsPerPage
  )
);

const addToCart = (product) => {
  cartStore.addToCart(product);
};

</script>

<style scoped>
.v-pagination {
  justify-content: center;
}
.v-card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>