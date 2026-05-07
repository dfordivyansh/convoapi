import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

export function Logo({ className, showWordmark = true, size = 28 }: LogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className="font-display text-[1.05rem] font-bold tracking-tight">
          Convo<span className="text-gradient-brand">API</span>
        </span>
      )}
    </div>
  );
}

export function LogoMark({ size = 28 }: { size?: number }) {
  const id = `cg-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ConvoAPI logo"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="oklch(0.68 0.22 285)" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 240)" />
        </linearGradient>
      </defs>
      {/* Chat bubble */}
      <path
        d="M8 11.5C8 9.01 10.01 7 12.5 7h15A4.5 4.5 0 0 1 32 11.5v10A4.5 4.5 0 0 1 27.5 26H17l-5.6 4.7c-.65.55-1.65.09-1.65-.77V26H12.5C10.01 26 8 23.99 8 21.5v-10Z"
        fill={`url(#${id})`}
      />
      {/* API connection nodes */}
      <circle cx="15" cy="16.5" r="1.9" fill="white" fillOpacity="0.95" />
      <circle cx="22" cy="16.5" r="1.9" fill="white" fillOpacity="0.95" />
      <circle cx="29" cy="16.5" r="1.9" fill="white" fillOpacity="0.95" />
      <path
        d="M16.4 16.5h4.2M23.4 16.5h4.2"
        stroke="white"
        strokeOpacity="0.95"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
