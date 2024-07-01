<template>
  <div class="chart">
    <div class="header mb-5 flex flex-row items-center justify-between">
      <div class="title">
        <span>Active Players (Last 24 hours)</span>
      </div>
      <div class="input-date">
        <span>Total: {{ playerTotal }}</span>
      </div>
    </div>
    <canvas id="CustomerDAUHome"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { format } from "date-fns";
import { callAPI } from "../../composables/callAPI";
import { ref, onMounted } from "vue";
const playerTotal = ref();
const counts: number[] = [];
const times: string[] = [];

const data = {
  labels: times,
  datasets: [
    {
      label: "Active players",
      backgroundColor: "blue",
      borderColor: "blue",
      data: counts,
      tension: 0.3,
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
  await getDAP();
  const canvasElement = document.getElementById(
    "CustomerDAUHome"
  ) as HTMLCanvasElement | null;
  if (canvasElement) {
    new Chart(canvasElement, config);
  }
});

//================= DAP customer home page ==============//
const getDAP = async () => {
  const response = await callAPI(
    "/api/analytics/customer/getTotalDAPByUserId"
  );
  const playerCounts = response.data.player_counts;
  playerTotal.value = response.data.total_players;
  for (let i = 0; i < playerCounts.length; i++) {
    counts.push(playerCounts[i].player_count);
    const dateTime = format(new Date(playerCounts[i].time), "p");
    times.push(dateTime);
  }
};
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
  background: #74c0fc;
  color: #ffff;
}
</style>
