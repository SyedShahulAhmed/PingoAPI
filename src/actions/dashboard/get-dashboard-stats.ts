"use server";

import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";

import Project from "@/models/project.model";
import Endpoint from "@/models/endpoint.model";

export async function getDashboardStats() {
    try {
        await connectDB();

        const user =
            await getUser();

        if (!user) {
            return null;
        }

        const totalProjects =
            await Project.countDocuments({
                userId: user._id,
            });

        const totalEndpoints =
            await Endpoint.countDocuments({
                userId: user._id,
            });

        const onlineEndpoints =
            await Endpoint.countDocuments({
                userId: user._id,
                status: "ONLINE",
            });

        const offlineEndpoints =
            await Endpoint.countDocuments({
                userId: user._id,
                status: {
                    $ne: "ONLINE",
                },
            });

        return {
            totalProjects,
            totalEndpoints,
            onlineEndpoints,
            offlineEndpoints,
        };
    } catch {
        return null;
    }
}