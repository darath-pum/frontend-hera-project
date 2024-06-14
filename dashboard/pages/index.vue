<template>
  <div class="container">
    <div class="card-container">
      <div class="card-item flex flex-col justify-between">
        <div class="title-image flex flex-row justify-between">
          <div class="flex flex-col gap-2">
            <span v-if="authStore.role === 'admin'" class="card-title"
              >User Total:</span
            >
            <span v-else class="card-title">Player Total:</span>
            <h2 v-if="authStore.role === 'admin'">{{ userTotal }}</h2>
            <h2 v-else>{{ playerTotal }}</h2>
          </div>
          <div>
            <i class="material-icons text-5xl">groups</i>
          </div>
        </div>
        <div class="desc flex flex-row items-center">
          <span class="material-symbols-outlined text-green"> north </span>
          <p v-if="authStore.role === 'admin'">
            <span class="text-green">%{{ userPercentage }}</span> of new users
            from last month
          </p>
          <p v-else>
            <span class="text-green">% {{ playerPercentage }}</span> of new
            players from last month
          </p>
        </div>
      </div>
      <div
        class="card-item item2 flex flex-col justify-between"
        v-if="authStore.role === 'customer'"
      >
        <div class="title-image flex flex-row justify-between">
          <div class="flex flex-col gap-2">
            <span class="card-title">Game Total:</span>
            <h2>{{ gameTotal }}</h2>
          </div>
          <div>
            <i class="material-icons text-5xl">sports_esports</i>
          </div>
        </div>
      </div>
      <div class="card-item item3 flex flex-col justify-between">
        <div class="title-image flex flex-row justify-between">
          <div class="flex flex-col gap-2">
            <span v-if="authStore.role === 'admin'" class="card-title"
              >Active user</span
            >
            <span v-else class="card-title">Active player</span>
            <h2 v-if="authStore.role === 'customer'">{{ activeTotal }}</h2>
            <h2 v-else>{{ acUserTotal }}</h2>
          </div>
          <div>
            <i class="material-icons text-5xl">online_prediction</i>
          </div>
        </div>
        <div class="desc flex flex-row items-center">
          <span class="material-symbols-outlined text-green"> north </span>
          <p v-if="authStore.role === 'customer'">
            <span class="text-green">%{{ activePercent }}</span> of active
            players from last month
          </p>
          <p v-else>
            <span class="text-green">%{{ acUserPercent }}</span> of active users
            from last month
          </p>
        </div>
      </div>
      <div
        class="card-item item4 flex flex-col justify-between"
        v-if="authStore.role === 'customer'"
      >
        <div class="title-image flex flex-row justify-between">
          <div class="flex flex-col gap-2">
            <span class="card-title">player session</span>
            <h2>{{ sessTotal }}</h2>
          </div>
          <div>
            <i class="material-icons text-5xl">play_circle_filled</i>
          </div>
        </div>
        <div class="desc flex flex-row items-center">
          <span class="material-symbols-outlined text-green"> north </span>
          <p>
            <span class="text-green">%{{ sessPercent }}</span> of player session
            from last month
          </p>
        </div>
      </div>
    </div>
    <div class="chart-container" v-if="authStore.role === 'admin'">
      <AdminDAU />
      <AdminMAU />
    </div>
    <div class="chart-container" v-if="authStore.role === 'customer'">
      <CustomerDAPHome />
      <CustomerMAPHome />
    </div>
  </div>
</template>
<script setup lang="ts">
import AdminDAU from "~/components/charts/AdminDAU.vue";
import AdminMAU from "~/components/charts/AdminMAU.vue";
import CustomerDAPHome from "../components/charts/CustomerDAPHome.vue";
import CustomerMAPHome from "../components/charts/CustomerMAPHome.vue";
import { onMounted, ref } from "vue";
import { callAPI } from "../composables/callAPI";
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
const playerPercentage = ref();
const gameTotal = ref();
const userPercentage = ref();
const sessPercent = ref();
const userTotal = ref();
const playerTotal = ref();
const sessTotal = ref();
const activeTotal = ref();
const activePercent = ref();
const acUserTotal = ref();
const acUserPercent = ref();
//======================= admin home page =======================//
const getUserTotal = async () => {
  const response = await callAPI(
    "/dashboard/analytics/admin/getSummaryOfUsers"
  );
  userPercentage.value = response.data.percentage;
  userTotal.value = response.data.total;
};
const getActiveUser = async () => {
  const response = await callAPI("/dashboard/analytics/admin/getSummaryOfAU");
  acUserTotal.value = response.data.total;
  acUserPercent.value = response.data.percentage;
};
//====================== customer home page ====================//
const getGameTotal = async () => {
  const response = await callAPI(
    "/dashboard/analytics/customer/getTotalOfGames"
  );
  gameTotal.value = response.data;
};

const getPlayerTotal = async () => {
  const response = await callAPI(
    "/dashboard/analytics/customer/getSummaryOfPlayers"
  );
  playerTotal.value = response.data.total;
  playerPercentage.value = response.data.percentage;
};

const getPlayerSession = async () => {
  const response = await callAPI(
    "/dashboard/analytics/customer/getGamePlaySessionsByUserId"
  );
  sessTotal.value = response.data.total;
  sessPercent.value = response.data.percentage;
};
const getActivePlayer = async () => {
  const response = await callAPI(
    "/dashboard/analytics/customer/getSummaryOfAP"
  );
  activeTotal.value = response.data.total;
  activePercent.value = response.data.percentage;
};

onMounted(() => {
  getGameTotal();
  getUserTotal();
  getPlayerTotal();
  getPlayerSession();
  getActivePlayer();
  getActiveUser();
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
  @apply p-3 bg-white rounded-lg border shadow-sm space-y-2 border-l-4 border-l-blue-500;
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
  /* border-left: 0.2rem solid rgb(58, 127, 255); */
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
