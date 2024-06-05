<template>
    <div class="container">
        <div class="card-container">
            <div class="card-item flex flex-col justify-between">
                <div class="title-image flex flex-row justify-between">
                    <div class="flex flex-col gap-2">
                        <span class="card-title">User Total:</span>
                        <h2>{{ userTotal }}</h2>
                    </div>
                    <div>
                        <img src="/active-user.png" alt="">
                    </div>
                </div>
                <div class="desc flex flex-row items-center">
                    <span class="material-symbols-outlined text-green">
                        north
                    </span>
                    <p><span class="text-green">%{{ userPercentage }}</span> of new users </p>
                </div>
            </div>
            <div class="card-item item2 flex flex-col justify-between">
                <div class="title-image flex flex-row justify-between">
                    <div class="flex flex-col gap-2">
                        <span class="card-title">Game Total:</span>
                        <h2>{{ gameTotal }}</h2>
                    </div>
                    <div>
                        <img src="/active-user.png" alt="">
                    </div>
                </div>
                <div class="desc flex flex-row items-center">
                    <span class="material-symbols-outlined text-green">
                        north
                    </span>
                    <p><span class="text-green">%{{ gamePercentage }}</span> of new games</p>
                </div>
            </div>
            <div class="card-item item3 flex flex-col justify-between">
                <div class="title-image flex flex-row justify-between">
                    <div class="flex flex-col gap-2">
                        <span class="card-title">Active users</span>
                        <h2>1.999k</h2>
                    </div>
                    <div>
                        <img src="/active-user.png" alt="">
                    </div>
                </div>
                <div class="desc flex flex-row items-center">
                    <span class="material-symbols-outlined text-green">
                        north
                    </span>
                    <p><span class="text-green">%50</span> of user increase</p>
                </div>
            </div>
            <div class="card-item item4 flex flex-col justify-between">
                <div class="title-image flex flex-row justify-between">
                    <div class="flex flex-col gap-2">
                        <span class="card-title">Active users</span>
                        <h2>1.999k</h2>
                    </div>
                    <div>
                        <img src="/active-user.png" alt="">
                    </div>
                </div>
                <div class="desc flex flex-row items-center">
                    <span class="material-symbols-outlined text-green">
                        north
                    </span>
                    <p><span class="text-green">%50</span> of user increase</p>
                </div>
            </div>
        </div>
        <div class="chart-container">
            <AdminDAU />
            <AdminMAU />
        </div>
    </div>
</template>
<script setup lang="ts">
import AdminDAU from "~/components/charts/AdminDAU.vue";
import AdminMAU from "~/components/charts/AdminMAU.vue";
import { onMounted } from "vue";
const gamePercentage = ref();
const  gameTotal = ref();
const userPercentage = ref();
const userTotal = ref();
const getHomeInfo = async() => {
    const response = await callAPI("/dashboard/analytics/admin/getDashboardSummary");
    gamePercentage.value = response.data.games.percentage;
    gameTotal.value = response.data.games.total;
    userPercentage.value = response.data.users.percentage;
    userTotal.value = response.data.users.total;
}
onMounted(getHomeInfo);
</script>

<style scoped>
.card-container {
    @apply grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-3 lg:gap-5;
}

/*  */
.chart-container {
    @apply grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-3 lg:gap-5;
}

.card-item {
    @apply p-3 bg-white rounded-lg border shadow-sm space-y-2 border-l-4 border-l-blue-500;
}

.item2 {
    @apply border-l-green-500;
}

.item3 {
    @apply border-l-pink-500;
}

.item4 {
    @apply border-l-orange-500;
}

.title-image {

    /* border-left: 0.2rem solid rgb(58, 127, 255); */
    @apply p-2 sm:border-l-2 border-blue-500;

    span {
        @apply text-gray-500;
    }


}

.title-image h2 {
    font-size: 1rem;
    font-weight: 600;
}

.title-image img {
    @apply hidden sm:flex;
    @apply w-12 h-12;
}

.desc {
    @apply text-gray-700 text-sm;
}
</style>