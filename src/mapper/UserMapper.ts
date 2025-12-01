import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";
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
        const addressComponent = data.address_components;

        const houseNumberComponent = addressComponent.find(component => component.types.includes("street_number"));
        const streetComponent = addressComponent.find(component => component.types.includes("route"));
        const neighborhoodComponent = addressComponent.find(component => component.types.includes("sublocality") || component.types.includes("neighborhood"));
        const cityComponent = addressComponent.findLast(component => component.types.includes("administrative_area_level_2"));

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

        const userLocation: Partial<UserLocation> = {
            place_id: data.place_id,
            latitude: data.geometry.location.lat,
            longitude: data.geometry.location.lng,
            full_address: data.formatted_address,
            short_address: `${street}, ${houseNumber}`,
            houseNumber: houseNumber,
            street: street,
            neighborhood: neighborhood,
            city: city,
        }

        if (phone_id) { userLocation.phone_id = phone_id; }

        return UserLocationSchema.parse(userLocation);
    }

    fromGoogleAutocomplete(data: GooglePlaceData, details: GooglePlaceDetail | null) {
        if (details === null) {
            console.error('Atenção', 'Não foi possível obter os detalhes do endereço selecionado');
            return;
        }

        const addressComponent = details.address_components;
        console.log(JSON.stringify(addressComponent, null, 2));
        
        const houseNumberComponent = addressComponent.find(component => component.types.includes("street_number"));
        const streetComponent = addressComponent.find(component => component.types.includes("route"));
        const neighborhoodComponent = addressComponent.find(component => component.types.includes("sublocality") || component.types.includes("neighborhood"));
        const cityComponent = addressComponent.findLast(component => component.types.includes("administrative_area_level_2"));
        
        const houseNumber = houseNumberComponent?.long_name ?? houseNumberComponent?.short_name;
        const street = streetComponent?.long_name ?? streetComponent?.short_name;
        const neighborhood = neighborhoodComponent?.long_name ?? neighborhoodComponent?.short_name;
        const city = cityComponent?.long_name ?? cityComponent?.short_name;

        if (!street || !houseNumber || !neighborhood || !city) {
            console.error("Erro ao mapear endereço do local selecionado: componentes faltando", {
                street,
                houseNumber,
                neighborhood,
                city,
            });
            return;
        }

        const userLocation = {
            place_id: data.place_id,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            full_address : data.description,
            short_address : `${street}, ${houseNumber}`,
            houseNumber: houseNumber,
            street: street,
            neighborhood: neighborhood,
            city: city,
        }

        return UserLocationSchema.parse(userLocation);
    }
}

export default new UserMapper();