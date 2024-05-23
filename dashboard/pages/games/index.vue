<template>
    <div class="list-games page-bg">
        <h1 class="page-title">List all games</h1>
        <p class="desc page-description">
            Games setting involves determining the value or amount of a prize for a competition or event, considering
            factors such as objectives, budget, target audience, and perceived value.
        </p>
        <div class="list-cards  flex flex-row justify-between">
            <div class="game-card" v-for="i in 8">
                <div class="flex flex-row items-start">
                    <div class="image">
                        <img src="/cat.jpg" alt="">
                    </div>
                    <div class="title-desc flex flex-col pl-5 gap-1">
                        <h2>Mobile Legend </h2>
                        <span>Considering factors such as objectives, budget, target audience.</span>
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between -mt-7">
                    <div class="btn-en-dis flex flex-row gap-1">
                        <span class="font-semibold">Enable</span>
                        <span>/</span>
                        <span>Disable</span>
                    </div>
                    <div class="btn-view-detail">
                        <NuxtLink to="/games/detail">
                            <button class="primary-btn">View detail</button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>


.list-cards {
    margin-top: 3rem;
    flex-wrap: wrap;
}

.game-card {
    background: rgb(240, 240, 240);
    background: linear-gradient(180deg, rgba(240, 240, 240, 1) 0%, rgba(255, 255, 255, 1) 48%);
    width: 20rem;
    /* height: 14rem; */
    border-radius: 10px;
    padding: 1rem 1.5rem;
    margin: 1.5rem 1rem;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}

.title-desc h2 {
    font-size: 1.5rem;
    font-weight: 600;
}

.image {
    width: 10rem;
    height: 10rem;
}

.image img {
    border-radius: 10px;
}
.btn-view-detail button{
    border-radius: 100px;
}
</style>