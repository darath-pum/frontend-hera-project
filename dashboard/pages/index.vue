<template>
    <div class="container">
        <div class="card-container">
            <div class="card-item flex flex-col justify-between">
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
            <div class="card-item item2 flex flex-col justify-between">
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
            <GameMostPlayer></GameMostPlayer>
            <TopUsers></TopUsers>
        </div>
    </div>
</template>
<script setup lang="ts">
import GameMostPlayer from "~/components/charts/GameMostPlayer.vue"
import TopUsers from "~/components/charts/TopUsers.vue"
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
    /* border-left: 0.3rem solid blue; */
    @apply p-3 bg-white rounded-lg border shadow-sm space-y-2;
}

.item2 {
    border-left: 0.3rem solid green;

}

.item3 {
    border-left: 0.3rem solid #E800D1;

}

.item4 {
    border-left: 0.3rem solid #DC8401;

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