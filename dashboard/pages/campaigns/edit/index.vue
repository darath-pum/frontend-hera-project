<template>
    <div class="add-campaign page-bg">
        <h1 class="page-title">Edit Campaign</h1>
        <p class="desc page-description">Campaign management involves strategic planning, execution, and analysis of
            marketing campaigns
            to achieve
            specific objectives, targeting the right audience, and optimizing performance for desired results.</p>

        <form action="" class="flex flex-col gap-5">
            <div class="g-one">
                <div class="title">
                    <label for="">Title:</label>
                    <input type="text">
                </div>
                <div class="select">
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
                </div>
            </div>
            <div class="g-two">
                <div class="start-date">
                    <label for="">Start Date:</label>
                    <input type="date">
                </div>
                <div class="end-date">
                    <label for="">End Date:</label>
                    <input type="date">
                </div>
            </div>
            <div class="g-three">
                <div class="image">
                    <label for="">Image:</label>
                    <input type="file">
                    <div class="select-image">
                        <span class="material-symbols-outlined">
                            add_circle
                        </span>
                        <img src="/image-icon.png" alt="">
                    </div>
                </div>
                <div class="campain-desc">
                    <label for="">Description:</label>
                    <textarea name="" id=""></textarea>
                </div>
            </div>

        </form>
        <ManagePrizePool></ManagePrizePool>
        <div class="flex flex-row justify-end gap-2 -mt-7">
            <button class="secondary-btn">Cancel</button>
            <button class="primary-btn">Save</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import ManagePrizePool from "~/components/ManagePrizePool.vue"

const genres = ref<string[]>([]);
const genreList = ref('Select Game');
const isSelectGame = ref(false)
const nameGenres = ref([
    { name: "All", id: 1 },
    { name: "2Players", id: 2 },
    { name: "Action", id: 3 },
    { name: "Adventure", id: 4 },
    { name: "Basketball", id: 5 },
    { name: "Beauty", id: 6 },
    { name: "Bike", id: 7 },
    { name: "Car", id: 8 },
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
}

.g-one,
.g-two,
.g-three {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 5rem;
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
    flex-direction: row;
    justify-content: flex-end;
    border: none;
}

textarea,
.image input {
    height: 5rem;
}
.image input{
    z-index: 10;
    cursor: pointer;
    opacity: 0;
    
}

.select-image{
    height: 5rem;
    border: #000000 solid 2px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -5rem;
}
.select-image img{
    position: absolute;
    width: 5rem;
}
.select-image span{
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
</style>