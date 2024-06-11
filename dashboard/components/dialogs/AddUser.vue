<template>
    <div class="add-prize">
        <button class="primary-btn" @click="isShow = true">Add user</button>
        <div v-if="isShow" class="prize-dialog" @click="isShow = false">
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
                        <input type="text" v-model="first_name">
                    </div>
                    <div>
                        <label for="">Last Name: <span class="text-red" v-if="pathName == 'last_name'">{{ validMessage
                                }}</span></label>
                        <input type="text" v-model="last_name">

                    </div>
                </div>
                <div class="email">
                    <label for="">Email: <span class="text-red" v-if="pathName == 'email'">{{ validMessage
                            }}</span></label>
                    <input type="email" v-model="email">
                </div>

                <div class="btn-save">
                    <button class="primary-btn" @click="addUser">
                        <div v-if="loading" class="loader"></div>
                        <span v-else>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"

const loading = ref(false)
const isShow = ref(false)
const validMessage = ref()
const pathName = ref()
const first_name = ref('')
const last_name = ref('')
const email = ref('')
const props = defineProps(["getAllUsers"])
let isAddUserCalled = false;
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
        loading.value = false
        isShow.value = false
    } else {

        loading.value = false
    }



}
</script>

<style scoped>
.prize-dialog {
    position: fixed;
    background: #0000005e;
    width: 100%;
    height: 100%;
    z-index: 100 !important;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

form {
    width: 35rem;
    height: 25rem;
    background: #ffffff;
    padding: 2rem 2rem;
    border-radius: 10px;
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
    padding:0.5rem;
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

.loader {
    width: 25px;
    padding: 3px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #ffffff;
    --_m:
        conic-gradient(#0000 10%, #000),
        linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
}

@keyframes l3 {
    to {
        transform: rotate(1turn)
    }
}
</style>