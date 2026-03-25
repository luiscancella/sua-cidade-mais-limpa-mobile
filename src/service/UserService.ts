import apiBackend from "src/lib/apiBackend";
import {
    CreateUserLocationRequest,
    HeadersRequired,
    UserCreatedResponse
} from "src/types";

class UserService {
    async createUser(newUser: CreateUserLocationRequest): Promise<UserCreatedResponse> {
        console.log("Criando usuário com dados:", newUser);
        const response = await apiBackend.post<UserCreatedResponse>("/users/address", newUser);
        const data = response.data;
        return data;
    }

    async registerFCMToken(phoneId: string, fcm_token: string, headers: HeadersRequired): Promise<void> {
        return apiBackend.post(
            "/users/fcm-token",
            { fcmToken: fcm_token },
            {
                params: { phoneId },
                headers: headers,
            }
        );
    }
}

export default new UserService();