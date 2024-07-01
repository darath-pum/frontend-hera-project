<template>
    <div class="add-prize">
        <button class="primary-btn w-55" @click="showDlialog">Add prize pool</button>
        <div v-if="isShow" class="dialog" @click="isShow = false">
            <form action="" @click.stop class="flex flex-col gap-4" @submit.prevent="addPrizePool">
                <div class="form-header flex flex-row justify-between ">
                    <span></span>
                    <h1>Add prize pool</h1>
                    <span class="material-symbols-outlined cursor-pointer" @click="isShow = false">
                        cancel
                    </span>
                </div>
                <div class="n-kh">
                    <label for="">Prizes:</label>
                    <select name="" id="" v-model="prize_id">
                        <option value="" disabled class="bg-grey">Select prize</option>
                        <option v-for="(item, index) in prizes" :key="item" :value="item.id"
                            :disabled="arrIdPrize.includes(item.id)">{{ item.name_kh }} ({{
                                item.name_en }})</option>

                    </select>
                    <div class="select-pizes flex flex-row justify-end items-center">
                        <span class="material-symbols-outlined">
                            arrow_drop_down
                        </span>
                    </div>

                </div>
                <div class="n-eg">
                    <label for="">Quantity: <span class="text-red" v-if="qty < 0 || (typeof (qty)== 'string')">must be equal or more than 0 and no
                            text.</span></label>
                    <input type="number" class="outline-none" v-model.number="qty" min="0" required
                        :style="qty < 0  ||  (typeof (qty)== 'string')? 'border: 2px solid red;' : ''">

                </div>

                <div class="btn-save">
                    <button class="primary-btn" @click="addPrizePool">
                        <Loading v-if="loading"></Loading>
                        <span v-else>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router";
import Loading from "~/components/Loading.vue"
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore()
const arrIdPrize:any = ref([])
const loading = ref(false)
const route = useRoute()
const campaign_id:any =(route.query.campaign)
const isShow = ref(false)
const prizes = ref()
const qty = ref()

const prize_id = ref()

const showDlialog = async()=>{
    isShow.value = true
    await getAllPrizesPool();
}
const getAllPrizes = async () => {
    const res = await callAPI('/api/prize/getAllPrizes')
    if (res.status == 200) {
        prizes.value = res.data
    }
}

let isAddCalled = false
const addPrizePool = async () => {
    if (isAddCalled) {
        return;
    }
    isAddCalled = true
    let body = {
        campaign_id: parseInt(campaign_id),
        prize_id: prize_id.value,
        qty: qty.value
    }
    loading.value = true
    const res = await callAPI('/api/prizepool/createPrizePool', 'POST', body);

    if (res.status == 200) {
        loading.value = false
        window.location.reload()
        isShow.value = false
    }else{
        loading.value = false
    }


}

const getAllPrizesPool = async () => { 
    const res = await callAPI(`/api/prizepool/getAllPrizePools?user_id=${authStore.id}&campaign_id=${route.query.campaign}`);
    if (res.status == 200) {
        arrIdPrize.value = []
        for (let index = 0; index < res.data.length; index++) {
            arrIdPrize.value.push(res.data[index].prize_id)
            
        }
    }
};
onMounted(async () => {
    await getAllPrizes()
    // await getAllPrizesPool()
})
</script>

<style scoped>
form {
    width: 30rem;
    height: 24.5rem;
    background: #ffffff;
    padding: 2rem 2rem;
    border-radius: 5px;
}

form h1 {
    font-size: 30px;
    font-weight: 600;
}

.n-kh,
.n-eg {
    display: flex;
    flex-direction: column;
}

input,
select,
.select-pizes {
    border: 1px solid var(--primary-color);
    padding: 0.6rem;
    border-radius: 5px;
    background: #ffffff8a;
    color: #2b2a2a;

}

select {
    z-index: 10;

}

.select-pizes {
    margin-top: -2.7rem;
    border: none;
}

label {
    font-weight: 600;
    color: #666464;
    padding-bottom: 0.2rem;
}


.btn-save {
    width: 100%;
    margin-top: 1rem;
}

.btn-save button {
    width: 100%;
}

@media (max-width: 35.5rem) {
    form h1 {
        font-size: 1.2rem;
        font-weight: 600;
    }

    form {
        width: 100%;
        height: 100vh;
        border-radius: 0;
    }

    input,
    select {
        padding: 0.5rem;
        font-size: 0.7rem;
    }

    label {
        font-size: 0.7rem;
    }

    .select-pizes {
        margin-top: -2.1rem;
        padding: 0.25rem;
    }
}
</style>