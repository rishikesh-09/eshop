import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('wishlist')) || [],
  }),
  getters: {
    getWishlistItems: (state) => state.items,
    getWishlistItemCount: (state) => state.items.length,
    isItemInWishlist: (state) => (productId) => state.items.some(item => item.id === productId),
  },
  actions: {
    addToWishlist(product) {
      if (!this.isItemInWishlist(product.id)) {
        this.items.push(product);
        this.saveToLocalStorage();
      }
    },
    removeFromWishlist(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    },
  },
});