<template>
    <div class="add-prize">
        <button class="primary-btn" @click="isShow = true">Add prize pool</button>
        <div v-if="isShow" class="prize-dialog" @click="isShow = false">
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
                        <option value="" disabled>Select prize</option>
                        <option v-for="(item, index) in prizes" :key="item" :value="item.id">{{ item.name_kh }} ({{
                            item.name_en }})</option>

                    </select>
                    <div class="select-pizes flex flex-row justify-end items-center">
                        <span class="material-symbols-outlined">
                            arrow_drop_down
                        </span>
                    </div>

                </div>
                <div class="n-eg">
                    <label for="">Quantity:</label>
                    <input type="number" v-model="qty">

                </div>

                <div class="btn-save">
                    <button class="primary-btn" @click="addPrizePool">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router";
const campaign_id = ref(useRoute().query.campaign)
const isShow = ref(false)
const prizes = ref()
const qty = ref()
const listAllPPool = ref([])
const prize_id = ref()
const image = ref()

const props = defineProps(["getAllPrizesPool"])
const getAllPrizes = async () => {
    const res = await callAPI('/dashboard/prize/getAllPrizes')
    if (res.status == 200) {
        prizes.value = res.data
    }
}


let isAddCalled = false
const addPrizePool = async() => {
    if (isAddCalled) {
        return;
    }
    // listAllPPool.value.push({
    //     prize_id: prize_id.value,
    //     name_kh: name_kh.value,
    //     name_en: name_en.value,
    //     image: image.value,
    //     qty: qty.value
    // })
    // // sendData(listAllPPool.value);
    // console.log(listAllPPool.value);
    isAddCalled = true
    let body = {
        campaign_id: parseInt(campaign_id.value),
        prize_id: prize_id.value,
        qty: qty.value
    }
    console.log(body);

    const res = await callAPI('/dashboard/prizepool/createPrizePool', 'POST', body);
    console.log(res);
    window.location.reload()
    isShow.value = false


}


onMounted(async () => {
    await getAllPrizes()
})
</script>

<style scoped>
.prize-dialog {
    position: fixed;
    background: #0000005e;
    width: 100%;
    height: 100%;
    z-index: 10 !important;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

form {
    width: 30rem;
    height: 26rem;
    background: #ffffff;
    padding: 2rem 2rem;
    border-radius: 10px;
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
    border: 1px solid #000000;
    padding: 1rem 0.5rem;
    border-radius: 10px;
    background: #ffffff8a;
    color: #666464;

}

select {
    z-index: 10;

}

.select-pizes {

    margin-top: -3.6rem;
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
</style>