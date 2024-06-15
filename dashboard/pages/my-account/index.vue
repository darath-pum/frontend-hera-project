<template>
    <div class="flex flex-row user-pf">
        <div class="pf-bar-left flex flex-col gap-10 w-[30rem] bg-[#D6DAC8] p-5">
            <div class="w-full text-end">
                <button class=" bg-red p-2 w-24 rounded-full capitalize"
                    :class="{ 'bg-green p-2 w-24 rounded-full capitalize': authStore.role == 'admin' }">{{
                        authStore.role }}</button>

            </div>
            <div class="flex flex-col justify-center items-center">
                <div class="profile-image m-auto">
                    <input type="file" @change="handleImage"
                        class="w-52 h-52 absolute rounded-full opacity-0 cursor-pointer bg-red"
                        style="border-radius: 100%;">
                    <img :src="pf_image" alt="" class="w-52 h-52 rounded-full object-cover bg-gray-50/50">
                </div>
                <span
                    class="material-symbols-outlined bg-[#FFBF78] w-10 h-10 p-1 flex flex-row justify-center items-center rounded-full -mt-12 ml-32">
                    edit
                </span>
                <input type="file" @change="handleImage"
                    class="material-symbols-outlined absolute  bg-[#FFBF78] w-10 h-10 p-1 flex flex-row justify-center items-center rounded-full mt-40 ml-32 opacity-0 cursor-pointer"
                    style="border-radius: 100%;">

            </div>
            <h1 class="pf-name">{{ authStore.first_name }} {{ authStore.last_name }}</h1>
            <div class="flex flex-col gap-5">
                <!-- <button class="secondary-btn flex flex-row gap-5">
                    <span class="material-symbols-outlined">
                        lock_reset
                    </span>
                    <span>Reset password</span>
                </button> -->
                <button class="secondary-btn flex flex-row gap-5" @click="logout">
                    <span class="material-symbols-outlined">
                        logout
                    </span>
                    <span>Log out</span>
                </button>
            </div>
        </div>
        <div class="pf-right w-full pt-15 flex flex-col items-center gap-10 px-[15%]">
            <div class="first-name w-full flex flex-row justify-between items-center ">
                <label for="">First name:</label>
                <input type="text" class="p-2 border w-[70%]" v-model="first_name">
            </div>
            <div class="first-name w-full flex flex-row justify-between items-center">
                <label for="">Last name:</label>
                <input type="text" class="p-2 border w-[70%]" v-model="last_name">
            </div>
            <div class="first-name w-full flex flex-row justify-between items-center">
                <label for="">Email:</label>
                <input type="email" class="p-2 border w-[70%]" v-model="authStore.email" disabled>
            </div>
            <div class="flex flex-row justify-end w-full">
                <button class="primary-btn" @click="updateUserInfo">Save changes</button>
            </div>
            <div class="pf-h-change-pass">
                <h1>Change Password</h1>
            </div>
            <div class="first-name w-full flex flex-row justify-between items-center">
                <label for="">Current password:</label>
                <input type="password" class="p-2 border w-[70%]" v-model="old_password" >
            </div>
            <div class="first-name w-full flex flex-row justify-between items-center">
                <label for="">New password:</label>
                <div class="w-[70%] input-pass">
                    <input type="text" class="p-2 border w-full" v-model="new_password" v-if="isShowPassword" autocomplete="off" placeholder="">
                    <input type="password" class="p-2 border w-full" v-model="new_password" v-else>
                    <div class="p-2 -mt-10 w-[full] rounded flex flex-row justify-end items-center">
                        <span class="material-symbols-outlined cursor-pointer"  v-if="!isShowPassword" @click="showPassword(true)">
                            visibility_off
                        </span>
                        <span class="material-symbols-outlined cursor-pointer" v-else @click="showPassword(false)">
                            visibility
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-end w-full">
                <button class="primary-btn" @click="changePassword">Save changes</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/store/auth'
import Swal from 'sweetalert2'
const authStore = useAuthStore();
const pf_image = ref('')
const first_name = ref(authStore.first_name)
const last_name = ref(authStore.last_name)
const old_password = ref('')
const new_password = ref('')
const isShowPassword = ref(false)
const showPassword = (isShow:boolean) => {
    isShowPassword.value = isShow
}

onMounted(() => {
    pf_image.value = authStore.pf_img_url
})

const handleImage = async (e: any) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('pf_img_url', file)
    const res = await callAPI('/dashboard/user/updateUserProfileImage', 'PUT', formData);
    window.location.reload();
}
const updateUserInfo = async () => {
    let body = {
        first_name: first_name.value,
        last_name: last_name.value
    }
    const res = await callAPI('/dashboard/user/updateUserInfos', 'PUT', body);
    if (res.status == 200) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Success",
            text: "You have updated user info successed.",
            showConfirmButton: false,
            timer: 1500
        });
        window.location.reload();
    }

}

const changePassword = async () => {
    let body = {
        old_password: old_password.value,
        new_password: new_password.value
    }
    const res = await callAPI('/dashboard/user/updateUserPassword', 'PUT', body)
    console.log(res);
    
    if (res.status == 200) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Success",
            text: "You have changed password successed.",
            showConfirmButton: false,
            timer: 1500
        });
        window.location.reload();
    }else{
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Fail",
            text: "Password is incorrect.",
            showConfirmButton: false,
            timer: 1500
        });
    }

}

const logout = async () => {
    const res = await callAPI('/dashboard/user/logout', 'POST')
    console.log(res);


    localStorage.removeItem("token");
    window.location.href = ('/login')

}

</script>
<style scoped>
.pf-name,
.pf-h-change-pass {
    font-size: 1.5rem;
    font-weight: 600;
    color: dimgray;
    text-align: center;
}

.pf-bar-left {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

input {
    border-radius: 5px;
    border: 1px solid var(--primary-color) !important;
}

label {
    width: 14rem;
    font-size: 1.3rem;
}
@media (max-width: 70.5rem) {
    .user-pf{
        display: flex;
        flex-direction: column !important;
    }
    .pf-bar-left{
        width: 100%;
        height: 31rem !important;
    }
    .pf-right{
        padding: 3rem 1.5rem !important;


    }
    .pf-right div{
        display: flex;
        flex-direction: column !important;
        /* background: #000; */

    }
    input,.input-pass,.input-pass input, .input-pass div{
        width: 100%;
    }
    .input-pass input{
        z-index: 10;
    }
    .input-pass div{
        display: flex;
        flex-direction: row !important;
        justify-content: flex-end !important;
        
    }
    label {
    width: 100%;
    text-align: start;
    font-size: 1rem;
    
}

}
</style>