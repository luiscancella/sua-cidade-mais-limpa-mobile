import z from "zod";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


export const CreateUserLocationRequestSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    street: z.string(),
    houseNumber: z.string(),
    neighborhood: z.string(),
    city: z.string(),
});

export const UserLocationSchema = z.object({
    phone_id: z.uuid().default(() => uuidv4()),
    place_id: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    full_address: z.string(),
    short_address: z.string(),
    street: z.string(),
    houseNumber: z.number(),
    neighborhood: z.string(),
    city: z.string(),
});

export type CreateUserLocationRequest = z.infer<typeof CreateUserLocationRequestSchema>;
export type UserLocation = z.infer<typeof UserLocationSchema>;