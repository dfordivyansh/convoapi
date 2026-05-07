import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code2,
  MessageCircle,
  Layers,
  Sparkles,
  KeyRound,
  Plug,
  MessagesSquare,
  Check,
  ExternalLink,
  Star,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ConvoAPI — Build & Integrate Smart Chatbots in Minutes" },
      {
        name: "description",
        content:
          "AI-driven conversations across Web & WhatsApp. Plug ConvoAPI into your stack with one key.",
      },
      { property: "og:title", content: "ConvoAPI — Smart Chatbot Platform" },
      {
        property: "og:description",
        content: "Build & integrate smart chatbots across channels in minutes.",
      },
    ],
  }),
  component: HomePage,
});

const features = [
  {
    icon: Code2,
    title: "Easy API Integration",
    desc: "Drop in a few lines of code. RESTful, fully typed, and built for developers.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    desc: "Reach customers where they are. Native WhatsApp Business support out of the box.",
  },
  {
    icon: Layers,
    title: "Multi-platform Support",
    desc: "Web widgets, mobile SDKs, WhatsApp & more — one API, every surface.",
  },
  {
    icon: Sparkles,
    title: "Smart AI Responses",
    desc: "Context-aware, brand-tuned conversations powered by leading LLMs.",
  },
];

const steps = [
  { icon: KeyRound, title: "Get your API key", desc: "Sign up and grab a key from the dashboard." },
  { icon: Plug, title: "Plug into your system", desc: "One snippet on web, mobile, or WhatsApp." },
  {
    icon: MessagesSquare,
    title: "Start automated conversations",
    desc: "Launch a smart bot — measure, iterate, scale.",
  },
];

function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" />
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-gradient-radial" />

        <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-28 text-center lg:px-8 lg:pt-28 lg:pb-36">
          <div className="mx-auto inline-flex animate-fade-in items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            New · WhatsApp Business support is live
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl animate-fade-up font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Build & Integrate <span className="text-gradient-brand">Smart Chatbots</span>{" "}
            <br className="hidden sm:block" />
            in Minutes
          </h1>

          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-base text-muted-foreground sm:text-lg">
            ConvoAPI empowers your business with AI-driven conversations across{" "}
            <span className="text-foreground">Web</span> &{" "}
            <span className="text-foreground">WhatsApp</span> — with one elegant API.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="brand" size="xl">
              <Link to="/chatbot">
                Get API Key <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/demo">View Demo</Link>
            </Button>
          </div>

          <div className="mt-10 flex animate-fade-in flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-success" /> 99.99% uptime
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-success" /> SOC 2 ready
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-success" /> No credit card
            </span>
          </div>

          {/* Hero code preview */}
          <div className="relative mx-auto mt-16 max-w-3xl animate-scale-in">
            <div className="absolute -inset-px rounded-3xl bg-gradient-brand opacity-40 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/90 shadow-elegant backdrop-blur">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                </div>
                <p className="font-mono text-xs text-muted-foreground">convoapi.ts</p>
                <LogoMark size={18} />
              </div>
              <pre className="overflow-x-auto p-5 text-left font-mono text-[13px] leading-relaxed">
                {`import { ConvoAPI } from "convoapi";

const convo = new ConvoAPI({ apiKey: process.env.CONVO_KEY });

await convo.chat.send({
  channel: "whatsapp",
  to: "+1 555 0142",
  message: "Hey 👋 — how can I help today?",
});`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative border-t border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gradient-brand">
              Features
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to ship a chatbot
            </h2>
            <p className="mt-3 text-muted-foreground">
              A modern, batteries-included platform built for product teams who move fast.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow-soft"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft border border-primary/20">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gradient-brand">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              From zero to chatbot in three steps
            </h2>
          </div>

          <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="relative rounded-2xl border border-border bg-card p-7 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-brand-foreground font-display text-sm font-bold shadow-glow-soft">
                    {i + 1}
                  </div>
                  <s.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo / social proof */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gradient-brand">
              Live in production
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Case Study: TryPDeals Travel Automation
            </h2>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* TryPDeals showcase card */}
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-1 shadow-elegant">
              <div className="absolute inset-0 bg-gradient-brand opacity-[0.08]" />
              <div className="relative rounded-[1.4rem] bg-card p-8">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                    Live Case Study
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    Featured case study
                  </div>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">
                  Live Demo: TryPDeals Chatbot
                </h3>
                <p className="mt-2 text-muted-foreground">
                  See how TryPDeals uses ConvoAPI to automate travel enquiries, generate instant
                  tour quotes, and assist customers on WhatsApp. From destination planning to
                  booking support, ConvoAPI helps them handle thousands of travelers seamlessly.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-border bg-surface/60 p-4">
                  {[
                    { k: "3×", v: "More Leads" },
                    { k: "90%", v: "Auto Responses" },
                    { k: "<20s", v: "Reply Time" },
                  ].map((stat) => (
                    <div key={stat.v} className="text-center">
                      <p className="font-display text-xl font-bold text-gradient-brand">{stat.k}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                        {stat.v}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="brand">
                    <Link to="/demo">
                      Try Travel Chatbot <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline">
                    <Link to="/chatbot">
                      Get API Key <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            {/* Analytics card */}
            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-card">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Automation Performance</p>
                  <h3 className="mt-1 font-display text-xl font-bold">Chatbot Impact Overview</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  Live Data
                </div>
              </div>

              {/* Graph */}
              <div className="mt-8 space-y-5">
                {/* Leads Growth */}
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Lead Generation</span>
                    <span className="text-success font-medium">+300%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-gradient-brand w-[80%]"></div>
                  </div>
                </div>

                {/* Response Rate */}
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Auto Response Rate</span>
                    <span className="text-success font-medium">90%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-gradient-brand w-[90%]"></div>
                  </div>
                </div>

                {/* Response Time */}
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Avg. Response Time</span>
                    <span className="text-success font-medium">&lt; 20s</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-gradient-brand w-[70%]"></div>
                  </div>
                </div>
              </div>

              {/* Footer Insight */}
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  ConvoAPI helped TryPDeals automate customer interactions, increase conversions,
                  and reduce response time significantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-elegant sm:p-16">
            <div className="absolute inset-0 bg-gradient-mesh opacity-90" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
                Start a smarter conversation today.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Free during beta. No credit card required.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="brand" size="xl">
                  <Link to="/chatbot">
                    Get API Key <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/demo">Try the demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
