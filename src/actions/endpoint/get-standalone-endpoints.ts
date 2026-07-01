"use server";

import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";

import Endpoint from "@/models/endpoint.model";

export async function getStandaloneEndpoints() {
  try {
    await connectDB();

    const user =
      await getUser();

    if (!user) {
      return [];
    }

    return await Endpoint.find({
      userId: user._id,
      projectId: null,
    })
      .sort({
        createdAt: -1,
      })
      .lean();
  } catch {
    return [];
  }
}