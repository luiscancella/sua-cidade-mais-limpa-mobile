import z from "zod";
import { AddressSchema } from "../address/address.schema";

export const CreateUserLocationRequestSchema = z.object({
    fcmToken: z.string().optional(),
    latitude: z.number(),
    longitude: z.number(),
    street: z.string().default("None"),
    houseNumber: z.string().default("None"),
    neighborhood: z.string().default("None"),
    city: z.string().default("None"),
});

export const UserLocationSchema = z.object({
    phone_id: z.uuid(),
    fcmToken: z.string().optional(),
    address: AddressSchema,
});

export type CreateUserLocationRequest = z.infer<typeof CreateUserLocationRequestSchema>;
export type UserLocation = z.infer<typeof UserLocationSchema>;