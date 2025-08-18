import * as Location from 'expo-location';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { LocationDTO } from 'src/types/LocationDTO';
import * as z from "zod";

const GoogleReverseGeocodingApiResponseSchema = z.object({
    results: z.array(
        z.object({
            formatted_address: z.string(),
            geometry: z.object({
                location: z.object({
                    lat: z.number(),
                    lng: z.number(),
                }),
            }),
            place_id: z.string(),
        })
    ),
    status: z.string(),
});

export async function askForLocation(): Promise<Location.LocationObject> {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return Promise.reject("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    return location;
}

export async function getAddressByCoords(coords: Location.LocationObject): Promise<LocationDTO> {
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
        const result = await GoogleReverseGeocodingApiResponseSchema.parseAsync(data);

        if (result.results.length === 0) return Promise.reject("No results found");

        const locationData: LocationDTO = {
            place_id: result.results[0].place_id,
            latitude: result.results[0].geometry.location.lat,
            longitude: result.results[0].geometry.location.lng,
            full_address: result.results[0].formatted_address,
        };
        console.log("Parsed location data:", locationData);
        return locationData;
    } catch (error) {
        console.error("Erro ao buscar ou parsear dados da localização:", error);
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