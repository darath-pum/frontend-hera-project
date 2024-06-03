<template>
    <div class="chart">
        <div class="header mb-5 flex flex-row items-center justify-between">
            <div class="title">
                <span>Session(MAP)</span>
            </div>
            <div class="input-date">
                <span>{{ avgTotalMAP }}</span>
                <span class="material-symbols-outlined">
                    more_horiz
                </span>
            </div>
        </div>     
        <canvas id="sessionMAP"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { onMounted } from 'vue';
import type { ChartConfiguration } from 'chart.js/auto';
import { useSharedState } from '../../composables/useShareState'
const { sharedUserId } = useSharedState()
const avgTotalMAP = ref();
const avgPlayTime:number[] = [];
const date:string[] = [];
const data = {
    labels: date,
    datasets: [{
        label: "Active users",
        backgroundColor: "blue",
        borderColor: "blue",
        data: avgPlayTime,
    }]
};

const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: data,
    options: {}
};


onMounted(async () => {
    const canvasElement = document.getElementById("sessionMAP") as HTMLCanvasElement | null;
    if (canvasElement) {
        new Chart(canvasElement, config);
    }
    
});


const getSessionMAP = async (newId:any) => {
  try {
    const response = await callAPI (`/dashboard/analytics/customer/getMGPS/${newId}`);
    console.log("hello",response.data);
    
    const sessionMAP = response.data.play_time_counts;
    avgTotalMAP.value = response.data.avg_play_sessions;
    
    for (let i =0;i<sessionMAP.length;i++) {
        if(i >= 23) {
        avgPlayTime.push(sessionMAP[i].avg_play_time)
        date.push(sessionMAP[i].date)
        }
    }
  } catch {
  }
};
// onMounted(getSessionMAP);
watch(sharedUserId, (userId) => {
    getSessionMAP(userId);
});
onMounted(() => {
      getSessionMAP(sharedUserId.value);
    });

</script>
<style scoped>
.chart {
    width:48.6%;
    padding: 2rem 1rem 2rem 2.2rem;
    background: #ffffff;
    border-radius: var(--radius);
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}
.title {
    color: gray;
}

.header {
    padding: 5px;
}

.input-date {
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: var(--primary-color);
}

.input-date input {
    padding: 7px;
    width: 200px;
    background: #74C0FC;
    color: #ffff;
}

@media (max-width:67.5rem) {
    .chart {
        width: 50%;
    }
    .title {
        font-size: 0.7rem;
    }
}
</style>