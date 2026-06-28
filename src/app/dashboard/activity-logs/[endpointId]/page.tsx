import { connectDB } from "@/lib/db";
import { serialize } from "@/lib/serialize";

import Endpoint from "@/models/endpoint.model";
import Project from "@/models/project.model";

import { getEndpointLogs } from "@/actions/logs/get-endpoint-logs";
import { getEndpointStats } from "@/actions/logs/get-endpoint-stats";
import { getLogSidebarData } from "@/actions/logs/get-log-sidebar-data";

import EndpointSidebar from "@/components/activity-logs/endpoint-sidebar";

import StatusCard from "@/components/activity-logs/status-card";
import StatsCards from "@/components/activity-logs/stats-cards";
import ChecksTable from "@/components/activity-logs/checks-table";
import LatestCheckCard from "@/components/activity-logs/latest-check-card";

export default async function EndpointLogsPage({
  params,
}: {
  params: Promise<{
    endpointId: string;
  }>;
}) {
  const { endpointId } = await params;

  await connectDB();

  const endpoint = await Endpoint.findById(endpointId).lean();

  if (!endpoint) {
    return <div className="p-6">Endpoint not found</div>;
  }

  let project = null;

  if (endpoint.projectId) {
    project = await Project.findById(endpoint.projectId).lean();
  }

  const sidebarData = await getLogSidebarData();

  const logs = await getEndpointLogs(endpointId);

  const stats = await getEndpointStats(endpointId);

  return (
    <div className="p-6 space-y-6">
      <EndpointSidebar
        projects={serialize(sidebarData.projects)}
        standaloneEndpoints={serialize(sidebarData.standaloneEndpoints)}
        activeEndpointId={endpointId}
      />

      <div>
        {project && (
          <p className="text-sm text-muted-foreground">{project.name}</p>
        )}

        <h1 className="text-3xl font-bold">{endpoint.name}</h1>

        <p className="text-muted-foreground">
          Monitoring History & Activity Logs
        </p>
      </div>

      <StatusCard endpoint={serialize(endpoint)} />

      <LatestCheckCard log={logs.length ? serialize(logs[0]) : null} />

      <StatsCards stats={serialize(stats)} />

      <ChecksTable logs={serialize(logs)} />
    </div>
  );
}
