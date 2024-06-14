<template>
    <div class="">
        <button class="primary-btn" @click="showDlialog">Add user's game</button>
        <div v-if="isShow" class="dialog" @click="closeDialog">
            <form action="" @click.stop class="flex flex-col gap-4" @submit.prevent="addUsersGame">
                <div class="form-header flex flex-row justify-between ">
                    <span></span>
                    <h1>Add user's game</h1>
                    <span class="material-symbols-outlined cursor-pointer" @click="closeDialog">
                        cancel
                    </span>
                </div>
                <!-- <div class="flex flex-row justify-end items-center gap-5"> -->
                <div>
                    <label for="">Users:</label>
                    <div class="select flex flex-col items-center justify-center">
                        <select class="select-game" name="" id="" v-model="user_id">
                            <option value="" class="bg-grey" disabled>Select user</option>
                            <option v-for="(item, index) in users" :key="item" :value="item.id" >{{ item.first_name }} {{
                                item.last_name }}</option>

                        </select>
                        <div class="select-icon">
                            <span class="material-symbols-outlined">
                                arrow_drop_down
                            </span>
                        </div>

                    </div>

                </div>
                <div>
                    <label for="">Games:</label>
                    <div class="select flex flex-col items-center justify-center">
                        <select class="select-game" name="" id="" v-model="game_id">
                            <option value="" class="bg-grey" disabled>Select game</option>
                            <option v-for="(item, index) in games" :key="item" :value="item.id" :disabled="arrGameId.includes(item.id)">{{ item.title }}
                            </option>

                        </select>
                        <div class="select-icon">
                            <span class="material-symbols-outlined">
                                arrow_drop_down
                            </span>
                        </div>

                    </div>

                </div>

                <!-- </div> -->
                <div class="btn-save">
                    <button class="primary-btn" @click="addUsersGame">
                        <Loading v-if="loading"></Loading>
                        <span v-else>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import Loading from "~/components/Loading.vue";


const loading = ref(false)
const user_id = ref()
const route = useRoute()
const isShow = ref(false)
const game_id = ref()
// const props = defineProps(["arrGameId"])
// const arrGameId = ref(props.arrGameId)
const arrGameId:any = ref([])
const users = ref()
const games = ref()

const showDlialog = () => {
    isShow.value = true
    user_id.value = route.query.user
    console.log("userId", user_id.value);
    getAllGamesUser()
}
const getAllUsers = async () => {
    const res = await callAPI('/dashboard/user/getUsers')
    console.log(res.data);

    if (res.status == 200) {
        users.value = res.data


    }
}
const getAllGames = async () => {
    const res = await callAPI('/dashboard/game/getAll')
    if (res.status == 200) {
        games.value = res.data
        console.log("all games", games.value);
    }
}

let isAddUserGameCalled = false;
const addUsersGame = async () => {
    if (isAddUserGameCalled) {
        return; // Exit the function if it has already been called
    }
    isAddUserGameCalled = true;
    let body = {
        user_id: parseInt(user_id.value),
        game_id: game_id.value
    }
    console.log(body);
    loading.value = true
    const res = await callAPI('/dashboard/game/user/create', 'POST', body);
    if (res.status == 200) {
        loading.value = false
        isAddUserGameCalled = false
        window.location.reload()
    }

}




const getAllGamesUser = async () => {
    const res = await callAPI(`/dashboard/game/user/getUserGames/${route.query.user}`)

    if (res.status == 200) {
  
        let gameData = res.data
        for (let index = 0; index < gameData.length; index++) {

            arrGameId.value.push(gameData[index].game_id)
            
        }
    }
}
const closeDialog = () => {
    isShow.value = false
    user_id.value = ''
    arrGameId.value =[]
}

onMounted(() => {
    getAllGames()
    getAllUsers()
    getAllGamesUser()
})

</script>

<style scoped>
form {
    width: 30rem;
    height: 25rem;
    background: #ffffff;
    padding: 2rem 2rem;
    border-radius: 10px;
}

form h1 {
    font-size: 30px;
    font-weight: 600;
}

.select-game,

.select-icon {
    padding: 0.5rem;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    width: 100%;
    background: #ffffff8a;
    color: #333030;
}


.select-game {
    z-index: 1;

}

.select-icon {
    width: 100%;
    position: relative;
    /* height: 2.7rem; */
    margin-top: -2.5rem;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    border: none !important;
    padding: 0.5rem;

}

.btn-save {
    width: 100%;
    margin-top: 1rem;
}


label {
    font-weight: 600;
    color: #666464;
    padding-bottom: 0.2rem;
}

.btn-save button {
    width: 100%;
}
@media (max-width: 35.5rem) {
    form h1 {
        font-size: 1.2rem;
        font-weight: 600;
    }

    form {
        width: 100%;
        height: 100vh;
        border-radius: 0;
    }

    .select-game,

.select-icon {
        padding: 0.5rem;
        font-size: 0.7rem;
    }

    label {
        font-size: 0.7rem;
    }

    .select-icon  {
        margin-top: -2.1rem;
        padding: 0.25rem;
    }
}
</style>