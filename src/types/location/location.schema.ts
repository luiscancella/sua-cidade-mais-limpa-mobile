import { z } from "zod";

export const GoogleReverseGeocodingApiPlaceSchema = z.object({
    address_components: z.array(
        z.object({
            long_name: z.string(),
            short_name: z.string(),
            types: z.array(z.string()),
        })
    ),
    formatted_address: z.string(),
    geometry: z.object({
        location: z.object({
            lat: z.number(),
            lng: z.number(),
        }),
    }),
    place_id: z.string(),
});

export const GoogleReverseGeocodingApiResponseSchema = z.object({
    results: z.array(
        GoogleReverseGeocodingApiPlaceSchema
    ),
    status: z.string(),
});

export type GoogleReverseGeocodingApiResponse = z.infer<typeof GoogleReverseGeocodingApiResponseSchema>;
export type GoogleReverseGeocodingApiPlace = z.infer<typeof GoogleReverseGeocodingApiPlaceSchema>;