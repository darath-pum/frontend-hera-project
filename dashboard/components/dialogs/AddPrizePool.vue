<template>
    <div class="add-prize">
        <button class="primary-btn" @click="isShow = true">Add prize pool</button>
        <div v-if="isShow" class="prize-dialog" @click="isShow = false">
            <form action="" @click.stop class="flex flex-col gap-4">
                <div class="form-header flex flex-row justify-between ">
                    <span></span>
                    <h1>Add prize pool</h1>
                    <span class="material-symbols-outlined cursor-pointer" @click="isShow = false">
                        cancel
                    </span>
                </div>
                <div class="n-kh">
                    <label for="">Name:</label>
                    <select name="" id="">
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <div class="select-pizes flex flex-row justify-end items-center">
                        <span class="material-symbols-outlined">
                            arrow_drop_down
                        </span>
                    </div>

                </div>
                <div class="n-eg">
                    <label for="">Quantity:</label>
                    <input type="number">

                </div>

                <div class="btn-save">
                    <button class="primary-btn">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"

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
    width: 30rem;
    height: 24rem;
    background: #D9D9D9;
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
select, .select-pizes {
    border: 2px solid #000000;
    padding: 0.5rem;
    border-radius: 10px;
    background: #ffffff8a;
}
select{
    z-index: 10;

}
.select-pizes{
    
    margin-top: -2.7rem;
}

label {
    font-weight: 600;
}

.btn-save {
    width: 100%;
    margin-top: 1rem;
}

.btn-save button {
    width: 100%;
}
</style>