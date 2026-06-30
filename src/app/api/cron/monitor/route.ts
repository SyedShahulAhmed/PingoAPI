import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { monitorWorker } from "@/monitor/monitor-worker";

export async function GET() {
    try {
        const authorization =
            (await headers()).get("authorization");

        if (
            authorization !==
            `Bearer ${process.env.CRON_SECRET}`
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        await connectDB();

        await monitorWorker();

        return NextResponse.json({
            success: true,
        });
    } catch (error) {

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown Error",
            },
            {
                status: 500,
            }
        );
    }
}