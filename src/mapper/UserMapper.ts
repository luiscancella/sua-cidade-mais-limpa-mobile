import {
    UserLocation,
    CreateUserLocationRequest,
    GoogleReverseGeocodingApiPlace,
    UserLocationSchema,
    CreateUserLocationRequestSchema
} from "src/types";

class UserMapper {
    toCreateUserLocationRequest(data: UserLocation): CreateUserLocationRequest {
        return CreateUserLocationRequestSchema.parse({
            fcmToken: data.fcmToken,
            latitude: data.address.latitude,
            longitude: data.address.longitude,
            street: data.address.street,
            houseNumber: data.address.houseNumber.toString(),
            neighborhood: data.address.neighborhood,
            city: data.address.city,
        });
    }
}

export default new UserMapper();