import {
    UserRegistration,
    UserRegistrationRequest,
    UserRegistrationSchema,
    UserRegistrationRequestSchema,
    UserRegistrationResponse,
    Address,
    CollectionDays,
    CollectionShift,
} from "src/types";

class UserMapper {
    toRegistrationRequest(data: Address, collectionDays: CollectionDays, collectionShift: CollectionShift): UserRegistrationRequest {
        return UserRegistrationRequestSchema.parse({
            latitude: data.latitude,
            longitude: data.longitude,
            street: data.street,
            houseNumber: data.houseNumber.toString(),
            neighborhood: data.neighborhood,
            city: data.city,
            collectionDays,
            shift: collectionShift,
        });
    }

    fromRegistrationToRequest(data: UserRegistration): UserRegistrationRequest {
        return UserRegistrationRequestSchema.parse({
            phoneId: data.phoneId,
            latitude: data.address.latitude,
            longitude: data.address.longitude,
            street: data.address.street,
            houseNumber: data.address.houseNumber,
            neighborhood: data.address.neighborhood,
            city: data.address.city,
            collectionDays: data.collectionDays,
            shift: data.collectionShift,
        });
    }

    fromRegistrationResponse(
        response: UserRegistrationResponse,
        address: Address,
    ): UserRegistration {
        return UserRegistrationSchema.parse({
            phoneId: response.phoneId,
            deviceSecret: response.deviceSecret,
            address,
            collectionDays: response.collectionDays,
            collectionShift: response.shift,
        });
    }
}

export default new UserMapper();
