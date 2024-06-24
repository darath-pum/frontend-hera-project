<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div class="title">
                <span>MAP</span>
            </div>
            <div class="input-date">
                <span>Player Total: {{ totalPlayer }}</span>
            </div>
        </div>
        <canvas class="" id=" customerMAP"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { format } from "date-fns";
import { callAPI } from '../../composables/callAPI';
const gameID = useRoute().query.gameId
const totalPlayer = ref();
const counts: number[] = [];
const dates: string[] = [];

const data = {
    labels: dates,
    datasets: [{
        label: "Active players",
        backgroundColor: "blue",
        borderColor: "blue",
        data: counts,
        tension: 0.3
    }]
};

const config: any = {
    type: "line",
    data: data,
    options: {
        ticks: {
            // forces step size to be 50 units
            stepSize: 1
        }
    },
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
        counts.push(customerMAP[i].player_count)
        const date = format(new Date(customerMAP[i].day), 'dd-MM');
        dates.push(date);
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