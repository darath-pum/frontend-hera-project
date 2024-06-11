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
                    <Sorting :data="users" :name="'Role'" :columnName="'role'" 
                         v-model:sortedColumn="sortedColumnName">
                    </Sorting>
                 
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in users" :key="item">
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
                        <div class="flex flex-row justify-center gap-5">
                            <!-- <div class="flex flex-row items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                                <span>Edit</span>
                            </div> -->
                            <EditUser :userId="item.id" :getAllUsers="getAllUsers"></EditUser>

                            <DeleteItem :itemName="'User'" :userId="item.id" :functionName="'deleteUser'"
                                :getAllUsers="getAllUsers"></DeleteItem>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import DeleteItem from "~/components/dialogs/DeleteItem.vue"
import AddUser from "~/components/dialogs/AddUser.vue"
import EditUser from "~/components/dialogs/EditUser.vue"
import Sorting from "@/components/sorting/Sorting.vue";
import { ref, onMounted } from "vue"

const users = ref()
const sortedColumnName = ref("");
const getAllUsers = async () => {
    const res = await callAPI('/dashboard/user/getUsers')
    console.log(res.data);

    if (res.status == 200) {
        users.value = res.data


    }
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
    /* border-left: 1px solid #ffffff; */

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