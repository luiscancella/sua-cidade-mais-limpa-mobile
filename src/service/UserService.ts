import apiBackend from "src/lib/apiBackend";
import { CreateUserLocationRequest, UserLocation } from "src/types";

class UserService {
    async createUser(newUser: CreateUserLocationRequest): Promise<UserLocation> {
        return apiBackend.post("/users/address", newUser);
    }

    async registerFCMToken(phoneId: string, fcmToken: string): Promise<void> {
        return apiBackend.post(
            "/users/fcm-token",
            { fcmToken },
            { params: { phoneId } }
        );
    }
}

export default new UserService();