import {
  Activity,
  Clock,
  Timer,
  Globe,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  endpoint: any;
}

export default function StatusCard({ endpoint }: Props) {
  const status = endpoint?.status ?? "UNKNOWN";
  const method = endpoint?.method ?? "---";
  const interval = endpoint?.interval ?? "---";
  const responseTime = endpoint?.lastResponseTime ?? "---";
  const statusCode = endpoint?.lastStatusCode ?? "---";

  const lastChecked = endpoint?.lastCheckedAt
    ? new Date(endpoint.lastCheckedAt).toLocaleString()
    : "Never";

  const getStatusStyles = () => {
    switch (status) {
      case "ONLINE":
        return {
          badge: "bg-green-500/10 text-green-500",
          icon: <CheckCircle2 className="h-4 w-4" />,
          label: "Online",
        };

      case "OFFLINE":
        return {
          badge: "bg-red-500/10 text-red-500",
          icon: <XCircle className="h-4 w-4" />,
          label: "Offline",
        };

      default:
        return {
          badge: "bg-yellow-500/10 text-yellow-500",
          icon: <AlertTriangle className="h-4 w-4" />,
          label: "Unknown",
        };
    }
  };

  const statusInfo = getStatusStyles();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Current Status</h3>

            <p className="text-sm text-muted-foreground">
              Live endpoint monitoring information
            </p>
          </div>

          <div
            className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${statusInfo.badge}`}
          >
            {statusInfo.icon}
            {statusInfo.label}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span className="text-sm">Method</span>
            </div>

            <p className="mt-2 text-xl font-bold">{method}</p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Interval</span>
            </div>

            <p className="mt-2 text-xl font-bold">{interval}</p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Timer className="h-4 w-4" />
              <span className="text-sm">Response</span>
            </div>

            <p className="mt-2 text-xl font-bold">
              {responseTime}
              {responseTime !== "---" && " ms"}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span className="text-sm">Status Code</span>
            </div>

            <p className="mt-2 text-xl font-bold">{statusCode}</p>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Last Checked</span>
            </div>

            <p className="mt-2 text-sm font-medium wrap-break-word">
              {lastChecked}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
