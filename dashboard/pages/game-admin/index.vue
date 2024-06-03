<template>
    <div class="prize-setting page-bg">
        <h1 class="page-title">Gamge Setting</h1>
        <p class="desc page-description">
            Game setting involves determining the value or amount of a prize for a competition or event, considering
            factors such as objectives, budget, target audience, and perceived value.
        </p>
        <div class="flex flex-row justify-end mt-15 items-center">
            <div class="prize-btn">
                <NuxtLink to="/game-admin/new">
                    <button class="primary-btn">Add Games</button>
                </NuxtLink>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Categories</th>
                    <th>Create at</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in games" :key="item">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.title }}</td>
                    <td>
                        <div class="p-image flex flex-row justify-center">
                            <img :src="item.img_url" alt="">
                        </div>
                    </td>
                    <td>
                    <span v-for="(name, i) in item.categories">
                        {{ name}}, </span>
                    </td>
                    <td>{{ item.created_at.substring(0, 10)}}</td>
                    <td>
                        <div class="flex flex-row justify-center gap-5">
                            <div class="flex flex-row items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                                <span>Edit</span>
                            </div>

                            <DeleteItem :itemName="'Game'"></DeleteItem>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import AddPrize from "~/components/dialogs/AddPrize.vue"
import DeleteItem from "~/components/dialogs/DeleteItem.vue"
import {ref, onMounted} from "vue"

const games = ref()

const getAllGames = async()=>{
    const res = await callAPI('/dashboard/game/getAll')
    if(res.status == 200){
        games.value = res.data
        console.log("all games",games.value);
        
    }
}
onMounted(()=>{
    getAllGames()
})
</script>
<style scoped>
table {
    width: 100%;
    background: #FFFFFF;
}

.p-image img {
    width: 2rem;
    height: 2rem;
}

th {
    background: var(--primary-color);
    color: #FFFFFF;
    padding: 0.5rem;
}

tr {
    border-bottom: 5px solid #FFFFFF;
    border-top: 5px solid #FFFFFF;
}

td {
    background: #F2F6F6;
    text-align: center;
    padding: 0.5rem;
}

th:nth-child(1),
td:nth-child(1) {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
}

th:nth-child(6),
td:nth-child(6) {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
}

@media (max-width: 67.5rem) {
    .prize-btn{
        margin-top: -2rem !important;
    }
    .p-image img {
        width: 1rem;
        height: 1rem;
    }

    th,
    td {
        font-size: 0.7rem;
        padding: 0.3rem;
    }
    .material-symbols-outlined{
        font-size: 1rem;
    }
}
</style>