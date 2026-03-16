import { z } from "zod";

export const TruckDistanceSchema = z.object({
    distanceKm: z.number(),
    etaMinutes: z.number(),
});

export type TruckDistance = z.infer<typeof TruckDistanceSchema>;

export const TruckPositionSchema = z.object({
    id: z.number(),
    lat: z.number(),
    lng: z.number(),
});

export type TruckPosition = z.infer<typeof TruckPositionSchema>;
