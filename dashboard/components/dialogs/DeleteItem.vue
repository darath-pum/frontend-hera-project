<template>
    <div class="add-prize flex flex-row">
        <button v-if="itemName == 'prize pool'" class="secondary-btn" @click="isShow = true">Delete</button>
        <div v-else  class="add-prize flex flex-row cursor-pointer"  @click="isShow = true">
            <span class="material-symbols-outlined">
                delete
            </span>
            <span>Delete</span>

        </div>
        <div v-if="isShow" class="prize-dialog" @click="isShow = false">
            <form action="" @click.stop class="flex flex-col gap-4">

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
</style>