<template>
    <div class="add-prize flex flex-row"    >
        <button v-if="itemName == 'prize pool'" class="secondary-btn" @click="isShow = true">Delete</button>
        <div v-else  class="add-prize flex flex-row cursor-pointer"  @click="isShow = true">
            <span class="material-symbols-outlined">
                delete
            </span>
            <span>Delete</span>

        </div>
        <div :class="isShow?'prize-dialog':'prize-hide'"  @click="isShow = false">
            <form action="" :class="isShow?'form-dialog':'form-hide'" @click.stop class="flex flex-col gap-4">

                <h1>Delete</h1>
                <p class="  ">Do you want to delete this {{itemName}}?</p>
                <div class="btn-save flex flex-row gap-2 justify-center">
                    <button class="primary-btn">No</button>
                    <button class="secondary-btn">Yes</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"

const props = defineProps(["itemName"])
const itemName = ref(props.itemName)

const isShow = ref(false)
</script>

<style scoped>

.prize-hide, .prize-dialog {
    position: fixed;
    background: #00000059;
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
    transform: translateY(100px);
    visibility: hidden;
}
.prize-dialog {
    transition: 1s;
    transform: translateY(0px);
}
.prize-dialog{
    transition: 0.1s;
    transform: translateY(0px);
}

form {
    width: 20rem;
    height: 14rem;
    background: #D9D9D9;
    padding: 2rem 2rem;
    border-radius: 10px;
    text-align: center;
}



form h1 {
    font-size: 24px;
    font-weight: 600;
}
@media (max-width: 67.5rem) {
    .material-symbols-outlined{
        font-size: 1rem;
    }
}
</style>