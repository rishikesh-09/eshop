<template>
    <Teleport to="body">
      <v-dialog v-model="isOpen" max-width="500px">
        <v-card>
          <v-card-title>Order Confirmation</v-card-title>
          <v-card-text>Your order has been placed successfully!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </Teleport>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'CheckoutDialog',
    props: {
      isOpen: Boolean,
      required: true,
    },
  
    emits: ['close'],
  
    setup(props, { emit }) {
      const closeDialog = () => {
        emit('close');
      };
  
      return {  closeDialog, props };
    },
  });
  </script>