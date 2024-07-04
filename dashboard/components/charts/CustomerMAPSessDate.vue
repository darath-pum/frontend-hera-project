<template>
  <div class="chart">
    <div class="header mb-5 flex flex-row items-center justify-between">
      <div class="title">
        <span>Session(MAP)</span>
      </div>
      <div class="input-date">
        <span>Player Total: {{ playerTotal }}</span>
      </div>
    </div>
    <canvas id="customerMAPSessDateTime"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { onMounted, ref } from "vue";
import { format } from "date-fns";
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
  fromDate.value = formDataStore.fromDate;
  toDate.value = formDataStore.toDate;
  fromTime.value = formDataStore.fromTime;
  toTime.value = formDataStore.toTime;
  gameID.value = formDataStore.userGameId;
});

//================= Get MAP customer  by datatime ==============//
const getSessMAPDateTime = async () => {
  const dateTime = {
    from: new Date(`${fromDate.value}T${fromTime.value}+07:00`).toISOString(),
    to: new Date(`${toDate.value}T${toTime.value}+07:00`).toISOString(),
  };
  const response = await callAPI(
    `/api/analytics/customer/getMGPSByDate/${gameID.value}`,
    "POST",
    dateTime
  );

  const customerMAP = response.data.play_time_counts;
  playerTotal.value = response.data.avg_play_sessions;
  for (let i = 0; i < customerMAP.length; i++) {
    counts.push(customerMAP[i].avg_play_time);
    const dateTime = format(new Date(customerMAP[i].date), "dd-MM");
    times.push(dateTime);
  }
  handleData(customerMAP, playerTotal.value);
};

onMounted(async () => {
  await getSessMAPDateTime();
  const canvasElement = document.getElementById(
    "customerMAPSessDateTime"
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
