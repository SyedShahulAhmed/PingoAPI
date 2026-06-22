import {
  Activity,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Props {
  activity: any[];
}

export default function RecentActivity({
  activity,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b p-5">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />

          <h2 className="font-semibold">
            Recent Activity
          </h2>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Latest endpoint status updates
        </p>
      </div>

      {activity.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
          <Activity className="h-8 w-8 text-primary" />

          <p className="text-sm text-muted-foreground">
            No activity found.
          </p>
        </div>
      ) : (
        <div className="divide-y">
          {activity.map(
            (endpoint: any) => {
              const StatusIcon =
                endpoint.status ===
                "ONLINE"
                  ? CheckCircle2
                  : endpoint.status ===
                      "OFFLINE"
                    ? XCircle
                    : AlertCircle;

              return (
                <div
                  key={endpoint._id.toString()}
                  className="flex flex-col gap-3 p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">
                        {endpoint.name}
                      </p>

                      <p className="truncate text-sm text-muted-foreground">
                        {endpoint.url}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex w-fit shrink-0 items-center gap-1 self-start rounded-full px-3 py-1 text-xs font-medium sm:self-center ${
                      endpoint.status ===
                      "ONLINE"
                        ? "bg-green-500/10 text-green-500"
                        : endpoint.status ===
                            "OFFLINE"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {endpoint.status}
                  </span>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}