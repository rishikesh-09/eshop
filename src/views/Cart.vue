<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-list>
          <v-list-item v-for="item in cartItems" :key="item.id" variant="outlined" class="mb-2">
            <v-list-item>
              <v-img :src="item.image" height="50px" width="50px"></v-img>
            </v-list-item>
            
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>${{ item.price }}</v-list-item-subtitle>
            
            <v-list-item-action class="mt-4 mb-2">
              <v-btn icon @click="decreaseQuantity(item)" class="mr-2" size="28px">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span class="quantity-box">{{ item.quantity }}</span>
              <v-btn icon @click="increaseQuantity(item)" class="mx-2" size="28px">
                <v-icon icon="mdi-plus"></v-icon>
              </v-btn>
              <v-btn icon @click="removeFromCart(item.id)" class="ml-2" size="28px">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="4">
        <v-card variant="outlined" class="mt-2">
          <v-card-title>Order Summary</v-card-title>
          <v-card-text>
            <div>Total Items: {{ totalItems }}</div>
            <div>Total Price: ${{ totalPrice.toFixed(2) }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="openCheckoutDialog" color="primary" variant="flat">Checkout</v-btn>
            <CheckoutDialog :isOpen="dialogOpen" @close="closeDialog" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useCartStore } from '@/store/cartStore';
import { computed } from 'vue';
import CheckoutDialog from '../components/Dialog.vue';

export default {
  components: { CheckoutDialog },
  data() {
    return {
      dialogOpen: false
    }
  },
  methods: {
    openCheckoutDialog() {
      this.dialogOpen = true;
    },
    closeDialog() {
      this.dialogOpen = false;
    }
  },
  setup() {
    const cartStore = useCartStore();

    const cartItems = computed(() => cartStore.cart);
    const totalItems = computed(() => cartStore.totalItems);
    const totalPrice = computed(() => cartStore.totalPrice);

    const removeFromCart = (id) => {
      cartStore.removeFromCart(id);
    };

    const increaseQuantity = (item) => {
      cartStore.updateQuantity(item.id, item.quantity + 1);
    };

    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        cartStore.updateQuantity(item.id, item.quantity - 1);
      }
    };

    return { cartItems, totalItems, totalPrice, removeFromCart, increaseQuantity, decreaseQuantity };
  },
};
</script>

<style scoped>
.quantity-box {
  padding: 2px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 30px;
  text-align: center;
  display: inline-block;
  margin: 0 8px;
}

</style>