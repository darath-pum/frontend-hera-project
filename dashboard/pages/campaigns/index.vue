<template>
    <div class="prize-setting container" @click="showBtnAction(0)" @click.stop>
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
            <tr>
                <th>No.</th>
                <th>Image</th>
                <Sorting :data="campaigns" :name="'Title'" :columnName="'title'"
                    v-model:sortedColumn="sortedColumnName">
                </Sorting>
                <Sorting :data="campaigns" :name="'Start Date'" :columnName="'start_date'"
                    v-model:sortedColumn="sortedColumnName">
                </Sorting>
                <Sorting :data="campaigns" :name="'End Date'" :columnName="'end_date'"
                    v-model:sortedColumn="sortedColumnName">
                </Sorting>

                <th>Action</th>
            </tr>

            <tr v-for="(item, index) in campaigns" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>
                    <div class="p-image flex flex-row justify-center">
                        <img :src="item.img_url || campaingDefault" alt="">
                    </div>
                </td>
                <td>{{ item.title }}</td>
                <td>{{ item.start_date.substring(0, 10) }}</td>
                <td>{{ item.end_date.substring(0, 10) }}</td>
                <td class="flex flex-row justify-center items-center gap-5">
                    <a :href="`/luckydraw?campaign_id=${item.id}`" class="flex flex-row justify-center gap-5">
                        <div class="flex flex-row items-center gap-1 cursor-pointer">
                            <span class="material-symbols-outlined">
                                play_circle
                            </span>
                            <span>Play</span>
                        </div>

                    </a>
                    <div id="more-action">
                        <span class="material-symbols-outlined cursor-pointer select-none hover:text-red"
                            @click="showBtnAction(item.id)" @click.stop>
                            more_horiz
                        </span>
                        <div id="action-menu" v-if="isBtn && campaignId == item.id" @click.stop>
                            <NuxtLink :to='`/campaigns/edit?campaign=${item.id}`'
                                class="w-full p-1 hover:bg-[#686D76] rounded hover:text-white">
                                <div class="cursor-pointer">

                                    <span class="material-symbols-outlined cursor-pointer">
                                        edit
                                    </span>
                                    <span>Edit</span>
                                </div>
                            </NuxtLink>
                            <NuxtLink :to='`/campaigns/prize-pool?campaign=${item.id}`'
                                class="w-full p-1  hover:bg-[#686D76] rounded hover:text-white">
                                <div class="cursor-pointer">

                                    <span class="material-symbols-outlined">
                                        rewarded_ads
                                    </span>
                                    <span>Prize pool</span>
                                </div>

                            </NuxtLink>

                            <DeleteItem :itemName="'Campaign'" :campaignId="item.id"
                                class="w-full p-1  hover:bg-[#686D76] rounded hover:text-white"
                                :functionName="'deleteCampaign'" :getAllCampaigns="getAllCampaigns"></DeleteItem>


                        </div>

                    </div>

                </td>
            </tr>
            <!-- </tbody> -->
        </table>
        <div class="w-full flex flex-row justify-center">
            <Loading v-if="loading && campaigns.length == 0" :loader="'big'"></Loading>
        </div>
        <EmptyData v-if="!loading && campaigns.length == 0" :contain="'Campaign'"></EmptyData>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import DeleteItem from "~/components/dialogs/DeleteItem.vue"
import EmptyData from "~/components/EmptyData.vue"
import Loading from "~/components/Loading.vue"
import { useAuthStore } from '~/store/auth';

const loading = ref(true)
const authStore = useAuthStore()
const sortedColumnName = ref("")
const campaigns = ref<ICampaign[]>([])
const isBtn = ref(false)
const campaignId = ref()
const showBtnAction = (id: any) => {
    console.log(id);
    campaignId.value = id
    isBtn.value = !isBtn.value
}

const getAllCampaigns = async () => {
    const res = await callAPI(`/dashboard/campaign/getUserCampaigns/${authStore.id}`)
    console.log('compaigns', res);

    if (res.status == 200) {
        campaigns.value = res.data
        campaignId.value = 0
        isBtn.value = false
        loading.value = false
    }
}


onMounted(async () => {

    await getAllCampaigns()
});
</script>
<style scoped>
table {
    width: 100%;
    background: #FFFFFF;
    /* background: #000; */
    border-collapse: separate;
    border-spacing: 0rem 0.5rem;
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
    /* border-bottom: 5px solid #FFFFFF; */
    /* border-top: 5px solid #FFFFFF; */
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

#action-menu {
    margin-left: -6rem;
    position: absolute;
    background: #FFFFFF;
    height: 8.5rem;
    width: 9rem;
    gap: 0.4rem;
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
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

@media (max-width: 67.5rem) {
    #action-menu {
        width: 7.5rem;
        height: 8rem;
    }

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