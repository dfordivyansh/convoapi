import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chatbot")({
  component: ChatbotPage,
});

// ✅ CHANGE THIS TO YOUR HTTPS DOMAIN LATER
const BASE_API_URL = "http://13.53.93.182/api/";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  ts: number;
  options?: {
    label: string;
    value: string;
  }[];
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
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const apiUrlRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // =========================
  // SESSION
  // =========================
  useEffect(() => {
    let id = localStorage.getItem("chat_session");

    if (!id) {
      id = `web_${Date.now()}`;
      localStorage.setItem("chat_session", id);
    }

    sessionIdRef.current = id;
  }, []);

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  // =========================
  // CONNECT API
  // =========================
  const handleConnect = async () => {
    if (!apiInput.trim()) return;

    setConnecting(true);

    try {
      const apiKey = apiInput.trim();
      const testUrl = `${BASE_API_URL}${apiKey}/`;

      const res = await fetch(testUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "hi",
          session_id: sessionIdRef.current,
        }),
      });

      let data: any = {};

      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Invalid API");
      }

      apiUrlRef.current = testUrl;
      setConnected(true);

      setMessages((prev) => [
        ...prev,
        {
          id: `connected-${Date.now()}`,
          role: "bot",
          text: "✅ Connected successfully. You can start chatting now.",
          ts: Date.now(),
        },
      ]);
    } catch (err: any) {
      console.error(err);

      setConnected(false);

      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "bot",
          text:
            err?.message ||
            "❌ Failed to connect. Check API key or server.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setConnecting(false);
    }
  };

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    if (!connected) {
      setMessages((prev) => [
        ...prev,
        {
          id: `warn-${Date.now()}`,
          role: "bot",
          text: "⚠️ Connect API first.",
          ts: Date.now(),
        },
      ]);

      return;
    }

    if (typing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

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

      let data: any = {};

      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid JSON response");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Server error");
      }

      const replyText =
        data?.reply?.message ||
        data?.message ||
        data?.reply ||
        "No response";

      let options = data?.reply?.options || data?.options || [];

      // normalize options
      if (Array.isArray(options) && typeof options[0] === "string") {
        options = options.map((opt: string) => ({
          label: opt,
          value: opt,
        }));
      }

      setTimeout(() => {
        setTyping(false);

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "bot",
            text: String(replyText),
            ts: Date.now(),
            options,
          },
        ]);
      }, 700);
    } catch (err: any) {
      console.error(err);

      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: `server-error-${Date.now()}`,
          role: "bot",
          text: err?.message || "❌ Server error",
          ts: Date.now(),
        },
      ]);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-40" />

      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[280px_1fr]">
        {/* SIDEBAR */}
        <aside>
          <div className="rounded-2xl border bg-card p-5 shadow-lg">
            <div className="flex items-center gap-3">
              <LogoMark size={28} />

              <div>
                <h2 className="font-semibold">Chatbot Console</h2>

                <p className="text-xs text-muted-foreground">
                  Connect your chatbot API
                </p>
              </div>
            </div>

            {/* STATUS */}
            <div className="mt-6 flex items-center text-sm">
              <span
                className={cn(
                  "mr-2 inline-block h-2.5 w-2.5 rounded-full",
                  connected
                    ? "bg-green-500 animate-pulse"
                    : "bg-gray-400"
                )}
              />

              {connected ? "Connected" : "Not Connected"}
            </div>

            {/* API INPUT */}
            <div className="mt-6">
              <input
                type="text"
                placeholder="Enter API Key"
                value={apiInput}
                onChange={(e) => setApiInput(e.target.value)}
                disabled={connected}
                className="mb-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />

              <Button
                onClick={handleConnect}
                disabled={connecting || connected || !apiInput.trim()}
                className="w-full"
              >
                {connecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
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

        {/* CHAT SECTION */}
        <section className="flex flex-col rounded-2xl border bg-card shadow-lg">
          {/* HEADER */}
          <div className="border-b px-5 py-4 text-sm text-muted-foreground">
            {connected
              ? "✅ Connected to chatbot API"
              : "⚠️ Awaiting API connection"}
          </div>

          {/* MESSAGES */}
          <div
            ref={scrollRef}
            className="h-[65vh] flex-1 overflow-y-auto px-5 py-5 space-y-4"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex",
                  m.role === "user"
                    ? "justify-end"
                    : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm whitespace-pre-line",
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-muted"
                  )}
                >
                  <div>{m.text}</div>

                  {/* OPTIONS */}
                  {m.options && m.options.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(opt.label)}
                          className="rounded-full border px-3 py-1 text-xs hover:bg-accent"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 text-[10px] opacity-60">
                    {formatTime(m.ts)}
                  </div>
                </div>
              </div>
            ))}

            {/* TYPING */}
            {typing && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                AI is typing...
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="flex gap-2 border-t p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!connected}
              placeholder={
                connected
                  ? "Type your message..."
                  : "Connect API first..."
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(input);
                }
              }}
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />

            <Button
              onClick={() => sendMessage(input)}
              disabled={!connected || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}