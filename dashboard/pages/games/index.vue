<template>
    <div class="list-games container">
        <h1 class="page-title">List all games</h1>

    
        <div class="list-cards  flex flex-row justify-between">
            <div class="game-card shadow-sm border-b-2" v-for="(item) in games" :key="item.id">
                <div class="flex flex-row items-start">
                    <div class="w-24 h-24 min-w-24 overflow-hidden rounded-md">
                        <img :src="item.img_url" alt="" class="w-auto h-full object-cover">
                    </div>
                    <div class="flex flex-col pl-5 gap-1">
                        <h2 class="text-md font-semibold line-clamp-1">{{ item.title }}</h2>
                        <span class="text-sm line-clamp-3">{{ item.description }}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="cursor-pointer">
                        <span class="toggler"
                            :class="(item.is_enabled) == true ? 'active bg-green-500' : ''" @click="updateGameStatus(item.id,true)">Enable</span>
                        <span  class="toggler"
                            :class="(item.is_enabled) == false? 'active bg-red-500' : ''" @click="updateGameStatus(item.id,false)">Disable</span>
                    </div>
                    <div class="btn-view-detail">
                        <NuxtLink :to="`/games/detail?gameId=${item.id}`">
                            <button class="primary-btn text-sm px-4 py-2">View detail</button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex flex-row justify-center">
      <Loading v-if="loading && games.length == 0" :loader="'big'"></Loading>
    </div>
    <EmptyData v-if="!loading && games.length == 0" :contain="'Game'"></EmptyData>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import {useAuthStore} from "~/store/auth"
import EmptyData from "~/components/EmptyData.vue"
import Loading from "~/components/Loading.vue"

const loading = ref(true)
const authStore = useAuthStore()
const games = ref<IGame[]>([])
const getAllGames = async () => {
    const res = await callAPI(`/api/game/user/getUserGames/${authStore.id}`)
    if (res.status == 200) {
        games.value = res.data
        loading.value = false
    }
}

const updateGameStatus = async(id:number,isEniable:boolean)=>{

const res = await callAPI(`/api/game/user/updateStatus/${id}`,'PUT',{is_enabled:isEniable})
await getAllGames()

}


onMounted(async() => {
    await getAllGames()
})



</script>
<style scoped>
.select-game,

.select-icon {
    padding: 0.5rem;
    border: 1px solid #000000;
    border-radius: 5px;
    width: 20rem;
}


.select-game {
    z-index: 1;
}

.select-icon {
    position: relative;
    width: 20rem;
    height: 2.7rem;
    margin-top: -2.7rem;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    border: none !important;

}

.list-cards {
    @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 xl:gap-5 my-10;
}

.game-card {
    background: rgb(240, 240, 240);
    background: linear-gradient(180deg, rgba(240, 240, 240, 1) 0%, rgba(255, 255, 255, 1) 48%);
    border: 1px solid #e5e5e5;
    @apply flex flex-col gap-3 p-3 rounded-md;
}

.title-desc h2 {
    font-size: 1.5rem;
    font-weight: 600;
}

.title-desc h2 {
    font-size: 1.5rem;
    font-weight: 600;
}

.list-cards {
    @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 xl:gap-5;
}

.card-footer {
    @apply flex justify-between items-center;

    div {
        @apply flex flex-row items-center justify-between;

        .toggler {
            @apply px-2 py-1 rounded-full cursor-pointer text-sm;
        }


    }
}

.toggler.active {
    @apply px-3 py-1 rounded-full text-white;
}



.btn-view-detail button {
    border-radius: 100px;
}
</style>