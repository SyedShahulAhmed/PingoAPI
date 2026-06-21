import {
  FolderPlus,
  Link2,
  Settings2,
  Activity,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Create Project",
      description:
        "Set up a project to organize and manage all your monitored endpoints.",
      icon: FolderPlus,
    },
    {
      step: "02",
      title: "Add Endpoints",
      description:
        "Add APIs, webhooks, or services you want to continuously monitor.",
      icon: Link2,
    },
    {
      step: "03",
      title: "Configure Checks",
      description:
        "Choose monitoring intervals, request methods, and alert settings.",
      icon: Settings2,
    },
    {
      step: "04",
      title: "Monitor Health",
      description:
        "Track uptime, response times, and incidents in real time.",
      icon: Activity,
    },
  ];

  return (
    <section id="working" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            How It Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg italic text-muted-foreground">
            Get started in minutes and begin monitoring your APIs with
            complete visibility.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group relative overflow-hidden rounded-[32px] border border-white/5 bg-white/1.5 p-8 transition-all duration-300 hover:border-primary/20 hover:bg-white/2.5]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <span className="font-mono text-sm font-semibold tracking-[0.2em] text-primary">
                    {step.step}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 italic text-muted-foreground">
                  {step.description}
                </p>

                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/5 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}