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
        console.log("Mapping user created response to user location:", response, address);
        return UserLocationSchema.parse({
            phone_id: response.phoneId,
            device_secret: response.deviceSecret,
            address: address,
        });
    }
}

export default new UserMapper();