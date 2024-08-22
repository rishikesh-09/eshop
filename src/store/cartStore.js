import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const savedCart = sessionStorage.getItem('cart');
  const cart = ref(savedCart ? JSON.parse(savedCart) : []);

  const totalItems = computed(() => cart.value.reduce((acc, item) => acc + item.quantity, 0));
  const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0));

  function addToCart(product) {
    const existingItem = cart.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    saveCart();
  }

  function removeFromCart(id) {
    cart.value = cart.value.filter((item) => item.id !== id);
    saveCart();
  }

  function updateQuantity(id, quantity) {
    const item = cart.value.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeFromCart(id);
      }
    }
    saveCart();
  }

  function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(cart.value));
  }

  return {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
});