<template>
  <v-pagination v-model="localCurrentPage" :length="pageCount"
    @update:modelValue="emitPageChange"
  ></v-pagination>
</template>

<script setup>

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  }
});
import { ref, watch } from 'vue';

const emit = defineEmits(['update:currentPage']);

const localCurrentPage = ref(props.currentPage);

// watch(() => props.currentPage, (newValue) => {
//   localCurrentPage.value = newValue;
// });

const emitPageChange = (value) => {
  emit('update:currentPage', value);
};
</script>