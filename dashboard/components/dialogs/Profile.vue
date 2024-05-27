<template>
    <div class="flex flex-row">
        <div class="pf-g flex flex-row items-center gap-5">
            <span>Nika</span>
            <div @click="showPopup" class="cursor-pointer">
                <img id="profile-image" src="/profile.png" alt="">
            </div>
            <span @click="showPopup" class="material-symbols-outlined cursor-pointer">
                arrow_drop_down
            </span>
        </div>

        <div v-if="isShow" class="profile-dialog" @click="isShow = false">
            <div @click.stop class="flex pf-popup flex-col gap-2">
                <img src="/profile.png" alt="">

                <h1>Nika</h1>
                <p class="  ">nika@gmail.com</p>
                <div class="btn-save flex flex-col gap-5 justify-center">
                    <button class="primary-btn">Your Account</button>
                    <button class="primary-btn">Logout</button>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { ref } from "vue"


const isShow = ref(false)
const showPopup = () => {
    isShow.value = !isShow.value
}
</script>

<style scoped>
.profile-dialog {
    z-index: 10 !important;
    margin-top: 3.2rem;
    margin-right: 1rem;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    
}



#profile-image,
.pf-popup img {
    width: 50px;
    /* height: 50px; */
    border-radius: 100px;
    background: #838181;
    object-fit: cover;
}

.pf-popup img {
    width: 100px;
    margin: auto;
}

.pf-popup {
    position: absolute;
    width: 20rem;
    /* height: 14rem; */
    margin-top: 22rem;
    margin-left: -20rem;
    z-index: 2 !important;
    background: #ffffff;
    padding: 2rem 2rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    color: black;
}
/* .pf-popup::before{
    position: absolute;
    content: "";
    width: 100vw;
    height: 100vh;
    z-index: -1 !important;
    top: 0;
    left: 0;
    background: #000000c9;
} */

.pf-popup h1 {
    font-size: 1.5rem;
    font-weight: 600;
}
@media (max-width: 67.5rem) {
    #profile-image{
    width: 35px;
}
.pf-g{
    gap: 0.5rem;
}
.pf-g span:nth-child(1){
    font-size: 0.7rem;
}
}
</style>