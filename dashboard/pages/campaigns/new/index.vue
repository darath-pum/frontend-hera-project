<template>
    <div class="add-campaign page-bg">
        <h1 class="page-title">Add Campaign</h1>
        <p class="desc page-description">Campaign management involves strategic planning, execution, and analysis of
            marketing campaigns
            to achieve
            specific objectives, targeting the right audience, and optimizing performance for desired results.</p>

        <form action="" class="flex flex-col gap-5" ref="form">
            <div class="g-one">
                <div class="title">
                    <label for="">Title:</label>
                    <input type="text" v-model="title">
                </div>
                <!-- <div class="select">
                    <label for="">Games</label>
                    <div class="select-game" @click="showSelectGame">{{ genreList }}</div>
                    <div class="select-icon">
                        <span class="material-symbols-outlined">
                            arrow_drop_down
                        </span>
                    </div>
                    <div class="choose-select flex flex-col gap-5" v-if="isSelectGame" @click.stop>
                        <div class="flex flex-row gap-2" v-for="(item, index) in nameGenres" :key="item">
                            <input id="checkbox" type="checkbox" :id="item.name" :name="item.name"
                                @click="addGenre(item.name, item.id)" />
                            <label :for="item.name">{{ item.name }}</label>
                        </div>
                    </div>
                </div> -->

                <div v-if="isSelectGame" class="dialog-backdrop" @click="isSelectGame = false"
                    :class="[isSelectGame ? 'active' : '']"></div>
                <div class="item-center w-full">
                    <label for="game-category" class="col-span-1 my-auto">
                        <h1>Categories:</h1>
                    </label>
                    <div @click="showSelectGame"
                        class="relative cursor-pointer select-cat w-full col-span-2 z-50 flex item-center justify-between px-2 min-h-[45px] ">
                        <p class="my-auto text-gray-400 select-none w-fit">{{ gamesList }}</p>
                        <span class="material-symbols-outlined w-fit my-auto text-gray-400 select-none"
                            :class="{ 'rotate-180': isSelectGame }">
                            arrow_drop_down
                        </span>
                        <div class="absolute left-0 top-[47px]  px-2 py-2 bg-white w-[100%] shadow-md select-cat "
                            v-if="isSelectGame" @click.stop>
                            <div class="max-h-[300px] overflow-y-auto">
                                <div class="flex gap-5 item-center px-5 hover:bg-gray-100 h-10 mr-2 rounded-md"
                                    @click="addUserGame(it.title, it.id)" v-for="(it, index) in userGames" :key="it.id">
                                    <input type="checkbox" :id="it.title" :name="it.title"
                                        :checked="user_game_id.includes(it.id)" class="border-none" />

                                    <p class="h-fit my-auto">{{ it.title }}</p>

                                </div>
                            </div>
                        </div>
                        <!-- <p v-for="(inde, index) in userGames">{{ inde.title }}</p> -->

                    </div>

                </div>
            </div>
            <div class="g-two">
                <div class="start-date">
                    <label for="">Start Date:</label>
                    <input type="date" v-model="start_date">
                </div>
                <div class="end-date">
                    <label for="">End Date:</label>
                    <input type="date" v-model="end_date">
                </div>
            </div>
            <div class="g-three">
                <div class="image">
                    <label for="">Image:</label>
                    <input type="file" @change="handleImage">
                    <div class="select-image">
                        <span class="material-symbols-outlined">
                            add_circle </span>
                        <img src="/image-icon.png" alt="" v-if="!image">
                        <img :src="image" alt="" v-else>
                    </div>
                </div>
                <div class="campain-desc">
                    <label for="">Description:</label>
                    <textarea name="" id="" v-model="desc"></textarea>
                </div>
            </div>
        </form>
        <ManagePrizePool></ManagePrizePool>
        <div class="flex flex-row justify-end gap-2 -mt-7">
            <button class="secondary-btn">Cancel</button>
            <button class="primary-btn" @click="addCampaign">Save</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import ManagePrizePool from "~/components/ManagePrizePool.vue"
import {useAuthStore} from '~/store/auth'


const authStore = useAuthStore()
const allGamesUser = ref<string[]>([]);
const gamesList = ref('Select Game');
const isSelectGame = ref(false)

const title = ref();
const desc = ref();
const image = ref();
const start_date = ref();
const end_date = ref();
const user_game_id = ref([])


async function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const handleImage = async (event: any) => {
    const file = event.target.files[0];
    image.value = file
    console.log(image.value);
    
}



// const nameGenres = ref([
//     { name: "Car", id: 1 },
//     { name: "Bike", id: 2 },
//     { name: "Fish", id: 3 },
//     { name: "Fruit", id: 4 },
//     { name: "Basketball", id: 5 },
//     { name: "Beauty", id: 6 },
//     { name: "Bike", id: 7 },
//     { name: "Cat", id: 8 },
//     { name: "Casual", id: 9 },
//     { name: "Clicker", id: 10 },
//     { name: "Controller", id: 11 },
//     { name: "Dress Up", id: 12 },
//     { name: "Driving", id: 13 },
//     { name: "Escape", id: 14 },
//     { name: "Flash", id: 15 },
//     { name: "FPS", id: 16 },
//     { name: "Horror", id: 17 },
//     { name: ".io", id: 18 },
//     { name: "Minecraft", id: 19 },
//     { name: "Mutiplayer", id: 20 },
//     { name: "Pool", id: 21 },
//     { name: "Pozzle", id: 22 },
//     { name: "Shooting", id: 23 },
//     { name: "Soccer", id: 24 },
//     { name: "Sports", id: 25 },
//     { name: "Tower Defense", id: 26 },
// ]);



const userGames = ref([])

const getAllUserGame = async () => {
    const res = await callAPI(`/dashboard/game/user/getUserGames/${authStore.id}`);
    if (res.status == 200) {
        console.log("getAllUserGame", res.data);
        userGames.value = res.data

    }
}
const showSelectGame = () => {
    isSelectGame.value = !isSelectGame.value
}
const addUserGame = (title: string, id: number) => {
    if (!user_game_id.value.includes(id)) {
        allGamesUser.value.push(title);
        user_game_id.value.push(id);
        // console.log(allGamesUser.value);

    } else {
        const index = user_game_id.value.indexOf(id);
        allGamesUser.value.splice(index, 1);
        user_game_id.value.splice(index, 1);
    }
    gamesList.value = allGamesUser.value.join(', ');
    console.log(user_game_id.value);

};
const addCampaign = async () => {
    const formData = new FormData();

    formData.set("title", title.value);
    formData.set("desc", desc.value);
    if (image.value) {
        formData.append("image", image.value);
    }
    formData.set("start_date", '2023-01-20T00:00:00+07:00');
    formData.set("end_date", '2023-01-20T00:00:00+07:00');
    formData.set("user_game_id)", JSON.stringify(user_game_id.value))
    console.log("formData", formData);

    const res = await callAPI('/dashboard/campaign/createCampaign', 'POST', formData);
    console.log(res.data);

}
onMounted(() => {
    getAllUserGame()
})

</script>
<style scoped>
form {
    margin-top: 4rem;
}

.g-one,
.g-two,
.g-three {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 2rem;
    /* background: #000; */
}

.title,
.select,
.start-date,
.end-date,
.image,
.campain-desc {
    display: flex;
    flex-direction: column;
    width: 100%;
}

label {
    font-weight: 600;
}

input,
.select-game,
textarea,
.select-cat,
.select-icon {
    padding: 0.5rem;
    border: 1px solid #000000;
    border-radius: 10px;
}

.dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #00000000;
    z-index: 9 !important;
    display: none;
}

.dialog-backdrop.active {
    display: block;
}

#checkbox {
    width: 2rem;
}

.select-game {
    z-index: 1;
}

.select-icon {
    height: 2.7rem;
    margin-top: -2.7rem;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    border: none !important;

}

textarea,
.image input {
    height: 5rem;
    width: 100%;
}

.image input {
    z-index: 10;
    cursor: pointer;
    opacity: 0;

}

.select-image {
    height: 5rem;
    border: #000000 solid 1px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -5rem;
}

.select-image img {
    position: absolute;
    width: 5rem;
}

.select-image span {
    z-index: 1;
    color: #a5a4a4;
    position: absolute;
    font-weight: 600;
}

.choose-select {
    background: #FFFFFF;
    position: absolute;
    z-index: 10;
    width: 20rem;
    margin-top: 4.3rem;
    height: 20rem;
    overflow-y: scroll;
    border-radius: 10px;
    border: 2rem solid #FFFFFF;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;

}

@media (max-width:67.5rem) {
    form {
        margin-top: 2rem;
        gap: 1rem;
    }

    input,
    .select-game,
    textarea,
    .select-icon {
        padding: 0.5rem;
        border: 2px solid #000000;
        border-radius: 10px;
        font-size: 0.7rem;
    }

    .select-icon {
        height: 2.3rem;
        margin-top: -2.3rem;

    }

    textarea,
    .image input,
    .select-image {
        height: 4rem;

    }

    .select-image {
        margin-top: -4rem;
    }

    .select-image img {
        width: 4rem;
    }

    label {
        font-size: 0.7rem;
    }

    .g-one,
    .g-two,
    .g-three {
        gap: 2rem;
    }

    .choose-select {
        margin-top: 3.4rem;
        width: 17.8rem;
        border: 1rem solid #FFFFFF;
        gap: 1rem;

    }
}
</style>