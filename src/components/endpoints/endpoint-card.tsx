import Link from "next/link";

import { Globe, Activity } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import EditEndpointDialog from "./edit-endpoint-dialog";
import DeleteEndpointDialog from "./delete-endpoint-dialog";

interface Props {
  endpoint: any;
}

export default function EndpointCard({ endpoint }: Props) {
  const isOnline = endpoint.status === "ONLINE";

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div
                  className={`h-3 w-3 rounded-full ${
                    isOnline ? "bg-green-500" : "bg-yellow-500"
                  }`}
                />

                <h3 className="truncate text-xl font-semibold">
                  {endpoint.name}
                </h3>
              </div>
            </div>

            <Badge
              className={
                isOnline
                  ? "shrink-0 border-green-500/20 bg-green-500/10 text-green-500"
                  : "shrink-0 border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
              }
            >
              {endpoint.status}
            </Badge>
          </div>

          {/* URL */}
          <div className="flex items-start gap-3 rounded-lg border bg-muted/30 px-4 py-3">
            <Globe className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

            <p className="break-all text-sm text-muted-foreground">
              {endpoint.url}
            </p>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <EditEndpointDialog endpoint={endpoint} />

              <DeleteEndpointDialog
                endpointId={endpoint._id.toString()}
                projectId={endpoint.projectId?.toString() || ""}
              />
            </div>

            <Button asChild>
              <Link href={`/dashboard/activity-logs/${endpoint._id}`}>
                <Activity className="mr-2 h-4 w-4" />
                View Logs
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
