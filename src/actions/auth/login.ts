"use server";

import bcrypt from "bcryptjs";

import { cookies } from "next/headers";

import { connectDB } from "@/lib/db";

import User from "@/models/user.model";

import { generateToken } from "@/lib/jwt";

import { LoginInput, LoginSchema } from "@/validators/login-validator";

export async function login(data: LoginInput) {
  try {
    await connectDB();

    const validated = LoginSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        message: validated.error.issues[0].message,
      };
    }

    const { email, password } = validated.data;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const token = generateToken(user._id.toString());
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
