import z from "zod";

export const CreateUserRequestSchema = z.object({
    id: z.uuid(),
    latitude: z.number(),
    longitude: z.number(),
    street: z.string(),
    houseNumber: z.string(),
    neighborhood: z.string(),
    city: z.string(),
});

export const UserLocationSchema = z.object({
    id: z.uuid(),
    place_id: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    full_address: z.string(),
    short_address: z.string().optional(),
    street: z.string(),
    houseNumber: z.number(),
    neighborhood: z.string(),
    city: z.string(),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
export type UserLocation = z.infer<typeof UserLocationSchema>;