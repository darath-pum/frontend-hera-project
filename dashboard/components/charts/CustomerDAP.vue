<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div class="title">
                <span>DAP</span>
            </div>
            <div class="input-date">
                <span class="material-symbols-outlined">
                    more_horiz
                </span>
            </div>
        </div>
        <canvas id="customerDAP"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { onMounted } from 'vue';
import type { ChartConfiguration } from 'chart.js/auto';

const counts = [10, 50, 30, 90, 15, 100];
const date = ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00'];

const data = {
    labels: date,
    datasets: [{
        label: "Active users",
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
    const canvasElement = document.getElementById("customerDAP") as HTMLCanvasElement | null;
    if (canvasElement) {
        new Chart(canvasElement, config);
    }
});

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