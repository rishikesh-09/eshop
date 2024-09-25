<template>
  
  <v-container>
    <h1 v-if="category" class="category-title">{{ formatCategoryName(category) }}</h1>
    <h1 v-else class="shop-title">All Products</h1>

    <v-row>
    <v-col cols="12" md="4">
      <label for="sortSelect">Sort by</label>
        <select id="sortSelect" v-model="sortOption">
          <option v-for="option in sortOptions" :key="option.value" :value="option.value" >
             {{ option.text }}
          </option>
        </select>
    </v-col>
  </v-row>

    <v-row v-if="loading">
      <v-col class="text-center">
        <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="filteredProducts.length === 0">
      <v-col class="text-center">
        <p>No products found.</p>
      </v-col>
    </v-row>

    <template v-else>
      <v-row>
        <v-col v-for="product in sortedProducts" :key="product.id" cols="12" sm="6" md="4">
          <ProductCard :product="product" @add-to-cart="addToCart" />
        </v-col>
      </v-row>

      <!-- <v-row justify="center">
        <v-col cols="12">
          <v-pagination v-model="currentPage" :length="pageCount" class="mt-4" />
        </v-col>
      </v-row> -->
    </template>
  </v-container>
</template>
<script setup>
import { ref, computed, onMounted ,watch ,onUnmounted} from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { useSearchStore } from '@/store/searchStore';
import ProductCard from '@/components/ProductCard.vue';
const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const searchStore = useSearchStore();

const currentPage = ref(1);
const itemsPerPage = 9;
const loading = ref(true);

const category = computed(() => route.params.category);

const sortOption = ref();
const sortOptions = ref([
  { text: ' Price : High to Low', value: 'high-to-low' },
  { text: ' Price : Low to High', value: 'low-to-high' }
]);




const sortedProducts = computed(() => {
  if (sortOption.value === 'high-to-low') {
    return filteredProducts.value.slice().sort((a, b) => b.price - a.price);
  } else if (sortOption.value === 'low-to-high') {
    return filteredProducts.value.slice().sort((a, b) => a.price - b.price);
  } else {
    return filteredProducts.value;
  }
});

onMounted(async () => {
  await productStore.fetchData();
  updateFilters();
  loading.value = false;
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});

function updateFilters() {
  const querySearch = route.query.q || '';
  searchStore.setQuery(querySearch);
  currentPage.value = 1;
}

const filteredProducts = computed(() => {
  let products = productStore.products;

  if (category.value) {
    products = products.filter(product => 
      product.category.toLowerCase().replace(/\s+/g, '-') === category.value.toLowerCase()
    );
  }

  return products.filter(product => {
    const matchesSearch = searchStore.getCurrentQuery
      ? product.title.toLowerCase().includes(searchStore.getCurrentQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchStore.getCurrentQuery.toLowerCase()) || 
        product.category.toLowerCase().includes(searchStore.getCurrentQuery.toLowerCase())
      : true;
    return matchesSearch;
  });
});

// const paginatedProducts = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   return filteredProducts.value.slice(start, end);
// });
let totalItemsDisplayed = ref(itemsPerPage);
const paginatedProducts = computed(() => {
  const end = totalItemsDisplayed.value;
  console.log("end:",end,"itemsPerPage:",itemsPerPage)
  return filteredProducts.value.slice(0, end);
});

const loadMoreProducts = () => {
  if (filteredProducts.value.length > totalItemsDisplayed.value) {  
    totalItemsDisplayed.value += itemsPerPage; // Load more items per "page"
    console.log("filteredProducts.value.length :" , filteredProducts.value.length , "totalItemsDisplayed.value :",totalItemsDisplayed.value)
  }
};

const onScroll = () => {
  const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
  if (bottomOfWindow) {
    loadMoreProducts();
  }
};
// const pageCount = computed(() => 
//   Math.ceil(filteredProducts.value.length / itemsPerPage)
// );

const addToCart = (product) => {
  cartStore.addToCart(product);
};

const formatCategoryName = (category) => {
  return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
</script>

<style scoped>
.v-pagination {
  justify-content: center;
}
.category-title,
.shop-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 2rem 0;
  text-transform: capitalize;
}
.v-container{
  max-width: 1200px;
}
</style>