<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <form action="" class="w-[30rem]">
      <div class="mb-20">
        <h1 class="text-3xl text-center font-bold">Account Activation</h1>
        <p class="text-center text-lg">
          Enter new password for your account to activate account.
        </p>
      </div>
      <div>
        <div class="flex justify-between m-2">
          <h1 class="text-[20px] font-bold mb-3">Create password</h1>
          <span class="material-symbols-outlined select-none" v-if="isPassword" @click="visibility">visibility</span>
          <span class="material-symbols-outlined select-none" v-if="!isPassword" @click="visOff">visibility_off</span>

        </div>
        <input
          @focus="inputSelected(true)"
          @blur="inputSelected(false)"
          :type="!isPassword ? 'password' : 'text'"
          v-model="password"
          @input="onInput"
          placeholder="Enter new password"
          class="w-[31rem] p-[16px] rounded-[10px] border border-slate-300"
        />
      </div>
      <div class="mt-12">
        <div class="flex justify-between m-2">
          <h1 class="text-[20px] font-bold mb-3">Comfirm password</h1>
          <span class="material-symbols-outlined select-none" v-if="isComPassword" @click="visComfirm">visibility</span>
          <span class="material-symbols-outlined select-none" v-if="!isComPassword" @click="visOffComfirm">visibility_off</span>
        </div>
        <input
         @focus="clearErrors()"
          :type="!isComPassword ? 'password' : 'text'"
          v-model="comfirmPassword"
          placeholder="Enter comfirm password"
          class="w-[31rem] p-[16px] rounded-[10px] border border-slate-300"
        />
        <span  class="text-red">{{ messageErr }}</span>
      </div>
      <div class="mt-12" @click.prevent="activateAccount">
        <button
   
   
          class="w-[31rem] p-[16px] rounded-[10px] bg-[#292929] text-[20px] text-white"
        >
          Activate Account
        </button>
      </div>
    </form>
    <div class="absolute ml-[67rem] mb-[3rem] dialog-container" :class="{ 'show-dialog': showDialog }">
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
import Swal from 'sweetalert2';
const password = ref();
const isPassword = ref(false);
const isComPassword = ref(false);
const comfirmPassword = ref();
const route = useRoute();
const isToken = ref(false);
const messageErr = ref('');
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
    console.log("Token is expired.");
  }
};

const activateAccount = async () => {
  const data = {
    token: route.query.v_tkn,
    password: password.value,
  };
  const response = await callAPI("/dashboard/user/loginNewUser", "POST", data);
  
  if (
    response.code === 200 &&
    isToken.value &&
    password.value === comfirmPassword.value &&
    hasUppercase.value &&
    hasLowercase.value &&
    hasDigit.value && 
    hasSpecialChar.value 
  ) {
  Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Success",
      text: "You have activated account in successfully.",
      showConfirmButton: false,
      timer: 1500
        });
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  }
  if(comfirmPassword.value !== password.value) {
    messageErr.value = "Password not matching";
  }else {
    messageErr.value = ''
  }
  if( hasUppercase.value &&
    hasLowercase.value &&
    hasDigit.value && 
    hasSpecialChar.value &&
    isLengthValid.value) {
    showDialog.value = false;
  }else {
    showDialog.value = true
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
const inputSelected = (selected) =>{
  showDialog.value = selected;
}
const clearErrors =()=> {
  messageErr.value = "";
}

onMounted(checkToken);
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