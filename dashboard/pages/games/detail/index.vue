<template>
    <div class="game-detail page-bg">
        <h1 class="page-title">Game Detail</h1>
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
                    <h2 class="game-title">Mobile Legend</h2>
                    <p class="desc">Considering factors such as objectives, budget, target audience.Considering factors
                        budget, target audience.Considering factors,target audience.Considering factors
                        such as objectives, budget, target audience.</p>
                </div>
                <div class="qr-code flex flex-col gap-5">
                    <div class="qr-image">
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

.desc {
    font-size: 1.5rem;
}

.qr-code {
    padding-left: 2.5rem;
}

.qr-image img,
.qr-code div button {
    width: 16rem;
    border-radius: 10px;
    border: 2px solid #000000;
}
</style>