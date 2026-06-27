import Link from "next/link";

import { Calendar, FolderKanban, ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import EditProjectDialog from "./edit-project-dialog";
import DeleteProjectDialog from "./delete-project-dialog";
import { serialize } from "@/lib/serialize";

interface Props {
  project: any;
}

export default function ProjectCard({ project }: Props) {
  return (
    <Card className="group flex h-full flex-col transition-all hover:border-primary/40 hover:shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted">
            <FolderKanban className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div>
          <h3 className="line-clamp-1 text-lg font-semibold">{project.name}</h3>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {project.description || "No description provided."}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />

          <span>
            Created {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild size="sm" className="">
            <Link href={`/dashboard/projects/${project._id}`}>
              Open
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>

          <EditProjectDialog project={serialize(project)} />

          <DeleteProjectDialog projectId={serialize(project)._id.toString()} />
        </div>
      </CardContent>
    </Card>
  );
}
