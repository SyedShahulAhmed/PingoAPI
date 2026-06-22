import DashboardSidebar from "@/components/dashboard/sidebar";
import { getUser } from "@/lib/getUser";
import { serialize } from "@/lib/serialize";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-background mt-10">
      <DashboardSidebar user={serialize(user)} />

      <main className="pt-14 lg:pt-5 lg:ml-72 p-4 md:p-6 ">{children}</main>
    </div>
  );
}
