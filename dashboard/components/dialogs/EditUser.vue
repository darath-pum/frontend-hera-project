<template>
    <div class="add-prize">
        <div class="flex flex-row items-center gap-1 cursor-pointer" @click="isShow = true">
            <span class="material-symbols-outlined icon-edit">
                edit
            </span>
            <span>Edit</span>
        </div>
        <div v-if="isShow" class="dialog" @click="isShow = false">
            <form action="" @click.stop class="flex flex-col gap-5" @submit.prevent="editUser">
                <div class="form-header flex flex-row justify-between ">
                    <span></span>
                    <h1>Edit user</h1>
                    <span class="material-symbols-outlined cursor-pointer" @click="isShow = false">
                        cancel
                    </span>
                </div>
                <div class="username flex flex-row gap-5">
                    <div>
                        <label for="">First Name:</label>
                        <input type="text" v-model="first_name">
                    </div>
                    <div>
                        <label for="">Last Name: </label>
                        <input type="text" v-model="last_name">

                    </div>
                </div>
                <div class="email">
                    <label for="">Email:</label>
                    <input type="email" v-model="email" disabled>
                </div>

                <div class="btn-save">
                    <button class="primary-btn" @click="editUser">

                        <Loading v-if="loading" class="loader"></Loading>
                        <span v-else>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import Loading from "~/components/Loading.vue"

const loading = ref(false)
const isShow = ref(false)
const first_name = ref('')
const last_name = ref('')
const email = ref('')

const props = defineProps(["userId", "getAllUsers"])

const getUserById = async () => {
    const res = await callAPI(`/dashboard/user/getUserById/${props.userId}`)

    first_name.value = res.data.first_name
    last_name.value = res.data.last_name
    email.value = res.data.email
}
const editUser = async () => {
    let body = {
        first_name: first_name.value,
        last_name: last_name.value,
    }
    loading.value = true
    const res = await callAPI(`/dashboard/user/editUserInfos/${props.userId}`, 'PUT', body);
    if (res.status == 200) {
        loading.value = false
        isShow.value = false
        await props.getAllUsers();
    }else{
        loading.value = false

    }


}
onMounted(() => {
    getUserById()
})
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
    color: #000000;
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
    text-align: start;
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

@media (max-width: 67.5rem) {


    .icon-edit {
        font-size: 1rem;
    }
}
@media (max-width: 35.5rem) {
    form h1 {
        font-size:1.2rem;
        font-weight: 600;
    }

    form{
        width:100%;
        height: 100vh;
        border-radius: 0;
    }
    .username{
        display: flex;
        flex-direction: column !important;
    }
    input{
        padding: 0.5rem;
        font-size: 0.7rem;
    }
    label{
        font-size: 0.7rem;
    }
}
</style>