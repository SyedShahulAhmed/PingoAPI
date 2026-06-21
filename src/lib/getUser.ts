"use server";

import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { connectDB } from "./db";
import User from "@/models/user.model";

export async function getUser() {
    await connectDB();

    const token =
        (await cookies()).get("token")?.value;

    console.log("TOKEN:", token);

    if (!token) return null;

    const payload = verifyToken(token);

    console.log("PAYLOAD:", payload);

    if (!payload) return null;

    const user = await User.findById(
        payload.userId
    ).select("-password");

    console.log("DB USER:", user);

    return user;
}