<template>
  <v-card class="d-flex flex-column" height="100%" hover>
    <v-img :src="product.image" height="200" contain>
      <v-btn icon :class="isInWishlist" @click="toggleWishlist"
        style="position: absolute; top: 8px; right: 8px;">
        <v-icon>{{ isInWishlist ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
    </v-img>
    <v-card-title>{{ product.title }}</v-card-title>
    <v-card-text class="font-weight-bold">${{ product.price }}</v-card-text>
    <v-card-subtitle class="font-weight-bold">rating: {{ product.rating.rate }}</v-card-subtitle>
    <v-card-text class="description-text">
      {{ product.description }}
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn :to="`/product/${product.id}`" variant="elevated">View Details</v-btn>
      <v-btn @click="addToCart" color="primary" variant="elevated">Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>
  
<script setup>
  import { useCartStore } from '@/store/cartStore';
  import { useWishlistStore } from '@/store/wishlistStore';
  import { computed, defineProps } from 'vue';
  
  const props = defineProps({
    product: {
      type: Object,
      required: true
    }
  });
  
  const cartStore = useCartStore();
  
  const addToCart = () => {
    cartStore.addToCart(props.product);
  };

  const wishlistStore = useWishlistStore();

  const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id));

const toggleWishlist = () => {
  if (isInWishlist.value) {
    wishlistStore.removeFromWishlist(props.product.id);
  } else {
    wishlistStore.addToWishlist(props.product);
  }
};

</script>
  
  <style scoped>
  .description-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* .v-btn--active {
  background-color: rgba(255, 255, 255, 0.3);
} */
  </style>