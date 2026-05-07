import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Sparkles, Calendar, Compass } from "lucide-react";
import { LogoMark } from "@/components/Logo";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Live Demo — TryPDeals Chatbot · ConvoAPI" },
      {
        name: "description",
        content: "See a live ConvoAPI chatbot in action — built for TryPDeals.",
      },
      { property: "og:title", content: "TryPDeals · Powered by ConvoAPI" },
      { property: "og:description", content: "A live chatbot demo powered by ConvoAPI." },
    ],
  }),
  component: DemoPage,
});

const sampleMessages: { from: "bot" | "user"; text: string }[] = [
  { from: "bot", text: "Hey 👋 Welcome to TryPDeals! Where are you planning to travel?" },
  { from: "user", text: "I want a trip to Kedarnath next month." },
  { from: "bot", text: "Great choice 🙏 I found 3 Kedarnath tour packages starting from ₹8,999." },
  { from: "user", text: "Can you share itinerary?" },
  {
    from: "bot",
    text: "Sure! 4D/3N package includes travel, stay & darshan assistance. Want WhatsApp details?",
  },
];

function DemoPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-70" />
      <div className="pointer-events-none absolute inset-0 grid-bg" />

      <section className="relative mx-auto max-w-7xl px-5 pt-16 pb-24 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs backdrop-blur">
            <LogoMark size={14} />
            Powered by <span className="text-gradient-brand font-semibold">ConvoAPI</span>
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="text-gradient-brand">TryPDeals</span> Travel Chatbot
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            This is a live travel chatbot powered by ConvoAPI — helping users explore destinations,
            get instant tour packages, and plan trips seamlessly via WhatsApp & web.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Brand showcase */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-elegant">
            <div className="absolute inset-0 bg-gradient-brand-soft" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium">
                <MapPin className="h-3.5 w-3.5" /> Travel · Tour Packages{" "}
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
                Plan trips instantly with AI.
              </h2>
              <p className="mt-3 text-muted-foreground">
                TryPDeals uses ConvoAPI to automate travel enquiries, recommend destinations,
                generate instant tour quotes, and assist customers 24/7 on WhatsApp.
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  { icon: Compass, text: "Destination & package recommendations" },
                  { icon: Calendar, text: "Instant itinerary & travel planning" },
                  { icon: Sparkles, text: "AI-powered travel assistant 24/7" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border">
                      <item.icon className="h-4 w-4 text-primary" />
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="brand" size="lg">
                  <Link to="/chatbot">
                    Use Live Chatbot <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/">Back to home</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Mini chat preview */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-brand opacity-25 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-brand-foreground">
                    TP
                  </div>
                  <div>
                    <p className="text-sm font-semibold">TryPDeals Travel Assistant</p>{" "}
                    <p className="text-[11px] text-success">● Online</p>
                  </div>
                </div>
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Live
                </span>
              </div>

              <div className="space-y-3 bg-surface/30 px-5 py-6">
                {sampleMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-card ${
                        m.from === "user"
                          ? "rounded-br-md bg-gradient-brand text-brand-foreground"
                          : "rounded-bl-md bg-card text-foreground border border-border"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2.5">
                    {[0, 0.2, 0.4].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                        style={{ animation: `bounce-dot 1.2s ${d}s infinite ease-in-out` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-border px-4 py-3">
                <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted-foreground">
                  <span className="flex-1">Type a message…</span>
                  <button className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-brand-foreground">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 border-t border-border bg-surface/40 py-2.5 text-[11px] text-muted-foreground">
                <LogoMark size={12} /> Powered by{" "}
                <span className="text-gradient-brand font-semibold">ConvoAPI</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
