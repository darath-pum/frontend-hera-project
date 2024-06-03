<template>
    <div class="app-bar flex flex-row relative">

        <div class="sidebar" :class="{ 'block w-[14rem]': isSideBarShow, 'hidden md:block': !isSideBarShow }">

            <div class="-z-1 bg-black absolute top-0 -right-[100vw] w-[100vw] h-full" :class="{
                'opacity-30 md:opacity-0': isSideBarShow, 'opacity-0 hidden': !isSideBarShow
            }" @click="toggleSidebar">
            </div>

            <div class="sidebar-title">
                <div class="sidebar-title-logo">
                    <span class="material-symbols-outlined">
                        dashboard
                    </span>
                    <h1 class="text-xl">DASHBOARD</h1>
                </div>
                <p class="text-sm text-white opacity-60">darathpum@gmail.com</p>
            </div>
            <div class="flex flex-col gap-2 p-3">
                <NuxtLink to="/" class="menu-btn">
                    <span class="material-symbols-outlined">
                        home
                    </span>
                    <span class="sidebar-hidden">Home</span>
                </NuxtLink>
                <NuxtLink to="/games" class="menu-btn" v-if="authStore.role == 'customer'">
                    <span class="material-symbols-outlined">
                        sports_esports
                    </span>
                    <span class="sidebar-hidden">Games</span>
                </NuxtLink>
                <NuxtLink to="/users" class="menu-btn" v-if="authStore.role == 'admin'">
                    <span class="material-symbols-outlined">
                        person
                    </span>
                    <span class="sidebar-hidden">Users</span>
                </NuxtLink>
                <div class="dropdown" v-if="authStore.role == 'admin'">
                    <div class="dropdown-btn" @click="showGame">
                        <div class="menu">
                            <span class="material-symbols-outlined">
                                draw
                            </span>
                            <span class="sidebar-hidden">Game admin</span>
                        </div>
                        <span class="material-symbols-outlined" :class="{ 'rotate-180': isGame }">
                            arrow_drop_down
                        </span>
                    </div>
                    <NuxtLink to="/game-admin" v-if="isGame" class="menu-btn dropdown-item"
                        :class="$route.path == '/campaigns/edit' || $route.path == '/campaigns/new' ? 'router-link-active' : ''">
                        <span class="material-symbols-outlined">
                            campaign
                        </span>
                        <span>Games</span>
                    </NuxtLink>
                    <NuxtLink to="/user's-game" v-if="isGame" class="menu-btn dropdown-item">
                        <span class="material-symbols-outlined">
                            rewarded_ads
                        </span>
                        <span>User's game</span>
                    </NuxtLink>
                </div>
                <div class="dropdown" v-if="authStore.role == 'customer'">
                    <div class="dropdown-btn cursor-pointer cursor-pointer flex flex-row justify-between"
                        @click="showLd">
                        <div class="flex flex-row items-center gap-2">
                            <span class="material-symbols-outlined">
                                draw
                            </span>
                            <span class="sidebar-hidden">Lucky draw</span>
                        </div>
                        <span class="material-symbols-outlined" :class="{ 'rotate-180': isLd }">
                            arrow_drop_down
                        </span>
                    </div>
                    <NuxtLink to="/campaigns" v-if="isLd" class="menu-btn dropdown-item"
                        :class="$route.path == '/campaigns/edit' || $route.path == '/campaigns/new' ? 'router-link-active' : ''">
                        <span class="material-symbols-outlined">
                            campaign
                        </span>
                        <span>Campaign</span>
                    </NuxtLink>
                    <NuxtLink to="/prizes" v-if="isLd" class="menu-btn dropdown-item">
                        <span class="material-symbols-outlined">
                            rewarded_ads
                        </span>
                        <span>Prizes</span>
                    </NuxtLink>
                </div>
                <NuxtLink to="/analytics" class="menu-btn">
                    <span class="material-symbols-outlined">
                        trending_up
                    </span>
                    <span class="sidebar-hidden">Analytics</span>
                </NuxtLink>
            </div>
        </div>
        <div>
            <div class="nav-bar">
                <div class="left">
                    <span class="material-symbols-outlined" @click="toggleSidebar">
                        dashboard
                    </span>
                    <h1>Hera Dashboard</h1>
                </div>
                <Profile></Profile>
            </div>

            <div class="main">
                <NuxtPage>
                </NuxtPage>
            </div>



        </div>
    </div>
</template>
<script setup lang="ts">
import Profile from "~/components/dialogs/Profile.vue"
import { ref } from "vue";
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore()

console.log(authStore.role)

const isLd = ref(false);

const isSideBarShow = ref(false);

const toggleSidebar = () => {
    isSideBarShow.value = !isSideBarShow.value
    console.log(isSideBarShow.value)
}

const showLd = () => {
    isLd.value = !isLd.value
}
const isGame = ref(false);

const showGame = () => {
    isGame.value = !isGame.value
}


</script>

<style scoped>
.app-bar {
    width: 100%;
    background: #000;
}

.sidebar {
    @apply fixed h-full w-[14rem] lg:w-[18rem] text-white bg-[--primary-color] z-50;
}

.sidebar-title {
    @apply flex flex-col items-center gap-2 border-b py-5;
}

.sidebar-title-logo {
    @apply flex flex-row justify-center items-center gap-2;
}

.nav-bar {
    @apply bg-white shadow-sm border-b z-40 fixed left-0 md:left-[14rem] lg:left-[18rem] w-full md:w-[calc(100%-14rem)] lg:w-[calc(100%-18rem)] h-[4rem] p-5 md:p-5;
    @apply flex justify-between items-center text-black;

}

.nav-bar h1 {
    @apply font-semibold text-lg md:text-xl lg:text-2xl;
}

.nav-bar .left {
    @apply flex justify-center items-center gap-5;

    span {
        @apply select-none block md:hidden p-2 border rounded-lg bg-slate-100 cursor-pointer hover:bg-slate-200;
    }
}



/* ====================== */

.menu {
    @apply flex flex-row items-center gap-2;
}


.menu-btn,
.main-tool {
    @apply flex flex-row items-center gap-3 rounded-lg py-3 px-2 sm:px-5;

    span {
        @apply select-none truncate;
    }
}

.menu-btn.router-link-active {
    @apply bg-[#e5e9f0] text-[--primary-color] mx-0;
}

.menu-btn .material-symbols-outlined {
    @apply select-none;
}

.dropdown {
    @apply relative;
}

.dropdown .dropdown-btn {
    @apply flex justify-between items-center gap-3 rounded-lg py-3 px-2 sm:px-5 cursor-pointer;

    span {
        @apply select-none;
    }
}

.dropdown .dropdown-item {
    @apply ml-8 px-3;

    span {
        @apply select-none;
    }
}
</style>