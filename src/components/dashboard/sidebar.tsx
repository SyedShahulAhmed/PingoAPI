"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FolderKanban,
  Globe,
  Activity,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import SidebarFooter from "./footer";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    name: "Endpoints",
    href: "/dashboard/endpoints",
    icon: Globe,
  },
  {
    name: "Activity Logs",
    href: "/dashboard/activity-logs",
    icon: Activity,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar({ user }: { user: any }) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 border-b bg-card/95 backdrop-blur">
        <div className="flex h-full items-center justify-between px-4">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-white">PINGO</span>{" "}
              <span className="text-red-500">API</span>
            </h1>
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-2 hover:bg-muted transition"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-screen flex-col border-r bg-card transition-transform duration-300 ease-in-out",
          "w-65 sm:w-70 lg:w-72",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-white">PINGO</span>{" "}
            <span className="text-red-500">API</span>
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-2 hover:bg-muted transition lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t">
          <SidebarFooter email={user?.email} />
        </div>
      </aside>
    </>
  );
}
