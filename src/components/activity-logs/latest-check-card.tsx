import { CheckCircle2, XCircle, Clock, Timer } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  log: any;
}

export default function LatestCheckCard({ log }: Props) {
  const statusCode = log?.statusCode ?? "---";
  const responseTime = log?.responseTime ?? "---";
  const success = log?.success ?? false;

  const checkedAt = log?.checkedAt
    ? new Date(log.checkedAt).toLocaleString()
    : "Never";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-lg">Latest Check</h3>

            <p className="text-sm text-muted-foreground">
              Most recent monitoring result
            </p>
          </div>

          <div
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              success
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {success ? "Operational" : "Failed"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />

              <span className="text-sm">Status Code</span>
            </div>

            <p className="mt-2 text-2xl font-bold">{statusCode}</p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Timer className="h-4 w-4" />

              <span className="text-sm">Response Time</span>
            </div>

            <p className="mt-2 text-2xl font-bold">
              {responseTime}
              {responseTime !== "---" && " ms"}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              {success ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}

              <span className="text-sm">Result</span>
            </div>

            <p className="mt-2 text-2xl font-bold">
              {success ? "Success" : "Failed"}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />

              <span className="text-sm">Last Checked</span>
            </div>

            <p className="mt-2 text-sm font-medium wrap-break-word">{checkedAt}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
