import apiBackend from "src/lib/apiBackend";
import { CreateUserRequest } from "src/types/user/user.schema";

export class UserService {
    async createUser(newUser: CreateUserRequest): Promise<void> {
        apiBackend.post("/users", newUser)
    }
}