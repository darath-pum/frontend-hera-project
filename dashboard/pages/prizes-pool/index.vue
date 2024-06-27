<template>
    <PrizePoolAlert v-if="isGoToCpEdit" :isShow="true" @event-close="handleClose" :saveQty="saveQty"></PrizePoolAlert>
    <div class="container my-5">
        <div>
            <div class="flex flex-row items-center gap-1 cursor-pointer w-6">
                <span class="material-symbols-outlined" @click="$router.back()">
                    keyboard_backspace
                </span>
            </div>
            <h1 class="page-title">Prizes Pool</h1>

        </div>
        <!-- <p class="desc page-description">
            Prize setting involves determining the value or amount of a prize for a competition or event, considering
            factors such as objectives, budget, target audience, and perceived value.
        </p> -->
        <div class="select flex flex-col items-start justify-start">
            <label for="" class="text-start w-full font-semibold">Selete campaign:</label>
            <select class="select-campaign" name="" id="" v-model="campaignId">
                <option value="Select campaign" disabled>Select campaign</option>
                <option v-for="(item, index) in campaigns" :key="item.id" :value="item.id" @click="getAllPrizesPool">
                    <NuxtLink :to="`/prizes-pool?campaign=${item.id}`"> {{ item.title }}</NuxtLink>
                </option>
            </select>
            <div class="select-icon">
                <span class="material-symbols-outlined">
                    arrow_drop_down
                </span>
            </div>
        </div>
        <div class="flex flex-row justify-between mt-10 mb-5 items-center">
            <div class="flex flex-row justify-between gap-2 items-center">
                <button :class="selectedItems.length > 0 ? 'primary-btn cursor-pointer' : 'disable-btn cursor-pointer'"
                    @click="saveQty">Save</button>
                <!-- <button class="secondary-btn" @click="deletePrizePool">Delete</button> -->
                <DeleteItem :itemName="'Prize pool'" :cpId="campaignId" :selectedItems="selectedItems"
                    :functionName="'deletePrizePool'"
                    :class="selectedItems.length > 0 ? 'primary-btn cursor-pointer' : 'disable-btn cursor-pointer'">
                </DeleteItem>
            </div>
            <div class="flex flex-row justify-between gap-2 items-center">
                <button v-if="prizesPool.length > 0" class="primary-btn w-55" @click="goToEdit">Edit campaign</button>
                <AddPrizePool v-if="prizesPool.length > 0"  :getAllPrizesPool="getAllPrizesPool" :arrIdPrize="arrIdPrize"></AddPrizePool>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>
                        <div class="flex flex-row justify-center gap-2">
                            <input id="checkbox" type="checkbox" v-model="allChecked" />
                            <!-- <label for="checkbox">Select All</label> -->
                        </div>
                    </th>
                    <th>Image</th>
                    <!-- <th>Name(Khmer)</th> -->
                    <Sorting :data="prizesPool" :name="'Name(Khmer)'" :columnName="'prize_name_kh'"
                        v-model:sortedColumn="sortedColumnName">
                    </Sorting>
                    <Sorting :data="prizesPool" :name="'Name(English)'" :columnName="'prize_name_en'"
                        v-model:sortedColumn="sortedColumnName">
                    </Sorting>
                    <Sorting :data="prizesPool" :name="'Quantity'" :columnName="'qty'"
                        v-model:sortedColumn="sortedColumnName">
                    </Sorting>
                    <!-- <th>Quantity</th> -->
                    <th>Used</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in prizesPool" :key="index">
                    <td>
                        <div class="flex flex-row justify-center gap-2">
                            <input id="checkbox-{{ index }}" type="checkbox" v-model="selectedItems" :value="item.id"
                                @click="addId(item.id, item.qty)" />
                            <!-- <label :for="'checkbox-' + index"></label> -->
                        </div>
                    </td>
                    <td>
                        <div class="p-image flex flex-row justify-center">
                            <img :src="item.prize_img_url" alt="" />
                        </div>
                    </td>
                    <td>{{ item.prize_name_kh }}</td>
                    <td>{{ item.prize_name_en }}</td>
                    <td>
                        <div class="flex flex-row items-center justify-center gap-2">
                            <!-- <p v-if=" prizePoolId == item.id && (newQty <0  || (typeof (newQty)== 'string'))" class="absolute -mt-20 bg-red p-2">Qty must be equal or more than 0 and no -->
                            <!-- text.</p> -->
                            <input id="input-qty" min="0" class="outline-none" v-model.number="item.qty"
                                @keyup.enter="updateQty(item.id, item.qty)" v-if="prizePoolId == item.id" type="number"
                                :style="item.qty < 0 || (typeof (item.qty) == 'string') ? 'border:1px solid red' : 'border:1px solid green'" />
                            <span v-else>{{ item.qty }}</span>
                            <span v-if="prizePoolId == item.id"
                                class="material-symbols-outlined cursor-pointer bg-[var(--primary-color)] text-[#ffffff] rounded-full"
                                @click="updateQty(item.id, item.qty)">
                                check
                            </span>
                            <!-- <span v-if="prizePoolId == item.id"
                  class="material-symbols-outlined cursor-pointer bg-[var(--primary-color)] text-[#ffffff] rounded-full"
                  @click="showEditQty(0)">
                  close
                </span> -->
                            <span v-else class="material-symbols-outlined cursor-pointer" @click="showEditQty(item.id)">
                                edit
                            </span>
                        </div>
                    </td>
                    <td>{{ item.used_qty }}</td>
                </tr>
            </tbody>
        </table>
        <div class="w-full flex flex-row justify-center">
            <Loading v-if="loading && !prizesPool" :loader="'big'"></Loading>
        </div>
        <EmptyData v-if="!loading && !prizesPool" :contain="'Prize pool'"></EmptyData>
    </div>
</template>

<script setup lang="ts">
import AddPrizePool from "~/components/dialogs/AddPrizePool.vue";
import DeleteItem from "~/components/dialogs/DeleteItem.vue";
import PrizePoolAlert from "~/components/dialogs/PrizePoolAlert.vue";
import EmptyData from "~/components/EmptyData.vue";
import Loading from "~/components/Loading.vue";
import { ref } from 'vue';
import { useAuthStore } from "~/store/auth";
import { useRoute, useRouter } from "vue-router";

const campaigns = ref<ICampaign[]>()
const loading = ref(true)
const sortedColumnName = ref('')
const router = useRouter()
const campaignId = ref(useRoute().query.campaign);
const authStore = useAuthStore();
const prizePoolId = ref(0);
const selectedItems: any = ref([]);
let backUpPrizes: any = []
const prize_pool: any = ref([]);
const prizesPool = ref<IPrizePool[]>([]);
const arrIdPrize: any = ref([])
const isGoToCpEdit = ref(false)

const goToEdit = () => {
    if (prize_pool.value.length == 0) {
        router.push(`/campaigns/edit?campaign=${campaignId.value}`)

    }else{
        isGoToCpEdit.value = true
    }
}

const handleClose = (isGo:boolean)=>{
    isGoToCpEdit.value = isGo
}
const getAllPrizesPool = async () => {
    router.push(`/prizes-pool?campaign=${campaignId.value}`)
    const res = await callAPI(`/dashboard/prizepool/getAllPrizePools?user_id=${authStore.id}&campaign_id=${campaignId.value}`);
    loading.value = false
    if (res.status == 200) {
        prizesPool.value = res.data;
        backUpPrizes = res.data
        selectedItems.value = [];
        let dataPrizePool: any = prizesPool.value;
        for (let index = 0; index < dataPrizePool.length; index++) {

            arrIdPrize.value.push(dataPrizePool[index].prize_id)


        }

    }
};

const updateQty = (id: number, newQty: number) => {
    const updatedPrizesPool = prizesPool.value.map(obj => {
        if (obj.id === id) {
            return { ...obj, qty: newQty };
        }
        return obj;
    });
    const existingItem = prize_pool.value.find((item: any) => item.id === id);

    if (existingItem) {
        existingItem.qty = newQty;
    } else {

        addId(id, newQty)
    }

    prizesPool.value = [...updatedPrizesPool];
    showEditQty(0)

};

const saveQty = async () => {
    let body = {
        prize_pool: prize_pool.value
    }
    const res = await callAPI(`/dashboard/prizepool/updatePrizePool/${campaignId.value}`, 'PUT', body)

    window.location.reload()
    await getAllPrizesPool()
}
const getAllCampaigns = async () => {
    const res = await callAPI(`/dashboard/campaign/getUserCampaigns/${authStore.id}`)

    if (res.status == 200) {
        campaigns.value = res.data

    }
}




onMounted(async () => {
    await getAllCampaigns()
    await getAllPrizesPool();
});

const addId = (id: number, qty: number) => {
    if (!selectedItems.value.includes(id)) {
        selectedItems.value.push(id)
        prize_pool.value.push({ id, qty: qty });
    }
    else {
        const indexOne = selectedItems.value.indexOf(id);
        selectedItems.value.splice(indexOne, 1);
        prize_pool.value.splice(indexOne, 1);
        for (let index = 0; index < backUpPrizes.length; index++) {
            const element = backUpPrizes[index];
            let isFound = <boolean>(false);
            const updatedPrizesPool = prizesPool.value.map(obj => {
                if (obj.id === id) {
                    isFound = true
                    return { ...obj, qty: backUpPrizes[index].qty };
                }
                return obj;
            });
            prizesPool.value = [...updatedPrizesPool]
            if (isFound == true) {
                break;
            }

        }

    }


}



const showEditQty = (id: number) => {
    // isEdit.value = isEditQty;
    prizePoolId.value = id;
};

const allChecked = computed({
    get: () => selectedItems.value.length === prizesPool.value.length && prize_pool.value.length === prizesPool.value.length,
    set: (value) => {
        if (value) {
            selectedItems.value = prizesPool.value.map((item) => item.id);
            prize_pool.value = prizesPool.value.map((item) => ({ id: item.id, qty: item.qty }));
        } else {
            selectedItems.value = [];
            prize_pool.value = [];
        }
    }
});
</script>
<style scoped>
.prize-setting {
    padding: 3rem 0rem !important;
}

table {
    width: 100%;
    background: #FFFFFF;
    border-collapse: separate;
    border-spacing: 0rem 0.5rem;
}

#checkbox {
    width: 1.1rem;
}

.p-image img {
    width: 2rem;
    height: 2rem;
    object-fit: cover;
}

th {
    background: var(--primary-color);
    color: #FFFFFF;
    padding: 0.5rem;
}



td {
    background: #F2F6F6;
    text-align: center;
    padding: 0.5rem;
}

#input-qty {
    border: 1px solid #000000;
    border-radius: 5px;
    padding: 2px 0.5rem;
    width: 50%;
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

th:nth-child(5),
td:nth-child(5) {
    width: 25%;
}

.select-campaign,

.select-icon {
    padding: 0.5rem;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    width: 20rem;
}

label {
    text-align: start;
    font-weight: 600;
    color: #666464;
    padding-bottom: 0.2rem;
}

.select-campaign {
    z-index: 1;
}

.select-icon {
    position: relative;
    width: 20rem;
    height: 2.7rem;
    margin-top: -2.7rem;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    border: none !important;

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