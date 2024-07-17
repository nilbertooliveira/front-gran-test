import {User} from "./User";
import {Response} from "./Response";

export interface IAuthService {

    login(email: string, password: string): Promise<Response>;

    getUser(): Promise<User>;

    logout(): Promise<void>;
}