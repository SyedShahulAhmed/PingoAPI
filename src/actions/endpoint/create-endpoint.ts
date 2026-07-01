"use server";

import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db";

import { getUser } from "@/lib/getUser";

import Endpoint from "@/models/endpoint.model";
import { EndpointInput, EndpointSchema } from "@/validators/endpoint-validator";


export async function createEndpoint(
    projectId: string | null,
    data: EndpointInput
) {
    try {
        await connectDB();

        const user =
            await getUser();

        if (!user) {
            return {
                success: false,
                message:
                    "Unauthorized",
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
                message:
                    validated.error.issues[0]?.message ?? "Validation failed",
            };
        }

        await Endpoint.create({
            userId: user._id,

            projectId: projectId || null,

            ...validated.data,
        });

        revalidatePath(
            `/dashboard/projects/${projectId}`
        );

        return {
            success: true,
            message:
                "Endpoint created successfully",
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message:
                "Failed to create endpoint",
        };
    }
}