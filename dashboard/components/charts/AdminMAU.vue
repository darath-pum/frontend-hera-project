<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div class="title">
                <span>MAU</span>
            </div>
            <div class="input-date">
                <span>User Total: {{ userTotal }}</span>
            </div>
        </div>
        <canvas id="AdminMAU"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { onMounted,ref } from 'vue';
import { format } from "date-fns";
const userTotal = ref();
const counts: number[] = [];
const dates: string[] = [];

const data = {
    labels: dates,
    datasets: [{
        label: "Active users",
        backgroundColor: "blue",
        borderColor: "blue",
        data: counts,
        tension:0.3
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
    await getMAU();
    const canvasElement = document.getElementById("AdminMAU") as HTMLCanvasElement | null;
    if (canvasElement) {
        new Chart(canvasElement, config);
    }
});

//================= MAU admin page ==============//
const getMAU = async () => {
    const response = await callAPI("/api/analytics/admin/getMAU");
    const adminMAU = response.data.user_counts;
    userTotal.value = response.data.total_users;
    for (let i = 0; i < adminMAU.length; i++) {
        counts.push(adminMAU[i].user_count);
        const date = format(new Date(adminMAU[i].time), 'dd-MM')
        dates.push(date);
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