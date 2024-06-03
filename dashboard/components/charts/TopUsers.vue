<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div class="title">
                <span>DAC</span>
            </div>
            <div class="input-date">
                <span class="material-symbols-outlined">
                    more_horiz
                </span>
            </div>
        </div>
        <canvas id="myChart1"></canvas>
    </div>
</template>

<script setup lang="ts">
//   import axios from 'axios';
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';
import type { ChartConfiguration } from 'chart.js/auto';
//   import { getAPIURL } from "@/configs";

const uniqueUsers = ref(0);
const counts = [15, 100, 30, 100, 70, 10];
const date = ['2023-02-01', '2023-02-02', '2023-02-03', '2023-02-04', '2023-02-05', '2023-02-06']

const data = {
    labels: date,
    datasets: [{
        label: "Active users",
        backgroundColor: "#2C28F6",
        borderColor: "#2C28F6",
        data: counts,
    }]
}
const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: data,
    options: {}
};


onMounted(async () => {
    const canvasElement = document.getElementById("myChart1") as HTMLCanvasElement | null;
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
    /* border-bottom: 1px solid var(--primary-color); */
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