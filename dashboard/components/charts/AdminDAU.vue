<template>
  <div class="chart">
    <div class="header mb-5 flex flex-row items-center justify-between">
      <div class="title">
        <span>Daily Active User (DAU)</span>
      </div>
      <div class="input-date">
        <span>Total: {{ userTotal }}</span>
      </div>
    </div>
    <canvas id="AdminDAU" class="h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { onMounted, ref } from "vue";
import { format } from "date-fns";
const userTotal = ref();
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
      tension: 0.3
    },
  ],
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
  await getDAU();
  const canvasElement = document.getElementById(
    "AdminDAU"
  ) as HTMLCanvasElement | null;
  if (canvasElement) {
    new Chart(canvasElement, config);
  }
});

//================= DAU admin page ==============//
const getDAU = async () => {
  const response = await callAPI("/api/analytics/admin/getDAU");
  const adminDAU = response.data.user_counts;
  userTotal.value = response.data.total_users;
  for (let i = 0; i < adminDAU.length; i++) {
    counts.push(adminDAU[i].user_count);
    const dateTime = format(new Date(adminDAU[i].time), 'p')
    times.push(dateTime);
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
