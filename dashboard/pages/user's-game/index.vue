<template>
    <div class="list-games page-bg">
        <h1 class="page-title">List all games</h1>
        <p class="desc page-description">
            Games setting involves determining the value or amount of a prize for a competition or event, considering
            factors such as objectives, budget, target audience, and perceived value.
        </p>

        <div class="flex flex-col items-center gap-4 mt-10">
            <!-- <h2>Search game by user name</h2> -->
            <div class="flex flex-row justify-end items-center w-full gap-5">

                <div class="select flex flex-col items-center justify-center">
                    <select class="select-game" name="" id="">
                        <option value="">Select user</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <div class="select-icon">
                        <span class="material-symbols-outlined">
                            arrow_drop_down
                        </span>
                    </div>

                </div>
                <div>
                    <!-- <button class="primary-btn">Add user's game</button> -->
                    <AddUserGame></AddUserGame>
                </div>

            </div>
        </div>
        <div class="list-cards  flex flex-row justify-between">
            <div class="game-card" v-for="i in 8">
                <div class="flex flex-row items-start">
                    <div class="image">
                        <img src="/cat.jpg" alt="">
                    </div>
                    <div class="title-desc flex flex-col pl-5 gap-1">
                        <h2>Mobile Legend </h2>
                        <span>Considering factors such as objectives, budget, target audience.</span>
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between -mt-7">
                    <div class="btn-en-dis flex flex-row gap-1">
                        <span @click="enable(i)"
                            :class="isEnable == true && index == i ? 'font-semibold' : ''">Enable</span>
                        <span>/</span>
                        <span @click="disable(i)"
                            :class="isEnable == false && index == i ? 'font-semibold' : ''">Disable</span>
                    </div>
                    <div class="btn-view-detail">
                        <NuxtLink to="/games/detail">
                            <button class="primary-btn">View detail</button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import AddUserGame from "~/components/dialogs/AddUserGame.vue"

const isEnable = ref(false);
const index = ref();
const enable = (inde) => {
    isEnable.value = true
    index.value = inde

}
const disable = (inde) => {
    isEnable.value = false
    index.value = inde
}
</script>
<style scoped>
.select-game,

.select-icon {
    padding: 0.5rem;
    border: 2px solid #000000;
    border-radius: 10px;
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
    margin-top: 1rem;
    flex-wrap: wrap;
}

.game-card {
    background: rgb(240, 240, 240);
    background: linear-gradient(180deg, rgba(240, 240, 240, 1) 0%, rgba(255, 255, 255, 1) 48%);
    width: 20rem;
    /* height: 14rem; */
    border-radius: 10px;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0rem;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}

.title-desc h2 {
    font-size: 1.5rem;
    font-weight: 600;
}

.image {
    width: 10rem;
    height: 10rem;
}

.image img {
    border-radius: 10px;
}

.btn-view-detail button {
    border-radius: 100px;
}

.btn-en-dis span {
    cursor: pointer;
}
</style>