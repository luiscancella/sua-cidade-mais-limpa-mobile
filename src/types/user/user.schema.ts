import z from "zod";
import { AddressSchema } from "../address/address.schema";
import { CollectionDaysSchema, CollectionShiftSchema } from "./common.schema";

export const UserRegistrationRequestSchema = z.object({
    phoneId: z.uuid().optional(),
    latitude: z.number(),
    longitude: z.number(),
    street: z.string().default("None"),
    houseNumber: z.string().default("None"),
    neighborhood: z.string().default("None"),
    city: z.string().default("None"),
    collectionDays: CollectionDaysSchema,
    shift: CollectionShiftSchema,
});

export const UserRegistrationResponseSchema = z.object({
    phoneId: z.uuid(),
    deviceSecret: z.string(),
    collectionDays: CollectionDaysSchema,
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

export const UserRegistrationSchema = z.object({
    phoneId: z.uuid(),
    deviceSecret: z.uuid(),
    address: AddressSchema,
    collectionDays: CollectionDaysSchema,
    collectionShift: CollectionShiftSchema,
});

export type UserRegistrationRequest = z.infer<typeof UserRegistrationRequestSchema>;
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export type UserRegistrationResponse = z.infer<typeof UserRegistrationResponseSchema>;
