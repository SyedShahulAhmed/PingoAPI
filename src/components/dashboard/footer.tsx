"use client";

import { User } from "lucide-react";

import LogoutButton from "./logout-button";

export default function SidebarFooter({ email }: { email?: string }) {
  return (
    <div className="border-t p-4">
      <div className="rounded-xl border bg-background/50 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <User size={18} className="text-primary" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {email?.split("@")[0] || "User"}
            </p>

            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <LogoutButton />
      </div>
    </div>
  );
}
