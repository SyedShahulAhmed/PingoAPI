import { z } from "zod";

export const EndpointSchema = z.object({
    name: z
        .string()
        .min(
            2,
            "Endpoint name must be at least 2 characters"
        ),

    url: z
        .string()
        .url("Please enter a valid URL"),

    method: z.enum([
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
    ]),

    interval: z.enum([
        "1m",
        "5m",
        "1h",
    ]),
});

export type EndpointInput =
    z.infer<typeof EndpointSchema>;