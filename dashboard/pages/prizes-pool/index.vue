<template>
    <div class="prize-setting">
        <h1>Prizes Pool Setting</h1>
        <p class="desc">
            Prize setting involves determining the value or amount of a prize for a competition or event, considering
            factors such as objectives, budget, target audience, and perceived value.
        </p>
        <div class="flex flex-row justify-between mt-15 items-center">
            <h2>Prizes pool management</h2>
            <div class="flex flex-row justify-between gap-2 items-center">
                <button class="primary-btn"> Save</button>
                <DeleteItem :itemName="'prize pool'"></DeleteItem>
                <AddPrizePool></AddPrizePool>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>
                        <div class="flex flex-row justify-center gap-2">
                            <span>No.</span>
                            <input id="checkbox" type="checkbox">
                        </div>
                    </th>
                    <th>Name(Khmer)</th>
                    <th>Name(English)</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Used</th>
            
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in 10">
                    <td>
                        <div class="flex flex-row justify-center gap-2">
                            <span>{{ i }}</span>
                            <input id="checkbox" type="checkbox">
                        </div>
                    </td>
                    <td>អាវយឺត</td>
                    <td>T-shirt</td>
                    <td>
                        <div class="p-image flex flex-row justify-center">
                            <img src="/t-shirt.png" alt="">
                        </div>
                    </td>
                    <td>
                        <div class="flex flex-row items-center justify-center gap-2">
                            
                            <input id="input-qty" v-if="isEdit && index == i" type="number">
                            <span v-else>100</span>
                            <span v-if="isEdit && index == i" class="material-symbols-outlined cursor-pointer" @click="showEditQty(false, i)">
                                close
                            </span>
                            <span v-else class="material-symbols-outlined cursor-pointer" @click="showEditQty(true,i)">
                                edit
                            </span>
                        </div>
                    </td>
                    <td>50</td>
                    <!-- <td>
                        <div class="flex flex-row justify-center gap-5">
                            <div class="flex flex-row items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                                <span>Edite</span>
                            </div>
                            <div class="flex flex-row items-center gap-1 cursor-pointer">
                               
                                <span>Delete</span>
                            </div>
                        </div>
                    </td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import AddPrizePool from "~/components/dialogs/AddPrizePool.vue"
import DeleteItem from "~/components/dialogs/DeleteItem.vue"

import {ref} from "vue"

const isEdit = ref(false)
const index = ref()
const showEditQty = (isEditQty:bool, item:number)=>{
    isEdit.value = isEditQty
    index.value = item

}
</script>
<style scoped>
.prize-setting {
    background: #FFFFFF;
    width: 100%;
    color: #000000;
    padding: 3rem 2rem;
    border-radius: 10px;
}

.prize-setting h1 {
    color: #000000;
    font-weight: 600;
    font-size: 24px;
    text-align: center;
    margin-bottom: 2rem;
}

.prize-setting .desc {
    width: 50%;
    margin: auto;
}

.prize-setting .desc,
h2 {
    color: #000000;
    font-size: 18px;
    text-align: center;
}

table {
    width: 100%;
    background: #FFFFFF;
}
#checkbox{
    width: 1.1rem;
}

.p-image img {
    width: 2rem;
    height: 2rem;
}

th {
    background: #000;
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
#input-qty{
    border: 2px solid #000000;
    border-radius: 10px;
    padding: 2px 0.5rem;
    width: 30%;
}
th:nth-child(1),
td:nth-child(1) {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
}

th:nth-child(7),
td:nth-child(7) {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
}

th:nth-child(5),
td:nth-child(5) {
    width: 25%;
}
</style>