"use server";

import { connectDB } from "@/lib/db";

import { getUser } from "@/lib/getUser";

import Endpoint from "@/models/endpoint.model";

export async function getLogEndpoints() {
    try {
        await connectDB();

        const user =
            await getUser();

        if (!user) {
            return [];
        }

        return await Endpoint.find({
            userId: user._id,
        })
            .select(
                "_id name status"
            )
            .sort({
                name: 1,
            })
            .lean();
    } catch {
        return [];
    }
}