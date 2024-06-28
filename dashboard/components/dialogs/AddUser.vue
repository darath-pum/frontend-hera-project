<template>
    <div class="add-prize">
        <button class="primary-btn" @click="isShow = true">Add user</button>
        <div v-if="isShow" class="dialog" @click="isShow = false">
            <form action="" @click.stop class="flex flex-col gap-5" @submit.prevent="addUser">
                <div class="form-header flex flex-row justify-between ">
                    <span></span>
                    <h1>Add user</h1>
                    <span class="material-symbols-outlined cursor-pointer" @click="isShow = false">
                        cancel
                    </span>
                </div>
                <div class="username flex flex-row gap-5">
                    <div>
                        <label for="">First Name: <span class="text-red" v-if="pathName == 'first_name'">{{ validMessage
                                }}</span></label>
                        <input type="text" v-model="first_name" class="outline-none"
                            :style="pathName == 'first_name' ? 'border:2px solid red' : ''" @click="pathName = ''">
                    </div>
                    <div>
                        <label for="">Last Name: <span class="text-red" v-if="pathName == 'last_name'">{{ validMessage
                                }}</span></label>
                        <input type="text" v-model="last_name"
                            :style="pathName == 'last_name' ? 'border:2px solid red' : ''" @click="pathName = ''">

                    </div>
                </div>
                <div class="email">
                    <label for="">Email: <span class="text-red" v-if="pathName == 'email'">{{ validMessage
                            }}</span></label>
                    <input type="email" v-model="email" :style="pathName == 'email' ? 'border:2px solid red' : ''"
                        @click="pathName = ''">
                </div>

                <div class="btn-save">
                    <button class="primary-btn" @click="addUser">
                        <Loading v-if="loading" class="loader"></Loading>
                        <span v-else>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import Swal from 'sweetalert2'
import Loading from '~/components/Loading.vue'
const loading = ref(false)
const isShow = ref(false)
const validMessage = ref()
const pathName = ref()
const first_name = ref('')
const last_name = ref('')
const email = ref('')
const props = defineProps(["getAllUsers"])
let isAddUserCalled = false;

const resetData = () => {
    first_name.value = '';
    last_name.value = '';
    email.value = '';
}
const addUser = async () => {
    const errEmail = validateEmail(email.value);
    const errFirstName = validFirstName(first_name.value);
    const errLastName = validLastName(last_name.value);
    if (errFirstName) {
        validMessage.value = errFirstName
        pathName.value = 'first_name'

        return;
    } if (errLastName) {
        validMessage.value = errLastName
        pathName.value = 'last_name'
        return;
    }
    if (errEmail) {
        validMessage.value = errEmail
        pathName.value = 'email'
        return;
    }
    else {
        pathName.value = ''

    }
    if (isAddUserCalled) {
        return; // Exit the function if it has already been called
    }
    isAddUserCalled = true;
    let body = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value
    }
    loading.value = true
    const res = await callAPI('/dashboard/user/createUserWoPw', 'POST', body)
    if (res.status == 200) {
        await props.getAllUsers();
        isAddUserCalled = false;
        loading.value = false;
        isShow.value = false;
        resetData();
    } else {
        if (res.code == 401) {

            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                text: "Email already existed.",
                showConfirmButton: false,
                timer: 1500
            });
            loading.value = false
        }
        if (res.code == 500) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                text: "Failed to create user.",
                showConfirmButton: false,
                timer: 1500
            });
            loading.value = false
        }
        if (res.code == 503) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                text: "Failed to create user.",
                showConfirmButton: false,
                timer: 1500
            });
            loading.value = false
        }
    }



}
</script>

<style scoped>
form {
    width: 35rem;
    height: 25rem;
    background: #ffffff;
    padding: 2rem 2rem;
    border-radius: 5px;
}

form h1 {
    font-size: 30px;
    font-weight: 600;
}

.username div:nth-child(1),
.username div:nth-child(2) {
    width: 100%;
}

.username div:nth-child(1),
.username div:nth-child(2),

.email {
    display: flex;
    flex-direction: column;
}

.username {
    width: 100%;
}

input {
    border: 1px solid var(--primary-color);
    padding: 0.5rem;
    border-radius: 5px;
    background: #ffffff8a;
    color: #666464;
}

label {
    font-weight: 600;
    color: #666464;
    padding-bottom: 0.2rem;
}



.btn-save {
    width: 100%;
    margin-top: 1rem;
}

.btn-save button {
    width: 100%;
}

@media (max-width: 35.5rem) {
    form h1 {
        font-size: 1.2rem;
        font-weight: 600;
    }

    form {
        width: 100%;
        height: 100vh;
        border-radius: 0;
    }

    .username {
        display: flex;
        flex-direction: column !important;
    }

    input {
        padding: 0.5rem;
        font-size: 0.7rem;
    }

    label {
        font-size: 0.7rem;
    }
}
</style>