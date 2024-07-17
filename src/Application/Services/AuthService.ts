import {IAuthService} from "../../Domain/Interfaces/IAuthService";
import {User} from "../../Domain/Interfaces/User";
import axios from "axios";
import {Response} from "../../Domain/Interfaces/Response";

export class AuthService implements IAuthService {

    private readonly axios: typeof axios;

    constructor(axiosInstance: typeof axios) {
        this.axios = axiosInstance;
    }

    public async getUser(): Promise<User> {
        return await this.axios.get('auth/user');
    }

    public async login(email: string, password: string): Promise<Response> {

        const data = {
            email,
            password
        }
        try {
            const {data: response} = await this.axios.post('auth/login', data);

            if (response.success) {
                await localStorage.setItem('token', response.data.token);

                return response;
            }
            return response;
        }catch (e) {
            console.error(e.message)
        }

    }

    public async logout(): Promise<void> {
        return await this.axios.get('auth/logout');
    }

}