<template>
    <div class="flex justify-center items-center w-screen h-screen">
        <form action="" class="w-full px-5 md:max-w-[500px]">
            <div class="mb-16">
                <h1 class="text-3xl text-center font-bold">Reset Password</h1>
                <p class="text-center text-lg">Enter your email to reset password.</p>
            </div>
            <div>
                <h1 class="text-[20px] font-bold mb-3">Your Email</h1>
                <input type="email" @focus="clearErrors()" v-model="email" placeholder="Enter email"
                    class="w-full p-[10px] rounded-[10px] mb-2 border border-slate-300">
                <span class="text-red  ">{{ messErr }}</span>
                <p class="text-lg " v-if="!isStartTimer">The reset password link will be sent for you to reset a new password. Please do not
                    share this link to others.</p>
                <p class="text-center" v-else> Please wait for 1 hour before you can send again. We appreciate your patience and understanding.</p>
            </div>
            <div class="mt-12" @click.prevent="sendEmail()">
                <button class=" flex flex-row justify-center items-center w-full p-[10px] rounded-[10px] bg-[#292929] text-[20px] text-white " :style="isStartTimer?'background:grey !important;':''" :disabled="isStartTimer">
                    <Loading v-if="loading"></Loading>
                    <span v-else>
                        <TimerCounter v-if="isStartTimer" @event-time="handleTimer"></TimerCounter>
                        <span v-else>Submit</span>
                    </span>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { callAPI } from '../../composables/callAPI';
import Loading from "~/components/Loading.vue"
import TimerCounter from "~/components/TimerCounter.vue"
import Swal from 'sweetalert2';

const timeText:any = ref('00:00');
const isStartTimer = ref(false);
const loading = ref(false);
const email = ref('');
const messErr = ref('');
const sendEmail = async () => {
    const data = { email: email.value };
    loading.value = true
    const response = await callAPI('/dashboard/user/sendResetPassword', 'POST', data);
    if (response.code === 200) {
        loading.value = false
        Swal.fire({
            position: "center",
            icon: "success",
            text: "Please check your email.",
            showConfirmButton: false,
            timer: 1500
        });
        isStartTimer.value = true
        messErr.value = "";
    }
    else {
        messErr.value = "Email invalid";
        loading.value = false;
        isStartTimer.value = false

    }
    if (email.value == "") {
        messErr.value = "Email required";
        loading.value = false;
        isStartTimer.value = false

    }

    
}
const [minutesStr, secondsStr] = timeText.value.split(':');
  if (parseInt(minutesStr) == 0 && parseInt(secondsStr) == 0) {
    isStartTimer.value = false;
  
  }
const handleTimer = (timer:string)=>{
    timeText.value = timer
    const [minutesStr, secondsStr] = timeText.value.split(':');
  if (parseInt(minutesStr) == 0 && parseInt(secondsStr) == 0) {
    isStartTimer.value = false;
  
  }
}


const clearErrors = () => {
    messErr.value = "";
}
</script>