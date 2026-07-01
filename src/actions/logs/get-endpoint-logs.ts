"use server";

import { connectDB } from "@/lib/db";

import Check from "@/models/check.model";

export async function getEndpointLogs(
    endpointId: string
) {
    try {
        await connectDB();

        return await Check.find({
            endpointId,
        })
            .sort({
                checkedAt: -1,
            })
            .limit(100)
            .lean();
    } catch {
        return [];
    }
}