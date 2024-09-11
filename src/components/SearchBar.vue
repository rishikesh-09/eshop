<template>
  <v-text-field
    v-model="searchQuery"
    label="Search for Products, Brands and More"
    outlined
    dense
    clearable
    variant="outlined"
    @input="handleInput"
    @click:clear="handleClear"
  >
  <template v-slot:prepend-inner>
    <v-icon @click="handleSearchClick"  >mdi-magnify</v-icon>
  </template>
  </v-text-field>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSearchStore } from '@/store/searchStore';

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();
const searchQuery = ref('');

const emit = defineEmits(['search']);

const handleInput = () => {
  updateSearch(searchQuery.value);
};

const handleClear = () => {
  updateSearch('');
};

const handleSearchClick = () => {
  updateSearch(searchQuery.value);
};

const updateSearch = (query) => {
  searchStore.setQuery(query);
  emit('search', query);
  router.push({ path: '/shop', query: { q: query || undefined } });
};

watch(() => searchStore.getCurrentQuery, (newQuery) => {
  searchQuery.value = newQuery;
});

onMounted(() => {
  const routeQuery = route.query.q || '';
  searchQuery.value = routeQuery;
  if (routeQuery) {
    searchStore.setQuery(routeQuery);
  }
});
</script>