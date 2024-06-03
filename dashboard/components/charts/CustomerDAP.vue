<template>
  <div class="chart">
    <div class="header mb-5 flex flex-row items-center justify-between">
      <div class="title">
        <span>DAP</span>
      </div>
      <div class="input-date">
        <span>{{ totalPlayer }}</span>
        <span class="material-symbols-outlined"> more_horiz </span>
      </div>
    </div>
    <canvas id="customerDAP"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { onMounted } from "vue";
import type { ChartConfiguration } from "chart.js/auto";
import { useRoute } from "vue-router";
const gameID = useRoute().query.gameId;
const totalPlayer = ref();
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
    },
  ],
};

const config: ChartConfiguration<"line"> = {
  type: "line",
  data: data,
  options: {},
};

//================= DAP customer page ==============//
const getDAP = async () => {
  const response = await callAPI(
    `/dashboard/analytics/customer/getDAP/${gameID}`
  );
  const customerDAP = response.data.player_counts;
  totalPlayer.value = response.data.total_players;
  for (let i = 0; i < customerDAP.length; i++) {
    counts.push(customerDAP[i].player_count);
    var dateTime = new Date(customerDAP[i].time);
    times.push(dateTime.toLocaleTimeString());
  }
}

onMounted(async () => {
  await getDAP();
  const canvasElement = document.getElementById(
    "customerDAP"
  ) as HTMLCanvasElement | null;
  if (canvasElement) {
    new Chart(canvasElement, config);
  }
});
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
