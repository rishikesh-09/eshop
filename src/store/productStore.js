import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('productStore', () => {
  const products = ref([]);

  const fetchProducts = async () => {
    if (products.value.length === 0) {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        products.value = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  };

  const getProductById = (id) => products.value.find(product => product.id === id);

  return {
    products,
    fetchProducts,
    getProductById,
  };
});