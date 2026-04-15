import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";
import {
    Address,
    AddressSchema,
    GoogleReverseGeocodingApiPlace
} from "src/types";

class AddressMapper {
    public fromGoogleReverseGeocodingApiPlace(data: GoogleReverseGeocodingApiPlace) : Address {
        const addressComponent = data.address_components;

        const houseNumberComponent = addressComponent.find(component => component.types.includes("street_number"));
        const streetComponent = addressComponent.find(component => component.types.includes("route"));
        const neighborhoodComponent = addressComponent.find(component => component.types.includes("sublocality") || component.types.includes("neighborhood"));
        const cityComponent = addressComponent.findLast(component => component.types.includes("administrative_area_level_2"));

        const houseNumber = houseNumberComponent?.long_name ?? houseNumberComponent?.short_name;
        const street = streetComponent?.long_name ?? streetComponent?.short_name;
        const neighborhood = neighborhoodComponent?.long_name ?? neighborhoodComponent?.short_name ?? "?";
        const city = cityComponent?.long_name ?? cityComponent?.short_name;

        if (!street || !houseNumber || !neighborhood || !city) {
            console.error("Erro ao mapear endereço: componentes faltando", {
                street,
                houseNumber,
                neighborhood,
                city,
            });
            throw new Error("Erro ao mapear endereço: componentes faltando");
        }

        const address : Address = {
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

        return AddressSchema.parse(address);
    }

    public fromGoogleAutocomplete(data: GooglePlaceData, details: GooglePlaceDetail | null): Address | null {
        if (details === null) {
            console.error('Atenção', 'Não foi possível obter os detalhes do endereço selecionado');
            throw new Error("Detalhes do endereço são nulos");
        }

        const addressComponent = details.address_components;

        const houseNumberComponent = addressComponent.find(component => component.types.includes("street_number"));
        const houseNumber = houseNumberComponent?.long_name ?? houseNumberComponent?.short_name;

        const streetComponent = addressComponent.find(component => component.types.includes("route"));
        const street = streetComponent?.long_name ?? streetComponent?.short_name;

        const neighborhoodComponent = addressComponent.find(component => component.types.includes("sublocality") || component.types.includes("neighborhood"));
        const neighborhood = neighborhoodComponent?.long_name ?? neighborhoodComponent?.short_name;

        const cityComponent = addressComponent.findLast(component => component.types.includes("administrative_area_level_2"));
        const city = cityComponent?.long_name ?? cityComponent?.short_name;


        const address = {
            place_id: data.place_id,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            full_address: data.description,
            short_address: houseNumber ? `${street}, ${houseNumber}` : `${street}`,
            houseNumber: houseNumber,
            street: street,
            neighborhood: neighborhood,
            city: city,
        }

        return AddressSchema.parse(address);
    }
}

export default new AddressMapper();