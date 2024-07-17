import {defineStore} from 'pinia';
import {Category} from "../../Domain/Interfaces/Category";
import {inject} from "vue";
import {ICategoryService} from "../../Domain/Interfaces/ICategoryService";

export const useCategoriesStore = defineStore('categories', {
    state: () => {
        return {
            categories: [] as Category[],
            category: [] as Category,
        }
    },
    actions: {
        async all() {
            try {
                this.categories = await this.categoryService.all();
            } catch (error) {
                console.error('errors: ', error);
            } finally {

            }
        },
        async store(category: Category) {
            try {
                const response = await this.categoryService.store(category);
                this.category = response.data;
            } catch (error) {
                console.error('errors: ', error);

            } finally {

            }
        },
    },
    getters: {
        categoryService() {
            return inject('ICategoryService') as ICategoryService;
        }
    }
});