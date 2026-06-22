import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { SignupSchema } from "@/validators/signup-validator";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const validated =
      SignupSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          errors:
            validated.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { name, email, password } =
      validated.data;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message:
        "Account created successfully",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error",
      },
      { status: 500 }
    );
  }
}