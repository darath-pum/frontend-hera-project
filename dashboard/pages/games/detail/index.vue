<template>
    <div class="container game-detail p-5 pb-32">
        <NuxtLink v-if="$route.path=='/game'" to="/games">
            <div class="flex flex-row items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined">
                    keyboard_backspace
                </span>
                <span>Game lists</span>
            </div>

        </NuxtLink>
        <NuxtLink v-else to="/user's-game">
            <div class="flex flex-row items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined">
                    keyboard_backspace
                </span>
                <span>User' game</span>
            </div>

        </NuxtLink>
        <div class="flex flex-row items-start justify-center">
            <h1 class="page-title">Game detail</h1>
            <span></span>
        </div>
        <div class="detail-info flex flex-col sm:flex-row gap-10 xl:gap-20 sm:justify-center">
            <div class="flex flex-col items-center gap-10">
                <div class="w-48 h-48 lg:w-64 lg:h-64 rounded-lg overflow-hidden">
                    <img :src="game.img_url" alt="" class="w-full h-full object-cover">
                </div>
                <div class="btn-action flex flex-row justify-end md:w-full">
                    <!-- <button class="bg-green-500 text-white px-5 py-2 rounded-md">Enable</button> -->
                    <button class="bg-red-500 text-white px-5 py-2 rounded-md">Disable</button>
                </div>
            </div>
            <div class="flex flex-col gap-10 border-gray-300">
                <div class="space-y-5">
                    <div class="flex flex-row items-center gap-2">
                        <h2 class="text-3xl font-semibold">{{ game.title }}</h2>
                        <button class="px-5 py-1 rounded-full text-xs text-white bg-green-500">Active</button>
                    </div>
                    <div class="flex items-center gap-2 flex-wrap my-5">
                        <div v-for="i in 2" class="px-5 py-1 rounded-full text-xs text-black bg-gray-100">Action
                        </div>
                    </div>
                    <p class="text-lg text-gray-600 max-w-[500px]">{{ game.description }}</p>
                </div>
                <div class="qr-code flex flex-col gap-5 justify-center items-center sm:items-start pb-24">
                    <h1 class="text-xl font-semibold">Game QR Code</h1>
                    <img src="/QR.jpg" alt="" class="w-64 h-64 border rounded-lg">

                    <button class="secondary-btn mt-1">Download QR Code</button>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
const game = ref({});
const gameId = useRoute().query.gameId
const getGameDetail = async ()=>{
    const res = await callAPI(`/dashboard/game/getDetail/${gameId}`)
    game.value = res.data
    console.log(res);
    
}

onMounted(()=>{
   getGameDetail();
})
</script>
