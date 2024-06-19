<template>
  <div class="flex justify-center items-center md:w-screen md:h-screen">
    <form action=""  class="w-full px-5 md:max-w-[500px]" v-if="!isToken">
      <div class="sm:mb-10 md:mb-20 lg:mb-20">
        <h1 class="text-3xl text-center font-bold">Account Activation</h1>
        <p class="text-center text-lg">
          Enter new password for your account to activate account.
        </p>
      </div>
      <div>
        <div class="flex justify-between m-2">
          <h1 class="text-[20px] font-bold mb-3">Create password</h1>
          <span class="material-symbols-outlined select-none cursor-pointer" v-if="isPassword" @click="visibility">visibility</span>
          <span class="material-symbols-outlined select-none cursor-pointer" v-if="!isPassword" @click="visOff">visibility_off</span>
        </div>
        <input
          @focus="inputSelected(true)"
          @blur="inputSelected(false)"
          :type="!isPassword ? 'password' : 'text'"
          v-model="password"
          @input="onInput"
          placeholder="Enter new password"
          class="w-full p-[10px]  rounded-[10px] border border-slate-300"
        />
        <span class="text-red ">{{ passErr }}</span>
      </div>
      <div class="mt-12">
        <div class="flex justify-between m-2">
          <h1 class="text-[20px] font-bold mb-3">Comfirm password</h1>
          <span class="material-symbols-outlined select-none cursor-pointer" v-if="isComPassword" @click="visComfirm">visibility</span>
          <span class="material-symbols-outlined select-none cursor-pointer" v-if="!isComPassword" @click="visOffComfirm">visibility_off</span>
        </div>
        <input
         @focus="clearErrors()"
          :type="!isComPassword ? 'password' : 'text'"
          v-model="comfirmPassword"
          placeholder="Enter comfirm password"
          class="w-full p-[10px]  rounded-[10px] border border-slate-300"
        />
        <span  class="text-red">{{ passComfirmErr }}</span>
      </div>
      <div class="block min-sm:hidden md:block lg:hidden mt-6">
          <PassRequireForm :isLengthValid="isLengthValid" :hasUppercase="hasUppercase" :hasLowercase="hasLowercase"
          :hasDigit="hasDigit" :hasSpecialChar="hasSpecialChar" />
      </div>
      <div class="mt-12" @click.prevent="activateAccount">
        <button
          class="flex flex-row justify-center items-center  w-full p-[10px]  rounded-[10px] bg-[#292929] text-[20px] text-white"
        >
        <Loading v-if="loading"></Loading>
        <span v-else>Activate Account</span>
          
        </button>
      </div>
    </form>
    <div v-if="isToken && !isLoading">
      <div class="flex justify-center items-center flex-col w-[30rem] ">
        <span class="material-symbols-outlined text-[8rem] text-red mb-10 select-none">cancel</span>
        <h1 class="text-2xl mb-5">Activation Link Expired</h1>
        <p class="text-center">Your activation link has expired. Please request a new activation link or contact support for assistance.</p>
      </div>
    </div>
    <div class="absolute ml-[57rem] mb-[3.5rem] dialog-container hidden min-sm:block md:hidden lg:block" :class="{ 'show-dialog': showDialog }">
    <RequirePassword
        :isLengthValid="isLengthValid"
        :hasUppercase="hasUppercase"
        :hasLowercase="hasLowercase"
        :hasDigit="hasDigit"
        :hasSpecialChar="hasSpecialChar"
    />
</div>
  </div>
</template>

<script setup lang="ts">
import RequirePassword from "../../components/dialogs/RequirePassword.vue";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { callAPI } from "../../composables/callAPI";
import { usePasswordValidation } from "../../composables/usePasswordValidation";
import PassRequireForm from "~/components/PassRequireForm.vue";
import Swal from 'sweetalert2';
import Loading from "~/components/Loading.vue"
const loading = ref(false)
const password = ref();
const isPassword = ref(false);
const isComPassword = ref(false);
const comfirmPassword = ref();
const route = useRoute();
const isToken = ref(false);
const isLoading = ref(true);
const passErr = ref('');
const passComfirmErr = ref('');
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
    "/dashboard/user/verifyActivateToken",
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

const activateAccount = async () => {
  const data = {
    token: route.query.v_tkn,
    password: password.value,
  };
  loading.value = true
  const response = await callAPI("/dashboard/user/loginNewUser", "POST", data);
  
  if (
    response.code === 200 &&
    isToken.value &&
    password.value === comfirmPassword.value &&
    hasUppercase.value &&
    hasLowercase.value &&
    hasDigit.value && 
    isLengthValid &&
    hasSpecialChar.value 
  ) {
    loading.value = false
  Swal.fire({
      position: "center",
      icon: "success",
      title: "Success",
      text: "You have activated account in successfully.",
      showConfirmButton: false,
      timer: 1500
        });
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  }else {
    loading.value = false;
  }
  if(comfirmPassword.value !== password.value) {
    passComfirmErr.value = "Password not matching";
  }else {
    passComfirmErr.value = ''
  }
  if( hasUppercase.value &&
    hasLowercase.value &&
    hasDigit.value && 
    hasSpecialChar.value &&
    isLengthValid.value) {
    showDialog.value = false;
  }else {
    showDialog.value = true;
    passErr.value = "Please enter a password that meets our security standard";
  }
 
};

const visibility = () =>{
    isPassword.value = false;
}
const visOff = () =>{
    isPassword.value = true;
    }
const visComfirm = ()=>{
    isComPassword.value = false;
    }
const visOffComfirm = ()=>{
    isComPassword.value = true;
}
const inputSelected = (selected:boolean) =>{
  showDialog.value = selected;
  passErr.value = "";
}
const clearErrors =()=> {
  passComfirmErr.value = "";
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