import z from "zod";

export const HeadersRequiredSchema = z.object({
    "x-phone-id": z.uuid(),
    "x-device-secret": z.uuid(),
    "x-timestamp": z.string().default(Date.now().toString()),
});

export type HeadersRequired = z.infer<typeof HeadersRequiredSchema>;