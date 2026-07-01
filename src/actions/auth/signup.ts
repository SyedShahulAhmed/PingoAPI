"use server";

import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";

import User from "@/models/user.model";
import { SignupInput, SignupSchema } from "@/validators/signup-validator";

export async function signup(data: SignupInput) {
  try {
    await connectDB();

    const validated = SignupSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        message: validated.error.issues[0].message,
      };
    }

    const { name, email, password } = validated.data;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
