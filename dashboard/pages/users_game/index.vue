<template>
    <div class="list-games container">
        <h1 class="page-title">List all games</h1>

        <div class="flex flex-col items-center gap-4 mt-10">
            <div class="flex justify-between items-end w-full gap-5">

                <div class="select flex flex-col items-center justify-center">
                    <label for="" class="text-start w-full font-semibold">Selete user:</label>
                    <select class="select-game" name="" id="" v-model="user_id" @change="getAllGames">
                        <option value="Select user" disabled>Select user</option>
                        <option v-for="(item, index) in users" :key="item" :value="item.id">
                            <NuxtLink :to="`/users_game?user=${item.id}`"> {{ item.first_name }} {{ item.last_name }}
                            </NuxtLink>
                        </option>
                    </select>
                    <div class="select-icon">
                        <span class="material-symbols-outlined">
                            arrow_drop_down
                        </span>
                    </div>
                </div>
                <div class="flex flex-row gap-5">
                    <button v-if="usergame_ids.length > 0" class="primary-btn w-55" @click="unAssignGame">Unassign
                        game</button>
                    <AddUserGame :userId="user_id" :arrGameId="arrGameId"></AddUserGame>
                </div>

            </div>
        </div>

        <div class="list-cards  flex flex-row justify-between">
            <div class="game-card shadow-sm border-b-2" v-for="(item) in games" :key="item.id"
                :style="usergame_ids.includes(item.id) ? 'border:2px solid var(--primary-color)' : ''">
                <div class="flex flex-row items-start justify-between">
                    <div class="flex flex-row items-start">
                        <div class="w-24 h-24 min-w-24 overflow-hidden rounded-md">
                            <img :src="item.img_url" alt="" class="w-full h-full object-cover">
                        </div>
                        <div class="flex flex-col pl-5 gap-1">
                            <h2 class="text-md font-semibold line-clamp-1">{{ item.title }}</h2>
                            <span class="text-sm line-clamp-3">{{ item.description }}</span>
                        </div>

                    </div>
                    <div class="flex flex-row justify-end"><input type="checkbox" class="cursor-pointer"
                            style="width: 1.2rem; height: 1.2rem;" @click="selectGame(item.id)"></div>
                </div>
                <div class="card-footer flex flex-row justify-end">
                    <div class="btn-view-detail">
                        <NuxtLink :to="`/games/detail?gameId=${item.id}`">
                            <button class="primary-btn text-sm px-4 py-2">View detail</button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center">
            <Loading v-if="loading && games.length == 0 && $route.path !== `/users_game`" :loader="'big'"></Loading>
        </div>
        <EmptyData v-if="!loading && games.length == 0" :contain="`User's game`"></EmptyData>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import AddUserGame from "~/components/dialogs/AddUserGame.vue"
import Loading from "~/components/Loading.vue"
import EmptyData from "~/components/EmptyData.vue"
import { useRoute, useRouter } from "vue-router"

const date = ref(new Date((new Date()).getTime() - (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0])
const loading = ref(true)
const router = useRouter()
const user_id = ref(useRoute().query.user)
const users = ref()
const games = ref<IGame[]>([])
const arrGameId: any = ref([])
const usergame_ids: any = ref([])



const getAllGames = async () => {
    if(!user_id.value){
        return;
    }
    
    const res = await callAPI(`/dashboard/game/user/getUserGames/${user_id.value}`)
    router.push(`/users_game?user=${user_id.value}`)
    if (res.status == 200) {
        games.value = res.data
        loading.value = false
        let gameData = res.data
        for (let index = 0; index < gameData.length; index++) {

            arrGameId.value.push(gameData[index].game_id)

        }
    }
}




const getAllUsers = async () => {
    const res = await callAPI('/dashboard/user/getUsers')
    if (res.status == 200) {
        users.value = res.data
    }
}
const selectGame = (id: number) => {
    if (!usergame_ids.value.includes(id)) {
        usergame_ids.value.push(id)

    } else {
        const indexOne = usergame_ids.value.indexOf(id);
        usergame_ids.value.splice(indexOne, 1);

    }
}
const unAssignGame = async () => {
    const res = await callAPI('/dashboard/game/user/delete', 'DELETE', { usergame_ids: usergame_ids.value })
    await getAllGames()
    usergame_ids.value = []

}
onMounted(() => {
    getAllUsers()
})



</script>
<style scoped>
.select-game,

.select-icon {
    padding: 0.5rem;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    width: 20rem;
}

label {
    text-align: start;
    font-weight: 600;
    color: #666464;
    padding-bottom: 0.2rem;
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

@media (max-width: 35.5rem) {

    .select-game,
    .select-icon {
        padding: 0.5rem;
        font-size: 0.7rem;
        width: 10rem;
    }

    .select-icon {
        margin-top: -2.1rem;
        height: 2.1rem;
    }

    label {
        font-size: 0.7rem;
    }
}
</style>