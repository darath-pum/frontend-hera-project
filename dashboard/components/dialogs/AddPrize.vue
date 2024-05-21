<template>
    <div class="add-prize">
        <button class="primary-btn" @click="isShow = true">Add prize</button>
        <div v-if="isShow" class="prize-dialog" @click="isShow = false">
            <form action="" @click.stop class="flex flex-col gap-4">
                <div class="form-header flex flex-row justify-between ">
                    <span></span>
                    <h1>Add prize</h1>
                    <span class="material-symbols-outlined cursor-pointer" @click="isShow = false">
                        cancel
                    </span>
                </div>
                <div class="n-kh">
                    <label for="">Name(Khmer):</label>
                    <input type="text">
                </div>
                <div class="n-eg">
                    <label for="">Name(English):</label>
                    <input type="text">

                </div>
                <div class="image">
                    <label for="">Image:</label>
                    <input type="file">
                    <div class="select-image flex flex-row justify-center items-center">
                        <img src="/image-icon.png" alt="">
                        <span class="material-symbols-outlined">
                            add_circle
                        </span>
                    </div>
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
    height: 30rem;
    background: #D9D9D9;
    padding: 2rem 2rem;
    border-radius: 10px;
}

form h1 {
    font-size: 30px;
    font-weight: 600;
}

.n-kh,
.n-eg,
.image {
    display: flex;
    flex-direction: column;
}

input, .select-image {
    border: 2px solid #000000;
    padding: 0.5rem;
    border-radius: 10px;
    background: #ffffff8a;
}

label {
    font-weight: 600;
}

.image input {
    height: 5rem;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
}
.select-image{
    height: 5rem;
    margin-top: -5rem;
    
}
.select-image img{
    width: 4rem;
    height: 4rem;
    position: absolute;
}
.select-image span{
    color: #c09898;
    position: absolute;
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