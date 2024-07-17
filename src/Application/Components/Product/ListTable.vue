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
        <th scope="col" class="p-4">Produto</th>
        <th scope="col" class="p-4">Categoria</th>
        <th scope="col" class="p-4">Preço</th>
        <th scope="col" class="p-4">Status</th>
        <!--        <th scope="col" class="p-4">Ações</th>-->
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in computedItems" :key="product.id"
          class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
        <td class="p-4 w-4">
          <div class="flex items-center">
            <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                   class="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
          </div>
        </td>
        <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div class="flex items-center mr-3">
            <img :src="`${urlImages}/${product.photo}`" class="w-8 md:w-16 max-w-full max-h-full"
                 :alt="`${product.photo}`">
            {{ product.name }}
          </div>
        </th>
        <td class="px-4 py-3">
                <span
                    class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{{
                    product.category
                  }}</span>
        </td>

        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" fill="currentColor"
                 class="w-5 h-5 text-gray-400 mr-2" aria-hidden="true">
              <path
                  d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/>
            </svg>
            {{ product.price }}
          </div>
        </td>
        <td class="px-4 py-3">
                <span
                    class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{{
                    product.status
                  }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <div class="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 p-4 justify-center">
    <vue-awesome-paginate
        :total-items="50"
        :items-per-page="5"
        :max-pages-shown="3"
        v-model="currentPage"
        @click="onClickHandler"
    />
  </div>

</template>

<script lang="ts">


import {useProductStore} from "../../../Infrastructure/store/ProductStore";
import {computed, defineComponent, onMounted, ref} from "vue";
import {Product} from "../../../Domain/Interfaces/Product";


export default defineComponent({
      name: "ListTable",
      props: {
        filters: Array,
      },
      watch: {
        filters() {
          return this.products.filter(item =>
              this.filters?.indexOf(item.category) !== -1
          );
        },
      },
      computed: {
        computedItems() {
          if (this.filters?.length === 0){
            return this.products;
          }
          return this.products.filter(item =>
             this.filters?.indexOf(item.category) !== -1
         );

        }
      },
      setup() {
        const currentPage = ref(1) as number;
        const productStore = useProductStore();
        let products;
        const urlImages = import.meta.env.VITE_R2_CLOUD_FARE_URL;

        onMounted(() => {
          productStore.listAllProducts(1);
        });
        products = computed(() => productStore.products);

        const onClickHandler = (page: number) => {
          productStore.listAllProducts(page);
          products = computed(() => productStore.products) as Product[];
        };


        return {
          products,
          currentPage,
          onClickHandler,
          urlImages
        };
      },
    }
)
</script>

<style scoped>

</style>