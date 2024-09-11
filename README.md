
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
          const SHOPIFY_API_URL = 'https://vue-storefront-api.myshopify.com/api/2024-07/graphql.json';
          const SHOPIFY_API_TOKEN = "2361c98e6ec9889df7bab8ba073056f0";
          
          const shopifyClient = axios.create({
            baseURL: SHOPIFY_API_URL,
            headers: {
              'X-Shopify-Storefront-Access-Token': SHOPIFY_API_TOKEN,
              'Content-Type': 'application/json',
            },
          });

          const query = `
            {
              products(first: 25) {
                edges {
                  node {
                    id
                    title
                    description
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                    variants(first: 1) {
                      edges {
                        node {
                          priceV2 {
                            amount
                            currencyCode
                          }
                          compareAtPriceV2 {
                            amount
                            currencyCode
                          }
                        }
                      }
                    }    
                  }
                }
              }
            }
          `;

          const response = await shopifyClient.post('', { query });
          const productsData = response.data.data.products.edges;

          this.products = productsData.map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
            description: edge.node.description,
            image: edge.node.images.edges[0]?.node.url,
            price: edge.node.variants.edges[0]?.node.priceV2.amount,
            compareAtPrice: edge.node.variants.edges[0]?.node.compareAtPriceV2?.amount,
            category: 'Shopify Category', // Shopify API does not return a category directly
          }));

          // Set unique categories (since Shopify does not provide categories in the response, set a default one)
          this.categories = ['All', 'Shopify Category'];
        } catch (error) {
          console.error('Error fetching products and categories from Shopify API:', error);
          throw error;
        }
      }
    },
  },
});


# first

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
