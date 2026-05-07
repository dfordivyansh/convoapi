import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, Send, CheckCircle2, Loader2 } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chatbot")({
  component: ChatbotPage,
});
const BASE_API_URL = "http://13.53.93.182/api/";

const API_URL = "http://13.53.93.182/api/T5Y8U2I9O3P1A6S4/";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  ts: number;
  options?: { label: string; value: string }[];
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ChatbotPage() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "👋 Hi, how can I help you today?",
      ts: Date.now(),
    },
  ]);
  const [apiInput, setApiInput] = useState("");
  const apiUrlRef = useRef<string | null>(null);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sessionIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ✅ SESSION FIX (no hydration issue)
  useEffect(() => {
    let id = localStorage.getItem("chat_session");

    if (!id) {
      id = `web_${Date.now()}`;
      localStorage.setItem("chat_session", id);
    }

    sessionIdRef.current = id;
  }, []);

  // auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  // =========================
  // 🔌 CONNECT API
  // =========================
  const handleConnect = async () => {
    if (!apiInput.trim()) return;

    setConnecting(true);

    try {
      const apiKey = apiInput.trim();
      const testUrl = `${BASE_API_URL}${apiKey}/`;

      const res = await fetch(testUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "hi",
          session_id: sessionIdRef.current,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Invalid API");
      }

      // ✅ SUCCESS
      apiUrlRef.current = testUrl;
      setConnected(true);

      setMessages((m) => [
        ...m,
        {
          id: `c-${Date.now()}`,
          role: "bot",
          text: "✅ Connected successfully. You can start chatting now 😊",
          ts: Date.now(),
        },
      ]);
    } catch (err) {
      setConnected(false);

      setMessages((m) => [
        ...m,
        {
          id: `err-${Date.now()}`,
          role: "bot",
          text: "❌ Invalid API key or server not running.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setConnecting(false);
    }
  };
  // =========================
  // 🚀 SEND MESSAGE
  // =========================
  const sendMessage = async (text: string) => {
    if (!text.trim() || !connected || typing) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch(apiUrlRef.current!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionIdRef.current,
        }),
      });

      const data = await res.json();

      // 🔥 LLM FEEL DELAY
      setTimeout(
        () => {
          setTyping(false);

          const replyText = data?.reply?.message || data?.message || data?.reply || "No response";

          let options = data?.reply?.options || data?.options || [];

          // 🔥 normalize
          if (options.length && typeof options[0] === "string") {
            options = options.map((opt: string) => ({
              label: opt,
              value: opt,
            }));
          }
          setMessages((prev) => [
            ...prev,
            {
              id: `b-${Date.now()}`,
              role: "bot",
              text: replyText,
              ts: Date.now(),
              options,
            },
          ]);
        },
        800 + Math.random() * 700,
      );
    } catch (err) {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text: "❌ Server error",
          ts: Date.now(),
        },
      ]);
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-50" />

      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
        {/* SIDEBAR */}
        <aside>
          <div className="rounded-2xl border bg-card p-5 shadow">
            <LogoMark size={28} />

            <p className="mt-4 font-semibold">Chatbot Console</p>

            <div className="mt-6 text-xs">
              <span
                className={cn(
                  "h-2 w-2 inline-block rounded-full mr-2",
                  connected ? "bg-green-500 animate-pulse" : "bg-gray-400",
                )}
              />
              {connected ? "Connected" : "Not Connected"}
            </div>

            <div className="mt-6">
              <Input
                placeholder="Enter API Key (e.g. A9F3K8L2M7Q1X5Z4)"
                value={apiInput}
                onChange={(e) => setApiInput(e.target.value)}
                disabled={connected}
                className="mb-3"
              />

              <Button
                onClick={handleConnect}
                disabled={connecting || connected || !apiInput.trim()}
                className="w-full"
              >
                {connecting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Connecting
                  </>
                ) : connected ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Connected
                  </>
                ) : (
                  "Connect API"
                )}
              </Button>
            </div>
          </div>
        </aside>

        {/* CHAT */}
        <section className="rounded-2xl border bg-card shadow">
          {/* HEADER */}
          <div className="border-b px-4 py-3 text-sm text-muted-foreground">
            {connected ? "Connected" : "Awaiting connection"}
          </div>

          {/* MESSAGES */}
          <div ref={scrollRef} className="h-[60vh] overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[75%] rounded-xl px-4 py-2 text-sm whitespace-pre-line",
                    m.role === "user" ? "bg-primary text-white" : "bg-muted",
                  )}
                >
                  {m.text}

                  {/* OPTIONS */}
                  {m.options && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.options?.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(opt.label)}
                          className="text-xs px-3 py-1 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="text-[10px] mt-1 opacity-60">{formatTime(m.ts)}</div>
                </div>
              </div>
            ))}

            {/* TYPING */}
            {typing && (
              <div className="flex gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                <div className="flex gap-2 items-center">
                  {[0, 0.2, 0.4].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 rounded-full bg-muted-foreground"
                      style={{ animation: `bounce-dot 1.2s ${d}s infinite` }}
                    />
                  ))}
                </div>{" "}
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="border-t p-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!connected}
              placeholder={connected ? "Type your message..." : "Connect API first..."}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage(input);
              }}
            />

            <Button onClick={() => sendMessage(input)} disabled={!connected || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
