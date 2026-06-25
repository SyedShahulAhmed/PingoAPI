import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      success: true,
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        status: "unhealthy",
        database: "disconnected",
        timestamp: new Date().toISOString(),
      },
      {
        status: 503,
      }
    );
  }
}