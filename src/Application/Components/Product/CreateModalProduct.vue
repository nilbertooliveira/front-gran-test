<template>
  <!-- Main modal -->
  <div id="createProductModal" tabindex="-1" aria-hidden="true"
       class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Product
          </h3>
          <button type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="createProductModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form id="formProduct" class="p-4 md:p-5" @submit.prevent="handleSubmit($event)" enctype="multipart/form-data">
          <div class="grid-cols-1">
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
              <input v-model="form.name" type="text" name="name" id="name"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder="Digite o nome" required="">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preço</label>
              <input v-model="form.price" type="number" name="price" id="price"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     placeholder="$2999" required="">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="category"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
              <select v-model="form.category_id" id="category" name="category" required
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value="" selected>Selecione uma categoria</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
                </option>
              </select>
            </div>

            <div class="col-span-2 sm:col-span-1">
              <label for="status"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
              <select v-model="form.status" id="status" name="status" required
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value="" selected>Selecione um status</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>

            <div class="col-span-2 sm:col-span-1">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="small_size">Small file
                input</label>
              <input id="file" name="file" type="file" accept="image/*" @change="onFileChanged($event)"
                     class="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
            </div>
          </div>

          <button type="submit"
                  class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"></path>
            </svg>
            Salvar
          </button>
        </form>
      </div>
    </div>
  </div>


</template>

<script lang="ts">

import {useRouter} from "vue-router";
import {computed, defineComponent, inject, onMounted, ref} from "vue";
import {useCategoriesStore} from "../../../Infrastructure/store/CategoriesStore";
import {Product} from "../../../Domain/Interfaces/Product";
import {IProductService} from "../../../Domain/Interfaces/IProductService";

export default defineComponent({
  name: "CreateModalProduct",
  setup() {
    const categoriesStore = useCategoriesStore();
    const productService = inject('IProductService') as IProductService;
    const router = useRouter();
    const form = ref<Product>({} as Product);
    const data = new FormData();

    onMounted(() => {
      categoriesStore.all();
    });

    async function onFileChanged($event: Event) {
      const target = $event.target as HTMLInputElement;

      if (target && target.files) {
        const result = await getBase64(target.files[0]);
        data.append('file', target.files[0]);
        data.append('name', form.value.name);
        data.append('photo', result.name);
        data.append('category_id', form.value.category_id.toString());
        data.append('status', form.value.status.toString());
        data.append('price', form.value.price.toString());
      }
    }

    const redirect = () => {
      router.push({name: 'product'});
    }

    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result as string;
          const mimeType = file.type;
          const extension = mimeType.split('/')[1];
          const name = file.name;
          const size = file.size;

          const data = {
            base64,
            mimeType,
            extension,
            name,
            size,
          };
          resolve(data);
        };
        reader.onerror = (error) => reject(error);
      });
    };

    const categories = computed(() => categoriesStore.categories);
    return {
      form,
      router,
      categories,
      productService,
      onFileChanged,
      redirect,
      data
    }
  },
  methods: {
    async handleSubmit($event: Event) {
      try {

        const response = await this.productService.store(this.data);

        if (!response.success) {
          alert(JSON.stringify(response.errors));
        }
        const form = document.querySelector('#formProduct');
        form.submit();

        this.redirect();

      } catch (e) {
        console.error('error: ', e);
        if (e.response?.data?.errors) {
          alert(JSON.stringify(e.response.data.errors))
        } else {
          alert(e.message)
        }
      }
    },
  }
})
</script>