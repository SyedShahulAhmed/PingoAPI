import { getUser } from "@/lib/getUser";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Navbar() {
  const user = await getUser();

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto flex h-14 sm:h-16 max-w-5xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 sm:px-8 backdrop-blur-xl">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight sm:text-2xl"
        >
          <span className="text-white">Pingo</span>{" "}
          <span className="text-red-500">API</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold tracking-wide text-muted-foreground md:flex">
          <Link
            href="#features"
            className="transition-all hover:text-white"
          >
            Features
          </Link>

          <Link
            href="#working"
            className="transition-all hover:text-white"
          >
            Working
          </Link>

          <Link
            href="#faqs"
            className="transition-all hover:text-white"
          >
            FAQs
          </Link>
        </nav>

        {user ? (
          <Link
            href="/dashboard"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-red-500 font-semibold text-white"
          >
            {user.name?.charAt(0).toUpperCase()}
          </Link>
        ) : (
          <Link
            href="/signup"
            className="group flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600 sm:px-5"
          >
            <span className="hidden sm:inline">
              Get Started
            </span>

            <span className="sm:hidden">
              Start
            </span>

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </header>
  );
}