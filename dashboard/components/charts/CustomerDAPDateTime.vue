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
    <canvas id="customerDAPDateTime"></canvas>
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

//================= DAP customer  by datatime ==============//
const getDAPDateTime = async () => {
  const dateTime = {
    from: fromDate.value + "T" + fromTime.value + ":" + "00" + "+07:00",
    to: toDate.value + "T" + toTime.value + ":" + "00" + "+07:00",
  };

  const response = await callAPI(
    `/api/analytics/customer/getDAPByDate/${gameID.value}`,
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
