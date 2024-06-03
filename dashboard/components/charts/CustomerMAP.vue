<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div class="title">
                <span>MAP</span>
            </div>
            <div class="input-date">
                <span>{{ totalPlayer }}</span>
                <span class="material-symbols-outlined">
                    more_horiz
                </span>
            </div>
        </div>
        <canvas id="customerMAP"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { onMounted } from 'vue';
import type { ChartConfiguration } from 'chart.js/auto';
import { useSharedState } from '../../composables/useShareState'
import { useRoute } from 'vue-router';
const gameID = useRoute().query.gameId
const totalPlayer = ref();
const counts: number[] = [];
const date: string[] = [];

const data = {
    labels: date,
    datasets: [{
        label: "Active players",
        backgroundColor: "blue",
        borderColor: "blue",
        data: counts,
    }]
};

const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: data,
    options: {}
};

onMounted(async () => {
    await getMAP();

    const canvasElement = document.getElementById("customerMAP") as HTMLCanvasElement | null;
    if (canvasElement) {
        new Chart(canvasElement, config);
    }
});

//================= MAP customer page ==============//
const getMAP = async () => {
    const response = await callAPI(`/dashboard/analytics/customer/getMAP/${gameID}`);
    const customerMAP = response.data.player_counts;
    totalPlayer.value = response.data.total_players;
    for (let i = 0; i < customerMAP.length; i++) {
        if (i >= 23) {
            counts.push(customerMAP[i].player_count)
            date.push(customerMAP[i].time)
        }
    }
} 
</script>
<style scoped>
.chart {
    background: #ffffff;
    border-radius: var(--radius);
    @apply border shadow-sm p-3 sm:p-5;
}

.title {
    color: gray;
}

.header {
    padding: 5px;
}

.input-date {
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: var(--primary-color);
}

.input-date input {
    padding: 7px;
    width: 200px;
    background: #74C0FC;
    color: #ffff;
}
</style>