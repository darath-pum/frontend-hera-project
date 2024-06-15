<template>
    <div class="prize-setting container">
        <h1 class="page-title">Gamge Setting</h1>
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
                    <th>Image</th>
                    <Sorting :data="games" :name="'Title'" :columnName="'title'" 
                         v-model:sortedColumn="sortedColumnName">
                    </Sorting>
                    <Sorting :data="games" :name="'Categories'" :columnName="'categories'" 
                         v-model:sortedColumn="sortedColumnName">
                    </Sorting>
             
                    <Sorting :data="games" :name="'Create at'" :columnName="'created_at'" 
                         v-model:sortedColumn="sortedColumnName">
                    </Sorting>
             
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in games" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <div class="p-image flex flex-row justify-center">
                            <img :src="item.img_url" alt="">
                        </div>
                    </td>
                    <td>{{ item.title }}</td>
                    <td>
                    <span>
                        {{ item.categories.join(', ')}} </span>
                    </td>
                    <td>{{ item.created_at.substring(0, 10) }}</td>
                    <td>
                        <div class="flex flex-row justify-center gap-5">
                            <NuxtLink :to="`/game-admin/edit?gameID=${item.id}`">

                                <div class="flex flex-row items-center gap-1 cursor-pointer">
                                    <span class="material-symbols-outlined">
                                        edit
                                    </span>
                                    <span>Edit</span>
                                </div>
                            </NuxtLink>

                            <DeleteItem :itemName="'Game'" :gameId="item.id" :functionName="'deleteGame'" :getAllGames="getAllGames"></DeleteItem>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="w-full flex flex-row justify-center">
            <Loading v-if="loading && games.length == 0" :loader="'big'"></Loading>
        </div>
        <EmptyData v-if="!loading && games.length == 0" :contain="'Game'"></EmptyData>
    </div>
</template>
<script setup lang="ts">
import DeleteItem from "~/components/dialogs/DeleteItem.vue"
import EmptyData from "~/components/EmptyData.vue"
import Loading from "~/components/Loading.vue"
import { ref, onMounted } from "vue"
import Sorting from "@/components/sorting/Sorting.vue";

const loading = ref(true)
const games = ref<IGame[]>([])
const sortedColumnName = ref("");
const getAllGames = async () => {
    const res = await callAPI('/dashboard/game/getAll')
    if (res.status == 200) {
        games.value = res.data
        loading.value = false
        console.log("all games", games.value);

    }
}
onMounted(async() => {
    await getAllGames()
})
</script>
<style scoped>
table {
    width: 100%;
    background: #FFFFFF;
    border-collapse: separate;
    border-spacing: 0rem 0.5rem;
}

.p-image img {
    width: 2rem;
    height: 2rem;
    object-fit: cover;
    border-radius: 5px;
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
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

th:nth-child(6),
td:nth-child(6) {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

@media (max-width: 67.5rem) {
    .prize-btn {
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

    .material-symbols-outlined {
        font-size: 1rem;
    }
}
</style>