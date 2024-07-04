<template>
  <div v-if="gameLists.length === 0 && !isLoading" class="flex justify-center mt-[10rem]">
    <div>
      <EmptyData :contain="'Game'"></EmptyData>
    </div>
  </div>
  <div class="pb-15 container" v-if="gameLists.length !== 0">
    <form>
      <div v-if="authStore.role === 'customer'">
        <label for="game-select" class="text-black">Choose a game:</label><br />
        <div class="select-icon">
          <span class="material-symbols-outlined">arrow_drop_down</span>
        </div>
        <select name="games" id="game-select" @change.prevent="handleGameSelect($event)"
          class="border bord cursor-pointer">
          <option value="Select game" disabled selected>Select game</option>
          <option
            v-for="game in gameLists"
            :key="game.id"
            :value="game.id"
            :selected="
              typeof gameID === 'string' && parseInt(gameID) === game.id
            "
          >
            {{ game.title }}
          </option>
        </select>
        <div class="mt-5">
          <AnalyticCard />
        </div>
        <div class="flex-none min-md:flex lg:flex-none xl:flex flex-row items-end justify-between">
          <div class="flex mt-10 items-center">
            <div class="from-date-time">
              <p for="fromDate" class="select-none text-sm md:text-md lg:text-lg xl:text-xl">
                From:
              </p>
              <div>
                <input
                  type="date"
                  v-model="fromDate"
                  id="fromDate"
                  :style="{
                    border: fromDateErr ? '1px solid red' : '1px solid black',
                  }"
                  class="mr-5 cursor-pointer w-[8rem] md:w-[14rem] lg:w-[14rem] xl:w-[14rem] p-[0.4rem] rounded"
                  :max="maxEndDate"
                   @change="clearFromDateErr"
                />
                <input
                  type="time"
                  v-model="fromTime"
                  id="fromTime"
                  style="border: 1px solid"
                  class="mt-3 cursor-pointer w-[8rem] md:w-[14rem] lg:w-[14rem] xl:w-[14rem] p-[0.4rem] rounded"
                />
              </div>
            </div>
            <div class="to-date-time ml-12">
              <p for="toDate" class="select-none text-[1.2rem] md:text-[1.2rem] lg:[2rem] xl:text-2xl">
                To:
              </p>
              <div>
                <input
                  type="date"
                  v-model="toDate"
                  id="toDate"
                  :style="{
                    border: toDateErr ? '1px solid red' : '1px solid black',
                  }"
                  class="mr-5 cursor-pointer w-[8rem] md:w-[14rem] lg:w-[14rem] xl:w-[14rem] p-[0.4rem] rounded"
                  :min="minStartDate"
                   @change="clearToDateErr"
                />
                <input
                  type="time"
                  v-model="toTime"
                  id="toTime"
                  style="border: 1px solid"
                  class="mt-3 cursor-pointer w-[8rem] md:w-[14rem] lg:w-[14rem] xl:w-[14rem] p-[0.4rem] rounded"
                />
              </div>
            </div>
          </div>
          <div class="flex mt-5">
            <button class="primary-btn" @click.prevent="submitForm">
              Search
            </button>
            <button class="primary-btn ml-5" @click.prevent="exportDataToCsv">
              Export
            </button>
          </div>
        </div>
      </div>
      <div v-if="authStore.role === 'customer'" class="space-y-3 lg:space-y-5">
        <div>
          <div class="chart-container">
            <CustomerDAPDateTime @event-emits="handleDataDAP" />
            <CustomerMAPDateTime @event-emits="handleDataMAP" />
          </div>
          <div class="chart-container">
            <CustomerDAPSessDate @event-emits="handleDataDAPSess" />
            <CustomerMAPSessDate @event-emits="handleDataMAPSess" />
          </div>
        </div>
      </div>
      <div v-if="authStore.role === 'admin'">
        <h1 class="text-black text-2xl mb-5">Overview</h1>
        <div class="chart-container">
          <AdminDAU />
          <AdminMAU />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import AdminDAU from "~/components/charts/AdminDAU.vue";
import AdminMAU from "~/components/charts/AdminMAU.vue";
import AnalyticCard from "~/components/AnalyticCard.vue";
import { onMounted, ref } from "vue";
import { useAuthStore } from "~/store/auth";
import { callAPI } from "../../composables/callAPI";
import CustomerDAPDateTime from "~/components/charts/CustomerDAPDateTime.vue";
import CustomerMAPDateTime from "~/components/charts/CustomerMAPDateTime.vue";
import CustomerDAPSessDate from "~/components/charts/CustomerDAPSessDate.vue";
import CustomerMAPSessDate from "~/components/charts/CustomerMAPSessDate.vue";
import { useFormDataStore } from "@/store/formData";
import { useDateValidation } from "~/composables/useDateValidation";
const formDataStore = useFormDataStore();
const fromDate = ref("");
const fromTime = ref("");
const toDate = ref("");
const toTime = ref("");
const totalPlayersDAP = ref(0);
const totalPlayersMAP = ref(0);
const playerSessDAP = ref(0);
const playerSessMAP = ref(0);
const gameLists = ref<IGame[]>([]);
const DAPData = ref<any>([]);
const MAPData = ref<any>([]);
const DAPDataSess = ref<any>([]);
const MAPDataSess = ref<any>([]);
const authStore = useAuthStore();
const isLoading = ref(true);
const gameIdSelect = ref();
const gameID = ref();
const { fromDateErr, toDateErr, validateFromDate,validateToDate, showAlert,validateDates } = useDateValidation();
const clearFromDateErr = () => {
  validateFromDate(fromDate.value);
  validateDates(fromDate.value,toDate.value)
  if (!fromDateErr.value) {
    fromDateErr.value = false;
  }else {
    fromDateErr.value = true;
  }
};

const clearToDateErr = () => {
  validateToDate(toDate.value);
  validateDates(fromDate.value,toDate.value);
  if (!toDateErr.value) {
    toDateErr.value = false;
  }else {
    toDateErr.value = true;
  }
};

const submitForm = async () => {
  const result1 = validateFromDate(fromDate.value);
  const result2 = validateToDate(toDate.value);
  const result3 = validateDates(fromDate.value,toDate.value);
  if(!result1.valid) {
    showAlert(result1.message || 'Date input is invalid.');
    return;
  }
  if (!result2.valid) {
    showAlert(result2.message || 'Date input is invalid.');
    return;
  } 
  if (!result3.validFromDate || !result3.validToDate) {
    showAlert(result3.message || 'Date input is invalid.');
    return;
  } 
 
  await formDataStore.setFormData({
    fromDate: fromDate.value,
    fromTime: fromTime.value,
    toDate: toDate.value,
    toTime: toTime.value,
    userGameId: gameIdSelect.value || gameID.value,
  });
  window.location.reload();
};

//===================== Get user's game data ==================//
const getGame = async () => {
  const response = await callAPI(`/api/game/user/getUserGames/${authStore.id}`);
  const games = response.data;
  for (let i = 0; i < games.length; i++) {
    gameLists.value.push(games[i]);
  }
  isLoading.value = false;
};

//=================== Select game option ===================//
const handleGameSelect = async (event: any) => {
  const selectedGameId = event.target.value;
  gameIdSelect.value = selectedGameId;
  const result1 = validateFromDate(fromDate.value);
  const result2 = validateToDate(toDate.value);
  const result3 = validateDates(fromDate.value,toDate.value);
  
  if(result1.valid && result2.valid && result3.validFromDate && result3.validToDate) {
    await formDataStore.setFormData({
    fromDate: fromDate.value,
    fromTime: fromTime.value,
    toDate: toDate.value,
    toTime: toTime.value,
    userGameId: gameIdSelect.value || gameID.value,
  });
    window.location.reload();
  }else {
    return;
  } 
};

//================== Function to export CSV file  =====================//

// Define the method to handle data received from the child
const handleDataDAP = (data: any, total: number) => {
  DAPData.value = data;
  totalPlayersDAP.value = total;
};
const handleDataMAP = (data: any, total: number) => {
  MAPData.value = data;
  totalPlayersMAP.value = total;
};
const handleDataDAPSess = (data: any, total: number) => {
  DAPDataSess.value = data;
  playerSessDAP.value = total;
};
const handleDataMAPSess = (data: any, total: number) => {
  MAPDataSess.value = data;
  playerSessMAP.value = total;
};

const exportDataToCsv = () => {
  const csvContentDAP = convertToCSVDAP(DAPData.value);
  const csvContentMAP = convertToCSVMAP(MAPData.value);
  const csvContentDAPSess = convertToCSVDAPSess(DAPDataSess.value);
  const csvContentMAPSess = convertToCSVMAPSess(MAPDataSess.value);
  const combinedContent = `${csvContentDAP}\n\n${csvContentMAP}\n\n${csvContentDAPSess} \n\nv${csvContentMAPSess}`;
  const blob = new Blob([combinedContent], {
    type: "text/csv;charset=utf-8;\uFEFF",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "export_data.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Function to convert DAP data to CSV format
const convertToCSVDAP = (myData: any[]) => {
  const headers = ["Date", "Player count"];
  const rows = ["Daily active player (DAP)", " ", headers.join(",")];

  myData.forEach((row) => {
    const r = [row["day"], row["player_counts"]];
    rows.push(r.join(","));
  });

  rows.push(`Total: ${totalPlayersDAP.value}`);

  return rows.join("\n");
};

// Function to convert MAP data to CSV format
const convertToCSVMAP = (myData: any[]) => {
  const headers = ["Month", "Player count"];
  const rows = ["Monthly active player (MAP)", " ", headers.join(",")];

  myData.forEach((row) => {
    const r = [row["month"], row["player_counts"]];
    rows.push(r.join(","));
  });

  rows.push(`Total: ${totalPlayersMAP.value}`);
  return rows.join("\n");
};

// Function to convert DAP data session to CSV format
const convertToCSVDAPSess = (myData: any[]) => {
  const headers = ["Date", "Average of session player (DAP)"];
  const rows = ["Player session DAP", " ", headers.join(",")];

  myData.forEach((row) => {
    const r = [row["date"], row["avg_play_time"]];
    rows.push(r.join(","));
  });

  rows.push(`Total: ${playerSessDAP.value}`);
  return rows.join("\n");
};

// Function to convert MAP data session to CSV format
const convertToCSVMAPSess = (myData: any[]) => {
  const headers = ["Date", "Average of session player (MAP)"];
  const rows = ["Player session MAP", " ", headers.join(",")];

  myData.forEach((row) => {
    const r = [row["date"], row["avg_play_time"]];
    rows.push(r.join(","));
  });

  rows.push(`Total: ${playerSessMAP.value}`);
  return rows.join("\n");
};

onMounted(async () => {
  await getGame();
  await formDataStore.loadFromStorage();
  fromDate.value = formDataStore.fromDate;
  fromTime.value = formDataStore.fromTime;
  toDate.value = formDataStore.toDate;
  toTime.value = formDataStore.toTime;
  gameID.value = formDataStore.userGameId;
});

const minStartDate = computed(() => {
  if (fromDate.value) {
    const startDate = new Date(fromDate.value);
    return startDate.toISOString().split("T")[0];
  }
});
const maxEndDate = computed(() => {
  if (toDate.value) {
    const endDate = new Date(toDate.value);
    return endDate.toISOString().split("T")[0];
  }
});
</script>

<style scoped>
.chart-container {
  @apply grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-3 lg:gap-5;
  margin-top: 20px;
}

label {
  font-family: sans-serif;
  font-size: 1.5rem;
  padding-right: 16px;
}

select {
  font-size: 1rem;
  padding: 8px;
  color: black;
  width: 16rem;
  display: flex;
  border-radius: var(--radius);
  @apply shadow-sm;
  z-index: 10;
}

.select-icon {
  display: flex;
  padding-right: 5px;
  flex-direction: row;
  height: 2.6rem;
  align-items: center;
  justify-content: flex-end;
  width: 16rem;
  margin-bottom: -2.6rem;
  z-index: 100 !important;
  border-radius: var(--radius);
}

button {
  border-radius: var(--radius);
}
</style>
