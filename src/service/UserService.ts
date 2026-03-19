import apiBackend from "src/lib/apiBackend";
import { CreateUserLocationRequest } from "src/types";

class UserService {
    async createUser(newUser: CreateUserLocationRequest): Promise<void> {
        return apiBackend.post("/users/address", newUser);
    }
}

export default new UserService();