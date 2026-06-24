import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";


import { generateToken } from "@/lib/jwt";
import { LoginSchema } from "@/validators/login-validator";
import User from "@/models/user.model";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const validated =
            LoginSchema.safeParse(body);

        if (!validated.success) {
            return NextResponse.json(
                {
                    success: false,
                },
                { status: 400 }
            );
        }

        const { email, password } =
            validated.data;

        const user =
            await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid credentials",
                },
                { status: 401 }
            );
        }

        const matched =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!matched) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid credentials",
                },
                { status: 401 }
            );
        }

        const token = generateToken(
            user._id.toString()
        );

        const response =
            NextResponse.json({
                success: true,
                message: "Login successful",
            });

        response.cookies.set(
            "token",
            token,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            }
        );

        return response;
    } catch {
        return NextResponse.json(
            {
                success: false,
            },
            { status: 500 }
        );
    }
}