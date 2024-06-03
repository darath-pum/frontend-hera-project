<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div class="title">
                <span>DAU</span>
            </div>
            <div class="input-date">
                <span class="material-symbols-outlined">
                    more_horiz
                </span>
            </div>
        </div>
        <canvas id="myChart"></canvas>
    </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';;
import type { ChartConfiguration } from 'chart.js/auto';
const counts = [200, 50, 100, 10, 15, 100];
const date = ['2023-02-01', '2023-02-02', '2023-02-03', '2023-02-04', '2023-02-05', '2023-02-06']

const data = {
    labels: date,
    datasets: [{
        label: "Active users",
        backgroundColor: "blue",
        borderColor: "blue",
        data: counts,
    }]
}
const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: data,
    options: {}
};


onMounted(async () => {
    const canvasElement = document.getElementById("myChart") as HTMLCanvasElement | null;
    if (canvasElement) {
        new Chart(canvasElement, config);
    }
});

</script>
<style scoped>
.chart {
    padding: 2rem;
    background: #ffffff;
    border-radius: var(--radius);
    @apply border shadow-sm;
}

.title {
    color: gray;
}

.header {
    /* border-bottom: 1px solid var(--primary-color);` */
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