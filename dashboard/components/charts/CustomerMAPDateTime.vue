<template>
  <div class="chart">
    <div class="header mb-5 flex flex-row items-center justify-between">
      <div class="title">
        <span>Monthly Active Player (MAP)</span>
      </div>
      <div class="input-date">
        <span>Total: {{ playerTotal }}</span>
      </div>
    </div>
    <canvas id="customerMAPDateTime"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { onMounted, ref } from "vue";
import { useFormDataStore } from "@/store/formData";
const fromDate = ref("");
const fromTime = ref("");
const toDate = ref("");
const toTime = ref("");
const gameID = ref();
const playerTotal = ref();
const counts: number[] = [];
const times: string[] = [];
const emits = defineEmits(["event-emits"]);
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
      stepSize: 1,
    },
  },
};

//======== Get data from local storage =======//
const formDataStore = useFormDataStore();
onMounted(() => {
  formDataStore.loadFromStorage();
  fromDate.value = formDataStore.fromDate || new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  toDate.value = formDataStore.toDate || new Date(new Date().getTime()).toISOString().split("T")[0];
  fromTime.value = formDataStore.fromTime || '00:00';
  toTime.value = formDataStore.toTime || '23:59';
  gameID.value = formDataStore.userGameId || '1';
});


//================= Get MAP customer page by datatime ==============//
const getMAPDateTime = async () => {
  const dateTime = {
    from: new Date(`${fromDate.value}T${fromTime.value}+07:00`).toISOString(),
    to: new Date(`${toDate.value}T${toTime.value}+07:00`).toISOString(),
  };
  const response = await callAPI(
    `/api/analytics/customer/getMAPByDate/${gameID.value}`,
    "POST",
    dateTime
  );

  const customerMAP = response.data.month_counts;
  playerTotal.value = response.data.total_players;
  for (let i = 0; i < customerMAP.length; i++) {
    counts.push(customerMAP[i].player_counts);
    const dateTime = customerMAP[i].month;
    times.push(dateTime);
  }
  handleData(customerMAP, playerTotal.value);
};

onMounted(async () => {
  await getMAPDateTime();
  const canvasElement = document.getElementById(
    "customerMAPDateTime"
  ) as HTMLCanvasElement | null;
  if (canvasElement) {
    new Chart(canvasElement, config);
  }
});

//====================== emit data ==================//
const handleData = (data: any, total: number) => {
  emits("event-emits", data, total);
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
