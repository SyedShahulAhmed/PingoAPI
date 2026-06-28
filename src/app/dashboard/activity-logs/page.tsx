import { getLogEndpoints } from "@/actions/logs/get-log-endpoints";
import { redirect } from "next/navigation";



export default async function ActivityLogsPage() {
    const endpoints =
        await getLogEndpoints();

    if (
        endpoints.length === 0
    ) {
        return (
            <div>
                No endpoints
                found.
            </div>
        );
    }

    redirect(
        `/dashboard/activity-logs/${endpoints[0]._id}`
    );
}