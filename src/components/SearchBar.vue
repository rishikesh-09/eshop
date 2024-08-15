<template>
    <v-text-field
      v-model="localSearchQuery"
      label="Search"
      outlined
      dense
      clearable
      variant="outlined"
      @input="emitSearch"
    ></v-text-field>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps(['searchQuery']);
  const emit = defineEmits(['update:searchQuery']);
  
  const localSearchQuery = ref(props.searchQuery);
  
  watch(() => props.searchQuery, (newValue) => {
    localSearchQuery.value = newValue;
  });
  
  const emitSearch = () => {
    emit('update:searchQuery', localSearchQuery.value);
  };
  </script>