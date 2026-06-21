"use client";

import { useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

const faqs = [
  {
    q: "What can I monitor with PingoAPI?",
    a: "PingoAPI monitors API endpoints by tracking availability, response times, status codes, and overall endpoint health.",
  },
  {
    q: "Can I organize endpoints into projects?",
    a: "Yes. Projects allow you to group related endpoints together and monitor them from a centralized dashboard.",
  },
  {
    q: "Can I monitor standalone endpoints?",
    a: "Absolutely. Endpoints can be monitored independently without being attached to a project.",
  },
  {
    q: "What monitoring intervals are supported?",
    a: "You can configure endpoint checks to run every 1 minute, 5 minutes, or 1 hour.",
  },
  {
    q: "What information is stored for each check?",
    a: "Every check stores the status code, response time, success status, and timestamp for historical analysis.",
  },
  {
    q: "Can I view uptime and monitoring history?",
    a: "Yes. PingoAPI provides 30-day uptime statistics, recent check history, and detailed activity logs for every monitored endpoint.",
  },
];

  return (
    <section id="faqs" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <CircleHelp className="h-7 w-7 text-primary" />
            </div>
          </div>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg italic text-muted-foreground">
            Everything you need to know about monitoring your APIs with
            PingoAPI.
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-[28px] border border-white/5 bg-white/1.5"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.q}
                </span>

                <ChevronDown
                  className={`h-5 w-5 text-primary transition-transform duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  open === index
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 leading-7 text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}