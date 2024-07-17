<template>
  <div class="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 p-4 justify-center">
    <vue-awesome-paginate
        :total-items="50"
        :items-per-page="5"
        :max-pages-shown="5"
        v-model="currentPage"
        :show-ending-buttons="true"
        :show-breakpoint-buttons="false"
        @click="onClickHandler"
    />
  </div>
</template>

<script lang="ts">
import {ref} from "vue";


export default {
  name: "Pagination",
  setup() {
    const currentPage = ref(1);

    const onClickHandler = (page: number) => {

    };

    return {
      currentPage,
      onClickHandler
    }
  }
}
</script>

<style>
.pagination-container {
  display: flex;

  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;

  width: 40px;

  border-radius: 20px;

  cursor: pointer;

  background-color: rgb(242, 242, 242);

  border: 1px solid rgb(217, 217, 217);

  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;

  border: 1px solid #3498db;

  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>