"use server";

import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";

import Project from "@/models/project.model";
import { ProjectSchema } from "@/validators/project-validator";
import { revalidatePath } from "next/cache";
export async function createProject(data: {
    name: string;
    description?: string;
}) {
    try {
        await connectDB();
        const user = await getUser();
        if (!user) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        const validated =
            ProjectSchema.safeParse(data);
        if (!validated.success) {
            return {
                success: false,
                message:
                    validated.error.issues[0].message,
            };
        }

        const project =
            await Project.create({
                userId: user._id,
                ...validated.data,
            });
        revalidatePath("/dashboard/projects");
        return {
            success: true,
            project,
        };
    } catch {
        return {
            success: false,
            message:
                "Failed to create project",
        };
    }
}