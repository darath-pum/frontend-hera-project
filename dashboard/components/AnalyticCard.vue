<template>
  <div class="card-container">
    <div class="card-item flex flex-col justify-between">
      <div class="title-image flex flex-row justify-between">
        <div class="flex flex-col gap-2">
          <span class="card-title">Player Total:</span>
          <h2>{{ playerTotal }}</h2>
        </div>
        <div>
          <i class="material-icons text-5xl">groups</i>
        </div>
      </div>
      <div class="desc flex flex-row items-center">
        <span class="material-symbols-outlined text-green"> north </span>
        <p>
          <span class="text-green">% {{ playerPercent }}</span> from last month
        </p>
      </div>
    </div>
    <div class="card-item item3 flex flex-col justify-between">
      <div class="title-image flex flex-row justify-between">
        <div class="flex flex-col gap-2">
          <span>Active player</span>
          <h2>{{ acPlayer }}</h2>
        </div>
        <div>
          <i class="material-icons text-5xl">online_prediction</i>
        </div>
      </div>
      <div class="desc flex flex-row items-center">
        <span class="material-symbols-outlined text-green"> north </span>
        <p>
          <span class="text-green">%{{ activePercent }}</span> from last month
        </p>
      </div>
    </div>
    <div class="card-item item4 flex flex-col justify-between">
      <div class="title-image flex flex-row justify-between">
        <div class="flex flex-col gap-2">
          <span class="card-title">Player session</span>
          <h2>{{ sessPlayer }} min</h2>
        </div>
        <div>
          <i class="material-icons text-5xl">play_circle_filled</i>
        </div>
      </div>
      <div class="desc flex flex-row items-center">
        <span class="material-symbols-outlined text-green"> north </span>
        <p>
          <span class="text-green">%{{ acSessPlayer }}</span> from last month
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { callAPI } from "../composables/callAPI";
import { useFormDataStore } from "@/store/formData";
const userGameId = ref();
const playerPercent = ref("");
const playerTotal = ref("");
const acPlayer = ref("");
const activePercent = ref("");
const sessPlayer = ref("");
const acSessPlayer = ref("");
const formDataStore = useFormDataStore();
onMounted(() => {
  formDataStore.loadFromStorage();
  userGameId.value = formDataStore.userGameId;
});

const getPlayer = async () => {
  const response = await callAPI(
    `/api/analytics/customer/getSummaryOfPlayersByUserGameId/${userGameId.value}`
  );
  playerTotal.value = response.data.total;
  playerPercent.value = response.data.percentage;
};
const getAcPlayer = async () => {
  const response = await callAPI(
    `/api/analytics/customer/getSummaryOfAPByUserGameId/${userGameId.value}`
  );
  acPlayer.value = response.data.total;
  activePercent.value = response.data.percentage;
};
const getSessPlayer = async () => {
  const response = await callAPI(
    `/api/analytics/customer/getGamePlaySessionsByUserGameId/${userGameId.value}`
  );
  sessPlayer.value = response.data.total;
  acSessPlayer.value = response.data.percentage;
};
onMounted(() => {
  getPlayer();
  getAcPlayer();
  getSessPlayer();
});
</script>

<style scoped>
.card-container {
  @apply grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-3 lg:gap-5;
}

/*  */
.chart-container {
  @apply grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-3 lg:gap-5;
}

.card-item {
  @apply p-3 bg-white rounded-md border shadow-sm space-y-2 border-l-4 border-l-blue-500;
}

.item2 {
  @apply border-l-green-500;
}

.item3 {
  @apply border-l-pink-500;
}

.item4 {
  @apply border-l-orange-500;
}

.title-image {
  @apply p-2 sm:border-l-2 border-blue-500;

  span {
    @apply text-gray-500;
  }
}

.title-image h2 {
  font-size: 1rem;
  font-weight: 600;
}

.title-image img {
  @apply hidden sm:flex;
  @apply w-12 h-12;
}

.desc {
  @apply text-gray-700 text-sm;
}
</style>
