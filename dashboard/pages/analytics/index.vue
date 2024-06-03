<template>
  <div v-if="userRole === 'customer'">
    <label for="pet-select" class="text-black">Choose a game:</label><br />
    <select name="pets" id="pet-select" @change.prevent="handleSelect($event)">
      <option value="">--Please choose an game--</option>
      <option v-for="game in gameLists" :key="game.id" :value="game.id">
        {{ game.title }}
      </option>
    </select>
  </div>
  <div v-if="userRole === 'customer'">
    <div class="charts flex flex-row justify-between">
      <CustomerDAP />
      <CustomerMAP />
    </div>
    <div class="charts flex flex-row justify-between">
      <SessionDAP />
      <SessionMAP />
    </div>
  </div>
  <div v-if="userRole === 'admin'">
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
import { useSharedState } from "../../composables/useShareState";
const userRole = ref("");
const customerId = ref();
const gameLists = ref([]);
// const campaigns = ref<ICampaign[]>([]);
const getUserSession = async () => {
  try {
    const response = await callAPI("/dashboard/user/getUserSession");
    userRole.value = response.data.role;
    customerId.value = response.data.id;
  } catch {}
};
const getGame = async () => {
  try {
    const response = await callAPI(
      `/dashboard/game/user/getUserGames/${customerId.value}`
    );
    const games = response.data;
    for (let i = 0; i < games.length; i++) {
      gameLists.value.push(games[i]);
    }
  } catch {}
};
onMounted(async () => {
  await getUserSession();
  await getGame();
});

const { setSharedValue } = useSharedState();
const handleSelect = (event: any) => {
  const selectedGameId = event.target.value;
  if (selectedGameId) {
    setSharedValue(selectedGameId);
  }
};
</script>

<style scoped>
.charts {
  margin-top: 2.4rem;
  /* gap: 3rem; */
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
