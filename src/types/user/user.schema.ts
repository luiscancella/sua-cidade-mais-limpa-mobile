import z from "zod";    
import uuid from 'react-native-uuid';

export const CreateUserLocationRequestSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    street: z.string(),
    houseNumber: z.string(),
    neighborhood: z.string(),
    city: z.string(),
});

export const UserLocationSchema = z.object({
    phone_id: z.uuid().default(() => uuid.v4() as string),
    place_id: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    full_address: z.string(),
    short_address: z.string(),
    street: z.string(),
    houseNumber: z.string(),
    neighborhood: z.string(),
    city: z.string(),
});

export type CreateUserLocationRequest = z.infer<typeof CreateUserLocationRequestSchema>;
export type UserLocation = z.infer<typeof UserLocationSchema>;