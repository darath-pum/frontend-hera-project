<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div class="title">
                <span>Session(DAP)</span>
            </div>
            <div class="input-date">
                <span>Average Player Session: {{ avgTotalDAP }}</span>
            </div>
        </div>
        <canvas id="sessionDAP"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { onMounted,ref } from 'vue';
import type { ChartConfiguration } from 'chart.js/auto';
import { useRoute } from 'vue-router';
import { format } from "date-fns";
const gameID = useRoute().query.gameId
const avgTotalDAP = ref();
const avgPlayTimes: any[] = [];
const times: string[] = [];

const data = {
    labels: times,
    datasets: [{
        label: "Active players",
        backgroundColor: "blue",
        borderColor: "blue",
        data: avgPlayTimes,
        tension:0.3
    }]
};

const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: data,
    options: {}
};

onMounted(async () => {
    await getSessionDAP()
    const canvasElement = document.getElementById("sessionDAP") as HTMLCanvasElement | null;
    if (canvasElement) {
        new Chart(canvasElement, config);
    }
});

//================= session DAP of customer page ==============//
const getSessionDAP = async () => {
    const response = await callAPI(`/api/analytics/customer/getDGPS/${gameID}`);
    const sessionDAP = response.data.play_time_counts;
    avgTotalDAP.value = response.data.avg_play_sessions;
    for (let i = 0; i < sessionDAP.length; i++) {
        avgPlayTimes.push(sessionDAP[i].avg_play_time)
        const dateTime = format(new Date(sessionDAP[i].time), 'p')
        times.push(dateTime);
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