import {
    UserLocation,
    CreateUserLocationRequest,
    GoogleReverseGeocodingApiPlace,
    UserLocationSchema,
    CreateUserLocationRequestSchema,
    UserCreatedResponse,
    Address
} from "src/types";

class UserMapper {
    toCreateUserLocationRequest(data: Address): CreateUserLocationRequest {
        return CreateUserLocationRequestSchema.parse({
            latitude: data.latitude,
            longitude: data.longitude,
            street: data.street,
            houseNumber: data.houseNumber.toString(),
            neighborhood: data.neighborhood,
            city: data.city,
        });
    }

    fromCreateResponse(response: UserCreatedResponse, address: Address): UserLocation {
        return UserLocationSchema.parse({
            phone_id: response.phoneId,
            address: address,
        });
    }
}

export default new UserMapper();