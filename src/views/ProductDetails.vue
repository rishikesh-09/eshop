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
            <v-btn @click="addToCart(product)" color="primary" variant="flat">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';

export default {
  setup() {
    const productStore = useProductStore();
    const cartStore = useCartStore();
    const route = useRoute();
    const productId = parseInt(route.params.id, 10);
    const product = productStore.products.find((p) => p.id === productId);

    const addToCart = (product) => {
      cartStore.addToCart(product);
    };

    return { product, addToCart };
  },
};
</script>