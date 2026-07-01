"use server";

import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db";

import { getUser } from "@/lib/getUser";

import Endpoint from "@/models/endpoint.model";

export async function deleteEndpoint(
    endpointId: string,
    projectId: string
) {
    try {
        await connectDB();

        const user =
            await getUser();

        if (!user) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        await Endpoint.findOneAndDelete({
            _id: endpointId,
            userId: user._id,
        });

        revalidatePath(
            `/dashboard/projects/${projectId}`
        );

        return {
            success: true,
        };
    } catch {
        return {
            success: false,
        };
    }
}