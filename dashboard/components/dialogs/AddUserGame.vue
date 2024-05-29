<template>
    <div class="add-prize">
        <button class="primary-btn" @click="isShow = true">Add user's game</button>
        <div v-if="isShow" class="prize-dialog" @click="isShow = false">
            <form action="" @click.stop class="flex flex-col gap-4">
                <div class="form-header flex flex-row justify-between ">
                    <span></span>
                    <h1>Add user's game</h1>
                    <span class="material-symbols-outlined cursor-pointer" @click="isShow = false">
                        cancel
                    </span>
                </div>
                <!-- <div class="flex flex-row justify-end items-center gap-5"> -->
                    <div>
                        <label for="">User:</label>
                        <div class="select flex flex-col items-center justify-center">
                            <select class="select-game" name="" id="">
                                <option value="">Select user</option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <div class="select-icon">
                                <span class="material-symbols-outlined">
                                    arrow_drop_down
                                </span>
                            </div>
    
                        </div>
                    
                    </div>
                    <div>
                        <label for="">Game:</label>
                        <div class="select flex flex-col items-center justify-center">
                            <select class="select-game" name="" id="">
                                <option value="">Select game</option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <div class="select-icon">
                                <span class="material-symbols-outlined">
                                    arrow_drop_down
                                </span>
                            </div>
    
                        </div>
                    
                    </div>

                <!-- </div> -->
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
    height: 23rem;
    background: #D9D9D9;
    padding: 2rem 2rem;
    border-radius: 10px;
}

form h1 {
    font-size: 30px;
    font-weight: 600;
}

.select-game,

.select-icon {
    padding: 0.5rem;
    border: 2px solid #000000;
    border-radius: 10px;
    width: 100%;
}


.select-game {
    z-index: 1;
}

.select-icon {
    width: 100%;
    position: relative;
    height: 2.7rem;
    margin-top: -2.7rem;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    border: none !important;

}

.btn-save {
    width: 100%;
    margin-top: 1rem;
}
label{
    font-weight: 600;
}
.btn-save button {
    width: 100%;
}
</style>