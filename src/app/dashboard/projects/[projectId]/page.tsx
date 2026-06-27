import Project from "@/models/project.model";
import { connectDB } from "@/lib/db";

import { getEndpoints } from "@/actions/endpoint/get-endpoints";
import AddEndpointDialog from "@/components/endpoints/create-endpoint-dialog";
import EndpointList from "@/components/endpoints/endpoint-list";
import { serialize } from "@/lib/serialize";

import {
  Activity,
  Server,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{
    projectId: string;
  }>;
}) {
  const { projectId } = await params;

  await connectDB();

  const project = await Project.findById(projectId).lean();

  const endpoints = await getEndpoints(projectId);

  const onlineCount = endpoints.filter(
    (endpoint: any) => endpoint.status === "ONLINE",
  ).length;

  const offlineCount = endpoints.filter(
    (endpoint: any) => endpoint.status !== "ONLINE",
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </div>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{project?.name}</h1>

          <p className="mt-2 text-muted-foreground">{project?.description}</p>
        </div>

        <AddEndpointDialog projectId={serialize(project)._id.toString()} />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total */}
        <div className="relative overflow-hidden rounded-2xl border bg-card p-6">
          <div className="absolute right-4 top-4 rounded-lg bg-primary/10 p-2">
            <Server className="h-5 w-5 text-primary" />
          </div>

          <p className="text-sm text-muted-foreground">Total Endpoints</p>

          <h2 className="mt-3 text-4xl font-bold">{endpoints.length}</h2>

          <div className="mt-4 flex items-center gap-2 text-primary">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">Active Monitoring</span>
          </div>
        </div>

        {/* Online */}
        <div className="relative overflow-hidden rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
          <div className="absolute right-4 top-4 rounded-lg bg-green-500/10 p-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>

          <p className="text-sm text-muted-foreground">Online Endpoints</p>

          <h2 className="mt-3 text-4xl font-bold text-green-500">
            {onlineCount}
          </h2>

          <div className="mt-4 flex items-center gap-2 text-green-500">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Healthy & Responding</span>
          </div>
        </div>

        {/* Offline */}
        <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-6">
          <div className="absolute right-4 top-4 rounded-lg bg-yellow-500/10 p-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>

          <p className="text-sm text-muted-foreground">Offline Endpoints</p>

          <h2 className="mt-3 text-4xl font-bold text-yellow-500">
            {offlineCount}
          </h2>

          <div className="mt-4 flex items-center gap-2 text-yellow-500">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Needs Attention</span>
          </div>
        </div>
      </div>

      <EndpointList endpoints={serialize(endpoints)} />
    </div>
  );
}
