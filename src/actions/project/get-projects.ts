"use server";

import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";

import Project from "@/models/project.model";

export async function getProjects() {
    try {
        await connectDB();

        const user = await getUser();

        if (!user) {
            return [];
        }

        const projects = await Project.find({
            userId: user._id,
        })
            .sort({
                createdAt: -1,
            })
            .lean();
        return JSON.parse(
            JSON.stringify(projects)
        );
    } catch {
        return [];
    }
}