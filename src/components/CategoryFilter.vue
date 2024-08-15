<template>
    <v-select
      v-model="localSelectedCategory"
      :items="categories"
      label="Filter by Category"
      outlined
      dense
      clearable
      variant="outlined"
      @update:modelValue="emitCategory"
    ></v-select>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps(['selectedCategory', 'categories']);
  const emit = defineEmits(['update:selectedCategory']);
  
  const localSelectedCategory = ref(props.selectedCategory);
  
  watch(() => props.selectedCategory, (newValue) => {
    localSelectedCategory.value = newValue;
  });
  
  const emitCategory = (value) => {
    emit('update:selectedCategory', value);
  };
  </script>