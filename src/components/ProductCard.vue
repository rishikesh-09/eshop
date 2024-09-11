<template>
 
  <v-card class="d-flex flex-column px-4 py-4" height="100%" hover>
    <v-img :src="product.image" height="160" contain>
      <v-icon class="isInWishlist" @click="toggleWishlist" style="position: absolute; top: 8px; right: 8px;">{{
        isInWishlist ? 'mdi-heart' : 'mdi-heart-outline' }}
      </v-icon>
    </v-img>
    <v-card-title>{{ product.title }}</v-card-title>
    <v-card-text class="font-weight-bold">${{ product.price }}</v-card-text>
    <v-card-subtitle class="font-weight-bold">rating: {{ product.rating}}
      <Star :rating="product.rating" />
    </v-card-subtitle>
   
    <v-card-text class="description-text">
      {{ product.description }}
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn :to="`/product/${product.id}`" variant="elevated">View Details</v-btn>
      <v-btn @click="addToCart" color="teal" variant="elevated"><i class="fa-solid fa-cart-shopping"></i>Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { computed, defineProps } from 'vue';
import Star from '@/components/Star.vue';


const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

function generateRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

const randomNumber = generateRandomFloat(1, 5);


const cartStore = useCartStore();

const addToCart = () => {
  cartStore.addToCart(props.product);
};

const wishlistStore = useWishlistStore();

const isInWishlist = computed(() => wishlistStore.isItemInWishlist(props.product.id));

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
:root {
	 --star-size: 60px;
	 --star-color: #fff;
	 --star-background: #fc0;
}
 .Stars {
	 --percent: calc(var(--rating) / 5 * 100%);
	 display: inline-block;
	 font-size: var(--star-size);
	 font-family: Times;
	 line-height: 1;
}
 .Stars::before {
	 content: '★★★★★';
	 letter-spacing: 3px;
	 background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
	 -webkit-background-clip: text;
	 -webkit-text-fill-color: transparent;
}
/* Just to make a preview more beautiful */

body {
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

* {
  position: relative;
  box-sizing: border-box;
}



/* .v-btn--active {
  background-color: rgba(255, 255, 255, 0.3);
} */
 
</style>