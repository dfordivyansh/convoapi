import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  ShieldCheck,
  Globe2,
  Code2,
  ArrowRight,
  Target,
  Eye,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ConvoAPI" },
      {
        name: "description",
        content:
          "ConvoAPI provides scalable chatbot APIs that help businesses automate conversations across platforms.",
      },
      { property: "og:title", content: "About ConvoAPI" },
      { property: "og:description", content: "Our mission, vision and why teams pick ConvoAPI." },
    ],
  }),
  component: AboutPage,
});

const reasons = [
  { icon: Rocket, title: "Fast Integration", desc: "From keys to live in under five minutes." },
  { icon: ShieldCheck, title: "Reliable APIs", desc: "99.99% uptime SLA, globally distributed." },
  { icon: Globe2, title: "Multi-channel Support", desc: "Web, WhatsApp, mobile — one platform." },
  { icon: Code2, title: "Developer Friendly", desc: "Typed SDKs, clear docs, predictable pricing." },
];

function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="pointer-events-none absolute inset-0 grid-bg" />

      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-5 pt-20 pb-16 text-center lg:px-8 lg:pt-28">
        <p className="text-sm font-medium uppercase tracking-widest text-gradient-brand">About</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
          Making conversation <br className="hidden sm:block" />
          <span className="text-gradient-brand">infrastructure</span> for the web.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          We provide scalable chatbot APIs that help businesses automate conversations across
          platforms — from your homepage to WhatsApp, with one elegant interface.
        </p>
      </section>

      {/* Mission / Vision */}
      <section className="relative mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              kicker: "Our Mission",
              title: "Make every conversation valuable.",
              body:
                "We help product and growth teams turn raw conversations into measurable outcomes — faster support, better leads, and happier customers.",
            },
            {
              icon: Eye,
              kicker: "Our Vision",
              title: "An API for every conversation, everywhere.",
              body:
                "A future where every business can deploy a thoughtful, on-brand assistant in minutes — across every channel their customers actually use.",
            },
          ].map((c) => (
            <div
              key={c.kicker}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card"
            >
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-brand opacity-10 blur-3xl" />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft border border-primary/20">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {c.kicker}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-muted-foreground">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="relative border-t border-border bg-surface/30 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gradient-brand">
              Why ConvoAPI
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Built for teams who care about craft.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow-soft"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft border border-primary/20">
                  <r.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{r.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 text-center sm:grid-cols-3 lg:px-8">
          {[
            { k: "12M+", v: "Conversations / month" },
            { k: "180+", v: "Countries served" },
            { k: "99.99%", v: "API uptime" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <p className="font-display text-4xl font-bold text-gradient-brand">{s.k}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-elegant sm:p-14">
            <div className="absolute inset-0 bg-gradient-mesh opacity-90" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to build with us?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Grab an API key and ship your first chatbot today.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="brand" size="lg">
                  <Link to="/chatbot">Get API Key <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/demo">View Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
