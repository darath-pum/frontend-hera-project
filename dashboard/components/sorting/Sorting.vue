<template>
  <th @click="sortTable(columnName)">
    <div>
      <span></span>
      <span class="column-name">{{ name }}</span>
      <span
        class="material-symbols-outlined"
        v-if="ascending && sortedColumn == columnName"
      >
        arrow_downward
      </span>
      <span
        class="material-symbols-outlined"
        
        v-if="!ascending && sortedColumn == columnName"
      >
        arrow_upward
      </span>
      <span
        class="material-symbols-outlined"
       
        v-if="sortedColumn !== columnName"
      >
        swap_vert
      </span>
    </div>
  </th>
</template>

<script setup lang="ts">
import { ref,computed } from "vue";

const props = defineProps([
  "data",
  "name",
  "columnName",
  "page",
  "pageSize",
  "sortedColumn",
]);
const emits = defineEmits(["update:sortedColumn"]);
const name = props.name;
    const columnName = props.columnName;
    const ascending = ref(false);
    const sortColumn = ref('');
    
    const sortTable = (col:any) => {
        if (sortColumn.value === col) {
            ascending.value = !ascending.value;
        } else {
            ascending.value = true;
            sortColumn.value = col;
        }
        
        props.data.sort((a:any, b:any) => {
            if (a[col] > b[col]) {
                return ascending.value ? 1 : -1;
            } else if (a[col] < b[col]) {
                return ascending.value ? -1 : 1;
            }
            return 0;
        });
  emits("update:sortedColumn", columnName);

    };
    const sortedRows = computed(() => props.data.slice());
    const columns = computed(() => {
        if (props.data.length === 0) {
            return [];
        }
        return Object.keys(props.data[0]);
    });

</script>
<style scoped>
div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap:0.5rem;
}
th{

  user-select: none;
}
.arrow {
  float: right;
  width: 12px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
}
.material-symbols-outlined{
  cursor: pointer;
}
</style>
