<template>
    <button @click="openPopup">Open Popup</button>
    <div v-if="showPopup" @click="closePopup">
      <div class="popup-content" @click.stop>
        <!-- Your popup content goes here -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showPopup = ref(false);
  
  const openPopup = () => {
    showPopup.value = true;
  };
  
  const closePopup = (event) => {
    if (event.target === event.currentTarget) {
      showPopup.value = false;
    }
  };
  </script>
  
  <style scoped>
  .popup-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  </style>