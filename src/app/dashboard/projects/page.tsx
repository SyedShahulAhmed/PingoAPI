import { FolderKanban } from "lucide-react";

import { getProjects } from "@/actions/project/get-projects";
import ProjectsGrid from "@/components/projects/grid";

import { serialize } from "@/lib/serialize";
import CreateProjectDialog from "@/components/projects/project-dialog";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-6 md:p-8">
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FolderKanban className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Projects
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                Organize your monitored endpoints into projects and manage API
                health, uptime, and performance from one place.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <div className="flex w-full justify-start lg:justify-end">
              <CreateProjectDialog />
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <ProjectsGrid projects={serialize(projects)} />
    </div>
  );
}
