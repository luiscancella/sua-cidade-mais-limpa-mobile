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

export const ETAStatusSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("calculating") }),
  z.object({ kind: z.literal("connecting") }),
  z.object({ kind: z.literal("available"), minutes: z.number() }),
  z.object({ kind: z.literal("unavailable") }),
  z.object({ kind: z.literal("no_connection") }),
]);

export type ETAStatus = z.infer<typeof ETAStatusSchema>;
