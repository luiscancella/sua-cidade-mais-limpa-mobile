import {
    UserLocation,
    CreateUserLocationRequest,
    GoogleReverseGeocodingApiPlace,
    UserLocationSchema,
    CreateUserLocationRequestSchema,
    UserCreatedResponse,
    Address,
    CollectionSchedule,
} from "src/types";

class UserMapper {
    // Parar de colocar valor default para o collectionSchedule aqui quando vier de resposta do servidor com um valor
    toCreateUserLocationRequest(data: Address, collectionSchedule: CollectionSchedule = "SEG_QUA_SEX"): CreateUserLocationRequest {
        return CreateUserLocationRequestSchema.parse({
            latitude: data.latitude,
            longitude: data.longitude,
            street: data.street,
            houseNumber: data.houseNumber.toString(),
            neighborhood: data.neighborhood,
            city: data.city,
        });
    }
// Parar de exigir o collectionSchedule aqui quando vier de resposta do servidor com um valor
    fromCreateResponse(
        response: UserCreatedResponse,
        address: Address,
        collectionSchedule: CollectionSchedule = "SEG_QUA_SEX"
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