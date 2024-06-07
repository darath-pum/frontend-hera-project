<template>
    <div class="add-prize flex flex-row">
        <button v-if="itemName == 'prize pool'" class="secondary-btn" @click="isShow = true">Delete</button>
        <div v-else class="add-prize flex flex-row cursor-pointer" @click="isShow = true">
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

const props = defineProps(["itemName", "prizeId", "campaignId", "userId", "gameId" , "functionName", "getAllUsers"])
const itemName = ref(props.itemName)
const prize_id = props.prizeId
const isShow = ref(false)

const handleDelete = async () => {
    const options = {
        deleteCampaign: `/dashboard/campaign/deleteCampaign/${props.campaignId}`,
        deletePrize: `/dashboard/prize/deletePrize/${props.prizeId}`,
        deleteUser: `/dashboard/user/deleteUserById/${props.userId}`,
        deleteGame: `/dashboard/game/delete/${props.gameId}`
    }
    const option = options[props.functionName];


    const res = await callAPI(option, 'DELETE')
    console.log(res)
    if (props.functionName == 'deleteUser') {
        await props.getAllUsers()

    } else {
        window.location.reload()

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
    .material-symbols-outlined {
        font-size: 1rem;
    }
}
</style>