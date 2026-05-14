import {
    UserLocation,
    CreateUserLocationRequest,
    UserLocationSchema,
    CreateUserLocationRequestSchema,
    UserCreatedResponse,
    Address,
    CollectionSchedule,
    CollectionShift,
} from "src/types";

class UserMapper {
    toCreateUserLocationRequest(data: Address, collectionSchedule: CollectionSchedule, collectionShift: CollectionShift): CreateUserLocationRequest {
        return CreateUserLocationRequestSchema.parse({
            latitude: data.latitude,
            longitude: data.longitude,
            street: data.street,
            houseNumber: data.houseNumber.toString(),
            neighborhood: data.neighborhood,
            city: data.city,
            collectionDays: collectionSchedule,
            shift: collectionShift,
        });
    }

    fromCreateResponse(
        response: UserCreatedResponse,
        address: Address,
    ): UserLocation {
        return UserLocationSchema.parse({
            phone_id: response.phoneId,
            device_secret: response.deviceSecret,
            address: address,
            collection_schedule: response.collectionDays,
            collection_shift: response.shift,
        });
    }
}

export default new UserMapper();
