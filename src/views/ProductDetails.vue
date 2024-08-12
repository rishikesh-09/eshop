<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-img :src="product.image" height="300" ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <v-card variant="outlined">
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>${{ product.price }}</v-card-subtitle>
          <v-card-text>{{ product.description }}</v-card-text>
          <v-card-actions>
            <v-btn @click="addToCart(product)" color="primary" variant="outlined">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/store/cartStore';

export default {
  setup() {
    const product = ref({});
    const route = useRoute();
    const cartStore = useCartStore();

    onMounted(async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`);
      product.value = await response.json();
    });

    const addToCart = (product) => {
      cartStore.addToCart(product);
    };

    return { product, addToCart };
  },
};
</script>