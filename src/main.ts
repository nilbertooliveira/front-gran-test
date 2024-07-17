import {createApp} from 'vue'
import './index.css'
import App from './App.vue'
import router from "./Application/Routers";
import axios from "axios";
import {createPinia} from "pinia";
import {IProductService} from "./Domain/Interfaces/IProductService";
import {ICategoryService} from "./Domain/Interfaces/ICategoryService";
import {IAuthService} from "./Domain/Interfaces/IAuthService";
import {ProductService} from "./Application/Services/ProductService";
import {CategoryService} from "./Application/Services/CategoryService";
import {AuthService} from "./Application/Services/AuthService";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

const pinia = createPinia();


const app = createApp(App)
    .use(router)
    .use(pinia);

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Authorization": `Bearer ${await localStorage.getItem('token')}`
    },
});

app.config.globalProperties.$axios = axiosInstance;

pinia.use(({store}) => {
    store.$axios = axiosInstance;
});

app.provide('IProductService', new ProductService(axiosInstance))
.provide('ICategoryService', new CategoryService(axiosInstance))
.provide('IAuthService', new AuthService(axiosInstance));

app.use(VueAwesomePaginate);

app.mount('#app')
