import {defineStore} from 'pinia';
import {Product} from "../../Domain/Interfaces/Product";
import {inject} from "vue";
import {IProductService} from "../../Domain/Interfaces/IProductService";

export const useProductStore = defineStore('products', {
    state: () => {
        return {
            products: [] as Product[],
            product: [] as Product,
            loading: false,
            error: null as any,
        }
    },
    actions: {
        async listAllProducts(page: number) {
            this.loading = true;
            this.error = null;
            try {
                this.products = await this.productService.all(page);
            } catch (error) {
                console.error('errors: ', error);
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async store(product: Product) {
            try {
                this.product = await this.productService.store(product);
            } catch (error) {
                console.error('errors: ', error);
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
    },
    getters: {
        productService() {
            return inject('IProductService') as IProductService;
        }
    }
});