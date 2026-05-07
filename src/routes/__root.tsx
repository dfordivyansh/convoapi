import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-gradient-brand">404</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2 text-sm font-medium text-brand-foreground shadow-glow-soft hover:shadow-glow"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ConvoAPI — Build & Integrate Smart Chatbots" },
      {
        name: "description",
        content:
          "ConvoAPI empowers your business with AI-driven conversations across Web, WhatsApp and apps. One elegant API.",
      },
      { name: "author", content: "ConvoAPI" },
      { property: "og:title", content: "ConvoAPI — Build & Integrate Smart Chatbots" },
      { property: "og:description", content: "ConvoAPI Hub is a premium SaaS-style web application UI for integrating AI chatbots." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ConvoAPI — Build & Integrate Smart Chatbots" },
      { name: "description", content: "ConvoAPI Hub is a premium SaaS-style web application UI for integrating AI chatbots." },
      { name: "twitter:description", content: "ConvoAPI Hub is a premium SaaS-style web application UI for integrating AI chatbots." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bc6b4616-2710-4c75-a478-6cada08088e6/id-preview-03a85237--61a6b43b-2aeb-40fd-943e-d9bb68adbfec.lovable.app-1777057800018.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bc6b4616-2710-4c75-a478-6cada08088e6/id-preview-03a85237--61a6b43b-2aeb-40fd-943e-d9bb68adbfec.lovable.app-1777057800018.png" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/logo.png" },
      { rel: "shortcut icon", href: "/logo.png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <div className="relative flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
