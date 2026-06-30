"use server";

import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";

import Endpoint from "@/models/endpoint.model";

export async function getRecentActivity() {
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
      .sort({
        updatedAt: -1,
      })
      .limit(10)
      .lean();
  } catch {
    return [];
  }
}