<template>
    <div class="add-prize">
        <div class="flex flex-row items-center gap-1 cursor-pointer" @click="isShow = true">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                                <span>Edit</span>
                            </div>
        <div v-if="isShow" class="prize-dialog" @click="isShow = false">
            <form action="" @click.stop class="flex flex-col gap-4" @submit.prevent="addUser">
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
                        <label for="">Last Name:</label>
                        <input type="text" v-model="last_name">
                        
                    </div>
                </div>
                <div class="email">
                    <label for="">Email:</label>
                    <input type="email" v-model="email">
                </div>
                
                <div class="btn-save">
                    <button class="primary-btn" @click="editUser">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"

const isShow = ref(false)

const first_name = ref()
const last_name = ref()
const email = ref()

const props = defineProps(["userId","getAllUsers"])

const getUserById = async()=>{
    const res = await callAPI(`/dashboard/user/getUserById/${props.userId}`)
    
    first_name.value = res.data.first_name
    last_name.value = res.data.last_name
    email.value = res.data.email
}
const editUser = async()=>{
    let body = {
        first_name:first_name.value,
        last_name:last_name.value,
    }
    const res = await callAPI(`/dashboard/user/editUserInfos/${props.userId}`,'PUT',body)
    await props.getAllUsers();
    
}
onMounted(()=>{
     getUserById()
})
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
    height: 24rem;
    background: #D9D9D9;
    padding: 2rem 2rem;
    border-radius: 10px;
}

form h1 {
    font-size: 30px;
    font-weight: 600;
}

.username div:nth-child(1), .username div:nth-child(2){
    width: 100%;
}
.username div:nth-child(1), .username div:nth-child(2),

.email {
    display: flex;
    flex-direction: column;
}
.username{
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
</style>