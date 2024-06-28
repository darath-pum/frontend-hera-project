<template>
  <div class="prize-setting page-bg">
    <h1 class="page-title">Prizes Pool Setting</h1>
    <p class="desc page-description">
      Prize setting involves determining the value or amount of a prize for a competition or event, considering
      factors such as objectives, budget, target audience, and perceived value.
    </p>
    <div class="flex flex-row justify-between mt-10 mb-5 items-center">
      <div class="flex flex-row justify-between gap-2 items-center">
        <button class="secondary-btn">Save</button>
        <DeleteItem :itemName="'prize pool'"></DeleteItem>
      </div>
      <div class="flex flex-row justify-between gap-2 items-center">
        <AddPrizePool @custom-event="handleCustomEvent"></AddPrizePool>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>
            <div class="flex flex-row justify-center gap-2">
              <input id="checkbox" type="checkbox" v-model="allChecked" />
              <!-- <label for="checkbox">Select All</label> -->
            </div>
          </th>
          <th>Name(Khmer)</th>
          <th>Name(English)</th>
          <th>Image</th>
          <th>Quantity</th>
          <th>Used</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listAllPPools" :key="index">
          <td>
            <div class="flex flex-row justify-center gap-2">
              <input id="checkbox-{{ index }}" type="checkbox" v-model="selectedItems" :value="item.id" />
              <!-- <label :for="'checkbox-' + index"></label> -->
            </div>
          </td>
          <td>{{ item.name_kh }}</td>
          <td>{{ item.name_en }}</td>
          <td>
            <div class="p-image flex flex-row justify-center">
              <img :src="item.image" alt="" />
            </div>
          </td>
          <td>
            <div class="flex flex-row items-center justify-center gap-2">
              <input id="input-qty" v-if="isEdit && prizePoolId == item.id" type="number" />
              <span v-else>{{ item.qty }}</span>
              <span v-if="isEdit && prizePoolId == item.id" class="material-symbols-outlined cursor-pointer"
                @click="showEditQty(false, item.id)">
                close
              </span>
              <span v-else class="material-symbols-outlined cursor-pointer" @click="showEditQty(true, item.id)">
                edit
              </span>
            </div>
          </td>
          <td>{{ item.used_qty }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import AddPrizePool from "~/components/dialogs/AddPrizePool.vue";
import DeleteItem from "~/components/dialogs/DeleteItem.vue";
import { ref } from 'vue';
import { useAuthStore } from "~/store/auth.ts";
import { useRoute } from "vue-router";

const campaignId = useRoute().query.campaign;
const authStore = useAuthStore();
const prizesPool = ref([]);
const prizePoolId = ref(0);
const isEdit = ref(false);
const selectedItems = ref([]);
const listAllPPools = ref([])
const emit = defineEmits(["custom-events"]);

const handleCustomEvent = (prizePools:any) => {
  listAllPPools.value = prizePools
  console.log("cdsafdsafds",listAllPPools.value);
  handleToParent(listAllPPools.value)
}
const handleToParent = (pPools:any)=>{
  emit("custom-events", pPools);
}

// const getAllPrizesPool = async () => {
//   const res = await callAPI(`/api/prizepool/getAllPrizePools?user_id=${authStore.id}&campaign_id=${campaignId}`);
//   if(res.status == 200){
//     console.log("prize pool", res.data);
//     prizesPool.value = res.data;

//   }
// };



// const addId = (id)=>{
//   selectedItems.value.push(id)
//   console.log(selectedItems.value);
  
// }

const showEditQty = (isEditQty: boolean, id: number) => {
  isEdit.value = isEditQty;
  prizePoolId.value = id;
};

const allChecked = computed({
  get: () => selectedItems.value.length === prizesPool.value.length,
  set: (value) => {
    if (value) {
      // selectedItems.value =""
      selectedItems.value = prizesPool.value.map((item) => item.id);
      console.log(selectedItems.value);
      
    } else {
      selectedItems.value = [];
      console.log(selectedItems.value);
    }
  },
});
</script>
<style scoped>
.prize-setting {
  padding: 3rem 0rem !important;
}

table {
  width: 100%;
  background: #FFFFFF;
}

#checkbox {
  width: 1.1rem;
}

.p-image img {
  width: 2rem;
  height: 2rem;
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

#input-qty {
  border: 2px solid #000000;
  border-radius: 5px;
  padding: 2px 0.5rem;
  width: 30%;
}

th:nth-child(1),
td:nth-child(1) {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

th:nth-child(6),
td:nth-child(6) {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

th:nth-child(5),
td:nth-child(5) {
  width: 25%;
}

@media (max-width: 67.5rem) {
  .campaign-btn {
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
}
</style>