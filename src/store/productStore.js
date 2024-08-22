import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('productStore', () => {
  const products = ref([]);
  const categories = ref([]);

  const fetchData = async () => {
    if (products.value.length === 0) {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        products.value = response.data;

        const uniqueCategories = new Set(products.value.map(product => product.category));
        categories.value = ['All', ...uniqueCategories];
      } catch (error) {
        console.error('Error fetching products and categories:', error);
        throw error;
      }
    }
  };

  const getProductById = (id) => products.value.find(product => product.id === id);

  return {
    products,
    categories,
    fetchData,
    getProductById,
  };
});