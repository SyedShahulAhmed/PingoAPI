import {
  Activity,
  CheckCircle,
  FolderKanban,
  XCircle,
} from "lucide-react";

interface Props {
  stats: {
    totalProjects: number;
    totalEndpoints: number;
    onlineEndpoints: number;
    offlineEndpoints: number;
  };
}

export default function StatsCards({
  stats,
}: Props) {
  const cards = [
    {
      title: "Projects",
      value:
        stats.totalProjects,
      icon: FolderKanban,
    },
    {
      title: "Endpoints",
      value:
        stats.totalEndpoints,
      icon: Activity,
    },
    {
      title: "Online",
      value:
        stats.onlineEndpoints,
      icon: CheckCircle,
    },
    {
      title: "Offline",
      value:
        stats.offlineEndpoints,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon =
          card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {card.title}
              </p>

              <Icon className="h-5 w-5 text-primary" />
            </div>

            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}