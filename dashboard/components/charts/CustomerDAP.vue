<template>
  <div class="chart">
    <div class="header mb-5 flex flex-row items-center justify-between">
      <div class="title">
        <span>Daily Active Player (DAP)</span>
      </div>
      <div class="input-date">
        <span>Total: {{ playerTotal }}</span>
      </div>
    </div>
    <canvas id="customerDAP"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { format } from "date-fns";

const fromDate = ref('')
const fromTime = ref('')
const toDate = ref('')
const toTime = ref('')

const gameID = useRoute().query.gameId;
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

//================= DAP customer page ==============//
const getDAP = async () => {
  const response = await callAPI(
    `/api/analytics/customer/getDAP/${gameID}`
  );
  const customerDAP = response.data.player_counts;
  playerTotal.value = response.data.total_players;
  for (let i = 0; i < customerDAP.length; i++) {
    counts.push(customerDAP[i].player_count);
    const dateTime = format(new Date(customerDAP[i].time), 'p')
    times.push(dateTime);
  }
}


//================= DAP customer page by datatime ==============//
// const getDAPDateTime = async() => {
//   const from = "2024-06-20T00:00:00+07:00";
//   const to = "2024-06-22T23:59:00+07:00";
//   const response = await fetch('/api/analytics/customer/getDAPByDate/40', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ from, to })
//     })
//     console.log(response);
//     const data = await response.json();
//     console.log(data);
// }

onMounted(async () => {
  await getDAP();
  // getDAPDateTime ();
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
