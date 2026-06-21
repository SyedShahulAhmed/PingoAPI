import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:py-40 lg:py-50 text-center">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl">
          <span className="text-white">Monitor Everything in</span>
          <br />
          <span className="text-primary italic">Real Time.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base italic leading-relaxed text-muted-foreground sm:text-lg md:mt-8 md:text-xl">
          Track every request, detect failures instantly, and ensure your APIs
          stay fast, reliable, and available 24/7.
        </p>

        <div className="mt-10 flex justify-center md:mt-16">
          <Link
            href="/signup"
            className="group flex items-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-black transition-all duration-300 hover:scale-105 sm:px-8 sm:py-4 md:px-10 md:py-5 md:text-lg"
          >
            Start Tracking Requests
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-5 md:w-5" />
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-[32px] border border-white/5 bg-white/1.5 p-8">
            <div className="flex items-end gap-2">
              <h3 className="text-6xl font-bold tracking-tighter text-white">
                99.99
              </h3>

              <span className="mb-2 text-2xl font-semibold text-primary">
                %
              </span>
            </div>

            <p className="mt-4 font-mono text-xs text-left uppercase tracking-[0.25em] text-muted-foreground">
              Uptime
            </p>

            <p className="mt-5 max-w-65 text-left text-sm leading-7 text-muted-foreground">
              Ensure maximum availability with continuous uptime monitoring and
              instant outage detection.
            </p>
          </div>

          <div className="rounded-[32px] border border-white/5 bg-white/1.5 p-8">
            <div className="flex items-end gap-2">
              <h3 className="text-6xl font-bold tracking-tighter text-white">
                200
              </h3>

              <span className="mb-2 text-2xl font-semibold text-primary">
                ms
              </span>
            </div>

            <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground text-left">
              Response Time
            </p>

            <p className="mt-5 max-w-65 text-left text-sm leading-7 text-muted-foreground">
              Track latency trends and identify performance bottlenecks before
              they affect users.
            </p>
          </div>

          <div className="rounded-[32px] border border-white/5 bg-white/1.5 p-8">
            <div className="flex items-end gap-2">
              <h3 className="text-6xl font-bold tracking-tighter text-white">
                30
              </h3>

              <span className="mb-2 text-2xl font-semibold text-primary">
                s
              </span>
            </div>

            <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground text-left">
              Health Checks
            </p>

            <p className="mt-5 max-w-65 text-left text-sm leading-7 text-muted-foreground">
              Automatically verify endpoint health and receive alerts the moment
              issues arise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
