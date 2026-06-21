import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/2 px-8 py-20 text-center md:px-16">


          <div className="relative z-10">
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Start Monitoring
              <span className="text-primary"> Smarter</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg italic text-muted-foreground">
              Get complete visibility into your APIs with real-time monitoring,
              uptime tracking, and detailed performance insights.
            </p>

            <div className="mt-10">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105"
              >
                Get Started Free

                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}