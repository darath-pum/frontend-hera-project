<template>
    <div class="flex flex-row">
        <div @click="showPopup"
            class="pf-g flex flex-row items-center gap-3 cursor-pointer hover:bg-gray-200 py-1 px-2 rounded-md transition-all">
            <span class="hidden md:block">{{ authStore.first_name }}</span>
            <div class="cursor-pointer">
                <img id="profile-image" :src="!pf_image ? profileDefault : pf_image" alt="">
            </div>
            <span class="material-symbols-outlined cursor-pointer select-none">
                arrow_drop_down
            </span>
        </div>

        <div v-if="isShow" class="dialog-backdrop" @click="isShow = false" :class="[isShow ? 'active' : '']"></div>
        <div v-if="isShow" class="profile-dialog transition-all" @click="isShow = false"
            :class="[isShow ? 'active' : '']">
            <div class="flex pf-popup flex-col gap-2">
                <img :src="!pf_image ? profileDefault : pf_image" alt="">

                <h1>{{ authStore.first_name }}</h1>
                <p class="">{{ authStore.email }}</p>
                <div class="btn-save flex flex-col gap-5 justify-center">
                    <NuxtLink to="/my_account">
                        <button class="primary-btn w-full">Your Account</button>

                    </NuxtLink>
                    <button class="primary-btn" @click="logout">Logout</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore()
const pf_image = ref('')
onMounted(() => {
    pf_image.value = authStore.pf_img_url
})
const isShow = ref(false)
const token = useCookie('token')

const showPopup = () => {
    isShow.value = !isShow.value
}

function removeItem(item: string) {
    if (process.client) {
        localStorage.removeItem(item)
        return true
    } else {
        return false
    }
}

const logout = async () => {
    const res = await callAPI('/api/user/logout', 'POST')


    removeItem('token')

    token.value = ''
    window.location.href = ('/login')

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
    height: 40px;
    border-radius: 100px;
    background: #838181;
    object-fit: cover;
}

.pf-popup img {
    width: 5rem;
    height: 5rem;
    margin: auto;
    object-fit: cover;
}

.btn-save a {
    width: 100%;
    margin: 0;

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
    border-radius: 5px;
    text-align: center;
    color: black;
    @apply shadow-lg border;
}


.pf-popup h1 {
    font-size: 1.5rem;
    font-weight: 600;
}

@media (max-width: 67.5rem) {
    #profile-image {
        width: 35px;
        height: 35px;
    }

    .pf-g {
        gap: 0.5rem;
    }

    .pf-g span:nth-child(1) {
        font-size: 0.7rem;
    }
}
</style>