import {ICategoryService} from "../../Domain/Interfaces/ICategoryService";
import {Category} from "../../Domain/Interfaces/Category";
import axios from "axios";
import {Response} from "../../Domain/Interfaces/Response";

export class CategoryService implements ICategoryService {

    private readonly axios: typeof axios;

    constructor(axiosInstance: typeof axios) {
        this.axios = axiosInstance;
    }

    public async all(): Promise<Category[]> {
        const response = await this.axios.get('category');

        return response.data.data;
    }

    public async store(category: Category): Promise<Response> {

        const {data: response} = await this.axios.post('category', category);

        return response;
    }

}