<template>
    <div class="prize-setting container" @wheel="handleScroll">
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
                <tr v-for="(item, index) in campaigns" :key="item">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.title }}</td>
                    <td>
                        <div class="p-image flex flex-row justify-center">
                            <img :src="item.img_url" alt="">
                        </div>
                    </td>
                    <td>{{ item.start_date.substring(0, 10) }}</td>
                    <td>{{ item.end_date.substring(0, 10) }}</td>
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
                                @click="showBtnAction(item.id)">
                                more_horiz
                            </span>
                            <div id="action-menu" v-if="isBtn && campaignId == item.id" @click.stop>
                                <NuxtLink :to='`/campaigns/edit?campaign=${item.id}`'>
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
import { ref, onMounted } from "vue"
import AddPrize from "~/components/dialogs/AddPrize.vue"
import DeleteItem from "~/components/dialogs/DeleteItem.vue"
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore()
const campaigns = ref()
const isBtn = ref(false)
const campaignId = ref()
const showBtnAction = (id: any) => {
    console.log(id);

    campaignId.value = id
    isBtn.value = !isBtn.value
}
const getAllCampaigns = async () => {
    const res = await callAPI(`/dashboard/campaign/getUserCampaigns/${authStore.id}`)
    if (res.status == 200) {
        campaigns.value = res.data
    }
}

const handleScroll = (event: any) => {
    // Check the direction of the scroll
    if (event.wheelDelta < 0) {
        // Scrolling down
        isBtn.value = false
    } else {
        // Scrolling up
        isBtn.value = false
    }

    // Prevent the default scroll behavior
    event.preventDefault();
};

onMounted(() => {
    // Attach the event listener to the root element
    document.addEventListener('wheel', handleScroll);
    getAllCampaigns()
});
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

th:nth-child(6),
td:nth-child(6) {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
}

@media (max-width: 67.5rem) {
    .campaign-btn {
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