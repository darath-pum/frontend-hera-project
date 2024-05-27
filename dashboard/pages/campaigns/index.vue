<template>
    <div class="prize-setting page-bg">
        <h1 class="page-title">Campaigns Setting</h1>
        <p class="desc page-description">
            Campaign management involves strategic planning, execution, and analysis of marketing campaigns to achieve
            specific objectives, targeting the right audience, and optimizing performance for desired results.
        </p>
        <div class="flex flex-row justify-end mt-15 items-center">
            <div class="campaign-btn">
                <NuxtLink to="/campaigns/new">
                    <button class="primary-btn">Add campaign</button>
                </NuxtLink>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>title</th>
                    <th>Image</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in 5">
                    <td>{{ i }}</td>
                    <td>Sting</td>
                    <td>
                        <div class="p-image flex flex-row justify-center">
                            <img src="/sting-event.jpg" alt="">
                        </div>
                    </td>
                    <td>2024-06-24</td>
                    <td>2024-06-30</td>
                    <td class="flex flex-row justify-center items-center gap-5">
                        <div class="flex flex-row justify-center gap-5">
                            <div class="flex flex-row items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined">
                                    play_circle
                                </span>
                                <span>Play</span>
                            </div>
                            <!-- <div class="flex flex-row items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined">
                                    delete
                                </span>
                                <span>Delete</span>
                            </div> -->
                        </div>
                        <div id="more-action">
                            <span class="material-symbols-outlined cursor-pointer select-none hover:text-red"
                                @click="showBtnAction(i)">
                                more_horiz
                            </span>
                            <div id="action-menu" v-if="isBtn && index == i" @click.stop>
                                <NuxtLink to="/campaigns/edit">
                                <div class="cursor-pointer">

                                        <span class="material-symbols-outlined cursor-pointer">
                                            edit
                                        </span>
                                        <span>edit</span>
                                    </div>
                                </NuxtLink>
                                <!-- <div class="cursor-pointer">
                                    <span class="material-symbols-outlined cursor-pointer">
                                        delete
                                    </span>
                                    <span>delete</span>

                                </div> -->
                            <DeleteItem :itemName="'Campaign'"></DeleteItem>


                            </div>

                        </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import AddPrize from "~/components/dialogs/AddPrize.vue"
import DeleteItem from "~/components/dialogs/DeleteItem.vue"

const isBtn = ref(false)
const index = ref()
const showBtnAction = (idx) => {
    index.value = idx
    isBtn.value = !isBtn.value
}
</script>
<style scoped>
table {
    width: 100%;
    background: #FFFFFF;
}

.p-image img {
    width: 3rem;
    height: 2rem;
    object-fit: cover;
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

#action-menu {

    position: absolute;
    background: #FFFFFF;
    height: 6rem;
    width: 8rem;
    gap: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

#action-menu div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2rem;
}

#more-action:hover #action-menu {}

th:nth-child(6),
td:nth-child(6) {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
}
@media (max-width: 67.5rem) {
    .campaign-btn{
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