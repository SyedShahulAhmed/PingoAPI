import { Server, Activity } from "lucide-react";

import { getStandaloneEndpoints } from "@/actions/endpoint/get-standalone-endpoints";

import CreateEndpointDialog from "@/components/endpoints/create-endpoint-dialog";
import EndpointList from "@/components/endpoints/endpoint-list";

import { Card, CardContent } from "@/components/ui/card";
import { serialize } from "@/lib/serialize";

export default async function Page() {
  const endpoints = await getStandaloneEndpoints();

  const onlineCount = endpoints.filter(
    (endpoint: any) => endpoint.status === "ONLINE",
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Endpoints</h1>

          <p className="mt-1 text-muted-foreground">
            Monitor and manage your standalone API endpoints.
          </p>
        </div>

        <CreateEndpointDialog />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Endpoints</p>

              <h3 className="mt-1 text-3xl font-bold">{endpoints.length}</h3>
            </div>

            <Server className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Online Endpoints</p>

              <h3 className="mt-1 text-3xl font-bold text-green-500">
                {onlineCount}
              </h3>
            </div>

            <Activity className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>
      </div>

      {/* Endpoint List */}
      <EndpointList endpoints={serialize(endpoints)} />
    </div>
  );
}
