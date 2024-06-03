<template>
    <div class="prize-setting container">
        <h1 class="page-title">Users</h1>
        <div class="flex flex-row justify-end mt-5 items-center">
            <div class="prize-btn">
                <AddUser></AddUser>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <!-- <th>Image</th> -->
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in users" :key="item">
                    <td>{{ index + 1 }}</td>
                    <!-- <td>
                        
                    </td> -->
                    <td>
                        <div class="flex flex-row justify-center items-center gap-2">
                            <div class="image-profile flex flex-rowjustify-center">
                                <img src="/profile_image.png" alt="">

                            </div>

                            <span class="flex flex-row justify-start w-36">

                                {{ item.first_name }} {{ item.last_name }}
                            </span>
                        </div>
                    </td>



                    <td>{{ item.email }}</td>
                    <td :class="item.role == 'admin' ? 'text-red capitalize' : 'text-green capitalize'">{{ item.role }}
                    </td>
                    <td>
                        <div class="flex flex-row justify-center gap-5">
                            <div class="flex flex-row items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                                <span>Edit</span>
                            </div>

                            <DeleteItem :itemName="'User'"></DeleteItem>
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
import { ref, onMounted } from "vue"

const users = ref()

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
}



th {
    background: var(--primary-color);
    color: #FFFFFF;
    padding: 0.5rem;

}

tr {
    border-bottom: 5px solid #FFFFFF;
    border-top: 5px solid #FFFFFF;
}

td {
    background: #F2F6F6;
    text-align: center;
    padding: 0.5rem;
}

th:nth-child(1),
td:nth-child(1) {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
}

th:nth-child(5),
td:nth-child(5) {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
}

.image-profile img {
    width: 3rem;
    height: 3rem;
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
        width: 2rem;
        height: 2rem;
        border-radius: 100px;
        object-fit: cover;
    }
}
</style>