<template>
    <div>
      <p id="timer">{{ timerDisplay }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const emits = defineEmits(["event-time"])
  // Get the element where you want to display the timer
  let timerDisplay = ref();
  
  // Initialize the timer variables
  let minutes = 1;
  let seconds = 0;
  
  // Function to update the timer display
  function updateTimer() {
    // Decrement the seconds
    seconds--;
  
    // If the seconds reach 0, decrement the minutes and reset the seconds
    if (seconds < 0) {
      minutes--;
      seconds = 59;
    }
  
    // Format the timer display
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const timerText = `${formattedMinutes}:${formattedSeconds}`;
  
    // Update the timer display
    timerDisplay.value = timerText;
    handleTimer(timerText)
    // Stop the timer if it reaches 0
  }
  
  const handleTimer =(timer)=>{
    emits("event-time",timer)
  }
  // Start the timer
  let timerInterval;
  
  onMounted(() => {
    timerInterval = setInterval(updateTimer, 1000);
  });
  
  onUnmounted(() => {
    clearInterval(timerInterval);
  });
  </script>