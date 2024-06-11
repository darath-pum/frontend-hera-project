<template>
  <div class="container my-5">
    <div>

      <div class="flex flex-row items-center gap-1 cursor-pointer w-6">
        <span class="material-symbols-outlined" @click="$router.back()">
          keyboard_backspace
        </span>
      </div>
      <h1 class="page-title">Prizes Pool Setting</h1>

    </div>
    <p class="desc page-description">
      Prize setting involves determining the value or amount of a prize for a competition or event, considering
      factors such as objectives, budget, target audience, and perceived value.
    </p>
    <div class="flex flex-row justify-between mt-10 mb-5 items-center">
      <div class="flex flex-row justify-between gap-2 items-center">
        <button :class="prize_pool.length >0? 'primary-btn':'secondary-btn'" @click="saveQty">Save</button>
        <!-- <button class="secondary-btn" @click="deletePrizePool">Delete</button> -->
        <DeleteItem :itemName="'Prize pool'" :cpId="campaignId" :selectedItems="selectedItems"
          :functionName="'deletePrizePool'"></DeleteItem>
      </div>
      <div class="flex flex-row justify-between gap-2 items-center">
        <AddPrizePool :getAllPrizesPool="getAllPrizesPool"></AddPrizePool>
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
          <th>Image</th>
          <!-- <th>Name(Khmer)</th> -->
          <Sorting :data="prizesPool" :name="'Name(Khmer)'" :columnName="'prize_name_kh'"
            v-model:sortedColumn="sortedColumnName">
          </Sorting>
          <Sorting :data="prizesPool" :name="'Name(English)'" :columnName="'prize_name_en'"
            v-model:sortedColumn="sortedColumnName">
          </Sorting>
          <Sorting :data="prizesPool" :name="'Quantity'" :columnName="'qty'" v-model:sortedColumn="sortedColumnName">
          </Sorting>
          <!-- <th>Quantity</th> -->
          <th>Used</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in prizesPool" :key="index">
          <td>
            <div class="flex flex-row justify-center gap-2">
              <input id="checkbox-{{ index }}" type="checkbox" v-model="selectedItems" :value="item.id"
                @click="addId(item.id, item.qty)" />
              <!-- <label :for="'checkbox-' + index"></label> -->
            </div>
          </td>
          <td>
            <div class="p-image flex flex-row justify-center">
              <img :src="item.prize_img_url" alt="" />
            </div>
          </td>
          <td>{{ item.prize_name_kh }}</td>
          <td>{{ item.prize_name_en }}</td>
          <td>
            <div class="flex flex-row items-center justify-center gap-2">
              <input id="input-qty" v-model="newQty" @keyup.enter="updateQty(item.id, newQty)"
                v-if="prizePoolId == item.id" type="number" />
              <span v-else>{{ item.qty }}</span>
              <span v-if="prizePoolId == item.id" class="material-symbols-outlined cursor-pointer bg-[var(--primary-color)] text-[#ffffff] rounded-full"
                @click="updateQty(item.id, newQty)">
                add
              </span>
              <span v-if="prizePoolId == item.id" class="material-symbols-outlined cursor-pointer bg-[var(--primary-color)] text-[#ffffff] rounded-full"
                @click="showEditQty(0)">
                close
              </span>
              <span v-else class="material-symbols-outlined cursor-pointer" @click="showEditQty(item.id)">
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
const sortedColumnName = ref('')
const campaignId = ref(useRoute().query.campaign);
const authStore = useAuthStore();
const prizePoolId = ref(0);
const isEdit = ref(false);
const selectedItems = ref([]);
let backUpPrizes = []
const prize_pool = ref<{ id: number; qty: number }[]>([]);
const prizesPool = ref<{ id: number; qty: number }[]>([]);
const getAllPrizesPool = async () => {
  const res = await callAPI(`/dashboard/prizepool/getAllPrizePools?user_id=${authStore.id}&campaign_id=${campaignId.value}`);
  if (res.status == 200) {
    console.log("prize pool", res.data);
    prizesPool.value = res.data;
    backUpPrizes = res.data
    selectedItems.value = [];

  }
};

const updateQty = (id: number, newQty: number) => {
  const updatedPrizesPool = prizesPool.value.map(obj => {
    if (obj.id === id) {
      return { ...obj, qty: newQty };
    }
    return obj;
  });
  const existingItem = prize_pool.value.find((item) => item.id === id);

  if (existingItem) {
    existingItem.qty = newQty;
  } else {

    addId(id, newQty)
  }

  prizesPool.value = [...updatedPrizesPool];


  console.log('updated prize pool', prizesPool.value);
  console.log("before add", prize_pool.value);
  showEditQty(0)

};

const saveQty = async () => {
  let body = {
    prize_pool: prize_pool.value
  }
  const res = await callAPI(`/dashboard/prizepool/updatePrizePool/${campaignId.value}`, 'PUT', body)
  console.log("saveQty", res);
  await getAllPrizesPool()
}

onMounted(async () => {
  await getAllPrizesPool();
});

const addId = (id: number, qty: number) => {
  if (!selectedItems.value.includes(id)) {
    selectedItems.value.push(id)
    console.log(selectedItems.value);
    prize_pool.value.push({ id, qty: qty });
    console.log('after add', prize_pool.value);
  } else {
    const indexOne = selectedItems.value.indexOf(id);
    selectedItems.value.splice(indexOne, 1);

    const indexTwo = prize_pool.value.indexOf(id);
    prize_pool.value.splice(indexTwo, 1);

    console.log('after delete', prize_pool.value);
    for (let index = 0; index < backUpPrizes.length; index++) {
      const element = backUpPrizes[index];
      let isFound = false;
      const updatedPrizesPool = prizesPool.value.map(obj => {
        if (obj.id === id) {
          isFound = true
          return { ...obj, qty: backUpPrizes[index].qty };
        }
        return obj;
      });
      prizesPool.value = [...updatedPrizesPool]
      if (isFound == true) {
        break;
      }

    }

  }


}
const deletePrizePool = async () => {
  const res = await callAPI(`/dashboard/prizepool/deletePrizePool/${campaignId.value}`, 'DELETE', { prize_pool_ids: selectedItems.value });
  console.log('delete', res);

}


const showEditQty = (id: number) => {
  // isEdit.value = isEditQty;
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
      prize_pool.value = [];
      console.log(selectedItems.value);
      console.log("prize_pool clear all", prize_pool.value);
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
  border-collapse: separate;
  border-spacing: 0rem 0.5rem;
}

#checkbox {
  width: 1.1rem;
}

.p-image img {
  width: 2rem;
  height: 2rem;
  object-fit: cover;
}

th {
  background: var(--primary-color);
  color: #FFFFFF;
  padding: 0.5rem;
}



td {
  background: #F2F6F6;
  text-align: center;
  padding: 0.5rem;
}

#input-qty {
  border: 2px solid #000000;
  border-radius: 10px;
  padding: 2px 0.5rem;
  width: 30%;
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