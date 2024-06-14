<template>
    <div class="empty flex flex-col justify-center items-center">
        <div class="bg-img flex flex-row justify-center w-4/12 rounded-lg">
            <img src="/images/empty-icon.png" alt="">
        </div>
        <div class="flex flex-row justify-center">
            <h1 class="text-3xl font-semibold text-grey">Not Found {{ textContain }}</h1>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(['contain'])
const textContain = ref(props.contain)
</script>
<style scoped>
/* .bg-img img{
    width: 15rem;
    height: 15rem;
} */
</style>