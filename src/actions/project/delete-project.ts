"use server";

import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";

import Project from "@/models/project.model";
import { revalidatePath } from "next/cache";

export async function deleteProject(
    projectId: string
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

        await Project.findOneAndDelete({
            _id: projectId,
            userId: user._id,
        });
        revalidatePath("/dashboard/projects");
        return {
            success: true,
        };
    } catch {
        return {
            success: false,
        };
    }
}