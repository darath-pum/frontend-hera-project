<template>
  <div class="chart">
    <div class="header mb-5 flex flex-row items-center justify-between">
      <div class="title">
        <span>DAC</span>
      </div>
      <div class="input-date">
        <span>{{ totalUser }}</span>
        <span class="material-symbols-outlined"> more_horiz </span>
      </div>
    </div>
    <canvas id="AdminDAC" class="h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { onMounted } from "vue";
import type { ChartConfiguration } from "chart.js/auto";
const totalUser = ref();
const counts: number[] = [];
const times: string[] = [];

const data = {
  labels: times,
  datasets: [
    {
      label: "Active users",
      backgroundColor: "blue",
      borderColor: "blue",
      data: counts,
    },
  ],
};

const config: ChartConfiguration<"line"> = {
  type: "line",
  data: data,
  options: {},
};

onMounted(async () => {
  await getDAP();
  const canvasElement = document.getElementById(
    "AdminDAC"
  ) as HTMLCanvasElement | null;
  if (canvasElement) {
    new Chart(canvasElement, config);
  }
});

//================= DAP admin page ==============//
const getDAP = async () => {
  const response = await callAPI("/dashboard/analytics/admin/getDAU");
  const adminDAU = response.data.user_counts;
  totalUser.value = response.data.total_users;
  for (let i = 0; i < adminDAU.length; i++) {
    if (i >= 17) {
      counts.push(adminDAU[i].user_count);
      var dateTime = new Date(adminDAU[i].time);
      times.push(dateTime.toLocaleTimeString());
    }
  }
};
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
  background: #74c0fc;
  color: #ffff;
}
</style>
