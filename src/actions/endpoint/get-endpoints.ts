"use server";

import { connectDB } from "@/lib/db";

import Endpoint from "@/models/endpoint.model";

export async function getEndpoints(
    projectId: string
) {
    try {
        await connectDB();

        const endpoints =
            await Endpoint.find({
                projectId,
            })
                .sort({
                    createdAt: -1,
                })
                .lean();

        return endpoints;
    } catch {
        return [];
    }
}