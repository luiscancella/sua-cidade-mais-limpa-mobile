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
            latitude: data.latitude,
            longitude: data.longitude,
            street: data.street,
            houseNumber: data.houseNumber.toString(),
            neighborhood: data.neighborhood,
            city: data.city,
        });
    }

    fromGoogleReverseGeocodingApiPlace(data: GoogleReverseGeocodingApiPlace, phone_id?: string): UserLocation | undefined {
        const addressComponents = data.address_components;
        const houseNumberComponent = addressComponents.find(component => component.types.includes("street_number"));
        const streetComponent = addressComponents.find(component => component.types.includes("route"));
        const neighborhoodComponent = addressComponents.find(component => component.types.includes("sublocality") || component.types.includes("neighborhood"));
        const cityComponent = addressComponents.findLast(component => component.types.includes("administrative_area_level_2"));

        const houseNumber = houseNumberComponent?.long_name ?? houseNumberComponent?.short_name;
        const street = streetComponent?.long_name ?? streetComponent?.short_name;
        const neighborhood = neighborhoodComponent?.long_name ?? neighborhoodComponent?.short_name;
        const city = cityComponent?.long_name ?? cityComponent?.short_name;

        if (!street || !houseNumber || !neighborhood || !city) {
            console.error("Erro ao mapear endereço: componentes faltando", {
                street,
                houseNumber,
                neighborhood,
                city,
            });
            return undefined;
        }

        const userLocation : Partial<UserLocation> = {
            latitude: data.geometry.location.lat,
            longitude: data.geometry.location.lng,
            full_address: data.formatted_address,
            short_address: `${street}, ${houseNumber}`,
            houseNumber: parseInt(houseNumber),
            street: street,
            neighborhood: neighborhood,
            city: city,
        }

        if (phone_id) { userLocation.phone_id = phone_id; }

        return UserLocationSchema.parse(userLocation);
    }
}

export default new UserMapper();