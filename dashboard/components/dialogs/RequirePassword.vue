
<template>
    <div >
      <div id="talkbubble" class="p-5">
            <h1 class="text-xl font-bold">Password must be include at least: </h1>
            <div class="flex mt-2">
                <span  v-if="!isLengthValid" class="material-symbols-outlined text-red" >close</span>
                <span v-else class="material-symbols-outlined  text-green-500">check</span>
                <span :class="{ 'text-green-600': isLengthValid }">8 characters long</span>
            </div>
            <div class="flex mt-2">
                <span v-if="!hasUppercase" class="material-symbols-outlined  text-red">close</span>
                <span v-else class="material-symbols-outlined  text-green-500">check</span>
                <span :class="{ 'text-green-600': hasUppercase }">One uppercase. ex: A-Z</span>
            </div>
            <div class="flex mt-2">
                <span v-if="!hasLowercase" class="material-symbols-outlined  text-red">close</span>
                <span v-else class="material-symbols-outlined  text-green-500">check</span>
                <span :class="{ 'text-green-600': hasLowercase }">One lowercase. ex: a-z</span>
            </div>
            <div class="flex mt-2">
                <span v-if="!hasDigit" class="material-symbols-outlined  text-red">close</span>
                <span v-else class="material-symbols-outlined  text-green-500">check</span>
                <span :class="{ 'text-green-600': hasDigit }">One number or digit. ex: 0-9</span>
            </div>
            <div class="flex mt-2">
                <span v-if="!hasSpecialChar" class="material-symbols-outlined  text-red">close</span>
                <span v-else class="material-symbols-outlined  text-green-500">check</span>
                <span :class="{ 'text-green-600': hasSpecialChar }">One special character. ex: [!, @, # ,$, %, ^, &, *]</span>
            </div>
        </div>
    </div>
  </template>
  

<script setup lang="ts">
const props = defineProps({

  isLengthValid: {
    type: Boolean,
    required: true
  },
  hasUppercase: {
    type: Boolean,
    required: true
  },
  hasLowercase: {
    type: Boolean,
    required: true
  },
  hasDigit: {
    type: Boolean,
    required: true
  },
  hasSpecialChar: {
    type: Boolean,
    required: true
  }
})
</script>
  
<style scoped>
#talkbubble {
    width: 26rem;
    height: 16rem;
    background:#dde2e6;
    position: relative;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
}
#talkbubble:before {
  content: "";
  position: absolute;
  right: 100%;
  top: 100px;
  width: 0;
  height: 0;
  border-top: 13px solid transparent;
  border-right: 26px solid #dde2e6;
  border-bottom: 13px solid transparent;
  
}

</style>