import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
  }),
  getters: {
    getCurrentQuery: (state) => state.query,
    hasQuery: (state) => state.query.trim().length > 0,
    getLowercaseQuery: (state) => state.query.toLowerCase(),
  },
  actions: {
    setQuery(newQuery) {
      this.query = newQuery;
    },
  },
});






















