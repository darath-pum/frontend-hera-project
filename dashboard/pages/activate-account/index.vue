<template>
    <div class="flex justify-center items-center w-screen h-screen">
        <form action="" class=" w-[30rem]">
            <div class="mb-20">
                <h1 class="text-3xl text-center font-bold">Account Activation</h1>
                <p class="text-center text-lg">Enter new password for your account to activate account.</p>
            </div>
                <div>
                    <div class="flex justify-between m-2">
                        <h1 class="text-[20px] font-bold mb-3">Create password</h1>
                        <span class="material-symbols-outlined">visibility</span>
                    </div>
                    <input type="password" v-model="password" placeholder="Enter new password" class="w-[31rem] p-[16px] rounded-[10px]  border border-slate-300">
                </div>
                <div class="mt-12">
                    <div class="flex justify-between m-2">
                        <h1 class="text-[20px] font-bold mb-3">Comfirm password</h1>
                        <span class="material-symbols-outlined">visibility</span>
                    </div>
                    <input type="password" v-model="comfirmPassword"  placeholder="Enter comfirm password" class="w-[31rem] p-[16px] rounded-[10px] border border-slate-300">
                </div>
                <div class="mt-12" @click.prevent="activateAccount">
                    <button class="w-[31rem] p-[16px] rounded-[10px] bg-[#292929] text-[20px] text-white">Activate Account</button>
                </div>
        </form>
        <div class="absolute ml-[67rem] mb-[3rem]">
            <RequirePassword />
        </div>
    </div>
</template>

<script setup lang="ts">
import RequirePassword from '../../components/dialogs/RequirePassword.vue';
import { useRoute } from 'vue-router'
import { ref,onMounted } from 'vue';
import { callAPI } from '../../composables/callAPI';
const password = ref();
const comfirmPassword = ref();
const route = useRoute()
const isToken = ref(false);
const checkToken = async() => {
const data = {token:route.query.v_tkn};
const response = await callAPI("/dashboard/user/verifyActivateToken",'POST',data);
    if(response.status === 200 ){
        console.log("No expired.");
        isToken.value = true;
    }else {
        console.log("Token is expired.");
        isToken.value = false;
    }
}
const activateAccount = async () => {
   const  data = {
        token:route.query.v_tkn,
        password:password.value
    }
    const response = await callAPI("/dashboard/user/loginNewUser","POST",data);
    if(response.status === 200 && isToken.value && password.value === comfirmPassword.value){
        setTimeout(() => {
            window.location.href = "/login"
        }, 2000);
    }
}
onMounted(checkToken);
</script>