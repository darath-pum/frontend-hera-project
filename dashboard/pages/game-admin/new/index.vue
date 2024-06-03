<!-- <template>
    <div class="page-bg">
        <h1 class="page-title">Add Game</h1>
        <p class="desc page-description">Game management involves strategic planning, execution, and analysis of
            marketing campaigns
            to achieve
            specific objectives, targeting the right audience, and optimizing performance for desired results.</p>

        <form action="" class="flex flex-col gap-5">
            <div class="input-add-game flex flex-row gap-8">
                <div class="g-one flex flex-col gap-5">
                    <div class="title">
                        <label for="">Title:</label>
                        <input type="text">
                    </div>
                    <div class="select">
                        <label for="">Categories</label>
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
                    </div>
                    <div class="game-desc">
                        <label for="">Description:</label>
                        <textarea name="" id=""></textarea>
                    </div>
                </div>
                <div class="g-two flex flex-col gap-5">
                    <div class="image">
                        <label for="">Game image:</label>
                        <input type="file"> 
                        <div class="select-image flex flex-col gap-2 justify-center">
                            <img src="/image-icon.png" width="40" alt="">
                            <p>Upload game image</p>
                        </div>
                    </div>
                    <div class="image">
                        <label for="">Game file:</label>
                        <input type="file">
                        <div class="select-image">
                            <span class="material-symbols-outlined">
                                upload
                            </span>
                            <p>Upload game file</p>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div class="flex flex-row justify-end gap-2">
                <button class="secondary-btn">Cancel</button>
                <button class="primary-btn">Save</button>
            </div>

        </form>
    </div>
</template> -->
<!-- <script setup lang="ts">
import { ref } from "vue"


const genres = ref<string[]>([]);
const genreList = ref('Select game categories');
const isSelectGame = ref(false)
const nameGenres = ref([
    { name: "Car", id: 1 },
    { name: "Bike", id: 2 },
    { name: "Fish", id: 3 },
    { name: "Fruit", id: 4 },
    { name: "Basketball", id: 5 },
    { name: "Beauty", id: 6 },
    { name: "Bike", id: 7 },
    { name: "Cat", id: 8 },
    { name: "Casual", id: 9 },
    { name: "Clicker", id: 10 },
    { name: "Controller", id: 11 },
    { name: "Dress Up", id: 12 },
    { name: "Driving", id: 13 },
    { name: "Escape", id: 14 },
    { name: "Flash", id: 15 },
    { name: "FPS", id: 16 },
    { name: "Horror", id: 17 },
    { name: ".io", id: 18 },
    { name: "Minecraft", id: 19 },
    { name: "Mutiplayer", id: 20 },
    { name: "Pool", id: 21 },
    { name: "Pozzle", id: 22 },
    { name: "Shooting", id: 23 },
    { name: "Soccer", id: 24 },
    { name: "Sports", id: 25 },
    { name: "Tower Defense", id: 26 },
]);
const showSelectGame = () => {
    isSelectGame.value = !isSelectGame.value
}
const addGenre = (genre: string) => {
    const lowercasedGenre = genre.toLowerCase();
    if (!genres.value.includes(lowercasedGenre)) {
        genres.value.push(lowercasedGenre);
        console.log(genres.value);

    } else {
        const index = genres.value.indexOf(lowercasedGenre);
        genres.value.splice(index, 1);
    }

    genreList.value = genres.value.join(', ');
};

</script> -->
<!-- <style scoped>
form {
    margin-top: 4rem;
    width: 100%;

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
    font-weight: 600;
}

input,
.select-game,
textarea,
.select-icon {
    padding: 0.5rem;
    border: 2px solid #000000;
    border-radius: 10px;
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

textarea {
    height: 5rem;
}

.image input {
    z-index: 10;
    cursor: pointer;
    opacity: 0;
    height: 6.6rem;

}


.select-image {
    height: 6.6rem;
    border: #000000 solid 2px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -6.6rem;
}


.select-image span {
    font-size: 3rem;
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

    .input-add-game {
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

    textarea {
        height: 4rem;

    }

    .image input {
        height: 8.2rem;
    }

    .select-image {
        height: 8.2rem;
        margin-top: -8.2rem;
    }

    .select-image img {
        width: 4rem;
    }

    label {
        font-size: 0.7rem;
    }

    .g-one,
    .g-two {
        gap: 1rem;
    }

    .choose-select {
        margin-top: 3.4rem;
        width: 17.8rem;
        border: 1rem solid #FFFFFF;
        gap: 1rem;

    }
}
</style> -->

<template>
    <div class="page-bg">
        <h1 class="page-title">Upload New Game</h1>

        <form action=""
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
                        max="500" class="  p-2 w-full min-h-[100px] max-h-[200px]"></textarea>
                    <p class="absolute -bottom-7 right-0 md:left-0 text-gray-400">{{ description.length }}/500</p>
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
                            <div class="flex gap-5 item-center px-5 hover:bg-gray-100 h-10 mr-2 rounded-md"
                                @click="addGenre(item.name, item.id)" v-for="(item, index) in nameGenres"
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


            <div class="grid grid-cols-1 md:grid-cols-3 item-center space-y-1 md:space-y-0">
                <label for="game-description" class="col-span-1 my-auto">
                    <h1 class="text-md md:text-xl ">Game Icon<span class="text-red-500">*</span>:</h1>
                </label>
                <div v-if="!gameIconUrl" class="flex items-center justify-center w-full col-span-2">
                    <label for="dropzone-file-icon"
                        class="flex flex-col items-center justify-center w-full h-64 upload-file rounded-lg cursor-pointer bg-gray-50">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click
                                    to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 5Mb)
                            </p>
                        </div>
                        <input id="dropzone-file-icon" type="file" class="hidden" @change="onIconFileChange" />
                    </label>
                </div>

                <div v-if="gameIconUrl"
                    class="relative flex flex-col space-y-2 items-center justify-center w-full col-span-2 h-64 border rounded-lg">

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
                    <label for="dropzone-file-game"
                        class="flex flex-col items-center justify-center w-full h-64 upload-file rounded-lg cursor-pointer bg-gray-50">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click
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
                <button class="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md">
                    Upload
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const title = ref("");
const description = ref("");
const gameIconFile = ref();
const iconFileName = ref("");
const gameIconUrl = ref("");

const gameFile = ref();
const gameFileName = ref("");

const genres = ref<string[]>([]);
const genreList = ref("Select game categories");
const isSelectGame = ref(false);
const nameGenres = ref([
    { name: "Car", id: 1 },
    { name: "Bike", id: 2 },
    { name: "Fish", id: 3 },
    { name: "Fruit", id: 4 },
    { name: "Basketball", id: 5 },
    { name: "Beauty", id: 6 },
    { name: "Cat", id: 8 },
    { name: "Casual", id: 9 },
    { name: "Clicker", id: 10 },
    { name: "Controller", id: 11 },
    { name: "Dress Up", id: 12 },
    { name: "Driving", id: 13 },
    { name: "Escape", id: 14 },
    { name: "Flash", id: 15 },
    { name: "FPS", id: 16 },
    { name: "Horror", id: 17 },
    { name: ".io", id: 18 },
    { name: "Minecraft", id: 19 },
    { name: "Mutiplayer", id: 20 },
    { name: "Pool", id: 21 },
    { name: "Pozzle", id: 22 },
    { name: "Shooting", id: 23 },
    { name: "Soccer", id: 24 },
    { name: "Sports", id: 25 },
    { name: "Tower Defense", id: 26 },
]);

function onIconFileChange(e: any) {
    const file = e.target.files[0];
    gameIconFile.value = file;
    iconFileName.value = file.name;

    // check file type
    if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
        alert("Only images are allowed");
        return;
    }

    gameIconUrl.value = URL.createObjectURL(file);
}

function onGameFileChange(e: any) {
    const file = e.target.files[0];

    console.log(file.type);

    // check file type
    if (!["application/zip", "application/x-rar-compressed", "application/x-zip-compressed"].includes(file.type)) {
        alert("Only zip and rar files are allowed");
        return;
    }

    gameFile.value = file;
    gameFileName.value = file.name;
}

const showSelectGame = () => {
    isSelectGame.value = !isSelectGame.value;
};
const addGenre = (genre: string, id: number) => {
    if (!genres.value.includes(genre)) {
        genres.value.push(genre);
        console.log(genres.value);
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
};

const removeGameFile = () => {
    gameFileName.value = "";
};

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
textarea {
    border: 1px solid #000000;
    border-radius: 5px;
    /* min-height: 45px; */
}

.upload-file {
    border: 1px solid #000000;
}
</style>

