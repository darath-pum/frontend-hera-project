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
            <div class="game-card" v-for="(item, index) in games" :key="item">
                <div class="flex flex-row items-start justify-between ">
                    <div class="image ">
                        <img :src="item.img_url" alt="">
                    </div>
                    <div class="title-desc flex flex-col pl-5 gap-1">
                        <h2 class="line-clamp-1">{{ item.title }}</h2>
                        <span class="line-clamp-3 md:line-clamp-2">{{ item.description }}</span>
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between">
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
import { ref, onMounted } from "vue";
import AddUserGame from "~/components/dialogs/AddUserGame.vue"
const games = ref()
const getAllGames = async () => {
    const res = await callAPI('/dashboard/game/getAll')
    if (res.status == 200) {
        games.value = res.data
        console.log("all games", games.value);

    }
}
onMounted(() => {
    getAllGames()
})
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
    height: 13rem;
    border-radius: 10px;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0rem;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.title-desc h2 {
    font-size: 1.5rem;
    font-weight: 600;
}

.title-desc {
    width: 70%;
}

/* .image {
    width: 30%;
    background: #000;

} */

.image img {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid #00000041;
}

.btn-view-detail button {
    border-radius: 100px;
}

.btn-en-dis span {
    cursor: pointer;
}

@media (max-width: 112.5rem) {
    .game-card {
        width: 18rem;
        height: 11rem;
        border-radius: 10px;
        padding: 1rem 1rem;
        margin: 1.5rem 0rem;


    }

    .title-desc h2 {
        font-size: 1.2rem;
    }


    .image img {
        width: 4rem;
        height: 4rem;
    }

    .btn-en-dis span,
    .btn-view-detail button {
        cursor: pointer;
        font-size: 0.9rem;
    }

}

@media (max-width: 101.875rem) {
    .game-card {
        width: 15rem;
        height: 10rem;
        border-radius: 10px;
        padding: 1rem 1rem;
        margin: 1.5rem 0rem;


    }

    .btn-en-dis span,
    .btn-view-detail button {
        font-size: 0.7rem;
    }

    .btn-view-detail button {

        font-size: 0.7rem;
        height: 2rem;
        padding: 0.1rem 1rem;
    }
}

@media (max-width: 89.375rem) {
    .game-card {
        width: 14rem;



    }

}

@media (max-width: 85.625rem) {
    .game-card {
        width: 13rem;
        height: 9rem;


    }

    .title-desc h2 {
        font-size: 1rem;
    }

    .title-desc span {
        font-size: 0.7rem;
    }


    .image img {
        width: 4rem;
        height: 4rem;
    }

    .btn-en-dis span,
    .btn-view-detail button {
        cursor: pointer;
        font-size: 0.6rem;
    }

}

@media (max-width: 81.25rem) {
    .game-card {
        width: 12rem;
        height: 8rem;


    }


    .image img {
        width: 3.5rem;
        height: 3.5rem;
    }

    .btn-view-detail button {

        font-size: 0.6rem;
        height: 1.5rem;
        padding: 0.1rem 0.5rem;
    }

}
@media (max-width: 78.125rem) {
    .game-card {
        width: 11rem;
        height: 7rem;
        padding: 0.6rem;
        margin: 1rem 0.5rem;


    }


    .image img {
        width: 3rem;
        height: 3rem;
    }

    .btn-view-detail button {

        font-size: 0.6rem;
        height: 1.5rem;
        padding: 0.1rem 0.5rem;
    }

}
</style>