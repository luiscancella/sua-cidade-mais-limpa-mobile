import * as Location from 'expo-location';
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
        key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        result_type: "street_address",
    };

    const url = `https://maps.googleapis.com/maps/api/geocode/json?${new URLSearchParams(params)}`;

    // console.debug("Fetching address from:", url);

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