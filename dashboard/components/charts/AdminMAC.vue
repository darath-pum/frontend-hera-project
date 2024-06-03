<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div class="title">
                <span>MAC</span>
            </div>
            <div class="input-date">
                <span>{{ totalUser }}</span>
                <span class="material-symbols-outlined">
                    more_horiz
                </span>
            </div>
        </div>
        <canvas id="AdminMAC"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { onMounted } from 'vue';
import type { ChartConfiguration } from 'chart.js/auto';
const totalUser = ref();
const counts: number[] = [];
const date: string[] = [];

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
    await getMAC();
    const canvasElement = document.getElementById("AdminMAC") as HTMLCanvasElement | null;
    if (canvasElement) {
        new Chart(canvasElement, config);
    }
});

//================= MAP admin page ==============//
const getMAC = async () => {
    const response = await callAPI("/dashboard/analytics/admin/getMAU");
    const adminMAU = response.data.user_counts;
    totalUser.value = response.data.total_users;
    for (let i = 0; i < adminMAU.length; i++) {
        if (i >= 23) {
            counts.push(adminMAU[i].user_count);
            date.push(adminMAU[i].time);
        }
    }
}

</script>
<style scoped>
.chart {
    background: #ffffff;
    border-radius: var(--radius);
    @apply border shadow-sm p-3 sm:p-5 min-h-[300px];
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