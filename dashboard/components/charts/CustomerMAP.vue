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
const counts:number[] = [];
const date:string[] = [];

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
    const response = await callAPI (`/dashboard/analytics/customer/getMAP/${gameID}`);
    const customerMAP = response.data.player_counts;
    totalPlayer.value = response.data.total_players;
    for (let i =0;i<customerMAP.length;i++) {
        if(i >= 23) {
        counts.push(customerMAP[i].player_count)
        date.push(customerMAP[i].time)
        }
    }
  } 
</script>
<style scoped>
.chart {
    width:48.6%;
    padding: 2rem 1rem 2rem 2.2rem;
    background: #ffffff;
    border-radius: var(--radius);
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
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

@media (max-width:67.5rem) {
    .chart {
        width: 50%;
    }
    .title {
        font-size: 0.7rem;
    }
}
</style>