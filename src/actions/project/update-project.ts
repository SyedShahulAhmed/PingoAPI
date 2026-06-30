"use server";

import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";

import Project from "@/models/project.model";
import { revalidatePath } from "next/cache";

export async function updateProject(
    projectId: string,
    data: {
        name: string;
        description?: string;
    }
) {
    try {
        await connectDB();

        const user = await getUser();

        if (!user) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        const project =
            await Project.findOneAndUpdate(
                {
                    _id: projectId,
                    userId: user._id,
                },
                data,
                {
                    new: true,
                }
            );
        revalidatePath("/dashboard/projects");
        return {
            success: true,
            project,
        };
    } catch {
        return {
            success: false,
            message: "Failed to update project",
        };
    }
}