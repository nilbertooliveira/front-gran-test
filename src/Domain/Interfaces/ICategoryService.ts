import {Category} from "./Category";
import {Response} from "./Response";

export interface ICategoryService {

    all(): Promise<Category[]>

    store(category: Category): Promise<Response>
}