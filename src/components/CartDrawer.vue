//CartDrawer.vue----------------------------------------------------------------------------------------------------------------------------------------

<template>
  <v-navigation-drawer
    :modelValue="isOpen"
    @update:modelValue="$emit('update:isOpen', $event)"
    temporary
    :width="$vuetify.display.mdAndUp ? 400 : '100%'"
    :location="$vuetify.display.mdAndUp ? 'right' : 'bottom'"
    :height="$vuetify.display.mdAndUp ? '100%' : '80%'"
    :style="mobileStyle"
    class="cart-drawer min-h-full"
  >
    <v-card class="d-flex flex-column h-100">
      <v-card-title class="text-h5 pa-4">
        My Bag
        <v-btn icon @click="closeDrawer" class="float-right" color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="flex-grow-1 overflow-y-auto">
        <v-list>
          <v-list-item v-for="item in cartItems" :key="item.id" class="mb-4">
            <template v-slot:prepend>
              <v-img :src="item.image" height="80px" width="80px" cover class="rounded mr-4"></v-img>
            </template>
            <v-list-item-subtitle class="font-weight-bold">{{ item.title }}</v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-bold">${{ item.price }}</v-list-item-subtitle>

            <template v-slot:append>
              <v-row align="center" no-gutters>
              
                <v-icon icon @click="decreaseQuantity(item)" class="mr-2" size="small">mdi-minus</v-icon>
              
                <span class="quantity-box">{{ item.quantity }}</span>
                
                <v-icon icon @click="increaseQuantity(item)" class="mx-2" size="small">mdi-plus</v-icon>
            
                <v-icon icon @click="removeFromCart(item.id)" class="ml-2" color="error" size="small">mdi-delete</v-icon>
                
              </v-row>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-row>
          <v-col cols="6">
            <button class="bg-white text-dark border-1 border-solid font-bold py-2 px-4 block text-center"  variant="elevated" block @click="$emit('update:isOpen', false);$router.push('/cart')">
              View Bag
            </button>  
          </v-col>
          <v-col cols="6">
            
            <button @click="$router.push('/cart')" class="bg-web text-white font-bold py-2 px-4 block text-center" variant="elevated" block >
              Go To Checkout
            </button>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '@/store/cartStore';
import { useDisplay } from 'vuetify';

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['update:isOpen']);

const cartStore = useCartStore();
const display = useDisplay();

const cartItems = computed(() => cartStore.items);

const mobileStyle = computed(() => {
  if (!display.mdAndUp.value) {
    return {
      height: '80vh',
      top: 'auto',
      bottom: '0',
    };
  }
  return {};
});

const updateBodyScroll = (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
};

watch(() => props.isOpen, (newValue) => {
  updateBodyScroll(newValue);
});

const closeDrawer = () => {
  emit('update:isOpen', false);
};

onMounted(() => {
  if (props.isOpen) {
    updateBodyScroll(true);
  }
});

onUnmounted(() => {
  updateBodyScroll(false);
});

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

</script>

<style scoped>
.cart-drawer {
  z-index: 9999 !important;


}

.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

</style>