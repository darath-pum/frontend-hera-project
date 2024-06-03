<template>
    <div class="home">

        <div class="active-card flex flex-row justify-between">
            <div class="card-item flex flex-col justify-between">
                <div class="title-image flex flex-row justify-between">
                    <div class="flex flex-col gap-2">
                        <span>Active users</span>
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
                        <span>Active users</span>
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
                        <span>Active users</span>
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
                        <span>Active users</span>
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
        <div class="charts grid grid-cols-2">
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
/* .home{
    background: #ffffff;
    padding: 2rem;
    border-radius: 10px;

} */
.active-card {
    gap: 1rem;
    margin-top: 0.5rem;
}

.card-item {
    background: #ffffff;
    width: 22rem;
    height: 10rem;
    padding: 1.5rem;
    color: black;
    border-radius: var(--radius);
    border-left: 0.5rem solid var(--primary-color);
    /* box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em; */
}

.item2 {
    border-left: 0.5rem solid green;

}

.item3 {
    border-left: 0.5rem solid #E800D1;

}

.item4 {
    border-left: 0.5rem solid #DC8401;

}

.title-image {
    border-left: 0.5rem solid blue;
    padding-left: 1rem;
}

.title-image h2 {
    font-size: 1.5rem;
    font-weight: 600;
}

.title-image img {
    width: 4rem;
}

.charts {
    margin-top: 2.5rem;
    gap: 2rem;
}

@media (max-width: 87.5rem) {
    .active-card {
        gap: 1rem;
        margin-top: 0.5rem;
    }

    .card-item {
        width: 14rem;
        height: 8rem;
        padding: 1rem;
        border-left: 0.2rem solid var(--primary-color);
    }

    .title-image img {
        width: 3rem;
    }

    .item2 {
        border-left: 0.2rem solid green;

    }

    .item3 {
        border-left: 0.2rem solid #E800D1;

    }

    .item4 {
        border-left: 0.2rem solid #DC8401;

    }

    .title-image {
        border-left: 0.2rem solid blue;
        padding-left: 0.5rem;
    }

    .title-image div:nth-child(1) {
        gap: 1px;
    }

    .title-image span {
        font-size: 1rem;
    }

    .title-image h2 {
        font-size: 1.5rem;
        font-weight: 600;
    }

    .title-image img {
        width: 3rem;
    }

    .desc p {
        font-size: 0.8rem;
    }

    .desc .material-symbols-outlined {
        font-size: 0.8rem;
    }
}

@media (max-width: 81.25rem) {
    .active-card {
        gap: 1.5rem;
        margin-top: 0.5rem;
    }
}

@media (max-width: 75rem) {
    .card-item {
        height: 7rem;

    }

    .title-image span {
        font-size: 0.8rem;
    }

    .title-image h2 {
        font-size: 1.4rem;
        font-weight: 600;
    }

    .title-image img {
        width: 1.5rem;
    }
}
@media (max-width: 70.625rem) {
    .card-item {
        height: 5.6rem;
        padding: 0.7rem;

    }

    .title-image span {
        font-size: 0.7rem;
    }

    .title-image h2 {
        font-size: 1rem;
        font-weight: 600;
    }

    .title-image img {
        width: 1.5rem;
    }
    .desc p {
        font-size: 0.7rem;
    }

    .desc .material-symbols-outlined {
        font-size: 0.8rem;
    }
}

@media (max-width: 60rem) {
    .card-item {
        height: 5rem;
        padding: 0.7rem;
    }
    .title-image span {
        font-size: 0.7rem;
    }
    .title-image h2 {
        font-size: 0.8rem;
        font-weight: 600;
    }
    .desc p {
        font-size: 0.6rem;
    }

    .desc .material-symbols-outlined {
        font-size: 0.6rem;
    }
}

@media (max-width:54rem) {
    .active-card {
        gap: 1rem;
        margin-top: 0.5rem;
    }

    .card-item {
        width: 9rem;
        height: 4rem;
        padding: 0.5rem;
        border-left: 0.2rem solid var(--primary-color);
    }

    .title-image div:nth-child(1) {
        gap: 1px;
    }

    .title-image span {
        font-size: 0.5rem;
    }

    .title-image h2 {
        font-size: 0.7rem;
        font-weight: 600;
    }

    .title-image img {
        width: 1.5rem;
    }

    .desc p {
        font-size: 0.5rem;
    }

    .desc .material-symbols-outlined {
        font-size: 0.5rem;
    }
    .charts{
        display: flex;
   
    }
}
</style>