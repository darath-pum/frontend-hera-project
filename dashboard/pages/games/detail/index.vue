<template>
    <div class="game-detail page-bg">
        <div class="flex flex-row items-start justify-between">
            <NuxtLink to="/games">
                <div class="flex flex-row items-center gap-1 cursor-pointer">
                    <span class="material-symbols-outlined">
                        keyboard_backspace
                    </span>
                    <span>Game lists</span>
                </div>

            </NuxtLink>
            <h1 class="page-title">Game Detail</h1>
            <span></span>
        </div>
        <div class="detail-info flex flex-row gap-10">
            <div class="flex flex-col gap-5">
                <div class="game-image">
                    <img src="/cat.jpg" alt="">
                </div>
                <div class="btn-action flex flex-row justify-end">
                    <button class="primary-btn">Disable</button>
                </div>
            </div>
            <div class="flex flex-col gap-10">
                <div class="title-desc">
                    <div class="flex flex-row items-center gap-10">
                        <h2 class="game-title">Mobile Legend</h2>
                        <button class="btn-active">Active</button>
                    </div>
                    <div class="game-type">
                        <button>Action</button>
                        <button>MOBA</button>
                    </div>
                    <p class="desc">Considering factors such as objectives, budget, target audience.Considering factors
                        budget, target audience.Considering factors,target audience.Considering factors
                        such as objectives, budget, target audience.</p>
                </div>
                <div class="qr-code flex flex-col gap-5">
                    <div class="qr-image">
                        <h1>QR Code</h1>
                        <img src="/QR.jpg" alt="">
                    </div>
                    <div>
                        <button class="secondary-btn">Download QR Code</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.game-image {
    width: 25rem;
    height: 25rem;
}

.game-image img {
    border-radius: 10px;
}

.title-desc {
    border-left: #000000 solid 0.5rem;
    padding: 0.5rem 2rem;
}

.game-title {
    font-size: 3rem;
    font-weight: 600;
}
.btn-active{
    background: #59e759;
    padding: 0.4rem 1rem;
    border-radius: 100px;
    color: #ffffff;
    font-weight: 500;
}
.desc {
    font-size: 1.5rem;
}
.game-type{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1.5rem 0rem;
}
.game-type button{
    border: 1px solid #000000;
    padding: 0.4rem 1rem;
    border-radius: 100px;
}

.qr-code {
    padding-left: 2.5rem;
}
.qr-code h1{
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0rem 0rem 1rem 0rem;
}

.qr-image img,
.qr-code div button {
    width: 16rem;
    border-radius: 10px;
    border: 2px solid #000000;
}
</style>