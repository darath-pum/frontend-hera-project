<template>
    <div class="add-prize flex flex-row">
        <button v-if="itemName == 'Prize pool'" class="secondary-btn bg-transparent"
            @click="showDelete">Delete</button>
        <div v-else class="add-prize flex flex-row cursor-pointer gap-1" @click="isShow = true">
            <span class="material-symbols-outlined">
                delete
            </span>
            <span>Delete</span>

        </div>
        <div :class="isShow ? 'prize-dialog' : 'prize-hide'" @click="isShow = false">
            <div id="dilog-delete" action="" :class="isShow ? 'form-dialog' : 'form-hide'" @click.stop
                class="flex flex-col gap-4">

                <h1>Delete</h1>
                <p class="  ">Do you want to delete this {{ itemName }}?</p>
                <div class="btn-save flex flex-row gap-2 justify-center">
                    <button class="primary-btn" @click="isShow = false">No</button>
                    <button class="secondary-btn" @click="handleDelete">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import Swal from 'sweetalert2'

const props = defineProps([
    "itemName",
    "prizeId",
    "campaignId",
    "userId",
    "gameId",
    "cpId",
    "functionName",
    "getAllUsers",
    "getAllPrizes",
    "getAllCampaigns",
    "selectedItems"
])
const selectedItems = ref(props.selectedItems)
console.log("selectedItems", selectedItems.value);

const itemName = ref(props.itemName)
const prize_id = props.prizeId
const isShow = ref(false)
const alert = ref(false)

const showDelete = () => {
    if (props.selectedItems.length == 0) {

        Swal.fire({
            position: "center",
            icon: "info",
            title: "Not Found",
            text: "Which prize that you want to delete.",
            showConfirmButton: false,
            timer: 4000
        });

    } else {
        isShow.value = true

    }
}




const handleDelete = async () => {
    const options:any = {
        deleteCampaign: `/dashboard/campaign/deleteCampaign/${props.campaignId}`,
        deletePrize: `/dashboard/prize/deletePrize/${props.prizeId}`,
        deleteUser: `/dashboard/user/deleteUserById/${props.userId}`,
        deleteGame: `/dashboard/game/delete/${props.gameId}`,
        deletePrizePool: `/dashboard/prizepool/deletePrizePool/${props.cpId}`
    }
    const option = options[props.functionName];

    if (props.functionName == 'deletePrizePool') {
        const res = await callAPI(option, 'DELETE', { prize_pool_ids: props.selectedItems })
        window.location.reload()


    }
    const res = await callAPI(option, 'DELETE')
    console.log(res);
    if (props.functionName == 'deleteUser') {
        await props.getAllUsers()

    }
    if (props.functionName == 'deletePrize') {
        await props.getAllPrizes()

    }
    if (props.functionName == 'deleteCampaign') {
        await props.getAllCampaigns()

    }

}
</script>

<style scoped>
.prize-hide,
.prize-dialog {
    position: fixed;
    background: #00000080;
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

.prize-hide {
    /* transform: translateY(100px); */
    visibility: hidden;
}

/* .prize-dialog {
    transition: 1s;
    transform: translateY(0px);
}
.prize-dialog{
    transition: 0.1s;
    transform: translateY(0px);
} */

#dilog-delete {
    width: 20rem;
    height: 14rem;
    background: #ffffff;
    padding: 2rem 2rem;
    border-radius: 10px;
    text-align: center;
}

.form-dialog {
    transform: translateY(0px);
    transition: 0.5s;

}

.form-hide {
    transform: translateY(200px);
    transition: 0.5s;

}



#dilog-delete h1 {
    font-size: 24px;
    font-weight: 600;
}

@media (max-width: 67.5rem) {
    #dilog-delete {
    width: 16rem;
    height: 12rem;

}
    .material-symbols-outlined {
        font-size: 1rem;
    }
}
</style>