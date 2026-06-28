import Endpoint from "@/models/endpoint.model";
import Check from "@/models/check.model";

export async function checkEndpoint(
    endpoint: any
) {
    try {
        const start =
            Date.now();

        const controller =
            new AbortController();

        const timeout =
            setTimeout(() => {
                controller.abort();
            }, 10000);

        const response =
            await fetch(
                endpoint.url,
                {
                    method:
                        endpoint.method,
                    signal:
                        controller.signal,
                }
            );

        clearTimeout(
            timeout
        );

        const responseTime =
            Date.now() - start;

        const success =
            response.ok;

        await Check.create({
            endpointId:
                endpoint._id,

            statusCode:
                response.status,

            responseTime,

            success,

            checkedAt:
                new Date(),
        });

        const now = new Date();

        let nextCheckAt = new Date();

        switch (endpoint.interval) {
            case "1m":
                nextCheckAt = new Date(
                    now.getTime() + 60 * 1000
                );
                break;

            case "5m":
                nextCheckAt = new Date(
                    now.getTime() +
                    5 * 60 * 1000
                );
                break;

            case "1h":
                nextCheckAt = new Date(
                    now.getTime() +
                    60 *
                    60 *
                    1000
                );
                break;
        }
        await Endpoint.findByIdAndUpdate(
            endpoint._id,
            {
                status: success
                    ? "ONLINE"
                    : "OFFLINE",

                lastStatusCode:
                    response.status,

                lastResponseTime:
                    responseTime,

                lastCheckedAt:
                    now,

                nextCheckAt,
            }
        );
    } catch {
        await Check.create({
            endpointId:
                endpoint._id,

            statusCode: 0,

            responseTime: 10000,

            success: false,

            checkedAt:
                new Date(),
        });

        const now = new Date();

        let nextCheckAt = new Date();

        switch (endpoint.interval) {
            case "1m":
                nextCheckAt = new Date(
                    now.getTime() + 60 * 1000
                );
                break;

            case "5m":
                nextCheckAt = new Date(
                    now.getTime() +
                    5 * 60 * 1000
                );
                break;

            case "1h":
                nextCheckAt = new Date(
                    now.getTime() +
                    60 *
                    60 *
                    1000
                );
                break;
        }
        await Endpoint.findByIdAndUpdate(
            endpoint._id,
            {
                status: "TIMEOUT",

                lastStatusCode: 0,

                lastResponseTime: 10000,

                lastCheckedAt: now,

                nextCheckAt,
            }
        );
    }
}