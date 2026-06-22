"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      toast.success("Logged out successfully");

      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1000);
    } catch {
      toast.error("Failed to logout");
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="
        w-full
        justify-center
        gap-2
        rounded-xl
        border-destructive/20
        text-destructive
        hover:bg-destructive
        hover:text-black
        transition-all
        duration-200
      "
    >
      <LogOut size={16} />
      Logout
    </Button>
  );
}
