import apiBackend from "src/lib/apiBackend";
import { CreateUserLocationRequest } from "src/types";

class UserService {
    async createUser(id: string, newUser: CreateUserLocationRequest): Promise<void> {
        apiBackend.post("/users/address", newUser, { params: { id } });
    }
}

export default new UserService();