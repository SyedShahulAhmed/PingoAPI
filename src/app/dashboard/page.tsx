import Link from "next/link";

import { Plus, FolderPlus } from "lucide-react";

import { getDashboardStats } from "@/actions/dashboard/get-dashboard-stats";
import { getRecentActivity } from "@/actions/dashboard/get-recent-activity";

import StatsCards from "@/components/dashboard/stats-cards";
import RecentActivity from "@/components/dashboard/recent-activity";

import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const activity = await getRecentActivity();

  if (!stats) {
    return <div>Failed to load dashboard.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="text-muted-foreground">Monitoring overview</p>
        </div>

        <div className="flex gap-3">
          <Button asChild>
            <Link href="/dashboard/endpoints">
              <Plus className="h-4 w-4" />
              Add Endpoint
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/dashboard/projects">
              <FolderPlus className="h-4 w-4" />
              Add Project
            </Link>
          </Button>
        </div>
      </div>

      <StatsCards stats={stats} />

      <RecentActivity activity={activity} />
    </div>
  );
}
