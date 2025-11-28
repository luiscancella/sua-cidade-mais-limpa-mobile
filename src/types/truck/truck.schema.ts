import { z } from "zod";

export const TruckDistanceSchema = z.object({
    distanceKm: z.number(),
    etaMinutes: z.number(),
});

export type TruckDistance = z.infer<typeof TruckDistanceSchema>;
