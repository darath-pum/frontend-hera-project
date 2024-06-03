<template>
    <div class="add-prize">
        <button class="primary-btn" @click="isShow = true">Add user</button>
        <div v-if="isShow" class="prize-dialog" @click="isShow = false">
            <form action="" @click.stop class="flex flex-col gap-4">
                <div class="form-header flex flex-row justify-between ">
                    <span></span>
                    <h1>Add user</h1>
                    <span class="material-symbols-outlined cursor-pointer" @click="isShow = false">
                        cancel
                    </span>
                </div>
                <div class="username flex flex-row gap-5">
                    <div>
                        <label for="">First Name:</label>
                        <input type="text">
                    </div>
                    <div>
                        <label for="">Last Name:</label>
                        <input type="text">
                        
                    </div>
                </div>
                <div class="email">
                    <label for="">Email:</label>
                    <input type="email">
                </div>
                
                <div class="btn-save">
                    <button class="primary-btn">Next</button>
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
    z-index: 100 !important;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

form {
    width: 35rem;
    height: 24rem;
    background: #D9D9D9;
    padding: 2rem 2rem;
    border-radius: 10px;
}

form h1 {
    font-size: 30px;
    font-weight: 600;
}

.username div:nth-child(1), .username div:nth-child(2){
    width: 100%;
}
.username div:nth-child(1), .username div:nth-child(2),

.email {
    display: flex;
    flex-direction: column;
}
.username{
    width: 100%;
}

input {
    border: 2px solid #000000;
    padding: 0.5rem;
    border-radius: 10px;
    background: #ffffff8a;
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