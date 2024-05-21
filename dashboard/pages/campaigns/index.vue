<template>
    <div class="prize-setting">
        <h1>Campaigns Setting</h1>
        <p class="desc">
            Campaign management involves strategic planning, execution, and analysis of marketing campaigns to achieve
            specific objectives, targeting the right audience, and optimizing performance for desired results.
        </p>
        <div class="flex flex-row justify-between mt-15 items-center">
            <h2>Campaigns management</h2>
            <div>
                <NuxtLink to="/campaigns/new">
                    <button class="primary-btn">Add campaign</button>
                </NuxtLink>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>title</th>
                    <th>Image</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in 10">
                    <td>{{ i }}</td>
                    <td>Sting</td>
                    <td>
                        <div class="p-image flex flex-row justify-center">
                            <img src="/sting-event.jpg" alt="">
                        </div>
                    </td>
                    <td>2024-06-24</td>
                    <td>2024-06-30</td>
                    <td class="flex flex-row justify-center items-center gap-5">
                        <div class="flex flex-row justify-center gap-5">
                            <div class="flex flex-row items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined">
                                    play_circle
                                </span>
                                <span>Play</span>
                            </div>
                            <!-- <div class="flex flex-row items-center gap-1 cursor-pointer">
                                <span class="material-symbols-outlined">
                                    delete
                                </span>
                                <span>Delete</span>
                            </div> -->
                        </div>
                        <div id="more-action">
                            <span class="material-symbols-outlined cursor-pointer">
                                more_horiz
                            </span>
                            <div id="action-menu">
                                <div class="cursor-pointer">
                                    <span class="material-symbols-outlined cursor-pointer">
                                        edit
                                    </span>
                                    <span>edit</span>
                                </div>
                                <div class="cursor-pointer">
                                    <span class="material-symbols-outlined cursor-pointer">
                                        delete
                                    </span>
                                    <span>delete</span>

                                </div>

                            </div>

                        </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import AddPrize from "~/components/dialogs/AddPrize.vue"
</script>
<style scoped>
.prize-setting {
    background: #FFFFFF;
    width: 100%;
    color: #000000;
    padding: 3rem 2rem;
    border-radius: 10px;
}

.prize-setting h1 {
    color: #000000;
    font-weight: 600;
    font-size: 24px;
    text-align: center;
    margin-bottom: 2rem;
}

.prize-setting .desc {
    width: 50%;
    margin: auto;
}

.prize-setting .desc,
h2 {
    color: #000000;
    font-size: 18px;
    text-align: center;
}

table {
    width: 100%;
    background: #FFFFFF;
}

.p-image img {
    width: 3rem;
    height: 2rem;
    object-fit: cover;
}

th {
    background: #000;
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

#action-menu {
    visibility: hidden;
    position: absolute;
}

#action-menu div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2rem;
}

#more-action:hover #action-menu {
    visibility: visible;
    background: #FFFFFF;
    height: 6rem;
    width: 8rem;
    gap: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 10px;

}

th:nth-child(6),
td:nth-child(6) {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
}
</style>