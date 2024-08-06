import {Response} from "./Response";

export interface IProductService {

    all(page: number): Promise<Response>

    store(formData: FormData): Promise<Response>

}