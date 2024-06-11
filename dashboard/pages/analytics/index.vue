<template>
  <div v-if="gameLists.length === 0 && !isLoading" class="flex justify-center mt-[10rem]">
    <div>
      <span
        class="material-symbols-outlined text-[8rem] text-red select-none flex justify-center"
        >cancel</span
      >
      <h1 class="text-[2rem]">No Game Found</h1>
      <p class="flex justify-center">You don't have a game</p>
    </div>
  </div>
  <div class="pb-15 container" v-if="gameLists.length !== 0">
    <div v-if="authStore.role === 'customer'">
      <label for="game-select" class="text-black">Choose a game:</label><br />
      <select
        name="games"
        id="game-select"
        @change.prevent="handleSelect($event)"
        class="border bord"
      >
        <option value="Select game" disabled selected>Select game</option>
        <option
          v-for="game in gameLists"
          :key="game.id"
          :value="game.id"
          :selected="
            typeof $route.query.gameId === 'string' &&
            parseInt($route.query.gameId) === game.id
          "
        >
          {{ game.title }}
        </option>
      </select>
    </div>
    <div v-if="authStore.role === 'customer'" class="space-y-3 lg:space-y-5">
      <div>
        <div class="chart-container">
          <CustomerDAP />
          <CustomerMAP />
        </div>
        <div class="chart-container">
          <SessionDAP />
          <SessionMAP />
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
  </div>
</template>

<script setup lang="ts">
import CustomerDAP from "~/components/charts/CustomerDAP.vue";
import CustomerMAP from "~/components/charts/CustomerMAP.vue";
import SessionDAP from "~/components/charts/SessionDAP.vue";
import SessionMAP from "~/components/charts/SessionMAP.vue";
import AdminDAU from "~/components/charts/AdminDAU.vue";
import AdminMAU from "~/components/charts/AdminMAU.vue";
import { onMounted, ref } from "vue";
import { useAuthStore } from "~/store/auth";
import { callAPI } from "../../composables/callAPI";
import { useRoute } from "vue-router";

const route = useRoute();
const gameLists = ref<IGame[]>([]);
const authStore = useAuthStore();
const gameId = ref();
const isLoading = ref(true);
//===================== get user's game ======================//
const getGame = async () => {
  isLoading.value = true
  const response = await callAPI(
    `/dashboard/game/user/getUserGames/${authStore.id}`
  );
  const games = response.data;
  for (let i = 0; i < games.length; i++) {
    gameLists.value.push(games[i]);
    gameId.value = games[0].id;
  }
  isLoading.value = false;
};

//====================== select game option ================//
const handleSelect = (event: any) => {
  const selectedGameId = event.target.value;
  window.location.href = `/analytics?gameId=${selectedGameId}`;
};

onMounted(async () => {
  await getGame();

  if (!route.query.gameId && gameLists.value.length !== 0) {
    window.location.href = `/analytics?gameId=${gameId.value}`;
  }
});
</script>

<style scoped>
.chart-container {
  @apply grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-3 lg:gap-5;
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
  background: #ffffff;
  border-radius: var(--radius);
  @apply shadow-sm;
}
</style>
