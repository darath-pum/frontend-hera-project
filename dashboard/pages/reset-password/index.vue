<template>
  <div class="flex justify-center items-center md:w-screen md:h-screen">
    <form action="" class="w-full px-5 md:max-w-[500px]" v-if="isToken">
      <div class="mb-11 mt-5">
        <h1 class="text-3xl text-center font-bold">Reset Password</h1>
        <p class="text-center text-lg">Enter new password to reset password.</p>
      </div>
      <div>
        <div class="flex justify-between m-2">
          <h1 class="text-[20px] font-bold mb-3">New Password</h1>
          <span class="material-symbols-outlined select-none cursor-pointer" v-if="isPassword"
            @click="visibility">visibility</span>
          <span class="material-symbols-outlined select-none cursor-pointer" v-if="!isPassword"
            @click="visOff">visibility_off</span>
        </div>
        <input @focus="inputSelected(true)" @blur="inputSelected(false)" :type="!isPassword ? 'password' : 'text'"
          @input="onInput" v-model="password" placeholder="Enter new password"
          class="w-full p-[10px] rounded-[10px] border border-slate-300" />
          <span class="text-red ">{{ passErr }}</span>
      </div>
      <div class="mt-12">
        <div class="flex justify-between m-2">
          <h1 class="text-[20px] font-bold mb-3">Comfirm Password</h1>
          <span class="material-symbols-outlined select-none cursor-pointer" v-if="isComPassword"
            @click="visComfirm">visibility</span>
          <span class="material-symbols-outlined select-none cursor-pointer" v-if="!isComPassword"
            @click="visOffComfirm">visibility_off</span>
        </div>
        <input @focus="clearErrors()" :type="!isComPassword ? 'password' : 'text'" v-model="comfirmPassword"
          placeholder="Enter comfirm password" class="w-full p-[10px] rounded-[10px] border border-slate-300" />
        <span class="text-red">{{ comfirmPassErr }}</span>
      </div>
      <div class="block min-sm:hidden md:block lg:hidden mt-6">
          <PassRequireForm :isLengthValid="isLengthValid" :hasUppercase="hasUppercase" :hasLowercase="hasLowercase"
          :hasDigit="hasDigit" :hasSpecialChar="hasSpecialChar" />
      </div>
      <div class="mt-12" @click.prevent="resetPassword()">
        <button class="flex flex-row justify-center items-center w-full p-[10px] rounded-[10px] bg-[#292929] text-[20px] text-white">
          <Loading v-if="loading"></Loading>
          <span v-else>Reset Password</span>
        </button>
      </div>
    </form>
    <div v-if="!isToken && !isLoading">
      <div class="flex justify-center items-center flex-col w-[30rem] ">
        <span class="material-symbols-outlined text-[8rem] text-red mb-10 select-none">cancel</span>
        <h1 class="text-2xl mb-7">Link is expired</h1>
        <p>To reset your password, return to the login page and select "Forgot Your Passoword" to send a new email.</p>
        <NuxtLink to="/login"> <button class="bg-black p-[10px] w-[30rem] mt-7 rounded-[10px]">Go to login</button>
        </NuxtLink>
      </div>
    </div>
    <div class="absolute ml-[57rem] mb-[3.5rem] dialog-container hidden min-sm:block md:hidden lg:block" :class="{ 'show-dialog': showDialog }">
      <RequirePassword :isLengthValid="isLengthValid" :hasUppercase="hasUppercase" :hasLowercase="hasLowercase"
        :hasDigit="hasDigit" :hasSpecialChar="hasSpecialChar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import RequirePassword from "../../components/dialogs/RequirePassword.vue";
import Loading from "~/components/Loading.vue";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { callAPI } from "../../composables/callAPI";
import { usePasswordValidation } from "../../composables/usePasswordValidation";
import PassRequireForm from "~/components/PassRequireForm.vue";

const loading = ref(false)
const isLoading = ref(true);
const isPassword = ref(false);
const isComPassword = ref(false);
const password = ref();
const comfirmPassword = ref();
const route = useRoute();
const isToken = ref(false);
const passErr = ref("");
const comfirmPassErr = ref("");
const showDialog = ref(false);
const {
  isLengthValid,
  hasUppercase,
  hasLowercase,
  hasDigit,
  hasSpecialChar,
  validatePassword,
} = usePasswordValidation();

const onInput = () => {
  validatePassword(password.value);
};

//============= Check token =============//
const checkToken = async () => {
  const data = { token: route.query.v_tkn };
  const response = await callAPI(
    "/dashboard/user/verifyResetToken",
    "POST",
    data
  );

  if (response.code === 200) {
    isToken.value = true;
  } else {
    isToken.value = false;

  }
  isLoading.value = false;
};

const resetPassword = async () => {
  const data = {
    token: route.query.v_tkn,
    new_password: password.value,
  };
  loading.value = true
  const response = await callAPI(
    "/dashboard/user/resetUserPassword",
    "PUT",
    data
  );

  if (
    response.code === 200 &&
    isToken.value &&
    hasUppercase.value &&
    hasLowercase.value &&
    hasDigit.value &&
    hasSpecialChar.value &&
    isLengthValid.value &&
    password.value === comfirmPassword.value
  ) {
    loading.value = false
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success",
      text: "You have reseted password in successfully.",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  }
  else {
    loading.value = false;
  }
  if (comfirmPassword.value !== password.value) {
    comfirmPassErr.value = "Password not matching";
  } else {
    comfirmPassErr.value = ''
  }
  if (hasUppercase.value &&
    hasLowercase.value &&
    hasDigit.value &&
    hasSpecialChar.value &&
    isLengthValid.value) {
    showDialog.value = false;
  } else {
    passErr.value = "Please enter a password that meets our security standard";
    showDialog.value = true
  }

};

const visibility = () => {
  isPassword.value = false;
}
const visOff = () => {
  isPassword.value = true;
}
const visComfirm = () => {
  isComPassword.value = false;
}
const visOffComfirm = () => {
  isComPassword.value = true;
}

const inputSelected = (selected:boolean) => {
  showDialog.value = selected;
  passErr.value = ""; 
}
const clearErrors = () => {
  comfirmPassErr.value = "";
}


onMounted(() => {
  localStorage.removeItem("token");
  checkToken();

});
</script>


<style scoped>
.dialog-container {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.show-dialog {
  opacity: 1;
  transform: translateY(0);
}
</style>
