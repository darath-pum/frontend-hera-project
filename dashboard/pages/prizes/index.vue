<template>
    <div class="prize-setting container">
        <h1 class="page-title">Prizes Setting</h1>
        <p class="desc page-description">
            Prize setting involves determining the value or amount of a prize for a competition or event, considering
            factors such as objectives, budget, target audience, and perceived value.
        </p>
        <div class="flex flex-row justify-end mt-15 items-center">
            <div class="prize-btn">
                
                <AddPrize></AddPrize>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name(Khmer)</th>
                    <th>Name(English)</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in prizes" :key="item">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <div class="p-image flex flex-row justify-center">
                            <img :src="item.image" alt="">
                        </div>
                    </td>
                    <td>{{ item.name_kh }}</td>
                    <td>{{ item.name_en }}</td>
                    <td>
                        <div class="flex flex-row justify-center gap-5">
                            
                            <!-- <div class="flex flex-row items-center gap-1 cursor-pointer" @click="showEdit">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                                <span>Edit</span>
                            </div> -->
                            <EditPrize :id="item.id"></EditPrize>

                            <DeleteItem :itemName="'Prize'" :prizeId="item.id" :functionName="'deletePrize'"></DeleteItem>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import AddPrize from "~/components/dialogs/AddPrize.vue"
import EditPrize from "~/components/dialogs/EditPrize.vue"
import DeleteItem from "~/components/dialogs/DeleteItem.vue"
import { ref, onMounted } from "vue"

const isEditPrize = ref(false);
const showEdit = () =>{
    isEditPrize.value = true
}


const prizes = ref()
const getAllPrizes = async () => {
    const res = await callAPI('/dashboard/prize/getAllPrizes')
    if (res.status == 200) {
        prizes.value = res.data
    }
}
onMounted( async() => {
    await getAllPrizes()
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

th:nth-child(5),
td:nth-child(5) {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
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