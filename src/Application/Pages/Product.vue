<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
    <div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <search></search>
          <div
              class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <add-button name="Cadastrar Produto" id="buttonProduct" modal="createProductModal"></add-button>
            <filter-button @filter-change="onFilterChange"></filter-button>
          </div>
        </div>
        <list-table :filters="filters" ></list-table>
      </div>
    </div>
  </section>
  <create-modal-product></create-modal-product>

</template>

<script>
import AddButton from "@/Application/Components/Product/AddButton.vue";
import Search from "@/Application/Components/Product/Search.vue";
import Pagination from "@/Application/Components/Product/Pagination.vue";
import ListTable from "@/Application/Components/Product/ListTable.vue";
import FilterButton from "@/Application/Components/Product/FilterButton.vue";
import {initFlowbite} from "flowbite";
import CreateModalProduct from "@/Application/Components/Product/CreateModalProduct.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "Product",
  mounted() {
    initFlowbite()
  },
  data() {
    return {
      filters: [],
    };
  },
  methods: {
    onFilterChange(newFilters) {
      this.filters = newFilters;
    },
  },
  components: {
    CreateModalProduct,
    FilterButton,
    ListTable,
    Pagination,
    Search,
    AddButton,
  }
});
</script>

<style scoped>

</style>