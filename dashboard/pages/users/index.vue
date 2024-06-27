<template>
    <div class="prize-setting container">
        <h1 class="page-title">Users</h1>
        <div class="flex flex-row justify-end mt-5 items-center">
            <div class="prize-btn">
                <AddUser :getAllUsers="getAllUsers"></AddUser>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Image</th>
                    <Sorting :data="users" :name="'Name'" :columnName="'first_name'"
                        v-model:sortedColumn="sortedColumnName">
                    </Sorting>
                    <Sorting :data="users" :name="'Email'" :columnName="'email'"
                        v-model:sortedColumn="sortedColumnName">
                    </Sorting>
                    <Sorting :data="users" :name="'Role'" :columnName="'role'" v-model:sortedColumn="sortedColumnName">
                    </Sorting>

                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in users" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <div class="image-profile flex flex-row justify-center">
                            <img :src="item.pf_img_url || profileDefault" alt="">



                        </div>

                    </td>
                    <td>
                        <!-- <div class="flex flex-row justify-center items-center gap-2"> -->



                        {{ item.first_name }} {{ item.last_name }}

                        <!-- </div> -->
                    </td>



                    <td>{{ item.email }}</td>
                    <td :class="item.role == 'admin' ? 'text-red capitalize' : 'text-green capitalize'">{{ item.role }}
                    </td>
                    <td>
                        <div class="flex flex-row justify-center gap-3 select-none">

                            <EditUser  v-if="authStore.id !==item.id" class="p-1 hover:bg-gray-500 hover:text-white rounded"  :userId="item.id" :getAllUsers="getAllUsers">
                            </EditUser>

                            <DeleteItem v-if="authStore.id !==item.id" class="p-1 hover:bg-gray-500 hover:text-white rounded"   :itemName="'User'" :userId="item.id"
                                :functionName="'deleteUser'" :getAllUsers="getAllUsers"></DeleteItem>
                            <div v-if="item.is_locked == false && authStore.id !==item.id"
                                class="flex flex-row items-center gap-1 cursor-pointer text-green p-1 hover:bg-gray-500 rounded"
                                @click="lockUser(item.id,item.is_locked)">
                                <span class="material-symbols-outlined">
                                    <span class="material-symbols-outlined">
                                        lock_open
                                    </span>
                                </span>
                                <span>lock</span>
                            </div>
                            <div v-if="item.is_locked == true  && authStore.id !==item.id"
                                class="flex flex-row items-center gap-1 cursor-pointer text-red hover:text-white p-1 hover:bg-gray-500 rounded"
                                @click="lockUser(item.id,item.is_locked)">
                                <span class="material-symbols-outlined">
                                    lock
                                </span>
                                <span>Unlock</span>
                            </div>
                            <span v-if="authStore.id ==item.id" class="p-1">No action</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="w-full flex flex-row justify-center">
            <Loading v-if="loading && users.length == 0" :loader="'big'"></Loading>
        </div>
        <EmptyData v-if="!loading && users.length == 0" :contain="'User'"></EmptyData>
    </div>
</template>
<script setup lang="ts">
import DeleteItem from "~/components/dialogs/DeleteItem.vue"
import AddUser from "~/components/dialogs/AddUser.vue"
import EditUser from "~/components/dialogs/EditUser.vue"
import Loading from "~/components/Loading.vue"
import EmptyData from "~/components/EmptyData.vue"
import Sorting from "@/components/sorting/Sorting.vue";
import { ref, onMounted } from "vue"
import { useAuthStore } from "~/store/auth"
const authStore = useAuthStore()
const loading = ref(true)
const users = ref<IUser[]>([])
const sortedColumnName = ref("");
const getAllUsers = async () => {
    const res = await callAPI('/dashboard/user/getUsers')
    if (res.status == 200) {
        users.value = res.data
        loading.value = false

    }
}


const lockUser = async (id: number, is_locked:boolean) => {
    let body = {}
    if (is_locked == false) {
        body = {
            is_locked:true
        }
    }else{
        body = {
            is_locked:false
        }
    }
    const res = await callAPI(`/dashboard/user/lockUser/${id}`,"PUT",body);
    await getAllUsers()
    
}
onMounted(() => {
    getAllUsers()
})
</script>
<style scoped>
table {
    width: 100%;
    background: #FFFFFF;
    border-collapse: separate;
    border-spacing: 0rem 0.5rem;
}



th {
    background: var(--primary-color);
    color: #FFFFFF;
    padding: 0.5rem;
    cursor: pointer;
}

td {
    background: #F2F6F6;
    text-align: center;
    padding: 0.5rem;
}

th:nth-child(1),
td:nth-child(1) {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

th:nth-child(6),
td:nth-child(6) {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.image-profile img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100px;
    object-fit: cover;
}

@media (max-width: 67.5rem) {
    .prize-btn {
        margin-top: -2rem !important;
    }

    .p-image img {
        width: 1rem;
        height: 1rem;
    }

    th,
    td {
        font-size: 0.7rem;
        padding: 0.3rem;
    }

    .material-symbols-outlined {
        font-size: 1rem;
    }

    .image-profile img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 100px;
        object-fit: cover;
    }
}
</style>