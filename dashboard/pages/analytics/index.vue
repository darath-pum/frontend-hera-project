<template>
    <div v-if="authStore.role === 'customer'">
      <label for="game-select" class="text-black">Choose a game:</label><br />
    <select name="games" id="game-select" @change.prevent="handleSelect($event)">
        <option value="--Please choose a game--" disabled selected>--Please choose a game--</option>
        <option v-for="game in gameLists" :key="game.id" :value="game.id"  :selected="typeof $route.query.gameId === 'string' && parseInt($route.query.gameId) === game.id">
            {{ game.title }}
        </option>
    </select>
    </div>
    <div v-if="authStore.role === 'customer'">
      <div class="charts flex flex-row justify-between">
        <CustomerDAP />
        <CustomerMAP />
      </div>
      <div class="charts flex flex-row justify-between">
        <SessionDAP />
        <SessionMAP />
      </div>
    </div>
    <div v-if="authStore.role === 'admin'">
      <div>
        <h1 class="text-black text-2xl">Overview</h1>
      </div>
      <div class="charts flex flex-row justify-between">
        <AdminDAC />
        <AdminMAC />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import CustomerDAP from "~/components/charts/CustomerDAP.vue";
  import CustomerMAP from "~/components/charts/CustomerMAP.vue";
  import SessionDAP from "~/components/charts/SessionDAP.vue";
  import SessionMAP from "~/components/charts/SessionMAP.vue";
  import AdminDAC from "~/components/charts/AdminDAC.vue";
  import AdminMAC from "~/components/charts/AdminMAC.vue";
  import { onMounted } from "vue";
  import { useAuthStore } from "~/store/auth";
  const gameLists = ref<IGame[]>([]);
  const authStore = useAuthStore();

  //===================== get user's game ======================//
  const getGame = async () => {
    try {
      const response = await callAPI(
        `/dashboard/game/user/getUserGames/${authStore.id}`
      );
      const games = response.data;
      
      for (let i = 0; i < games.length; i++) {
          gameLists.value.push(games[i]);
      }
    } catch {}
  };
  
  
//====================== select game option ================//
  const handleSelect = (event: any) => {
    const selectedGameId = event.target.value;
    window.location.href=(`/analytics?gameId=${selectedGameId}`)
  
  };
  onMounted(async () => {
    await getGame();
  });
  </script>
  
  <style scoped>
  .charts {
    margin-top: 2.4rem;
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
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
      rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  }
  </style>