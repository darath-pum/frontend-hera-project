<template>
    <div class="add-prize">
        <button class="primary-btn" @click="showDlialog">Add user's game</button>
        <div v-if="isShow" class="prize-dialog" @click="closeDialog">
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
                            <option value="">Select user</option>
                            <option v-for="(item, index) in users" :key="item" :value="item.id">{{ item.first_name }} {{
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
                            <option value="">Select game</option>
                            <option v-for="(item, index) in games" :key="item" :value="item.id">{{ item.title }}</option>

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
                    <button class="primary-btn" @click="addUsersGame">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
const user_id = ref()
const route = useRoute()
const isShow = ref(false)
const game_id = ref()
// const props = defineProps(["userId"])

const users = ref()
const games = ref()

const showDlialog = () => {
    isShow.value = true
    user_id.value = parseInt(route.query.user)
    console.log("userId", user_id.value);
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
        user_id: user_id.value,
        game_id: game_id.value
    }
    console.log(body);

    const res = await callAPI('/dashboard/game/user/create', 'POST', body)
    console.log(res);
    isAddUserGameCalled = false
    window.location.reload(`/user's-game?user=${user_id.value}`)

}

const closeDialog = () => {
    isShow.value = false
    user_id.value = ''
}

onMounted(() => {
    getAllGames()
    getAllUsers()
})

</script>

<style scoped>
.prize-dialog {
    position: fixed;
    background: #0000005e;
    width: 100%;
    height: 100%;
    z-index: 10 !important;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

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
    padding:0.5rem;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    width: 100%;
    background: #ffffff8a;
    color: #666464;
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
</style>