<template>
  <v-sheet class="mx-auto" elevation="1">
    <v-slide-group  class="pa-4" selected-class="bg-primary" show-arrows>

      <v-slide-group-item v-for="category in categories" :key="category"
        v-slot="{ isSelected, toggle, selectedClass }">

        <v-card :class="['ma-4', selectedClass]" height="200" width="200"
          @click="navigateToCategory(category)">
          <v-img :src="getCategoryImage(category)" height="80%" cover >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
            {{ category }}
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const props = defineProps({
    categories: Array,
  });
  
  const getCategoryImage = (category) => {
    switch (category.toLowerCase()) {
      case 'all': 
        return 'src/assests/category-images/all shopping.jpg';
      case 'jewelery': 
        return 'src/assests/category-images/jewelery.jpg';
      case 'electronics':
        return 'src/assests/category-images/electronics.jpg';
      case "men's clothing":
        return 'src/assests/category-images/mens-fashion.jpg';
      case "women's clothing":
        return 'src/assests/category-images/womens-fashion.jpg';
      default:
        return 'src/assests/category-images/all.jpg';
  }
}; 
 
  const navigateToCategory = (category) => {
  if (category.toLowerCase() === 'all') {
    router.push({ name: 'Shop' });
  } else {
    router.push({ 
      name: 'ShopCategory', 
      params: { category: category.toLowerCase().replace(/\s+/g, '-') }
    });
  }
};
</script>

<style scoped>
.v-card {
  transition: transform 0.3s;
  position: relative;
  overflow: hidden;
}

.category-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
}

.v-card-text {
  color: white !important;
  font-weight: 600;
  font-style: oblique;
  text-transform: capitalize;
}
</style>