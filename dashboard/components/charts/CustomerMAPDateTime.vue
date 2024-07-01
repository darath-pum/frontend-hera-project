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
import { useRoute } from "vue-router";
import { useFormDataStore } from "@/store/formData";
const fromDate = ref("");
const fromTime = ref("");
const toDate = ref("");
const toTime = ref("");
const gameID = useRoute().query.gameId;
const playerTotal = ref();
const counts: number[] = [];
const times: string[] = [];
const currentDate = new Date();
const pastDate = new Date();
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

//======== Function find From input date and To input date =======//
const formDataStore = useFormDataStore();
onMounted(() => {
  formDataStore.loadFromStorage();
  fromDate.value = formDataStore.fromDate;
  toDate.value = formDataStore.toDate;
  fromTime.value = formDataStore.fromTime;
  toTime.value = formDataStore.toTime;
});
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

pastDate.setDate(currentDate.getDate());

//================= Get MAP customer page by datatime ==============//
const getMAPDateTime = async () => {
  const fromTimeValue = fromTime.value || "00:00";
  const toTimeValue = toTime.value || "23:59";
  const fromDateValue = fromDate.value || formatDate(pastDate);
  const toDateValue = toDate.value || formatDate(currentDate);
  const dateTime = {
    from: new Date(`${fromDateValue}T${fromTimeValue}+07:00`).toISOString(),
    to: new Date(`${toDateValue}T${toTimeValue}+07:00`).toISOString(),
  };
  const response = await callAPI(
    `/api/analytics/customer/getMAPByDate/${gameID}`,
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
