import * as Location from 'expo-location';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { GoogleReverseGeocodingApiResponse, UserLocation } from 'src/types';
import { GoogleReverseGeocodingApiResponseSchema } from 'src/types';

export async function askForLocation(): Promise<Location.LocationObject> {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return Promise.reject("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    return location;
}

export async function reverseGoogleGeocoding(coords: Location.LocationObject): Promise<GoogleReverseGeocodingApiResponse> {
    const params = {
        latlng: `${coords.coords.latitude},${coords.coords.longitude}`,
        key: "AIzaSyC06VItPhore2tT6caeS9djCD6iCuPEfFE",
        result_type: "street_address",
    };

    const url = `https://maps.googleapis.com/maps/api/geocode/json?${new URLSearchParams(params)}`;

    console.debug("Fetching address from:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data['status'] !== 'OK') {
            console.error("Erro na resposta da API do Google:", data);
            return Promise.reject(`Google API error: ${data['status']}`);
        }

        const result : GoogleReverseGeocodingApiResponse = await GoogleReverseGeocodingApiResponseSchema.parseAsync(data);
        return Promise.resolve(result);
    } catch (error) {
        console.error("Erro ao tentar utilizar a API do Google:", error);
        return Promise.reject("Erro ao buscar ou parsear dados da localização");
    }
}

export function handleAddressRequestToAutocompleteGoogleAPI(data: GooglePlaceData, details: GooglePlaceDetail | null): LocationDTO | undefined {
    if (details === null) {
        console.error('Atenção', 'Não foi possível obter os detalhes do endereço selecionado');
        return;
    }

    const { lat: latitude, lng: longitude } = details.geometry.location;
    const { place_id, description: full_address, structured_formatting: { main_text: short_address } } = data;

    var locationData : LocationDTO = {
        place_id,
        latitude,
        longitude,
        full_address,
        short_address,
    }
    return locationData;
}