import { z } from "zod";

export const ProjectSchema = z.object({
    name: z
        .string()
        .min(3, "Project must be at least 3 characters long")
        .max(100, "Project must be less than 100 characters long"),

    description: z.string().optional(),
});

export type ProjectInput =
    z.infer<typeof ProjectSchema>;