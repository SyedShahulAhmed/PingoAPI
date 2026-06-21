import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/feature";
import HowItWorks from "@/components/landing/how-it-works";
import FAQ from "@/components/landing/faq";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-primary">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-175 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            -top-87.5
            h-175
            w-350
            -translate-x-1/2
            rounded-full
            bg-red-500/12
            blur-[180px]
          "
        />
        <div
          className="
            absolute
            left-1/2
            top-37.5
            h-100
            w-200
            -translate-x-1/2
            rounded-full
            bg-red-500/8
            blur-[120px]
          "
        />
        <div
          className="
            absolute
            left-1/2
            -top-12.5
            h-62.5
            w-125
            -translate-x-1/2
            rounded-full
            bg-red-500/6
            blur-[80px]
          "
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-175 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-125 h-62.5 bg-linear-to-b from-transparent to-background" />

      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <FAQ />

      <CTA />

      <Footer />
    </main>
  );
}
