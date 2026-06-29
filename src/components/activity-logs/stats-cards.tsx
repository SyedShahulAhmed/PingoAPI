import { Activity, CheckCircle2, XCircle, Gauge, Timer } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  stats?: {
    totalChecks?: number;
    successfulChecks?: number;
    failedChecks?: number;
    averageResponseTime?: number;
    uptime?: number;
  };
}

export default function StatsCards({ stats }: Props) {
  const cards = [
    {
      title: "Uptime",
      value: `${stats?.uptime ?? 0}%`,
      icon: Activity,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Total Checks",
      value: stats?.totalChecks ?? 0,
      icon: Gauge,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Successful",
      value: stats?.successfulChecks ?? 0,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Failed",
      value: stats?.failedChecks ?? 0,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "Avg Response",
      value: `${stats?.averageResponseTime ?? 0} ms`,
      icon: Timer,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="transition-all hover:shadow-md hover:-translate-y-1"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>

                  <h2 className={`mt-3 text-3xl font-bold ${card.color}`}>
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bg}`}
                >
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
