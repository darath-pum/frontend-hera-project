<template>
    <div class="flex flex-row user-pf">
        <div class="pf-bar-left flex flex-col gap-5 w-[30rem] pt-10 px-8">

            <div class="flex flex-col justify-center items-center">
                <div class="profile-image m-auto">
                    <input type="file" @change="handleImage"
                        class="absolute rounded-full opacity-0 cursor-pointer bg-red"
                        style="border-radius: 100%; width: 13rem; height: 13rem;">
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
            <div class="w-full text-center -mt-2">
                <button class=" bg-grey p-1 w-24 rounded-full capitalize"
                    :class="{ 'bg-grey p-1 w-24 rounded-full capitalize': authStore.role == 'admin' }">{{
                        authStore.role }}</button>

            </div>
            <div class="flex flex-col gap-5">
                <!-- <button class="secondary-btn flex flex-row gap-5">
                    <span class="material-symbols-outlined">
                        lock_reset
                    </span>
                    <span>Reset password</span>
                </button> -->
                <button class="primary-btn flex flex-row gap-5 mt-5" @click="logout">
                    <span class="material-symbols-outlined">
                        logout
                    </span>
                    <span>Log out</span>
                </button>
            </div>
        </div>
        <div class="pf-right w-full pt-10 flex flex-col items-center gap-10 px-[15%]">
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
            <div class="pf-btn flex flex-row justify-end w-full">
                <button
                    :class="first_name != authStore.first_name || last_name != authStore.last_name ? 'primary-btn' : 'disable-btn'"
                    @click="updateUserInfo">Save info</button>
            </div>
            <div class="pf-h-change-pass">
                <h1>Change Password</h1>
            </div>
            <div class="first-name w-full flex flex-row justify-between items-center">
                <label for="">Current password:</label>
                <input type="password" class="p-2 border w-[70%]" v-model="old_password">
            </div>
            <div class="first-name w-full flex flex-row justify-between items-center relative">
                <label for="">New password:</label>
                <div class="w-[70%] input-pass">
                    <input type="text" class="p-2 border w-full" v-model="new_password" v-if="isShowPassword"
                        autocomplete="off" placeholder="" @input="onInput()">
                    <input type="password" class="p-2 border w-full" v-model="new_password" v-else @input="onInput()">
                    <div class="show-pass-icon p-2 -mt-10 w-[full] rounded flex flex-row justify-end items-center">
                        <span class="material-symbols-outlined cursor-pointer" v-if="!isShowPassword"
                            @click="showPassword(true)">
                            visibility_off
                        </span>
                        <span class="material-symbols-outlined cursor-pointer" v-else @click="showPassword(false)">
                            visibility
                        </span>
                    </div>
                    <div v-if="!isPasswordChecked"
                        class="flex flex-col  pass-validtion px-4 py-3 rounded pointer-events-none gap-3">
                        <h1 class="font-semibold">Password must be:</h1>
                        <div class="flex flex-row items-center gap-3">
                            <input id="pass-checkbox" type="checkbox" :checked="hasUppercase">
                            <span for="">Uppercase <span>A-Z</span></span>
                        </div>

                        <div class="flex flex-row items-center gap-3">
                            <input id="pass-checkbox" type="checkbox" :checked="hasLowercase">
                            <span for="">Lowercase <span>a-z</span></span>
                        </div>
                        <div class="flex flex-row items-center gap-3">
                            <input id="pass-checkbox" type="checkbox" :checked="hasSpecialChar">
                            <span for="">Special charecter <span>[! @ # $ % ^ & *]</span></span>
                        </div>
                        <div class="flex flex-row items-center gap-3">
                            <input id="pass-checkbox" type="checkbox" :checked="hasDigit">
                            <span for="">Number or digit <span>0-9</span></span>
                        </div>
                        <div class="flex flex-row items-center gap-3">
                            <input id="pass-checkbox" type="checkbox" :checked="isLengthValid">
                            <span for="">8 characters long</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pf-btn flex flex-row justify-end w-full">
                <button :class="isPasswordChecked == true && new_password !== '' ? 'primary-btn' : 'disable-btn'"
                    @click="changePassword">Save password</button>
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
const showPassword = (isShow: boolean) => {
    isShowPassword.value = isShow

}
const isPasswordChecked = ref(true)
const {
    isLengthValid,
    hasUppercase,
    hasLowercase,
    hasDigit,
    hasSpecialChar,
    validatePassword,
} = usePasswordValidation();

const onInput = () => {
    isPasswordChecked.value = false
    validatePassword(new_password.value);
    if (isLengthValid.value == true && hasUppercase.value == true &&
        hasLowercase.value == true &&
        hasDigit.value == true &&
        hasSpecialChar.value == true) {
        isPasswordChecked.value = true
    }
};


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
    if (isLengthValid.value == false && hasUppercase.value == false &&
        hasLowercase.value == false &&
        hasDigit.value == false &&
        hasSpecialChar.value == false) {
        return;
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
    }
    else {
        if (res.code == 404) {
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

}

function removeItem(item: string) {
    if (process.client) {
        localStorage.removeItem(item)
        return true
    } else {
        return false
    }
}

const logout = async () => {
    const res = await callAPI('/dashboard/user/logout', 'POST')
    console.log(res);



    removeItem('token')

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
    background: #EEEEEE;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    height: 100vh;
}

input {
    border-radius: 5px;
    border: 1px solid var(--primary-color) !important;
}

label {
    width: 14rem;
    font-size: 1.3rem;
}

#pass-checkbox {
    width: 1.2rem;
    height: 1.2rem;
}

.pass-validtion {
    position: absolute;
    width: 20rem;
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

@media (max-width:81.25rem) {

    .pf-right {
        width: 100% !important;
        padding: 2rem !important;
        /* background: #000; */
    }

    .pf-right div {
        display: flex;
        flex-direction: column !important;
        width: 100% !important;
        /* align-items: center; */


    }

    label {
        width: 100%;
        text-align: start;
        font-size: 1rem;

    }

    .input-pass .show-pass-icon {
        display: flex;
        flex-direction: row !important;
        justify-content: flex-end !important;

    }

    input,
    .input-pass,
    .input-pass input,
    .input-pass div {
        width: 100%;

    }

    .input-pass input {
        z-index: 20;
    }

    .pass-validtion {
        width: 20rem !important;
        margin-top: 2.5rem;
        display: flex;
        flex-direction: column !important;
    }

    .pass-validtion div {
        display: flex;
        flex-direction: row !important;
    }


}

@media (max-width: 50.5rem) {
    .user-pf {
        display: flex;
        flex-direction: column !important;
    }

    .pf-bar-left {
        width: 100%;
        height: 31rem !important;
    }

}
</style>