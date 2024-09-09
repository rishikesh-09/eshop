import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    categories: [],
  }),
  getters: {
    getProductById: (state) => (id) => state.products.find(product => product.id === id),
    getProductsByCategory: (state) => (category) => 
      category === 'All' ? state.products : state.products.filter(product => product.category === category),
  },
  actions: {
    async fetchData() {
      if (this.products.length === 0) {
        try {
          const response = await axios.get('https://fakestoreapi.com/products');
          this.products = response.data;

          const uniqueCategories = new Set(this.products.map(product => product.category));
          this.categories = ['All', ...uniqueCategories];
        } catch (error) {
          console.error('Error fetching products and categories:', error);
          throw error;
        }
      }
    },
  },
});