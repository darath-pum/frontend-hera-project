<template>
  <div class="prize-setting container">
    <h1 class="page-title">Lucky draw (user won)</h1>
    <!-- <p class="desc page-description">
            Prize setting involves determining the value or amount of a prize for a competition or event, considering
            factors such as objectives, budget, target audience, and perceived value.
        </p> -->
    <div
      class="2xl:flex xl:flex-none flex-row justify-between mt-15 items-center"
    >
      <div
        class="select-date 2xl:flex xl:flex lg:flex md:flex gap-10 justify-center"
      >
        <div class="select flex flex-col items-start justify-start">
          <label for="" class="text-start w-full font-semibold"
            >Selete campaign:</label
          >
          <select
            @change.prevent="handleGameSelect($event)"
            class="select-campaign 2xl:w-[20rem] xl:w-[20rem] lg:w-[13rem] md:w-[11rem]"
            selected="0"
            name=""
            id=""
          >
            <option value="Select campaign" id="0" selected disabled>
              Select campaign
            </option>
            <option
              v-for="(item, index) in campaigns"
              :key="item.id"
              :value="item.id"
              :selected="campaignId === item.id"
            >
              {{ item.title }}
            </option>
          </select>
          <div
            class="select-icon 2xl:w-[20rem] xl:w-[20rem] lg:w-[13rem] md:w-[11.2rem] w-[10.8rem]"
          >
            <span class="material-symbols-outlined"> arrow_drop_down </span>
          </div>
        </div>
        <div class="flex flex-col">
          <label for="" class="text-start w-full font-semibold"
            >From date:</label
          >
          <input
            type="date"
            v-model="fromDate"
            @change="clearFromDateErr"
            :max="maxEndDate"
            class="h-[2.5rem] 2xl:w-[15rem] xl:w-[15rem] lg:w-[10rem] md:w-[9rem] w-[10rem] px-3 rounded"
            :style="{
              border: fromDateErr ? '1px solid red' : '1px solid black',
            }"
          />
        </div>
        <div class="flex flex-col">
          <label for="" class="text-start w-full font-semibold">To date:</label>
          <input
            type="date"
            v-model="toDate"
            @change="clearToDateErr"
            :min="minStartDate"
            class="h-[2.5rem] 2xl:w-[15rem] xl:w-[15rem] lg:w-[10rem] md:w-[9rem] w-[10rem] px-3 rounded"
            :style="{
              border: toDateErr ? '1px solid red' : '1px solid black',
            }"
          />
        </div>
      </div>
      <div class="flex xl:justify-end mt-6 md:justify-end">
        <button class="primary-btn mr-10" @click="searchWonUser">Search</button>
        <button class="primary-btn" @click.prevent="exportDataToCsv">
          Export
        </button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Image</th>
          <Sorting
            :data="userWons"
            :name="'Name(Khmer)'"
            :columnName="'name_kh'"
            v-model:sortedColumn="sortedColumnName"
          >
          </Sorting>
          <Sorting
            :data="userWons"
            :name="'Name(English)'"
            :columnName="'name_en'"
            v-model:sortedColumn="sortedColumnName"
          >
          </Sorting>
          <th>Phone number</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in userWons" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="p-image flex flex-row justify-center">
              <img :src="item.img_url" alt="" />
            </div>
          </td>
          <td>{{ item.name_kh }}</td>
          <td>{{ item.name_en }}</td>
          <td>{{ item.phone_number }}</td>
          <td>{{ item.created_at.substring(0, 10) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="w-full flex flex-row justify-center">
      <Loading v-if="loading && userWons.length == 0" :loader="'big'"></Loading>
    </div>
    <EmptyData
      v-if="!loading && userWons.length == 0"
      :contain="'User won'"
    ></EmptyData>
  </div>
</template>
<script setup lang="ts">
import EmptyData from "~/components/EmptyData.vue";
import Loading from "~/components/Loading.vue";
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/store/auth";
import { useDateValidation } from "~/composables/useDateValidation";
const sortedColumnName = ref("");
const {
  fromDateErr,
  toDateErr,
  validateFromDate,
  validateToDate,
  showAlert,
  validateDates,
} = useDateValidation();
const loading = ref(true);
const authStore = useAuthStore();
const campaigns = ref<ICampaign[]>([]);
const userWons = ref(<UserWon[]>[]);
const fromDate = ref(
  new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]
);
const toDate = ref(new Date(new Date().getTime()).toISOString().split("T")[0]);
const campaignId = ref(1);

const clearFromDateErr = () => {
  validateFromDate(fromDate.value);
  validateDates(fromDate.value, toDate.value);
  if (!fromDateErr.value) {
    fromDateErr.value = false;
  } else {
    fromDateErr.value = true;
  }
};

const clearToDateErr = () => {
  validateToDate(toDate.value);
  validateDates(fromDate.value, toDate.value);
  if (!toDateErr.value) {
    toDateErr.value = false;
  } else {
    toDateErr.value = true;
  }
};
const searchWonUser = async () => {
  const result1 = validateFromDate(fromDate.value);
  const result2 = validateToDate(toDate.value);
  const result3 = validateDates(fromDate.value, toDate.value);
  if (!result1.valid) {
    showAlert(result1.message || "Date input is invalid.");
    return;
  }
  if (!result2.valid) {
    showAlert(result2.message || "Date input is invalid.");
    return;
  }
  if (!result3.validFromDate || !result3.validToDate) {
    showAlert(result3.message || "Date input is invalid.");
    return;
  }
  const dateTime = {
    from: fromDate.value + "T" + "00" + ":" + "00:" + "00" + "+07:00",
    to: toDate.value + "T" + "00" + ":" + "00:" + "00" + "+07:00",
  };

  const response = await callAPI(
    `/api/analytics/customer/getWinners/${campaignId.value}`,
    "POST",
    dateTime
  );
  userWons.value = response.data;
};

const getAllCampaigns = async () => {
  const res = await callAPI(`/api/campaign/getUserCampaigns/${authStore.id}`);
  if (res.status == 200) {
    campaigns.value = res.data;
  }
};

const handleGameSelect = async (event: any) => {
  const selectedCampainId = event.target.value;
  campaignId.value = selectedCampainId;
};

const exportDataToCsv = () => {
  const csvContentDAP = convertToCSV(userWons.value);
  const bom = "\uFEFF";
  const combinedContent = `${bom}${csvContentDAP}`;
  const blob = new Blob([combinedContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "export_data.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const convertToCSV = (myData: any[]) => {
  const headers = [
    "No.",
    "Image",
    "Name(Khmer)",
    "Name(English)",
    "Phone number",
    "Date",
  ];
  const rows = ["Lucky Draw ( user won )", " ", headers.join(",")];

  myData.forEach((row, index) => {
    const r = [
      index + 1,
      row["img_url"],
      row["name_kh"],
      row["name_en"],
      row["phone_number"],
      row["created_at"].substring(0, 10),
    ];
    rows.push(r.join(","));
  });

  return rows.join("\n");
};

const minStartDate = computed(() => {
  if (fromDate.value) {
    const startDate = new Date(fromDate.value);
    return startDate.toISOString().split("T")[0];
  }
});
const maxEndDate = computed(() => {
  if (toDate.value) {
    const endDate = new Date(toDate.value);
    return endDate.toISOString().split("T")[0];
  }
});

onMounted(async () => {
  await getAllCampaigns();
  searchWonUser();
});
</script>
<style scoped>
table {
  width: 100%;
  background: #ffffff;
  border-collapse: separate;
  border-spacing: 0rem 0.5rem;
}

.select-campaign,
.select-icon {
  padding: 0.5rem;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  /* width: 20rem; */
}

label {
  text-align: start;
  font-weight: 600;
  color: #666464;
  padding-bottom: 0.2rem;
}

.select-campaign {
  z-index: 1;
}
.select-icon {
  position: absolute;
  /* width: 20rem; */
  height: 2.7rem;
  margin-top: 1.7rem;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  border: none !important;
}
.p-image img {
  width: 2rem;
  height: 2rem;
  object-fit: cover;
}

th {
  background: var(--primary-color);
  color: #ffffff;
  padding: 0.5rem;
}

td {
  background: #f2f6f6;
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
}
</style>
