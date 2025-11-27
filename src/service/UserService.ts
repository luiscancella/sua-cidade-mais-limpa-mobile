import apiBackend from "src/lib/apiBackend";
import { CreateUserLocationRequest } from "src/types";

class UserService {
    async createUser(phone_id: string, newUser: CreateUserLocationRequest): Promise<void> {
        return apiBackend.post("/users/address", newUser, { params: { phoneId: phone_id } });
    }
}

export default new UserService();