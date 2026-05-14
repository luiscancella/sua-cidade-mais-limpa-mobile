import z from "zod";
import { AddressSchema } from "../address/address.schema";
import { CollectionScheduleSchema, CollectionShiftSchema } from "./common.schema";

export const CreateUserLocationRequestSchema = z.object({
    phoneId: z.uuid().optional(),
    latitude: z.number(),
    longitude: z.number(),
    street: z.string().default("None"),
    houseNumber: z.string().default("None"),
    neighborhood: z.string().default("None"),
    city: z.string().default("None"),
    collectionDays: CollectionScheduleSchema,
    shift: CollectionShiftSchema,
});

export const UserCreatedResponseSchema = z.object({
    phoneId: z.uuid(),
    deviceSecret: z.string(),
    collectionDays: CollectionScheduleSchema,
    shift: CollectionShiftSchema,
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    houseNumber: z.string(),
    fcmToken: z.string().nullable(),
    fcmTokenUpdatedAt: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const UserLocationSchema = z.object({
    phone_id: z.uuid(),
    device_secret: z.uuid(),
    address: AddressSchema,
    collection_schedule: CollectionScheduleSchema,
    collection_shift: CollectionShiftSchema,
});

export type CreateUserLocationRequest = z.infer<typeof CreateUserLocationRequestSchema>;
export type UserLocation = z.infer<typeof UserLocationSchema>;
export type UserCreatedResponse = z.infer<typeof UserCreatedResponseSchema>;