<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
    <div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <search></search>
          <div
              class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <add-button name="Cadastrar Categoria" id="buttonCategory" modal="createCategoryModal"></add-button>
          </div>
        </div>
        <list-table-category></list-table-category>
        <pagination></pagination>
      </div>
    </div>
  </section>
  <create-modal-category></create-modal-category>

</template>

<script>
import AddButton from "@/Application/Components/Product/AddButton.vue";
import Pagination from "@/Application/Components/Product/Pagination.vue";
import ListTable from "@/Application/Components/Product/ListTable.vue";
import {initFlowbite} from "flowbite";
import CreateModalCategory from "@/Application/Components/Category/CreateModalCategory.vue";
import ListTableCategory from "@/Application/Components/Category/ListTableCategory.vue";
import {defineComponent} from "vue";
import Search from "@/Application/Components/Product/Search.vue";

export default defineComponent({
  name: "Product",
  mounted() {
    initFlowbite()
  },
  components: {
    Search,
    ListTableCategory,
    CreateModalCategory,
    ListTable,
    Pagination,
    AddButton,
  }
});
</script>

<style scoped>

</style>