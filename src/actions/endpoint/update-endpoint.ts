"use server";

import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db";

import { getUser } from "@/lib/getUser";

import Endpoint from "@/models/endpoint.model";
import { EndpointInput, EndpointSchema } from "@/validators/endpoint-validator";



export async function updateEndpoint(
    endpointId: string,
    projectId: string,
    data: EndpointInput
) {
    try {
        await connectDB();

        const user =
            await getUser();

        if (!user) {
            return {
                success: false,
            };
        }

        const validated =
            EndpointSchema.safeParse(
                data
            );

        if (
            !validated.success
        ) {
            return {
                success: false,
            };
        }

        await Endpoint.findOneAndUpdate(
            {
                _id: endpointId,
                userId: user._id,
            },
            validated.data
        );

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