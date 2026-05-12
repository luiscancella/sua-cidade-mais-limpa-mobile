import {
    UserLocation,
    CreateUserLocationRequest,
    UserLocationSchema,
    CreateUserLocationRequestSchema,
    UserCreatedResponse,
    Address,
    CollectionSchedule,
} from "src/types";

class UserMapper {
    toCreateUserLocationRequest(data: Address, collectionSchedule: CollectionSchedule): CreateUserLocationRequest {
        return CreateUserLocationRequestSchema.parse({
            latitude: data.latitude,
            longitude: data.longitude,
            street: data.street,
            houseNumber: data.houseNumber.toString(),
            neighborhood: data.neighborhood,
            city: data.city,
            collectionDays: collectionSchedule,
        });
    }

    fromCreateResponse(
        response: UserCreatedResponse,
        address: Address,
        collectionSchedule: CollectionSchedule
    ): UserLocation {
        return UserLocationSchema.parse({
            phone_id: response.phoneId,
            device_secret: response.deviceSecret,
            address: address,
            collection_schedule: collectionSchedule,
        });
    }
}

export default new UserMapper();
