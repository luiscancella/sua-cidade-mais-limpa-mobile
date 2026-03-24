import z from "zod";

export const AddressSchema = z.object({
    place_id: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    full_address: z.string(),
    short_address: z.string(),
    street: z.string().default("None"),
    houseNumber: z.string().default("None"),
    neighborhood: z.string().default("None"),
    city: z.string().default("None"),
});

export type Address = z.infer<typeof AddressSchema>;