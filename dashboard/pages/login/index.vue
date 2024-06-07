<template>
    <div class="h-screen w-screen">
        <form action="" class="w-full h-full" @submit.prevent="login">
            <div class="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                <div class="bg-gray-50 w-full h-full shadow-xl flex flex-col items-center z-20  mx-auto">
                    <div
                        class="flex flex-col justify-center items-center w-full h-full md:mb-20 pl-3 pr-6 sm:px-0 max-w-[350px] md:max-w-lg mb-10">
                        <div class="block md:hidden text-center text-black select-none font-bold mb-10 space-y-5">
                            <h2 class="text-2xl">Welcome to</h2>
                            <h1 class="text-4xl">
                                Hera Dashboard
                            </h1>
                        </div>
                        <h2 class="text-center text-2xl md:text-3xl font-bold select-none mb-5 md:pb-10">Log in</h2>
                        <div class="flex flex-col justify-center space-y-4 md:space-y-8 w-full">
                            <div class="w-full space-y-2">
                                <label class="text-sm md:text-lg" for="">Email</label><br>

                                <input type="email" placeholder="Enter your email" v-model="email"
                                    @focus="clearErrors()"
                                    class="w-full h-12 md:h-14 text-sm md:text-md rounded-md py-2 px-4 bg-gray-200/50" />
                                <p v-if="isErrorEmail" class="text-red-500">{{ errEmailMsg }}</p>
                            </div>
                            <div class="w-full space-y-2 mb-5">
                                <label class="text-sm md:text-lg" for="">Password</label><br>
                                <input type="password" placeholder="Enter your password" v-model="password"
                                    @focus="clearErrors()"
                                    class="w-full h-12 md:h-14 text-sm md:text-md  rounded-md py-2 px-4 bg-gray-200/50 mb-1" />
                                <div class="flex justify-between">
                                    <div>
                                        <p v-if="isErrorPassword" class="text-red-500">{{ errPasswordMsg }}</p>
                                    </div>
                                    <NuxtLink to="/forgot-password" class="hover:text-blue-500 hover:underline">Forgot
                                        password?</NuxtLink>
                                </div>
                            </div>

                            <button
                                class="bg-[--primary-color] text-white h-14 border-none rounded-md w-full font-bold hover:bg-[#1e1e1e]/50 transition-all duration-300 ease-in-out"
                                @click="login">Login</button>

                        </div>
                    </div>
                </div>
                <div
                    class="bg-gray-100 p-[10px] z-1 flex flex-col items-center justify-center space-y-10 bg-login hidden md:flex">
                    <img src="/dxp_logo_white.png" alt="" class="w-[300px]">
                    <div class="w-1/2 h-[1px] bg-white/30"></div>
                    <div class="text-center text-white select-none font-bold pb-20 space-y-5">
                        <h2 class="text-2xl">Welcome to</h2>
                        <h1 class="text-4xl">
                            Hera Dashboard
                        </h1>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue';
const email = ref('');
const password = ref('');
const isErrorEmail = ref(false);
const isErrorPassword = ref(false);

const errEmailMsg = ref("");
const errPasswordMsg = ref("");
  onMounted(()=>{
          const token = localStorage.getItem('token')

          console.log(token);
          
          
          if (token) {
            
            window.location.href='/'
          }
      })
const clearErrors = () => {
    isErrorEmail.value = false;
    isErrorPassword.value = false;
    errEmailMsg.value = "";
    errPasswordMsg.value = "";
}

const login = async () => {

    if (!email.value.trim() || !password.value) {
        isErrorEmail.value = email.value.trim() == "" ? true : false;
        errEmailMsg.value = 'Please enter email address';
        isErrorPassword.value = password.value == "" ? true : false;
        errPasswordMsg.value = 'Please enter password';
        return;
    }


    let data = {
        email: email.value,
        password: password.value
    }
    const token = useCookie('token');
    const res = await callAPI('/dashboard/user/login', 'POST', data);
    console.log(res.status)
    if (res.status === 200) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Success",
            text: "You have logged in successfully.",
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            window.location.href = "/"
        }, 2000);
    } else {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Wrong credentials!",
            text: "Please check your email and password.",
            showConfirmButton: false,
            timer: 1500
        })
    }
    token.value = res.data.token
    localStorage.setItem("token", res.data.token);
}
</script>

<style scoped>
/* input {
    @apply ;
} */

.bg-login {
    background-color: #0A0401;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23636363'/%3E%3Cstop offset='1' stop-color='%230A0401'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23373432'/%3E%3Cstop offset='1' stop-color='%230A0401'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.material-symbols-outlined {
    font-size: 8rem;
}

::placeholder {
    color: #787171;
}
</style>