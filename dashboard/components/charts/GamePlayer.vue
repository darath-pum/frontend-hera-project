<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div>
                <h3>Gender player</h3>
            </div>
            <div>
                <p>Total users: {{ uniqueUsers }}</p>
            </div>
        </div>
        <canvas id="myChart"></canvas>
    </div>
</template>

<script setup lang="ts">
//   import axios from 'axios';
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';

//   import { getAPIURL } from "@/configs";

const uniqueUsers = ref(0);
const counts = [10, 50, 15];
const date = ['Male', 'Female', 'Other']

const data = {
    labels: date,
    datasets: [{
        label: "Player gender",
        data: counts,
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)'
        ]
    }]
}
const config = {
    type: "doughnut",
    data: data,
    options: {}
}

onMounted(async () => {
    // await getDAUUsers();
    const myChart = new Chart(
        document.getElementById("myChart"),
        config
    )
})

</script>
<style scoped>
.chart {
    width: 30%;
    /* padding-top: 50px; */
}

h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary-color);
}

.header {
    border-bottom: 1px solid #74787a;
    padding: 5px;
}

.input-date {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.input-date input {
    padding: 7px;
    width: 200px;
    background: #74C0FC;
    color: #ffff;
}

#myChart {
    width: 70% !important;
    height: 70% !important;
    margin: auto;
}

@media (max-width:67.5rem) {
    .chart {
        width: 100%;
        padding-right: 80px;
        padding-left: 50px;
        margin-top: -150px !important;
    }

}
</style>