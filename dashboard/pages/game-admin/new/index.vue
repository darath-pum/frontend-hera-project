<template>
    <ClientOnly>

        <div class="container">
            <h1 class="page-title">Upload New Game</h1>

            <form action="" ref="form" @submit.prevent="addGame"
                class="space-y-10 md:space-y-10 my-10 mx-auto max-w-screen-lg flex flex-col justify-center item-center">
                <div class="grid lg:grid-cols-2 gap-8">
                    <div class="space-y-10">
                        <div class="">
                            <label for="game-title" class="col-span-1 my-auto">
                                <h1 class="text-md md:text-md md:text-xl  ">Title<span class="text-red-500">*</span>:
                                </h1>
                            </label>
                            <div class="relative col-span-1 md:col-span-2">
                                <input v-model="title" type="text" id="game-title" placeholder="Game title"
                                    maxlength="50" @click="pathName = []" class="p-2 w-full"
                                    :style="pathName.includes('title') ? 'border:2px solid red' : ''" />
                                <p class="absolute -bottom-7 right-0 md:left-0 text-gray-400">{{ title.length }}/50
                                    <span v-if="pathName.includes('title')" class="text-red">{{ invalidMessage }}</span>
                                </p>
                            </div>

                        </div>
                        <div v-if="isSelectGame" class="dialog-backdrop" @click="isSelectGame = false"
                            :class="[isSelectGame ? 'active' : '']"></div>
                        <div class="">
                            <label for="game-category" class="col-span-1 my-auto">
                                <h1 class="text-md md:text-xl ">Categories:</h1>
                            </label>
                            <div @click="showSelectGame"
                                class="relative cursor-pointer select-cat w-full col-span-2 z-20 flex item-center justify-between px-2 min-h-[45px] ">
                                <p class="my-auto text-gray-400 select-none w-fit"
                                    :class="{ 'text-black': genreList != 'Select game categories' }">{{
                                        genreList
                                    }}</p>
                                <span class="material-symbols-outlined w-fit my-auto text-gray-400 select-none"
                                    :class="{ 'rotate-180': isSelectGame }">
                                    arrow_drop_down
                                </span>
                                <div class="absolute left-0 top-[47px]  px-2 py-2 bg-white w-[100%] shadow-md select-cat "
                                    v-if="isSelectGame" @click.stop>
                                    <div class="max-h-[300px] overflow-y-auto">
                                        <div class="flex gap-8 item-center px-5 hover:bg-gray-100 h-10 mr-2 rounded-md"
                                            @click="addGenre(item.name)" v-for="(item, index) in nameGenres"
                                            :key="item.id">
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
                    </div>
                    <div class="h-full">
                        <label for="game-description" class="col-span-1 my-auto">
                            <h1 class="text-md md:text-xl ">Description:</h1>
                        </label>
                        <div class="relative col-span-2">
                            <textarea v-model="description" type="text" id="game-description"
                                placeholder="Game description" @click="pathName = []" max="500"
                                class="  p-2 w-full min-h-[155px] max-h-[155px]"></textarea>

                        </div>
                    </div>
                </div>

                <div class="grid xl:grid-cols-12 gap-2 sm:gap-8">
                    <div class="col-span-6 md:col-span-2 flex flex-col relative">
                        <label for="game-description" class="mb-2">
                            <h1 class="text-md md:text-xl">Icon<span class="text-red-500">*</span>:</h1>
                        </label>
                        <div v-if="!gameIconUrl" class=" flex flex-grow items-center justify-center">
                            <label for="dropzone-file-icon"
                                :style="pathName.includes('img') ? 'border:2px solid red !important' : ''"
                                class="flex flex-col items-center justify-center w-full aspect-square upload-file rounded-md cursor-pointer bg-gray-50">
                                <div class="flex flex-col items-center justify-center">
                                    <svg class="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">.png, .jpeg, .jpg, ...</p>
                                </div>
                                <input id="dropzone-file-icon" type="file" class="hidden" @change="onIconFileChange" />
                            </label>
                        </div>
                        <div v-if="gameIconUrl" @click="removeIcon"
                            class="relative flex flex-grow group flex-col items-center justify-center col-span-2 w-full aspect-square rounded-md hover:opacity-70 cursor-pointer">
                            <span @click="removeIcon"
                                class="material-symbols-outlined hidden group-hover:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 rounded-md h-fit bg-red-500 text-white">
                                close
                            </span>
                            <div class="w-full aspect-square overflow-hidden rounded-md border">
                                <img :src="gameIconUrl" alt="game icon" class="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-6 md:col-span-2 flex flex-col">
                        <label for="game-color" class="mb-2">
                            <h1 class="text-md md:text-xl">Color:</h1>
                        </label>
                        <div
                            class="border rounded-md overflow-hidden flex-grow flex flex-col justify-center items-center bg-gray-50">
                            <label for="game-color" class="w-full h-full cursor-pointer "
                                :style="{ backgroundColor: color }">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6 h-full">
                                    <p class="text-sm text-gray-500 font-semibold">
                                        {{ color ? color : "Select color" }}
                                    </p>
                                </div>
                                <input id="game-color" type="color" class="hidden" :value="color" @change="changeColor">
                            </label>
                        </div>
                    </div>
                    <div class="col-span-12 md:col-span-8 flex flex-col">
                        <label for="game-banner" class="mb-2">
                            <h1 class="text-md md:text-xl">Banner<span class="text-red-500">*</span>:</h1>
                        </label>
                        <div v-if="!gameBannerUrl" class="flex flex-grow items-center justify-center w-full">
                            <label for="game-banner"
                                :style="pathName.includes('banner') ? 'border:2px solid red !important' : ''"
                                class="flex flex-col items-center justify-center w-full h-full border rounded-md cursor-pointer bg-gray-50">
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
                                    <p class="text-xs text-gray-500 dark:text-gray-400">.png, .jpeg, .jpg, ... (MAX.
                                        10Mb)</p>
                                </div>
                                <input id="game-banner" type="file" class="hidden" @change="onUploadGameBanner" />
                            </label>
                        </div>
                        <div v-if="gameBannerUrl" @click="removeGameBanner"
                            class="relative flex flex-grow group flex-col border items-center justify-center col-span-2 w-full h-32 rounded-md hover:opacity-70 cursor-pointer">
                            <span @click="removeGameBanner"
                                class="material-symbols-outlined hidden group-hover:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 rounded-md h-fit bg-red-500 text-white">
                                close
                            </span>
                            <div class="w-full overflow-hidden rounded-md">
                                <img :src="gameBannerUrl" alt="game icon" class="mx-auto h-full w-auto object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid lg:grid-cols-12 gap-8">
                    <div class="col-span-6 flex flex-col">
                        <label for="game-video" class="mb-2">
                            <h1 class="text-md md:text-xl">Video URL:</h1>
                        </label>
                        <input v-model="videoUrl" type="text" name="" id="game-video" placeholder="Game video URL"
                            class="px-2 py-2.5">
                    </div>
                    <div class="col-span-6 flex flex-col">
                        <label for="game-description" class="mb-2">
                            <h1 class="text-md md:text-xl">Game File<span class="text-red-500">*</span>:</h1>
                        </label>
                        <div v-if="!gameFileName" class="flex flex-grow items-center justify-center w-full">

                            <label for="dropzone-file-game"
                                :style="pathName.includes('game') ? 'border:2px solid red !important' : ''"
                                class="flex flex-col items-start justify-center w-full border h-full rounded-md cursor-pointer bg-gray-50 px-5">
                                <div class="flex flex items-center justify-center gap-5">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>

                                    <p class="text-xs text-gray-500 dark:text-gray-400">.zip, .rar, ... (MAX. 100Mb)</p>
                                </div>
                                <input id="dropzone-file-game" type="file" class="hidden" @change="onGameFileChange" />
                            </label>
                        </div>
                        <div v-if="gameFileName"
                            class="relative flex flex-grow flex items-center justify-start gap-5 w-full border rounded-md">

                            <div class="w-5 h-5 overflow-hidden rounded-md">
                                <svg fill="#434c5e" viewBox="0 0 32 32" version="1.1" class="w-full h-full"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <title>zip</title>
                                    <path
                                        d="M5 30v-27h10v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h2v-2h-2v-2h2v-2h-2v-2h2v-2h-2v-2h2v-2h2.991v6.009h6.009v20.991h-21zM17 18h-4v7h4v-7zM16 23.938h-2v-2h2v2zM21 3h0.245l4.755 4.755v0.183h-5v-4.938z">
                                    </path>
                                </svg>
                            </div>
                            <p class="max-w-[50%] text-sm truncate">{{ gameFileName }}</p>
                            <span @click="removeGameFile"
                                class="material-symbols-outlined absolute right-1.5 p-1 rounded-md h-fit cursor-pointer bg-red-500 hover:bg-red-400 text-white">
                                close
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-span-6 flex flex-col">
                    <label for="game-screenshots" class="mb-2">
                        <h1 class="text-md md:text-xl">Screenshots:</h1>
                    </label>
                    <div class="flex gap-5 border rounded-md p-2 flex-wrap">
                        <label for="game-screenshots"
                            class="flex flex-col items-center justify-center w-32 h-32 rounded-md cursor-pointer border bg-gray-50">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <span class="material-symbols-outlined text-5xl text-gray-500">
                                    add
                                </span>
                                <p class="text-xs text-gray-500 dark:text-gray-400">.png, .jpeg, .jpg, ...</p>
                            </div>
                            <input id="game-screenshots" multiple type="file" class="hidden"
                                @change="onUploadScreenshots" />
                        </label>
                        <div v-for="(url, index) in screenshotUrls" :key="index" class="">
                            <div class="relative group hover:opacity-80 cursor-pointer">
                                <span @click="removeScreenshot(index)"
                                    class="material-symbols-outlined hidden group-hover:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-1 rounded-md h-fit bg-red-500 text-white">
                                    close
                                </span>
                                <img :src="url" alt="game icon" class="w-auto h-32 object-cover rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="flex gap-5 justify-end">
                    <button class="secondary-btn w-32" @click="$router.back()">Cancel</button>
                    <button class="primary-btn w-32" @click="addGame">
                        <Loading v-if="loading"></Loading>
                        <span v-else>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    </ClientOnly>

</template>

<script setup lang="ts">
import { ref } from "vue";
import Loading from '~/components/Loading.vue'
import Swal from 'sweetalert2'
const loading = ref(false)
const title = ref("");
const img = ref<File | null>(null);
const description = ref("");
const game = ref<File | null>(null)
const gameIconFile = ref("");
const iconFileName = ref("");
const gameIconUrl = ref("");
const categories: any = ref([])
const gameFile = ref();
const gameFileName = ref("");
const genres: any = ref([]);
const genreList = ref("Select game categories");
const isSelectGame = ref(false);
const invalidMessage = ref("")
const pathName = ref<String[]>([])
const nameGenres: any = ref([])

const screenshotFiles = ref<File[]>([]);
const screenshotUrls = ref<string[]>([]);

const gameBannerFile = ref<File | null>(null);
const gameBannerUrl = ref<string | null>(null);

const videoUrl = ref("");


const color = ref('');

function onUploadGameBanner(e: any) {
    const file = e.target.files[0];

    gameBannerFile.value = file;

    const errGameBanner = validGameIcon(file)
    if (errGameBanner) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Invalid input",
            text: errGameBanner,
            showConfirmButton: false,
            timer: 2000
        });

        pathName.value.push('banner')
        gameBannerFile.value = null;
        return;
    }

    gameBannerUrl.value = URL.createObjectURL(file);
}

function removeGameBanner() {
    gameBannerUrl.value = null;
    gameBannerFile.value = null;
}

function onUploadScreenshots(e: any) {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const errScreenshot = validGameIcon(file)
        if (errScreenshot) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Invalid input",
                text: errScreenshot,
                showConfirmButton: false,
                timer: 2000
            });

            return;
        }
        const url = URL.createObjectURL(file);
        screenshotFiles.value.push(...files);
        screenshotUrls.value.push(url);
    }

}

function removeScreenshot(index: number) {
    screenshotFiles.value.splice(index, 1);
    screenshotUrls.value.splice(index, 1);
}

const getAllCategories = async () => {
    const res = await callAPI('/api/genre/getAllGenres');
    nameGenres.value = res.data

}

const changeColor = (e: any) => {
    color.value = e.target.value;
};

function onIconFileChange(e: any) {
    const file = e.target.files[0];
    gameIconFile.value = file;
    iconFileName.value = file.name;
    img.value = file
    const errGameIcon = validGameIcon(img.value)
    if (errGameIcon) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Invalid input",
            text: errGameIcon,
            showConfirmButton: false,
            timer: 2000
        });

        pathName.value.push('img')
        return;
    }
    gameIconUrl.value = URL.createObjectURL(file);
}

function onGameFileChange(e: any) {
    const file = e.target.files[0];
    game.value = file
    const errGameFile = validGame(game.value)

    if (errGameFile) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Wrong input",
            text: errGameFile,
            showConfirmButton: false,
            timer: 2000
        });
        pathName.value.push('game')
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
        categories.value.push(genre)
    } else {
        const index = genres.value.indexOf(genre);
        genres.value.splice(index, 1);
    }

    genreList.value = genres.value.join(", ");

    if (genres.value.length == 0) {
        genreList.value = "Select game categories";
    }
};

const removeIcon = () => {
    gameIconUrl.value = "";
    img.value = null
};

const removeGameFile = () => {
    gameFileName.value = "";
    game.value = null
};


// ==============Add game ===============
let isAddGameCalled = false;

const addGame = async () => {

    const errTitle = validTitle(title.value)
    const errGameImage = validGameIcon(img.value)
    const errGameBanner = validGameIcon(gameBannerFile.value)
    const errGameFile = validGame(game.value)


    if (errTitle || errGameImage || errGameBanner || errGameFile) {
        if (errTitle)
            pathName.value.push('title')

        if (errGameImage)
            pathName.value.push('img')

        if (errGameBanner)
            pathName.value.push('banner')

        if (errGameFile)
            pathName.value.push('game')

        return
    }


    if (isAddGameCalled) {
        return; // Exit the function if it has already been called
    }

    isAddGameCalled = true;
    const formData = new FormData();

    formData.set('title', title.value);
    formData.set('description', description.value)
    formData.set('categories', JSON.stringify(categories.value))
    if (img.value != null) {
        formData.append('img', img.value)
    }
    if (game.value != null) {
        formData.append('game', game.value)
    }
    if (gameBannerFile.value != null) {
        formData.append('banner', gameBannerFile.value)
    }

    if (videoUrl.value != "") {
        formData.set('video_url', videoUrl.value)
    }

    if (screenshotFiles.value.length > 0) {
        for (let i = 0; i < screenshotFiles.value.length; i++) {
            formData.append('screenshots', screenshotFiles.value[i])
        }
    }

    if (color.value != "") {
        formData.set('color', color.value)
    } else {
        formData.set('color', "#FFFFFF")
    }

    loading.value = true



    const res = await callAPI('/api/game/create', 'POST', formData)

    if (res.status == 200) {
        loading.value = false
        // window.location.href = '/game-admin'
        isAddGameCalled = false;
    } else {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Upload Failed",
            text: "Something went wrong. Please try again.",
            showConfirmButton: false,
            timer: 2000
        });
        isAddGameCalled = false;
        loading.value = false
    }

}

onMounted(() => {
    getAllCategories()
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
