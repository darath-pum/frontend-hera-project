<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div class="title">
                <span>Montly Play Session</span>
            </div>
            <div class="input-date">
                <span>Avg: {{ avgTotalMAP }}</span>
            </div>
        </div>
        <canvas id="sessionMAP"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { onMounted } from 'vue';
import type { ChartConfiguration } from 'chart.js/auto';
import { useRoute } from 'vue-router';
import { format } from "date-fns";
const gameID = useRoute().query.gameId;
const avgTotalMAP = ref();
const avgPlayTime: number[] = [];
const dates: string[] = [];
const data = {
    labels: dates,
    datasets: [{
        label: "Active users",
        backgroundColor: "blue",
        borderColor: "blue",
        data: avgPlayTime,
        tension: 0.3
    }]
};

const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: data,
    options: {}
};


onMounted(async () => {
    await getSessionMAP()
    const canvasElement = document.getElementById("sessionMAP") as HTMLCanvasElement | null;
    if (canvasElement) {
        new Chart(canvasElement, config);
    }

});

//================= session MAP of customer page ==============//
const getSessionMAP = async () => {
    const response = await callAPI(`/api/analytics/customer/getMGPS/${gameID}`);
    const sessionMAP = response.data.play_time_counts;
    avgTotalMAP.value = response.data.avg_play_sessions;
    for (let i = 0; i < sessionMAP.length; i++) {
        avgPlayTime.push(sessionMAP[i].avg_play_time)
        const date = format(new Date(sessionMAP[i].date), 'dd-MM')
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