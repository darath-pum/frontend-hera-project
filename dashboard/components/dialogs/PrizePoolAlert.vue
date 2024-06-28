<template>
    <!-- <div class="add-prize flex flex-row"> -->


    <div :class="isShow ==true ? 'prize-dialog' : 'prize-hide'" @click="showDlialog">
        <div id="dilog-delete" action="" :class="isShow ==true ? 'form-dialog  flex flex-col justify-center gap-6' : 'form-hide  flex flex-col justify-center gap-6'"  @click.stop>
            <span class="material-symbols-outlined">
                change_circle
            </span>
            <p class="text-[#000000]">Save your changes to this prize pool?</p>
            <div class="btn-save flex flex-row gap-3 items-center justify-center">
                <NuxtLink class="w-25"  :to="`/campaigns/edit?campaign=${$route.query.campaign}`" @click="saveQty">
                    <button class="primary-btn w-full">Save</button>
                </NuxtLink>
                <NuxtLink class="w-25" :to="`/campaigns/edit?campaign=${$route.query.campaign}`" >
                    <button class="secondary-btn w-full" @click="showDlialog">Don't save</button>
                </NuxtLink>
                <button class="secondary-btn w-25" @click="showDlialog">Cancel</button>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>
<script setup lang="ts">
import { ref } from "vue"

const props = defineProps(["isShow", "saveQty"])

const saveQty = ref(props.saveQty)
const emits = defineEmits(["event-close"])

const isShow = ref(props.isShow)
const showDlialog = () => {
    isShow.value = !isShow.value
    handleClose(isShow.value)
}
const handleClose = (isGo: boolean) => {
    emits("event-close", isGo)
}





</script>

<style scoped>
.prize-hide,
.prize-dialog {
    position: fixed;
    background: #00000080;
    width: 100%;
    height: 100%;
    z-index: 100 !important;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.prize-hide {
    visibility: hidden;
}



#dilog-delete {
    width: 25rem;
    height: 17rem;
    background: #ffffff;
    padding: 1rem;
    border-radius: 5px;
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
button {
    font-size: 0.8rem;
    padding: 0.5rem;

}
.material-symbols-outlined{
    font-size: 5rem;
    color: red;
}


@media (max-width: 67.5rem) {
    #dilog-delete, .form-dialog {
        width: 16rem;
        height: 13rem;
        padding: 1rem;
        gap: 2rem !important;

    }
    #dilog-delete p{
        font-size: 0.7rem;
    }

    .material-symbols-outlined {
        font-size: 3rem;
    }
    button {
    font-size: 0.6rem;
    padding: 0.5rem;

}
}
</style>