import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => {
    const savedCart = sessionStorage.getItem('cart');
    return {
      cart: savedCart ? JSON.parse(savedCart) : [],
    };
  },
  getters: {
    totalItems: (state) => state.cart.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) => state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
  },
  actions: {
    addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.saveCart();
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
      this.saveCart();
    },
    updateQuantity(id, quantity) {
      const item = this.cart.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeFromCart(id);
        }
      }
      this.saveCart();
    },
    saveCart() {
      sessionStorage.setItem('cart', JSON.stringify(this.cart));
    },
  },
});