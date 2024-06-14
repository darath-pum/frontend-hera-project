<template>
    <ClientOnly>

        <div class="container">
            <h1 class="page-title">Update Game</h1>

            <form action="" ref="form" @submit.prevent="updateGame"
                class="space-y-10 md:space-y-16 my-10 mx-auto max-w-screen-md flex flex-col justify-center item-center">
                <div class="grid grid-cols-1 md:grid-cols-3 item-center space-y-1 md:space-y-0 space-y-1 md:space-y-0">
                    <label for="game-title" class="col-span-1 my-auto">
                        <h1 class="text-md md:text-md md:text-xl  ">Title<span class="text-red-500">*</span>:</h1>
                    </label>
                    <div class="relative col-span-1 md:col-span-2">
                        <input v-model="title" type="text" id="game-title" placeholder="Game Title" maxlength="50"
                            class="p-2 w-full" />
                        <p class="absolute -bottom-7 right-0 md:left-0 text-gray-400">{{ title.length }}/50</p>
                    </div>

                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 item-center space-y-1 md:space-y-0">
                    <label for="game-description" class="col-span-1 my-auto">
                        <h1 class="text-md md:text-xl ">Description:</h1>
                    </label>
                    <div class="relative col-span-2">
                        <textarea v-model="description" type="text" id="game-description" placeholder="Game Description"
                            @click="pathName = ''" max="500"
                            class="  p-2 w-full min-h-[100px] max-h-[200px]"></textarea>
                        <p class="absolute -bottom-7 right-0 md:left-0 text-gray-400">{{ description.length }}/500 </p>
                    </div>
                </div>

                <div v-if="isSelectGame" class="dialog-backdrop" @click="isSelectGame = false"
                    :class="[isSelectGame ? 'active' : '']"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 item-center space-y-1 md:space-y-0">
                    <label for="game-category" class="col-span-1 my-auto">
                        <h1 class="text-md md:text-xl ">Categories:</h1>
                    </label>
                    <div @click="showSelectGame"
                        class="relative cursor-pointer select-cat w-full col-span-2 z-50 flex item-center justify-between px-2 min-h-[45px] ">
                        <p class="my-auto text-gray-400 select-none w-fit"
                            :class="{ 'text-black': categories != 'Select game categories' }">{{ genres.join(", ")
                            }}
                        </p>
                        <span class="material-symbols-outlined w-fit my-auto text-gray-400 select-none"
                            :class="{ 'rotate-180': isSelectGame }">
                            arrow_drop_down
                        </span>
                        <div class="absolute left-0 top-[47px]  px-2 py-2 bg-white w-[100%] shadow-md select-cat "
                            v-if="isSelectGame" @click.stop>
                            <div class="max-h-[300px] overflow-y-auto">
                                <div class="flex gap-5 item-center px-5 hover:bg-gray-100 h-10 mr-2 rounded-md"
                                    v-for="(item, index) in nameGenres" :key="item.id" @click="addGenre(item.name)">
                                    <div class="w-4 h-full flex item-center">
                                        <input type="checkbox" :id="item.name" :name="item.name"
                                            :checked="genres.includes(item.name)"
                                            class="w-full h-4 my-auto accent-gray-500" />
                                    </div>

                                    <p class="h-fit my-auto">{{ item.name }}</p>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>


                <div class="grid grid-cols-1 md:grid-cols-3 item-center space-y-1 md:space-y-0">
                    <label for="game-description" class="col-span-1 my-auto">
                        <h1 class="text-md md:text-xl ">Game Icon<span class="text-red-500">*</span>:</h1>
                    </label>
                    <div v-if="!gameIconUrl" class="flex items-center justify-center w-full col-span-2">
                        <label for="dropzone-file-icon" :style="pathName == 'img' ? 'border:2px solid red' : ''"
                            class="flex flex-col items-center justify-center w-full h-64 upload-file rounded-lg cursor-pointer bg-gray-50">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                        class="font-semibold">Click
                                        to upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 5Mb)
                                </p>
                            </div>
                            <input id="dropzone-file-icon" type="file" class="hidden" @change="onIconFileChange" />
                        </label>
                    </div>

                    <div v-if="gameIconUrl"
                        class="show-img-url relative flex flex-col space-y-2 items-center justify-center w-full col-span-2 h-64  rounded-lg ">

                        <span @click="removeIcon"
                            class="material-symbols-outlined absolute right-3 top-3 p-1 rounded-md h-fit cursor-pointer bg-red-500 hover:bg-red-400 text-white">
                            close
                        </span>

                        <div class="w-32 h-32 overflow-hidden rounded-lg">
                            <img :src="gameIconUrl" alt="game icon" class="w-full h-full object-cover" />
                        </div>
                        <p class="max-w-[50%] text-sm truncate">{{ iconFileName }}</p>
                    </div>
                </div>


                <div class="grid grid-cols-1 md:grid-cols-3 item-center space-y-1 md:space-y-0">
                    <label for="game-description" class="col-span-1 my-auto">
                        <h1 class="text-md md:text-xl ">Game File<span class="text-red-500">*</span>:</h1>
                    </label>
                    <div v-if="!gameFileName" class="flex items-center justify-center w-full col-span-2">
                        <label for="dropzone-file-game" :style="pathName == 'game' ? 'border:2px solid red' : ''"
                            class="flex flex-col items-center justify-center w-full h-64 upload-file rounded-lg cursor-pointer bg-gray-50">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                        class="font-semibold">Click
                                        to upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">.zip, .rar, ... (MAX. 100Mb)
                                </p>
                            </div>
                            <input id="dropzone-file-game" type="file" class="hidden" @change="onGameFileChange" />
                        </label>
                    </div>
                    <div v-if="gameFileName"
                        class="relative flex flex-col space-y-2 items-center justify-center w-full col-span-2 h-64 border rounded-lg">

                        <span @click="removeGameFile"
                            class="material-symbols-outlined absolute right-3 top-3 p-1 rounded-md h-fit cursor-pointer bg-red-500 hover:bg-red-400 text-white">
                            close
                        </span>

                        <div class="w-32 h-32 overflow-hidden rounded-lg">
                            <svg fill="#434c5e" viewBox="0 0 32 32" version="1.1" class="w-full h-full"
                                xmlns="http://www.w3.org/2000/svg">
                                <title>zip</title>
                                <path
                                    d="M5 30v-27h10v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h2v-2h-2v-2h2v-2h-2v-2h2v-2h-2v-2h2v-2h2.991v6.009h6.009v20.991h-21zM17 18h-4v7h4v-7zM16 23.938h-2v-2h2v2zM21 3h0.245l4.755 4.755v0.183h-5v-4.938z">
                                </path>
                            </svg>
                        </div>
                        <p class="max-w-[50%] text-sm truncate">{{ gameFileName }}</p>
                    </div>
                </div>

                <div class="flex gap-5 justify-end">
                    <button class="secondary-btn" @click="$router.back()">Cancel</button>
                    <button class="primary-btn" @click="updateGame">
                        <Loading v-if="loading"></Loading>
                        <span v-else>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </ClientOnly>

</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from 'vue-router';
import Loading from '~/components/Loading.vue'
import Swal from 'sweetalert2'
const gameId = useRoute().query.gameID
const pathName = ref("");
const loading = ref(false)
const title = ref("");
const img = ref();
const description = ref("");
const game = ref()
const gameIconFile = ref();
const iconFileName = ref("");
const gameIconUrl = ref("");
const categories: any = ref([])
const gameFile = ref(null);
const gameFileName = ref(null);
const genres: any = ref([]);
const isSelectGame = ref(false);


const nameGenres: any = ref([])
const getAllCategories = async () => {
    const res = await callAPI('/dashboard/categories/getAllCategories');
    console.log('all categories', res);
    nameGenres.value = res.data

}

const getGameById = async () => {
    const res = await callAPI(`/dashboard/game/getInfo/${gameId}`);
    console.log(res);

    title.value = res.data.title
    description.value = res.data.description
    gameIconUrl.value = res.data.img_url
    // created_at.value = res.data.created_at
    categories.value = res.data.categories
    genres.value = categories.value


}

function onIconFileChange(e: any) {
    const file = e.target.files[0];
    gameIconFile.value = file;
    iconFileName.value = file.name;
    img.value = file


    const errGameIcon = validGamIconEdit(img.value)
    if (errGameIcon) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Wrong input",
            text: errGameIcon,
            showConfirmButton: false,
            timer: 2000
        });
        img.value = ''
        pathName.value = 'img'
        return;
    }

    gameIconUrl.value = URL.createObjectURL(file);
}

function onGameFileChange(e: any) {
    const file = e.target.files[0];
    game.value = file
    console.log(file.type);

    // check file type
    const errGameIcon = validGameEdit(game.value)
    if (errGameIcon) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Wrong input",
            text: errGameIcon,
            showConfirmButton: false,
            timer: 2000
        });
        game.value = ''
        pathName.value = 'game'
        return;
    }

    gameFile.value = file;
    gameFileName.value = file.name;
}

const showSelectGame = () => {
    isSelectGame.value = !isSelectGame.value;
};
const addGenre = (genre: string) => {
    if (!genres.value.includes(genre)) {
        genres.value.push(genre);
        console.log(genres.value);
    } else {
        const index = genres.value.indexOf(genre);
        genres.value.splice(index, 1);
    }

    categories.value = genres.value


};

const removeIcon = () => {
    gameIconUrl.value = "";
    img.value = ''
};

const removeGameFile = () => {
    gameFileName.value = null;
    game.value = ''
};


// ==============Add game ===============
let isEditGameCalled = false;

const updateGame = async () => {
    if (isEditGameCalled) {
        return; // Exit the function if it has already been called
    }

    isEditGameCalled = true;
    const formData = new FormData();

    formData.set('title', title.value);
    formData.set('description', description.value)
    formData.set('categories', JSON.stringify(categories.value))
    if (img.value != null) {
        formData.append('img', img.value)
        console.log(img.value);

    }
    if (game.value != null) {
        formData.append('game', game.value)
        console.log(game.value);
    }
    console.log("formData", formData);
    loading.value = false
    const res = await callAPI(`/dashboard/game/update/${gameId}`, 'PUT', formData);
    console.log(res);
    
    if (res.status == 200) {
        loading.value = true
        isEditGameCalled = false;
        window.location.href = '/game-admin'
    }

}

onMounted(async () => {
    await getGameById()
    await getAllCategories()
})
</script>

<style scoped>
form {
    margin-top: 4rem;
    width: 100%;

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

.g-one,
.g-two {
    width: 50%;
}

.title,
.select,
.game-file,
.image,
.game-desc {
    display: flex;
    flex-direction: column;
    width: 100%;
}

label {
    font-weight: 400;
}

input,
.select-cat,
textarea,
.show-img-url {
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    /* min-height: 45px; */
}

.upload-file {
    border: 1px solid var(--primary-color);
}
</style>
