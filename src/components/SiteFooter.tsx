import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Github, Twitter, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Build & integrate smart chatbots across Web, WhatsApp and your apps with one elegant API.
          </p>
          <div className="flex gap-2">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:text-foreground hover:border-primary/40"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Product", items: ["Features", "Pricing", "Demo", "Docs"] },
          { title: "Company", items: ["About", "Careers", "Blog", "Press"] },
          { title: "Resources", items: ["Help center", "Status", "Privacy", "Terms"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-semibold">{col.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.items.map((item) => (
                <li key={item}>
                  <a className="hover:text-foreground transition-colors" href="#">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-muted-foreground sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} ConvoAPI. All rights reserved.</p>
          <p>
            Crafted for developers ·{" "}
            <Link to="/about" className="hover:text-foreground">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
