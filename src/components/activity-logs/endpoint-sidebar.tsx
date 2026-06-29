"use client";

import { useState } from "react";

import Link from "next/link";

import { ChevronRight, ChevronDown, FolderKanban, Globe } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Props {
  projects: any[];
  standaloneEndpoints: any[];
  activeEndpointId: string;
}

export default function EndpointSidebar({
  projects,
  standaloneEndpoints,
  activeEndpointId,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Endpoints</h2>

        <p className="text-sm text-muted-foreground">
          Select an endpoint to view activity logs
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Projects
          </h3>

          <div className="space-y-2">
            {projects.map((project) => (
              <ProjectGroup
                key={project._id}
                project={project}
                activeEndpointId={activeEndpointId}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Standalone Endpoints
          </h3>

          <div className="space-y-2">
            {standaloneEndpoints.map((endpoint) => (
              <Link
                key={endpoint._id}
                href={`/dashboard/activity-logs/${endpoint._id}`}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  activeEndpointId === endpoint._id.toString()
                    ? "border-primary bg-primary/10 font-medium"
                    : "hover:bg-muted"
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>{endpoint.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectGroup({
  project,
  activeEndpointId,
}: {
  project: any;
  activeEndpointId: string;
}) {
  const [open, setOpen] = useState(
    project.endpoints.some(
      (endpoint: any) => endpoint._id.toString() === activeEndpointId,
    ),
  );

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border px-3 py-2 hover:bg-muted transition-colors">
        <div className="flex items-center gap-2">
          <FolderKanban className="h-4 w-4" />

          <span className="font-medium">{project.name}</span>
        </div>

        {open ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="mt-2 ml-4 space-y-1 border-l pl-3">
          {project.endpoints.length === 0 ? (
            <p className="px-2 py-2 text-xs text-muted-foreground">
              No endpoints
            </p>
          ) : (
            project.endpoints.map((endpoint: any) => (
              <Link
                key={endpoint._id}
                href={`/dashboard/activity-logs/${endpoint._id}`}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeEndpointId === endpoint._id.toString()
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted"
                }`}
              >
                {endpoint.name}
              </Link>
            ))
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
