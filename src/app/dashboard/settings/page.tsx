import { getSettingsData } from "@/actions/settings/get-settings-data";
import AccountStats from "@/components/settings/account-stats";
import UserCard from "@/components/settings/user-card";

export default async function SettingsPage() {
  const data = await getSettingsData();

  if (!data) {
    return <div>Failed to load settings.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account information and monitor your API usage.
        </p>
      </div>

      <UserCard user={data.user} />

      <AccountStats stats={data.stats} />
    </div>
  );
}