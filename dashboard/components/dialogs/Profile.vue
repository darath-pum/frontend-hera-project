<template>
    <div class="flex flex-row">
        <div @click="showPopup"
            class="pf-g flex flex-row items-center gap-3 cursor-pointer hover:bg-gray-200 py-1 px-2 rounded-md transition-all">
            <span class="hidden md:block">{{ authStore.first_name }}</span>
            <div class="cursor-pointer">
                <img id="profile-image" src="/profile.png" alt="">
            </div>
            <span class="material-symbols-outlined cursor-pointer select-none">
                arrow_drop_down
            </span>
        </div>

        <div v-if="isShow" class="dialog-backdrop" @click="isShow = false" :class="[isShow ? 'active' : '']"></div>
        <div v-if="isShow" class="profile-dialog transition-all" @click="isShow = false"
            :class="[isShow ? 'active' : '']">
            <div @click.stop class="flex pf-popup flex-col gap-2">
                <img src="/profile.png" alt="">

                <h1>{{ authStore.first_name }}</h1>
                <p class="">{{ authStore.email }}</p>
                <div class="btn-save flex flex-col gap-5 justify-center">
                    <button class="primary-btn">Your Account</button>
                    <button class="primary-btn" @click="logout">Logout</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore()

const isShow = ref(false)
const token = useCookie('token')

const showPopup = () => {
    isShow.value = !isShow.value
}

const logout = async () => {
    const res = await callAPI('/dashboard/user/logout', 'POST')
    if (res.status == 200) {
        token.value = ""
        window.location.href = ('/login')
    }

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
    opacity: 0;
    transition: all 4s ease;
}

.profile-dialog.active {
    opacity: 1;
    transition: all 4s ease;
}

.dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #00000000;
    z-index: 9 !important;
    display: none;
}

.dialog-backdrop.active {
    display: block;
}



#profile-image,
.pf-popup img {
    width: 40px;
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
    z-index: 10 !important;
    background: #ffffff;
    padding: 2rem 2rem;
    border-radius: 10px;
    text-align: center;
    color: black;
    @apply shadow-lg border;
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
    #profile-image {
        width: 35px;
    }

    .pf-g {
        gap: 0.5rem;
    }

    .pf-g span:nth-child(1) {
        font-size: 0.7rem;
    }
}
</style>