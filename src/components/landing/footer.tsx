import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Left */}
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          <span className="text-white">Pingo</span>{" "}
          <span className="text-primary">API</span>
        </Link>

        {/* Center */}
        <p className="text-sm text-muted-foreground">
          © 2026 PingoAPI. All rights reserved.
        </p>

        {/* Right */}
        <Link
          href="https://github.com/SyedShahulAhmed/PingoAPI"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <FaGithub className="h-6 w-6" />
        </Link>
      </div>
    </footer>
  );
}
