"use server";

import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { connectDB } from "./db";
import User from "@/models/user.model";

export async function getUser() {
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  const payload = verifyToken(token);

  if (!payload) return null;

  const user = await User.findById(payload.userId).select("-password");

  return user;
}
