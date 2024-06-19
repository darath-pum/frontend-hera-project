<template>
    <div>
      <qrcode-vue :value="link" :size="200" level="H"></qrcode-vue>
    </div>
  </template>
  
  <script setup>
  import QrcodeVue from 'qrcode.vue'
  import {ref} from 'vue'
  const props = defineProps(["linkUrl"])
  const link = ref(props.linkUrl)
  console.log('link',link.value);
  
  </script>