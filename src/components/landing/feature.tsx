import {
  FolderKanban,
  Link2,
  Activity,
  Timer,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Project-Based Monitoring",
      label: "Projects",
      description:
        "Organize endpoints into projects and monitor your entire infrastructure from a single dashboard.",
      icon: FolderKanban,
    },
    {
      title: "Standalone Endpoints",
      label: "Endpoints",
      description:
        "Track individual APIs with dedicated uptime, performance, and health insights.",
      icon: Link2,
    },
    {
      title: "Activity Logs",
      label: "Logs",
      description:
        "Review outages, recoveries, and monitoring events with detailed historical logs.",
      icon: Activity,
    },
    {
      title: "Response Time Tracking",
      label: "Performance",
      description:
        "Measure latency trends and identify performance bottlenecks before users notice them.",
      icon: Timer,
    },
    {
      title: "Uptime Monitoring",
      label: "Uptime",
      description:
        "Continuously check endpoint availability and receive instant downtime alerts.",
      icon: ShieldCheck,
    },
    {
      title: "Status Dashboard",
      label: "Dashboard",
      description:
        "Get a complete overview of uptime, incidents, and API performance metrics.",
      icon: LayoutDashboard,
    },
  ];

  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Features Built for Reliability
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg italic text-muted-foreground">
            Monitor performance, detect issues early, and keep your services
            running smoothly.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-[32px] border border-white/5 bg-white/1.5p-8 transition-all duration-300 hover:border-primary/20 hover:bg-white/2.5]"
              >
                <div className="flex items-center gap-4 pr-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <span className="font-mono text-left text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {feature.label}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 italic text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}