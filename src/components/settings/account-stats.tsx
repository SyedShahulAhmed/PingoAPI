import {
  FolderKanban,
  Globe,
  Activity,
  Server,
} from "lucide-react";

interface Props {
  stats: {
    totalProjects: number;
    projectEndpoints: number;
    standaloneEndpoints: number;
    totalEndpoints: number;
  };
}

export default function AccountStats({
  stats,
}: Props) {
  const items = [
    {
      label: "Projects",
      value: stats.totalProjects,
      icon: FolderKanban,
    },
    {
      label: "Project Endpoints",
      value: stats.projectEndpoints,
      icon: Server,
    },
    {
      label: "Standalone Endpoints",
      value: stats.standaloneEndpoints,
      icon: Globe,
    },
    {
      label: "Total Endpoints",
      value: stats.totalEndpoints,
      icon: Activity,
    },
  ];

  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">
          Account Statistics
        </h2>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group rounded-xl border p-5 transition-all hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <span className="text-3xl font-bold">
                  {item.value}
                </span>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}