<template>
  <div
    class="form-container max-sm:bg-[#91c6c6] flex justify-center items-center w-screen h-screen">
    <form
      action=""
      class="bg-[#91c6c6] w-full px-5 lg:px-8 pb-16 pt-12 md:max-w-[500px]"
    >
      <h2 class="text-4xl text-center mb-3 text-white">Register</h2>
      <div class="flex justify-center items-center">
        <img :src="games.img_url" alt="" />
      </div>
      <div>
        <span class="text-red-500 ml-1">{{ firstNameErr }}</span
        ><br />
        <i class="material-icons absolute mt-2 ml-2 select-none text-gray-500">person</i>
        <input
          @focus="clearErrFirst()"
          v-model="firstName"
          class="p-2 rounded-xl w-full pl-10"
          type="text"
          placeholder="First name"
        />
        <div class="mt-3">
          <span class="text-red-500 ml-1">{{ lastNameErr }}</span
          ><br />
          <i class="material-icons absolute mt-2 ml-2 select-none text-gray-500">person</i>
          <input
            @focus="clearErrlast()"
            v-model="lastName"
            class="p-2 rounded-xl w-full pl-10"
            type="text"
            placeholder="Last name"
          />
        </div>
        <div class="mt-3">
          <span class="text-red-500 ml-1">{{ phoneNumberErr }}</span
          ><br />
          <i class="material-icons absolute mt-2 ml-2 select-none text-gray-500">call</i>
          <input
            @focus="clearErrPhone()"
            v-model="phoneNumber"
            class="p-2 rounded-xl w-full pl-10"
            type="text"
            placeholder="Phone number"
          />
        </div>
        <div @click.prevent="playerLogin" class="mt-9">
          <button
            class="bg-teal-700 text-white select-none p-2 rounded-xl w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const route = useRoute();
const firstName = ref("");
const lastName = ref("");
const phoneNumber = ref("");
const firstNameErr = ref("");
const lastNameErr = ref("");
const phoneNumberErr = ref("");
const games = ref<any>('');
const playerLogin = async () => {
  const players = {
    user_game_id: Number(route.query.game_id),
    first_name: firstName.value,
    last_name: lastName.value,
    phone_number: phoneNumber.value,
  };
  try {
    const res: any = await $fetch(
      "http://192.168.11.122:3200/client/player/playerRegister",
      {
        method: "POST",
        body: JSON.stringify(players),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    window.location.href = res.data;
  } catch (err) {
    if (firstName.value === "") {
      firstNameErr.value = "First name is require*";
    }
    if (lastName.value === "") {
      lastNameErr.value = "Last name is require*";
    }
    const phoneRegex = /^0\d{8,9}$/;
    if (!phoneRegex.test(phoneNumber.value)) {
      phoneNumberErr.value = "Phone number is invalid*";
    }
    if (phoneNumber.value === "") {
      phoneNumberErr.value = "Phone number is require*";
    }
  }
};

const getGamebyId = async () => {
  try {
    const res: any = await $fetch(
      `http://192.168.11.122:3200/dashboard/game/getUserGameInfo/${route.query.game_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    games.value = res.data;
  } catch (err) {}
};
const clearErrFirst = () => {
  firstNameErr.value = "";
};
const clearErrlast = () => {
  lastNameErr.value = "";
};
const clearErrPhone = () => {
  phoneNumberErr.value = "";
};

onMounted(() => {
  getGamebyId();
});
</script>

<style scoped>
h1,
img {
  user-select: none;
}
img {
  width: 150px;
  height: 150px;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 2px solid teal;
}
</style>
