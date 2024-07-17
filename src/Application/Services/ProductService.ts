import {IProductService} from "../../Domain/Interfaces/IProductService";
import {Product} from "../../Domain/Interfaces/Product";
import axios from "axios";
import {Response} from "../../Domain/Interfaces/Response";

export class ProductService implements IProductService {

    private readonly axios: typeof axios;

    constructor(axiosInstance: typeof axios) {
        this.axios = axiosInstance;
    }

    public async all(page: number): Promise<Response> {
        const response = await this.axios.get(`product?page=${page}`);

        return response.data.data;
    }

    public async store(formData: FormData): Promise<Response> {
        const token = await localStorage.getItem('token') as string;

        const headers = {
            "Content-type": "multipart/form-data",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const response = await this.axios.post('product', formData, headers);

        return response.data;
    }

}