<template>
  <div class="chart">
    <div class="header mb-5 flex flex-row items-center justify-between">
      <div class="title">
        <span>DAP</span>
      </div>
      <div class="input-date">
        <span>Player Total: {{ playerTotal }}</span>
      </div>
    </div>
    <canvas id="customerDAPDateTime"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { format } from "date-fns";
import { useFormDataStore } from "@/store/formData";
const fromDate = ref("");
const fromTime = ref("");
const toDate = ref("");
const toTime = ref("");
const gameID = useRoute().query.gameId;
const playerTotal = ref();
const counts: number[] = [];
const dates: string[] = [];
const emits = defineEmits(["event-emits"]);
const data = {
  labels: dates,
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

// Get the current date
const currentDate = new Date();
const pastDate = new Date(currentDate);
pastDate.setDate(currentDate.getDate() - 6);

//================= DAP customer  by datatime ==============//
const getDAPDateTime = async () => {
  const fromTimeValue = fromTime.value || "00:00";
  const toTimeValue = toTime.value || "23:59";
  const fromDateValue = fromDate.value || formatDate(pastDate);
  const toDateValue = toDate.value || formatDate(currentDate);
  const dateTime = {
    from: fromDateValue + "T" + fromTimeValue + ":" + "00" + "+07:00",
    to: toDateValue + "T" + toTimeValue + ":" + "00" + "+07:00",
  };
  console.log("date", dateTime);

  const response = await callAPI(
    `/api/analytics/customer/getDAPByDate/${gameID}`,
    "POST",
    dateTime
  );
  const customerDAP = response.data.day_counts;
  playerTotal.value = response.data.total_players;
  for (let i = 0; i < customerDAP.length; i++) {
    counts.push(customerDAP[i].player_counts);
    const dateTime = format(new Date(customerDAP[i].day), "dd-MM");
    dates.push(dateTime);
  }
  handleData(customerDAP, playerTotal.value);
};

onMounted(async () => {
  await getDAPDateTime();
  const canvasElement = document.getElementById(
    "customerDAPDateTime"
  ) as HTMLCanvasElement | null;
  if (canvasElement) {
    new Chart(canvasElement, config);
  }
});

//================== Emit data ==================//

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
