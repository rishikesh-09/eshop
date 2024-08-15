<template>
    <Teleport to="body">
      <v-dialog v-model="localIsOpen" max-width="500px">
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
  export default {
    name: 'CheckoutDialog',  // Add this line
    props: ['isOpen'],
    emits: ['close'],
    data() {
      return {
        localIsOpen: this.isOpen
      }
    },
    watch: {
      isOpen(newValue) {
        this.localIsOpen = newValue;
      },
      localIsOpen(newValue) {
        if (!newValue) {
          this.$emit('close');
        }
      }
    },
    methods: {
      closeDialog() {
        this.localIsOpen = false;
      }
    }
  }
  </script>