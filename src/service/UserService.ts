import { Axios, AxiosResponse } from "axios";
import apiBackend from "src/lib/apiBackend";
import UserMapper from "src/mapper/UserMapper";
import { CreateUserLocationRequest, UserCreatedResponse, UserLocation } from "src/types";

class UserService {
    async createUser(newUser: CreateUserLocationRequest): Promise<UserCreatedResponse> {
        console.log("Criando usuário com dados:", newUser);
        const response = await apiBackend.post<UserCreatedResponse>("/users/address", newUser);
        const data = response.data;
        return data;
    }

    async registerFCMToken(phoneId: string, fcm_token: string): Promise<void> {
        return apiBackend.post(
            "/users/fcm-token",
            { fcm_token },
            { params: { phoneId } }
        );
    }
}

export default new UserService();