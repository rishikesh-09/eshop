import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [],
  }),
  actions: {
    addToWishlist(product) {
      if (!this.items.find(item => item.id === product.id)) {
        this.items.push(product);
      }
    },
    removeFromWishlist(productId) {
      this.items = this.items.filter(item => item.id !== productId);
    },
    isInWishlist(productId) {
      return this.items.some(item => item.id === productId);
    },
  },
});