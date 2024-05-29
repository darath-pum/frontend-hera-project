<template>
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
                    <!-- <div class="game-file">
                        <label for="">Game file:</label>
                        <input type="file">
                        <div class="select-file-game flex flex-row items-center justify-center">
                            <span class="material-symbols-outlined">
                                add_circle </span>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="flex flex-row justify-end gap-2">
                <button class="secondary-btn">Cancel</button>
                <button class="primary-btn">Save</button>
            </div>

        </form>
    </div>
</template>
<script setup lang="ts">
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

</script>
<style scoped>
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
</style>