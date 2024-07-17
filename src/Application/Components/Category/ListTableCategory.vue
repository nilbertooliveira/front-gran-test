<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="p-4">
          <div class="flex items-center">
            <input id="checkbox-all" type="checkbox"
                   class="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checkbox-all" class="sr-only">checkbox</label>
          </div>
        </th>
        <th scope="col" class="p-4">Categoria</th>
        <th scope="col" class="p-4">Descrição</th>
        <th scope="col" class="p-4">Status</th>
        <!--        <th scope="col" class="p-4">Ações</th>-->
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category.id"
          class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
        <td class="p-4 w-4">
          <div class="flex items-center">
            <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                   class="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
          </div>
        </td>
        <td class="px-4 py-3">
                <span
                    class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{{
                    category.name
                  }}</span>
        </td>

        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div class="flex items-center">
            {{ category.description }}
          </div>
        </td>
        <td class="px-4 py-3">
                <span
                    class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{{
                    category.status
                  }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script lang="ts">


import {useProductStore} from "../../../Infrastructure/store/ProductStore";
import {computed, defineComponent, onMounted} from "vue";
import {useCategoriesStore} from "../../../Infrastructure/store/CategoriesStore";


export default defineComponent({
      name: "ListTableCategory",
      setup() {
        const useCategory = useCategoriesStore();
        onMounted(() => {
          useCategory.all();
        });
        const categories = computed(() => useCategory.categories);
        return {
          categories,
        };
      },
    }
)
</script>

<style scoped>

</style>