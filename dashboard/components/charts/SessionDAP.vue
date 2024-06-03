<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div class="title">
                <span>Session(DAP)</span>
            </div>
            <div class="input-date">
                <span>{{avgTotalDAP }}</span>
                <span class="material-symbols-outlined">
                    more_horiz
                </span>
            </div>
        </div>
        <canvas id="sessionDAP"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { onMounted } from 'vue';
import type { ChartConfiguration } from 'chart.js/auto';
import { useRoute } from 'vue-router';
const gameID = useRoute().query.gameId
const avgTotalDAP = ref();
const avgPlayTimes :any[] = [];
const times:string[] = [];

const data = {
    labels: times,
    datasets: [{
        label: "Active users",
        backgroundColor: "blue",
        borderColor: "blue",
        data: avgPlayTimes,
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
    const response = await callAPI (`/dashboard/analytics/customer/getDGPS/${gameID}`);
    const sessionDAP = response.data.play_time_counts;
    avgTotalDAP.value = response.data.avg_play_sessions;
    for (let i =0;i<sessionDAP.length;i++) {
        avgPlayTimes.push(sessionDAP[i].avg_play_time)
        var dateTime = new Date(sessionDAP[i].time)
        times.push(dateTime.toLocaleTimeString())
    }
  } 
</script>
<style scoped>
.chart {
    width:48.6%;
    padding: 2rem;
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