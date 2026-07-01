"use server";

import { connectDB } from "@/lib/db";

import Check from "@/models/check.model";

export async function getEndpointStats(
    endpointId: string
) {
    try {
        await connectDB();

        const checks =
            await Check.find({
                endpointId,
            });

        const totalChecks =
            checks.length;

        const successfulChecks =
            checks.filter(
                (check) =>
                    check.success
            ).length;

        const failedChecks =
            totalChecks -
            successfulChecks;

        const averageResponseTime =
            totalChecks === 0
                ? 0
                : Math.round(
                    checks.reduce(
                        (
                            total,
                            check
                        ) =>
                            total +
                            check.responseTime,
                        0
                    ) /
                    totalChecks
                );

        const uptime =
            totalChecks === 0
                ? 100
                : Number(
                    (
                        (successfulChecks /
                            totalChecks) *
                        100
                    ).toFixed(2)
                );

        return {
            totalChecks,
            successfulChecks,
            failedChecks,
            averageResponseTime,
            uptime,
        };
    } catch {
        return {
            totalChecks: 0,
            successfulChecks: 0,
            failedChecks: 0,
            averageResponseTime: 0,
            uptime: 0,
        };
    }
}